import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

const BRAND = "iYIYI";

const MENUS = [
  {
    path: "/",
    label: "For You",
  },
  {
    path: "/collection",
    label: "Collection",
  },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <div>
      <AppBar component="nav">
        <Toolbar
          sx={{
            height: 64,
            // background: "#11100e",
            background: "#0a0c0f",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "white" }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: "32px",
            }}
          >
            <Link to="/">
              <Typography
                variant="h4"
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", sm: "block" },
                  color: "primary.main",
                }}
              >
                {BRAND}
              </Typography>
            </Link>
            {MENUS.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                style={({ isActive }) => {
                  if (!isActive) {
                    return;
                  }
                  return {
                    fontWeight: 700,
                    color: "white",
                  };
                }}
                css={{
                  color: "lightgray",
                  textDecoration: "none",
                  ":hover": {
                    // color: "orange",
                  },
                }}
              >
                {item.label}
              </NavLink>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
            },
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ my: 2, color: "primary.main" }}>
              {BRAND}
            </Typography>
            <Divider />
            <List>
              {MENUS.map((item) => (
                <ListItem key={item.label} disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
    </div>
  );
};

export default Navbar;
