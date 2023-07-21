import { Box, styled, Typography, Link } from "@mui/material";

const Banner = styled(Box)`
  background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
  width: 100%;
  height: 50vh;
  background-position: left 0px bottom 0px;
  background-size: cover;
`;

const Wrapper = styled(Box)`
  padding: 20px;
  & > h3,
  & > h5 {
    margin-top: 50px;
  }
`;

const Text = styled(Typography)`
  color: #878787;
`;

const About = () => {
  return (
    <Box>
      <Banner />
      <Wrapper>
        <Typography variant="h3">
          This is a blog application used to create blogs
        </Typography>
        <Text variant="h5">
          You can create blogs in multiple categories like music tech and
          several others
          <br />
        </Text>
        <Text variant="h5">
          Thank you
          <Box component="span" style={{ marginLeft: 5 }}></Box>
        </Text>
      </Wrapper>
    </Box>
  );
};

export default About;
