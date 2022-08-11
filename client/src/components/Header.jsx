import React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

export default function Header({ user }) {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'white', borderBottom: '1px solid black', padding: '10px', flexDirection: 'row', justifyContent: 'space-between'
      }}>
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
        JOURNERY
      </Typography>
      <UserInfo>
        <Text fontSize="small">{user.username}</Text>
        <Text fontSize="x-small">{user.email}</Text>
      </UserInfo>
    </AppBar>
  );
}

const UserInfo = styled.div`
  color: black;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 1%;
`;

const Text = styled.div`
  font-weight: 300;
  font-size: ${props => props.fontSize};
  padding: 2px 0;
`;