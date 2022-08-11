import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { v4 as uuidv4 } from 'uuid';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import styled from 'styled-components';

export default function Login({ setLoggedIn }) {
  const [loginValue, setLoginValue] = useState({});
  const [signupValue, setSignupValue] = useState({});
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');
  const [cookies, setCookie] = useCookies(['session']);

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

  const handleClick = (e, type) => {
    // if type is login, we will call the api to get userInfo on provided username & password.
    e.preventDefault();
    if (type === 'login') {
      const config = {
        method: 'POST',
        url: '/users/login',
        data: {
          username: loginValue.username,
          password: loginValue.password,
        },
      };
      axios(config)
        .then((result) => {
          setLoggedIn(result.data);
          setCookie('session', uuidv4());
        })
        .catch((err) => {
          console.log('failed to login', err);
          if (err.response.status === 404) {
            setLoginError(err.response.data);
          }
        });
    }
    // if result equals none, then either username or password is incorrect. (show error message)
    // if result came back, set logged in to true with the returned userId


    if (type === 'signup') {
      const config = {
        method: 'POST',
        url: '/users/signup',
        data: {
          username: signupValue.username,
          password: signupValue.password,
          email: signupValue.email,
        },
      };
      axios(config)
        .then((result) => {
          setLoggedIn(result.data);
          setCookie('session', uuidv4());
        })
        .catch((err) => {
          console.log('failed to signup', err);
          if (err.response.status === 404) {
            setSignupError(err.response.data);
          }
        });
    }
  };

  return (
    <Flex>
      <FlexItem>
        <h2>Login</h2>
        <form onSubmit={(e) => handleClick(e, 'login')}>
          {loginError && (
            <ErrorMessage>{loginError}</ErrorMessage>
          )}
          <InputLabel sx={{ display: 'flex', flexDirection: 'column', padding: '20px 0' }}>
            Username:
            <Input type="username" name="username" onChange={(e) => handleChange(e, 'login')} required />
          </InputLabel>
          <InputLabel sx={{ display: 'flex', flexDirection: 'column', padding: '20px 0' }}>
            Password:
            <Input type="password" name="password" onChange={(e) => handleChange(e, 'login')} required />
          </InputLabel>
          <Button type="submit">Login</Button>
        </form>
      </FlexItem>
      <FlexItem>
        <h2>Sign Up</h2>
        <form onSubmit={(e) => handleClick(e, 'signup')}>
          {signupError && (
            <ErrorMessage>{signupError}</ErrorMessage>
          )}
          <InputLabel sx={{ display: 'flex', flexDirection: 'column', padding: '20px 0' }}>
            Username:
            <Input type="username" name="username" onChange={(e) => handleChange(e, 'signup')} required />
          </InputLabel>
          <InputLabel sx={{ display: 'flex', flexDirection: 'column', padding: '20px 0' }}>
            Password:
            <Input type="password" name="password" onChange={(e) => handleChange(e, 'signup')} required />
          </InputLabel>
          <InputLabel sx={{ display: 'flex', flexDirection: 'column', padding: '20px 0' }}>
            Email Address:
            <Input type="email" name="email" onChange={(e) => handleChange(e, 'signup')} required />
          </InputLabel>
          <Button type="submit">Sign Up</Button>
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

const ErrorMessage = styled.div`
  color: #ff4d4d;
`;