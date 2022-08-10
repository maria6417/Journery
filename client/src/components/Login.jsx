import React, { useState } from 'react';

// login form & signup form
// renders two forms

// login form
// username, password
// authenticates with the database, returns userId, store as state
// set state logged in true

// signup form
// username, password, email
// check if username exists, if not returns userId, store as state
// set state logged in true

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

  const handleSubmit = (e, type) => {

  };

  return (
    <div>
      <div>
        <h2>Login</h2>
        <form onSubmit={(e) => handleSubmit(e, 'login')}>
          <label>
            Username:
            <input type="username" name="username" onChange={(e) => handleChange(e, 'login')} />
          </label>
          <label>
            Password:
            <input type="password" name="password" onChange={(e) => handleChange(e, 'login')} />
          </label>
        </form>
      </div>
      <div>
        <h2>Signup</h2>
        <form onSubmit={(e) => handleSubmit(e, 'signup')}>
          <label>
            Username:
            <input type="username" name="username" onChange={(e) => handleChange(e, 'signup')} />
          </label>
          <label>
            Password:
            <input type="password" name="password" onChange={(e) => handleChange(e, 'signup')} />
          </label>
          <label>
            Email Address:
            <input type="email" name="email" onChange={(e) => handleChange(e, 'signup')} />
          </label>
        </form>
      </div>
    </div>
  );
}
