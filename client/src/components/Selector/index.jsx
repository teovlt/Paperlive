import React from 'react';
import { Container, Counter, ResultContainer, Search, Toggler } from './selectorElements';
import { useState } from 'react';

const Selector = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <Toggler onClick={() => setIsOpen((prev) => !prev)} className={`${isOpen && 'open'}`}>
        hello
        <Counter>{props.selected.length}</Counter>
      </Toggler>
      {isOpen && (
        <>
          <Search placeholder='Rechercher...' />
          <ResultContainer></ResultContainer>
        </>
      )}
    </Container>
  );
};

export default Selector;
