import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

const linkStyle = {
  textDecoration: "none",
  color: "black",
};

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            <Link to="/" style={linkStyle}>
              SAT Results
            </Link>
          </Typography>
          <Button onClick={handleMenuClick} style={linkStyle}>
            Menu
          </Button>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <Link to="/candidate" style={linkStyle}>
                Add
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link to="/" style={linkStyle}>
                View All
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link to="/get-rank" style={linkStyle}>
                Get Rank
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link to="/update-score" style={linkStyle}>
                Update Score
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link to="/delete-record" style={linkStyle}>
                Delete Record
              </Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
}
