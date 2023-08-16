import React from 'react';
import './About.scss';
import { Box, Typography } from '@mui/material';

const About = () => {
  return (
    <Box>
      <div className="banner" />
      <div className="wrapper">
        <Typography variant="h3">
          This is a blog application used to create blogs
        </Typography>
        <Typography className="text" variant="h5">
          You can create blogs in multiple categories like music tech and several others
          <br />
        </Typography>
        <Typography className="text" variant="h5">
          Thank you
        </Typography>
      </div>
    </Box>
  );
};

export default About;





