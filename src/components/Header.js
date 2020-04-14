import React from 'react';
// import { NavLink } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



function Header() {
  return (
    <AppBar position="static" style={{padding: '10px 20px'}}>
  <Toolbar>
       
        <Typography variant="h4">Vagabond</Typography>
        </Toolbar>
    </AppBar>
  );
}

export default Header;
