import React from 'react';
import { Container, Form } from './signInElements';
import { Button, Heading1, Heading2, Link, Small } from '../../theme/appElements';
import Input from '../../components/Input';

const SignIn = () => {
  function handleSubmit() {}

  return (
    <Container>
      <Heading1>PaperLive</Heading1>
      <Form onSubmit={handleSubmit}>
        <Heading2>Welcome back</Heading2>
        <Input id='name' label='Team name' />
        <Button>Continue</Button>
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
