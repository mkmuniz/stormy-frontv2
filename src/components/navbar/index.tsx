import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import jwtDecode from 'jwt-decode';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function ButtonAppBar() {
  const getToken: any = localStorage.getItem('token');
  const token: any = jwtDecode(getToken);

  return (
    <Box sx={{ flexGrow: 1, color: "#D100F3", height: "20%" }}>
      <AppBar position="static" sx={{ bgcolor: "#D100F3", height: "20%" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link style={{ color: "white", textDecoration: "none" }} to="/home">
            <strong>
            <i>
              STORMY
            </i>
            </strong>
          </Link>
          </Typography>
        <AccountBoxIcon /> 
        <Button color="inherit"><Link style={{ color: "white", textDecoration: "none" }} to="/perfil">Bem-Vindo! {token.username}</Link></Button>
        <Button color="inherit"><Link style={{ color: "white", textDecoration: "none" }} to="/logout">SAIR</Link></Button>
        <ExitToAppIcon />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
