import React, { useState } from "react";
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "../store";

axios.defaults.withCredentials = true;

const Header = () => {
  const user = localStorage.getItem("userinfo");
 
  const username = JSON.parse(user);
 
  const userName=username.data?.user?.name
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  const sendLogoutReq = async () => {
    const res = await axios.post("http://localhost:5000/api/logout", null, {
      withCredentials: true,
    });
    if (res.status === 200) {
      return res;
    }
    return new Error(" Unable to Logout. Please try again");
  };
  const handleLogout = () => {
    sendLogoutReq().then(() => dispatch(authActions.logout()));
    
  };
  const [value, setValue] = useState();
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4">USER LOGIN</Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <Tabs
              indicatorColor="secondary"
              onChange={(e, val) => setValue(val)}
              value={value}
              textColor="inherit"
            >
              {!isLoggedIn && (
                <>
                  {" "}
                  <Tab to="/login" LinkComponent={Link} label="Login" />
                  <Tab to="/signup" LinkComponent={Link} label="Signup" />{" "}
                </>
              )}

              {isLoggedIn && (
                <>
                  <Tab
                    onClick={handleLogout}
                    to="/login"
                    LinkComponent={Link}
                    label="Logout"
                  />
                 
                </>
              )}
             { isLoggedIn && <Tab label={userName}>
                  
                  </Tab>  }
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
