import React, { useState } from 'react';
import NavBar from '../../components/Navbar';
import Input from '../../components/Input';
import { Button, Heading2 } from '../../theme/appElements';
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
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import RadioGroup from '../../components/RadioGroup';
import FileInput from '../../components/FileInput';

const NewContribution = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [step, setStep] = useState(1);

  const steps = [
    {
      title: 'Informations',
      content: (
        <>
          <Input small label={t('newContribution.title')} id='title' autoComplete='off' />
          <Input small type='date' label={t('newContribution.date')} id='date' autoComplete='off' />
          <RadioGroup
            name='role'
            template={{
              label: `${t('newContribution.teamRole')}`,
              radios: [
                { label: `${t('newContribution.leader')}`, value: 'leader' },
                { label: `${t('newContribution.coleader')}`, value: 'co-leader' },
                { label: `${t('newContribution.guest')}`, value: 'guest' },
              ],
            }}
          />
          <Input small label={t('newContribution.related')} id='related' autoComplete='off' />
          <LinearContainer>
            <Button style={{ width: '160px' }} type='neutral' onClick={() => navigate('/')}>
              {t('newContribution.cancel')}
            </Button>
            <Button style={{ width: '160px' }} onClick={() => next()}>
              {t('newContribution.next')}
            </Button>
          </LinearContainer>
        </>
      ),
    },
    {
      title: `${t('newContribution.files')}`,
      content: (
        <>
          <FileInput />
          <LinearContainer>
            <Button style={{ width: '160px' }} type='neutral' onClick={() => previous()}>
              {t('newContribution.previous')}
            </Button>
            <Button style={{ width: '160px' }} onClick={() => next()}>
              {t('newContribution.next')}
            </Button>
          </LinearContainer>
        </>
      ),
    },
    {
      title: `${t('newContribution.recap')}`,
      content: (
        <>
          <LinearContainer>
            <Button style={{ width: '160px' }} type='neutral' onClick={() => previous()}>
              {t('newContribution.previous')}
            </Button>
            <Button style={{ width: '160px' }} onClick={() => save()}>
              {t('newContribution.save')}
            </Button>
          </LinearContainer>
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

  const save = () => {
    console.log('saved');
  };

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
            {t('newContribution.step')} {step + 1}/{steps.length}
          </StepCaption>
          {steps[step].content}
        </Main>
      </Container>
    </>
  );
};

export default NewContribution;
