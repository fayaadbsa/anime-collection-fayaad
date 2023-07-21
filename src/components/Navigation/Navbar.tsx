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
import { MenuRounded } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

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
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <div>
      <AppBar component="nav">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "36px",
            padding: { xs: "10px 16px", sm: "12px 64px" },
            background: "#0A0C0F",
          }}
        >
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" }, color: "white" }}
          >
            <MenuRounded />
          </IconButton>
          <Link to="/">
            <Typography
              variant="h4"
              component="div"
              sx={{
                flexGrow: 1,
                color: "primary.main",
                fontWeight: 700,
                fontSize: { xs: "24px", sm: "34px" },
              }}
            >
              {BRAND}
            </Typography>
          </Link>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              marginLeft: "40px",
              gap: "32px",
            }}
          >
            {MENUS.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                style={({ isActive }) => {
                  if (!isActive) {
                    return {
                      opacity: "0.6",
                    };
                  }
                  return {
                    fontWeight: 700,
                  };
                }}
                css={{
                  color: "white",
                  ":hover": {
                    opacity: "1 !important",
                    color: theme.palette.primary.main,
                  },
                }}
              >
                {item.label}
              </NavLink>
            ))}
          </Box>
        </Box>
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
          <Box
            onClick={handleDrawerToggle}
            sx={{
              textAlign: "center",
              backgroundColor: "#23252B",
              height: "100%",
            }}
          >
            <Typography variant="h6" sx={{ my: 2, color: "primary.main" }}>
              {BRAND}
            </Typography>
            <Divider color="white" />
            <List>
              {MENUS.map((item) => (
                <Link key={item.label} to={item.path}>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: "start", color: "white" }}>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
    </div>
  );
};

export default Navbar;
