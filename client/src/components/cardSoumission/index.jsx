import React from 'react';
import { Container, CardText, CardBottom, Etat } from './cardSoumissionElements';

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
        <span>
          <p>icon</p>
          Expand
        </span>
      </CardBottom>
    </Container>
  );
};

export default CardContribution;
