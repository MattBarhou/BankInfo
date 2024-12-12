import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [manageAnchorEl, setManageAnchorEl] = useState(null);

  // Handlers for dropdown menus
  const handleMenuOpen = (event, setAnchor) => setAnchor(event.currentTarget);
  const handleMenuClose = (setAnchor) => setAnchor(null);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#FFFFF0",
        color: "#000000",
        boxShadow: "1",
        borderBottom: "1px solid #E0E0E0", // Adds a border
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Bank Manager
        </Typography>
        <Box>
          {/* View Dropdown */}
          <Button
            color="inherit"
            onClick={(event) => handleMenuOpen(event, setAnchorEl)}
          >
            View
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleMenuClose(setAnchorEl)}
          >
            <MenuItem component={Link} to="/view-all-banks">
              View All Banks
            </MenuItem>
          </Menu>

          {/* Manage Dropdown */}
          <Button
            color="inherit"
            onClick={(event) => handleMenuOpen(event, setManageAnchorEl)}
          >
            Manage Banks
          </Button>
          <Menu
            anchorEl={manageAnchorEl}
            open={Boolean(manageAnchorEl)}
            onClose={() => handleMenuClose(setManageAnchorEl)}
          >
            <MenuItem component={Link} to="/get-bank-by-name">
              Get Bank by Name
            </MenuItem>
            <MenuItem component={Link} to="/get-bank-by-id">
              Get Bank by ID
            </MenuItem>
            <MenuItem component={Link} to="/update-bank-by-name">
              Update Bank by Name
            </MenuItem>
            <MenuItem component={Link} to="/update-bank-by-id">
              Update Bank by ID
            </MenuItem>
            <MenuItem component={Link} to="/delete-bank">
              Delete Bank
            </MenuItem>
          </Menu>

          {/* Create Bank */}
          <Button color="inherit" component={Link} to="/create-bank">
            Create Bank
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
