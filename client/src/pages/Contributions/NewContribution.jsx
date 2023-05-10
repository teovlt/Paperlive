import React, { useEffect, useState } from 'react';
import NavBar from '../../components/Navbar';
import Input from '../../components/Input';
import { Button, Heading2, Heading3, Label } from '../../theme/appElements';
import {
  Container,
  ErrorLabel,
  FormNavigation,
  LinearContainer,
  Link,
  Main,
  MainHeader,
  MainWrapper,
  NavLink,
  SideHeader,
  Sidebar,
  StepCaption,
} from './contributionsElements';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import RadioGroup from '../../components/RadioGroup';
import FileInput from '../../components/FileInput';
import { HiExclamationCircle, HiOutlineExclamationCircle } from 'react-icons/hi2';

const NewContribution = () => {
  const navigate = useNavigate();
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
  }, [contributionData, step]);

  const steps = [
    {
      title: 'Informations',
      content: (
        <>
          <Input
            small
            id='title'
            value={contributionData?.title}
            label={t('newContribution.title')}
            autoComplete='off'
            onChange={(event) => {
              const newContributionData = { ...contributionData, title: event.target.value };
              setContributionData(newContributionData);
            }}
          />
          <Input
            small
            id='date'
            type='date'
            value={contributionData?.startDate}
            label={t('newContribution.date')}
            autoComplete='off'
            onChange={(event) => {
              const newContributionData = { ...contributionData, startDate: event.target.value };
              setContributionData(newContributionData);
            }}
          />
          <RadioGroup
            name='role'
            onChange={(event) => {
              const newContributionData = { ...contributionData, teamRole: event.target.value };
              setContributionData(newContributionData);
            }}
            template={{
              label: `${t('newContribution.teamRole')}`,
              radios: [
                {
                  label: `${t('newContribution.leader')}`,
                  value: 'leader',
                  defaultChecked: contributionData?.teamRole === 'leader',
                },
                {
                  label: `${t('newContribution.coleader')}`,
                  value: 'co-leader',
                  defaultChecked: contributionData?.teamRole === 'co-leader',
                },
                {
                  label: `${t('newContribution.guest')}`,
                  value: 'guest',
                  defaultChecked: contributionData?.teamRole === 'guest',
                },
              ],
            }}
          />
          <Input
            small
            id='related'
            value={contributionData?.relatedContribution}
            label={t('newContribution.related')}
            autoComplete='off'
            onChange={(event) => {
              const newContributionData = {
                ...contributionData,
                relatedContribution: event.target.value,
              };
              setContributionData(newContributionData);
            }}
          />
          {errorMsg && (
            <ErrorLabel>
              <HiOutlineExclamationCircle />
              {errorMsg}
            </ErrorLabel>
          )}
          <LinearContainer>
            <Button style={{ width: '160px' }} type='neutral' onClick={() => navigate('/')}>
              {t('newContribution.cancel')}
            </Button>
            <Button
              style={{ width: '160px' }}
              onClick={() => {
                const missings = Object.keys(contributionData).filter(
                  (key) =>
                    key !== 'filename' &&
                    key !== 'relatedContribution' &&
                    contributionData[key] === ''
                );
                if (missings.length <= 0) {
                  next();
                } else {
                  const errorMsg = `Please fill in the following field(s): ${missings
                    .map((key) => {
                      switch (key) {
                        case 'title':
                          return 'title';
                        case 'startDate':
                          return 'start date';
                        case 'teamRole':
                          return 'team role';
                        case 'filename':
                          return 'abstract';
                      }
                    })
                    .join(', ')}`;
                  setErrorMsg(errorMsg);
                }
              }}>
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
          <Heading3>Abstract</Heading3>
          <FileInput
            name='abstract'
            file={contributionData.filename}
            endpoint='/contributions/abstract'
            onChange={(file) => setContributionData((prev) => ({ ...prev, filename: file?.name }))}
          />
          {errorMsg && (
            <ErrorLabel>
              <HiOutlineExclamationCircle />
              {errorMsg}
            </ErrorLabel>
          )}
          <LinearContainer>
            <Button style={{ width: '160px' }} type='neutral' onClick={() => previous()}>
              {t('newContribution.previous')}
            </Button>
            <Button
              style={{ width: '160px' }}
              onClick={() => {
                const missings = Object.keys(contributionData).filter(
                  (key) => key === 'filename' && contributionData[key] === ''
                );
                if (missings.length <= 0) {
                  next();
                } else {
                  const errorMsg = `Please fill in the following field(s): abstract file`;
                  setErrorMsg(errorMsg);
                }
              }}>
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
          <MainWrapper>
            <Heading3>Informations</Heading3>
            <Label>
              Title:<span>{contributionData.title}</span>
            </Label>
            <Label>
              Start date:<span>{contributionData.startDate}</span>
            </Label>
            <Label>
              Team role:<span>{contributionData.teamRole}</span>
            </Label>
            <Label>
              Related contribution*:<span>{contributionData.relatedContribution}</span>
            </Label>
            <Link onClick={() => goTo(0)}>Edit this section</Link>
          </MainWrapper>
          <MainWrapper>
            <Heading3>Files</Heading3>
            <Label>
              Abstract:<span>{contributionData.filename}</span>
            </Label>
            <Link onClick={() => goTo(1)}>Edit this section</Link>
          </MainWrapper>
          {errorMsg && (
            <ErrorLabel>
              <HiOutlineExclamationCircle />
              {errorMsg}
            </ErrorLabel>
          )}
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
    setStep((prev) => {
      if (index >= 0 && index < steps.length) return index;
      else return prev;
    });
  };

  const save = async () => {
    if (
      !Object.keys(contributionData)
        .filter((key) => key !== 'relatedContribution')
        .every((key) => contributionData[key] !== '')
    ) {
      console.error('missing fields');
      return;
    }

    const { filename, ...contributionDataWithoutFilename } = contributionData;
    await axiosPrivate.post('/contributions/new', contributionDataWithoutFilename);
    navigate('/contributions');
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
            {t('newContribution.step')} {step + 1}/{steps.length}
          </StepCaption>
          {steps[step].content}
        </Main>
      </Container>
    </>
  );
};

export default NewContribution;
