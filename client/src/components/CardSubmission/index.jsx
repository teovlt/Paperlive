import React from 'react';
import { Container, CardText, CardBottom, Etat, DivExpand } from './cardSubmissionElements';
import { Button, Heading1 } from '../../theme/appElements';
import { UilClock, UilAngleRightB } from '@iconscout/react-unicons';

const CardContribution = () => {
  return (
    <Container>
      <CardText>
        <Heading1>title</Heading1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore sunt vel voluptatum
          nostrum, veritatis a, neque veniam dolores nulla harum officiis quas ipsam dolorem fugiat
          quos maiores ut facilis iste!
        </p>
      </CardText>
      <CardBottom>
        <Etat>
          <UilClock /> etat
        </Etat>
        <DivExpand>
          <UilAngleRightB className='p1'></UilAngleRightB>
          <Button className='p2'>Expand</Button>
        </DivExpand>
      </CardBottom>
    </Container>
  );
};

export default CardContribution;
