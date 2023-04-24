import React from 'react';
import { Container } from './signUpElements';
import { WrapperCo, Button, Link } from '../../theme/appElements';
import Input from '../../components/input';

const SignUp = () => {
  return (
    <Container>
      <h1>PaperLive</h1>
      <WrapperCo>
        <h2>Create your account</h2>
        <div>
          <Input type={'text'} placeholder={'TeamName'} />
          <Button>Continue</Button>
        </div>

        <p>
          Already have an account? <Link to='/login'>Log in</Link>
        </p>
      </WrapperCo>
      <p>
        By creating an account, you agree to the <Link to='/register'>Terms of Service</Link>. For
        more information <br /> about PaperLive’s privacy practices, see the
        <Link to='/register'> PaperLive Privacy Statement</Link>.
      </p>
    </Container>
  );
};

export default SignUp;
