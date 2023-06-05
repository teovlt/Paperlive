import React, { useEffect, useState } from 'react';
import NavBar from '../../../components/Navbar';
import { Heading2 } from '../../../theme/appElements';
import { useTranslation } from 'react-i18next';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
import FormStep3 from './FormStep3';
import FormStep4 from './FormStep4';
import FormStep5 from './FormStep5';

import {
  Container,
  FormNavigation,
  Main,
  MainHeader,
  NavLink,
  SideHeader,
  Sidebar,
  StepCaption,
} from '../../Contributions/contributionsElements';

const NewSubmission = () => {
  const { t } = useTranslation();

  const [step, setStep] = useState(2);
  const [errorMsg, setErrorMsg] = useState('');
  const [submissionData, setSubmissionData] = useState({
    title: '',
    submissionDate: '',
    abstract: '',
    zipFolder: '',
    compiledPDF: '',
    diffPDF: '',
    commentsPDF: '',
    authors: [],
    venue: '',
    type: '',
    state: '',
  });

  useEffect(() => {
    setErrorMsg('');
  }, [submissionData, step, t]);

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
      title: t('contribution.informations'),
      content: (
        <FormStep1
          submissionData={submissionData}
          setSubmissionData={setSubmissionData}
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
          submissionData={submissionData}
          setSubmissionData={setSubmissionData}
          next={next}
          previous={previous}
        />
      ),
    },
    {
      title: t('submission.authors'),
      content: (
        <FormStep3
          submissionData={submissionData}
          setSubmissionData={setSubmissionData}
          next={next}
          previous={previous}
        />
      ),
    },
    {
      title: t('submission.venue'),
      content: (
        <FormStep4
          submissionData={submissionData}
          setSubmissionData={setSubmissionData}
          next={next}
          previous={previous}
        />
      ),
    },
    {
      title: t('contribution.recap'),
      content: (
        <FormStep5
          submissionData={submissionData}
          setSubmissionData={setSubmissionData}
          next={next}
          previous={previous}
        />
      ),
    },
  ];

  return (
    <>
      <NavBar />
      <Container>
        <SideHeader>
          <Heading2>{t('submission.newSubmission')}</Heading2>
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

export default NewSubmission;
