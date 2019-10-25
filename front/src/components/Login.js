import React, { useState, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
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
    if (login.data.token) console.log(login.data);
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <StyledCard className="loginCard">
          <StyledTextField
            id="outlined-email-input"
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledTextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledCardActions>
            <Button disabled={!validateForm()} type="submit">
              Login
            </Button>
          </StyledCardActions>
        </StyledCard>
      </form>
    </Fragment>
  );
}

const StyledCard = styled(Card)`
  height: 30%;
  max-width: 25%;
  font-size: 1.5em;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &:hover {
    box-shadow: 5px 5px 2px 1px rgba(255, 105, 135, 0.3);
  }
`;

const StyledTextField = styled(TextField)`
  width: '100%'
  font-size: 1.5em;
  text-align: center;
`;

const StyledCardActions = styled(CardActions)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 10px;
  color: white;
  text-align: center;
  margin: auto;
  width: 25%;
  padding: 0 30px;
`;
