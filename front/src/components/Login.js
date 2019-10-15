import React, { useState } from 'react';
import axios from 'axios';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const login = await axios.post('/login', {
      email,
      password,
    });
    if (login.data.token) console.log('Auth OK')
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <div id="email">
          <label>Email</label>
          <input
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div id="password">
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <button disabled={!validateForm()} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
