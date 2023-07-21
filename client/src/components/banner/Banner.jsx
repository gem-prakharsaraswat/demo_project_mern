import { styled, Box, Typography } from "@mui/material";

const Image = styled(Box)(({ theme }) => ({
  width: "100%",
  background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x #000`,
  height: "50vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "40px",
  color: "rgba(255, 255, 255, 0.9)", // Adjust the alpha value here (0.9 for slightly transparent)
  lineHeight: 1,
  [theme.breakpoints.down("md")]: {
    fontSize: "30px",
  },
}));

const Banner = () => {
  return (
    <Image>
      <Heading>Your Platform to Connect, Engage, and Inspire</Heading>
    </Image>
  );
};

export default Banner;
