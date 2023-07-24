import { styled, Box, Typography } from "@mui/material";
import React, { useState } from "react";

const Container = styled(Box)`
  border: 1px solid #d3cede;
  border-radius: 10px;
  margin: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 250px;
  & > img,
  & > p {
    padding: 0 5px 5px 5px;
  }
`;

const Image = styled("img")({
  width: "100%",
  objectFit: "cover",
  borderRadius: "10px 10px 0 0",
  height: 150,
});

const Text = styled(Typography)`
    color: #878787
    font-size: 10px;
`;

const Heading = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
  overflow: hidden; /* Add this line to hide overflowing text */
  text-overflow: ellipsis; /* Add this line to display ellipsis for long text */
  white-space: nowrap; /* Add this line to prevent wrapping */
  transition: all 0.3s; /* Add this line for smooth transition */
`;

const Post = ({ post }) => {
  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80";

  const addEllipsis = (str, limit) => {
    return str.length > limit ? (
      str.substring(0, limit) + "..."
    ) : (
      <div dangerouslySetInnerHTML={{ __html: str }}></div>
    );
  };

  const [showFullHeading, setShowFullHeading] = useState(false);

  const handleHeadingHover = () => {
    setShowFullHeading(!showFullHeading);
  };

  return (
    <Container>
      <Image src={url} alt="post" />
      <Text>{post.categories}</Text>
      <Heading
        onMouseEnter={handleHeadingHover}
        onMouseLeave={handleHeadingHover}
      >
        {showFullHeading ? post.title : addEllipsis(post.title, 20)}
      </Heading>
      <Text>Author: {post.username}</Text>
    </Container>
  );
};

export default Post;
