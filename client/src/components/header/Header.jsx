import { AppBar, Toolbar, styled, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ExitToApp, Home, Info, Email } from "@mui/icons-material";

const Component = styled(AppBar)`
  background: #ffffff;
  color: black;
`;

const Container = styled(Toolbar)`
  display: flex;
  justify-content: center;
  & > .icon-button {
    margin: 0 10px; // Add desired spacing between the icons
    transition: transform 0.3s ease; // Add smooth transition on hover
    &:hover {
      transform: scale(1.2); // Increase the size of the icons on hover
    }
  }
  & > .icon-text {
    display: none;
    margin-top: 5px;
    color: #000;
    font-weight: bold;
  }
  & > .icon-button:hover + .icon-text {
    display: block; // Show the related text when hovering over the icon
  }
`;

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to log out?");
    if (isConfirmed) {
      navigate("/account");
      // Implement your logout logic here
      // For example, clear user session, etc.
    }
  };

  return (
    <Component>
      <Container>
        <IconButton
          component={Link}
          to="/"
          color="inherit"
          className="icon-button"
        >
          <Home fontSize="large" />
        </IconButton>
        <Typography className="icon-text">Home</Typography>
        <IconButton
          component={Link}
          to="/about"
          color="inherit"
          className="icon-button"
        >
          <Info fontSize="large" />
        </IconButton>
        <Typography className="icon-text">About</Typography>
        <IconButton
          component={Link}
          to="/contact"
          color="inherit"
          className="icon-button"
        >
          <Email fontSize="large" />
        </IconButton>
        <Typography className="icon-text">Contact</Typography>
        <IconButton
          onClick={handleLogout}
          color="inherit"
          className="icon-button"
        >
          <ExitToApp fontSize="large" />
        </IconButton>
        <Typography className="icon-text">Logout</Typography>
      </Container>
    </Component>
  );
};

export default Header;
