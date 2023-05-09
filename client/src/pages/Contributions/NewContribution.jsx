import React, { useState } from 'react';
import NavBar from '../../components/Navbar';
import Input from '../../components/Input';
import { Button, Heading2, HorizontalDivider } from '../../theme/appElements';
import {
  Container,
  FormNavigation,
  LinearContainer,
  Main,
  MainHeader,
  NavLink,
  SideHeader,
  Sidebar,
  StepCaption,
} from './contributionsElements';
import {useTranslation} from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import RadioGroup from '../../components/RadioGroup';
import FileInput from '../../components/FileInput';

const NewContribution = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const steps = [
    {
      title: 'Informations',
      content: (
        <>
          <Input small label='Title' id='title' autoComplete='off' />
          <Input small type='date' label='Start Date' id='date' autoComplete='off' />
          <RadioGroup
            name='role'
            template={{
              label: 'Team Role',
              radios: [
                { label: 'Leader', value: 'leader' },
                { label: 'Co-leader', value: 'co-leader' },
                { label: 'Guest', value: 'guest' },
              ],
            }}
          />
          <Input small label='Related Contribution*' id='related' autoComplete='off' />
          <LinearContainer>
            <Button style={{ width: '160px' }} type='neutral' onClick={() => navigate('/')}>
              Cancel
            </Button>
            <Button style={{ width: '160px' }} onClick={() => next()}>
              Next
            </Button>
          </LinearContainer>
        </>
      ),
    },
    {
      title: 'Files',
      content: (
        <>
          <FileInput />
          <LinearContainer>
            <Button style={{ width: '160px' }} type='neutral' onClick={() => previous()}>
              Previous
            </Button>
            <Button style={{ width: '160px' }} onClick={() => next()}>
              Next
            </Button>
          </LinearContainer>
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
  const t = useTranslation();

  return (
    <>
      <NavBar />
      <Container>
        <SideHeader>
          <Heading2>New Contribution</Heading2>
        </SideHeader>
        <Sidebar>
          <FormNavigation>
            {steps.map((c, index) => (
              <NavLink
                key={index}
                className={`${step === index && 'active'}`}
                onClick={() => goTo(index)}>
                {c.title}
              </NavLink>
            ))}
          </FormNavigation>
        </Sidebar>
        <MainHeader>
          <Heading2>{steps[step].title}</Heading2>
        </MainHeader>
        <Main>
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
