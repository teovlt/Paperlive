import React from 'react';
import axios from 'axios';
import { Container, Form } from './authenticationElements';
import { Button, Caption, Heading1, Heading2, Link, Small } from '../../theme/appElements';
import Input from '../../components/Input';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const { name, password, passwordconf } = e.target;

    if (password.value === passwordconf.value) {
      const data = { name: name.value, password: password.value };
      const config = {
        method: 'post',
        withCredentials: true,
        url: 'http://localhost:3000/api/auth/register',
        data: data,
      };

      axios(config)
        .then((res) => navigate('/'))
        .catch((error) => console.log(error));
    }
  }

  return (
    <Container>
      <Heading1>PaperLive</Heading1>
      <Form onSubmit={handleSubmit} autocomplete='off'>
        <Heading2>Create your account</Heading2>
        <Input type='text' id='name' label='Team name' error='' autocomplete='off' />
        <Input type='password' id='password' label='Password' error='' autocomplete='off' />
        <Input
          type='password'
          id='passwordconf'
          label='Confirm Password'
          error=''
          autocomplete='off'
        />
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
