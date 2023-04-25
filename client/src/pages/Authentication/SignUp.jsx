import React from 'react';
import { Container, Form } from './authenticationElements';
import { Button, Caption, Heading1, Heading2, Link, Small } from '../../theme/appElements';
import Input from '../../components/Input';

const SignUp = () => {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <Container>
      <Heading1>PaperLive</Heading1>
      <Form onSubmit={handleSubmit}>
        <Heading2>Create your account</Heading2>
        <Input type='text' id='name' label='Team name' error='' />
        <Input type='password' id='password' label='Password' error='' />
        <Input type='passwordconf' id='passwordconf' label='Confirm Password' error='' />
        <Button type='submit'>Sign up</Button>
        <Caption>
          Already have an account? <Link to='/login'>Sign in</Link>
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

export default SignUp;
