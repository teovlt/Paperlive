import React, { useEffect, useState } from 'react';
import NavBar from '../../../components/Navbar';
import { Heading2 } from '../../../theme/appElements';
import {
  Container,
  FormNavigation,
  Main,
  MainHeader,
  NavLink,
  SideHeader,
  Sidebar,
  StepCaption,
} from '../contributionsElements';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useTranslation } from 'react-i18next';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
import FormStep3 from './FormStep3';

const NewContributionForm = () => {
  const { t } = useTranslation();
  const axiosPrivate = useAxiosPrivate();

  const [step, setStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [contributionData, setContributionData] = useState({
    title: '',
    startDate: '',
    teamRole: '',
    relatedContribution: '',
    filename: '',
  });

  useEffect(() => {
    setErrorMsg('');
  }, [contributionData, step, t]);

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
    setStep((prev) => {
      if (index >= 0 && index < steps.length) return index;
      else return prev;
    });
  };

  const steps = [
    {
      title: 'Informations',
      content: (
        <FormStep1
          contributionData={contributionData}
          setContributionData={setContributionData}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
          next={next}
        />
      ),
    },
    {
      title: t('contribution.files'),
      content: (
        <FormStep2
          contributionData={contributionData}
          setContributionData={setContributionData}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
          next={next}
          previous={previous}
        />
      ),
    },
    {
      title: t('contribution.recap'),
      content: (
        <FormStep3
          contributionData={contributionData}
          errorMsg={errorMsg}
          previous={previous}
          goTo={goTo}
        />
      ),
    },
  ];

  return (
    <>
      <NavBar />
      <Container>
        <SideHeader>
          <Heading2>{t('contribution.newContribution')}</Heading2>
        </SideHeader>
        <Sidebar>
          <FormNavigation>
            {steps.map((c, index) => (
              <NavLink key={index} className={`${step === index && 'active'}`}>
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
            {t('contribution.step')} {step + 1}/{steps.length}
          </StepCaption>
          {steps[step].content}
        </Main>
      </Container>
    </>
  );
};

export default NewContributionForm;
