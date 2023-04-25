import React from 'react';
import { Container, CardText, CardBottom, Etat, DivExpand } from './cardSoumissionElements';
import { Button } from '../../theme/appElements';

const CardContribution = () => {
  return (
    <Container>
      <CardText>
        <h2>title</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore sunt vel voluptatum
          nostrum, veritatis a, neque veniam dolores nulla harum officiis quas ipsam dolorem fugiat
          quos maiores ut facilis iste!
        </p>
      </CardText>
      <CardBottom>
        <Etat>
          <p>icon</p> etat
        </Etat>
        <DivExpand>
          <p className='p1'>icon</p>
          <Button className='p2'>Expand</Button>
        </DivExpand>
      </CardBottom>
    </Container>
  );
};

export default CardContribution;
