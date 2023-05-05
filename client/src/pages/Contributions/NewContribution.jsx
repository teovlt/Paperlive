import React, { useState } from 'react';
import NavBar from '../../components/Navbar';
import Input from '../../components/Input';
import { Heading2, HorizontalDivider } from '../../theme/appElements';
import {
  Container,
  FormNavigation,
  Main,
  NavLink,
  Sidebar,
  StepCaption,
} from './contributionsElements';

const NewContribution = () => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: 'Informations',
      content: (
        <>
          <Input small label='Title' id='title' autoComplete='off' />
          <Input small type='date' label='Start Date' id='date' autoComplete='off' />
          <Input small label='Related Contribution' id='related' autoComplete='off' />
        </>
      ),
    },
    {
      title: 'Files',
      content: (
        <>
          <p>Hello</p>
        </>
      ),
    },
    {
      title: 'Recap',
      content: (
        <>
          <p>Hello</p>
        </>
      ),
    },
  ];

  const next = () => {
    setStep((prev) => {
      if (prev < steps.length - 1) return prev + 1;
      else return prev;
    });
  };

  const previous = () => {
    setStep((prev) => {
      if (prev > 0) return prev - 1;
      else return prev;
    });
  };

  const goTo = (index) => {
    if (index >= 0 && index < steps.length) setStep(index);
  };

  return (
    <>
      <NavBar />
      <Container>
        <Sidebar>
          <Heading2>New Contribution</Heading2>
          <HorizontalDivider />
          <FormNavigation>
            {steps.map((c, index) => (
              <NavLink className={`${step === index && 'active'}`} onClick={() => goTo(index)}>
                {c.title}
              </NavLink>
            ))}
          </FormNavigation>
        </Sidebar>
        <Main>
          <Heading2>Informations</Heading2>
          <HorizontalDivider />
          <StepCaption>
            Step {step + 1}/{steps.length}
          </StepCaption>
          {steps[step].content}
        </Main>
      </Container>
    </>
  );
};

export default NewContribution;
