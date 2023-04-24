import React, { useState } from 'react';
import { Container } from './signInElements';
import { WrapperCo, Button, Link } from '../../theme/appElements';
import Input from '../../components/input';

const SignIn = () => {



  return (
    <Container>
      <h1>PaperLive</h1>
      <WrapperCo>
        <h2>Welcome back</h2>
        <div>
          <Input type={'text'} placeholder={'TeamName'} />
          <Button>Continue</Button>
        </div>

        <p>
          New to PaperLive? <Link to='/register'>Sign Up</Link>
        </p>
      </WrapperCo>
      <p>
        By creating an account, you agree to the <Link to='/login'>Terms of Service</Link>. For more
        information <br /> about PaperLive’s privacy practices, see the
        <Link to='/login'> PaperLive Privacy Statement</Link>.
      </p>
    </Container>
  );
};

export default SignIn;
