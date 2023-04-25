import React from 'react';
import axios from 'axios';
import { Container, Form } from './authenticationElements';
import { Button, Caption, Heading1, Heading2, Link, Small } from '../../theme/appElements';
import Input from '../../components/Input';

const SignIn = () => {
  async function handleSubmit(e) {
    e.preventDefault();

    const { name, password } = e.target;

    const data = JSON.stringify({ name: name.value, password: password.value });
    const config = {
      method: 'post',
      withCredentials: true,
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/api/auth/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }

  return (
    <Container>
      <Heading1>PaperLive</Heading1>
      <Form onSubmit={handleSubmit}>
        <Heading2>Welcome back</Heading2>
        <Input type='text' id='name' label='Team name' error='' />
        <Input type='password' id='password' label='Password' error='' />
        <Button type='submit'>Sign In</Button>
        <Caption>
          New on PaperLive? <Link to='/register'>Sign up</Link>
        </Caption>
      </Form>
      <Small>
        By creating an account, you agree to the <Link to=''>Terms of Service</Link>. For more
        information about PaperLive’s privacy practices, see the{' '}
        <Link>PaperLive Privacy Statement</Link>.
      </Small>
    </Container>
  );
};

export default SignIn;
