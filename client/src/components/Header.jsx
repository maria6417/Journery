import React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';

export default function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', borderBottom: '1px solid black', padding: '10px' }}>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'black',
          textDecoration: 'none',
          paddingLeft: '1%',
        }}
      >
        JOURNEYAL
      </Typography>
    </AppBar>
  );
}
