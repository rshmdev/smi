import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Image from "next/image";
import logo from "../../../public/assets/SMi.svg";
import { Avatar } from "@mui/material";

const Header = () => {
  return (
    <Box>
      <AppBar style={{ backgroundColor: "#2E2E2E" }} position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0.5rem 0",
          }}
        >
          <Box display="flex" alignItems="center">
            <IconButton
              edge="start"
              color="#f05123 !important"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon sx={{ width: 40, height: 40, color: "#f05123" }} />
            </IconButton>

            <Image width={120} src={logo} />
          </Box>

          <Avatar sx={{ bgcolor: "#f05123", width: 45, height: 45 }}>LM</Avatar>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
