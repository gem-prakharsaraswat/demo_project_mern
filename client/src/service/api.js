import axios from "axios";
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from "../constants/config";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  getType,
} from "../utils/common-utils";

const API_URL = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    if (config.TYPE.params) {
      config.params = config.TYPE.params;
    } else if (config.TYPE.query) {
      config.url = config.url + "/" + config.TYPE.query;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return processResponse(response);
  },
  function (error) {
    return Promise.reject(processError(error));
  }
);

const processResponse = (response) => {
  if (response?.status >= 200 && response?.status < 300) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.data?.msg,
      code: response?.data?.code,
    };
  }
};

const processError = async (error) => {
  if (error.response) {
    if (error.response.status === 403) {
      const { config } = error.response;
      console.log(error);
      try {
        let response = await axios({
          method: "post",
          url: API_URL + "/your_refresh_token_endpoint",
          headers: {
            "content-type": "application/json",
          },
          data: { token: getRefreshToken() },
        });
        if (response.isSuccess) {
          sessionStorage.clear();
          setAccessToken(response.data.accessToken);
          return axios(config);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    } else {
      console.log("ERROR IN RESPONSE: ", error.toJSON());
      return {
        isError: true,
        msg: API_NOTIFICATION_MESSAGES.responseFailure,
        code: error.response.status,
      };
    }
  } else if (error.request) {
    console.log("ERROR IN RESPONSE: ", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.requestFailure,
      code: "",
    };
  } else {
    console.log("ERROR IN RESPONSE: ", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.networkError,
      code: "",
    };
  }
};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: body,
      responseType: value.responseType,
      headers: {
        authorization: getAccessToken(),
      },
      TYPE: getType(value, body),
      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentCompleted);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadProgress) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentCompleted);
        }
      },
    });
}

export { API };