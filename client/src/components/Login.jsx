import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import styled from 'styled-components';

export default function Login({ setLoggedIn }) {
  const [loginValue, setLoginValue] = useState({});
  const [signupValue, setSignupValue] = useState({});

  const handleChange = (e, type) => {
    if (type === 'login') {
      setLoginValue({
        ...loginValue,
        [e.target.name]: e.target.value,
      });
    }
    if (type === 'signup') {
      setSignupValue({
        ...signupValue,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleClick = (e) => {

  };

  return (
    <Flex>
      <FlexItem>
        <h2>Login</h2>
        <form>
          <InputLabel sx={{ display: 'flex', flexDirection: 'column', padding: '20px 0' }}>
            Username:
            <Input type="username" name="username" onChange={(e) => handleChange(e, 'login')} />
          </InputLabel>
          <InputLabel sx={{ display: 'flex', flexDirection: 'column', padding: '20px 0' }}>
            Password:
            <Input type="password" name="password" onChange={(e) => handleChange(e, 'login')} />
          </InputLabel>
          <Button onClick={(e) => handleClick(e, 'login')}>Login</Button>
        </form>
      </FlexItem>
      <FlexItem>
        <h2>Sign Up</h2>
        <form>
          <InputLabel sx={{ display: 'flex', flexDirection: 'column', padding: '20px 0' }}>
            Username:
            <Input type="username" name="username" onChange={(e) => handleChange(e, 'signup')} />
          </InputLabel>
          <InputLabel sx={{ display: 'flex', flexDirection: 'column', padding: '20px 0' }}>
            Password:
            <Input type="password" name="password" onChange={(e) => handleChange(e, 'signup')} />
          </InputLabel>
          <InputLabel sx={{ display: 'flex', flexDirection: 'column', padding: '20px 0' }}>
            Email Address:
            <Input type="email" name="email" onChange={(e) => handleChange(e, 'signup')} />
          </InputLabel>
          <Button onClick={(e) => handleClick(e, 'login')}>Sign Up</Button>
        </form>
      </FlexItem>
    </Flex>
  );
}

const Flex = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-top: 2%;
`;

const FlexItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
`;