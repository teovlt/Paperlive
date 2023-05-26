import React, { useEffect, useState, useRef } from 'react';
import useAuth from '../../hooks/useAuth';
import { Container, NavLink, Navigation } from '../../components/Layout/layoutElements';
import NavBar from '../../components/Navbar';
import {
  HiOutlineBookOpen,
  HiOutlineChartPie,
  HiOutlineNewspaper,
  HiOutlineTrash,
  HiOutlineArrowLeft,
} from 'react-icons/hi2';
import {
  Sidebar,
  ContributionInfosContainer,
  ContributionInfo,
  ContributionInfosLineWrapper,
  Label,
  Value,
  Table,
  TableCell,
  TableHead,
  TableFoot,
  TableRow,
  TableCellButton,
  Group,
  RelatedContributionLink,
  DivSectionContribution,
} from '../Contributions/contributionsElements';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, IconLink, Heading2, Link, Heading3 } from '../../theme/appElements';
import { useNavigate } from 'react-router-dom';
import { useConfirm } from '../../context/ConfirmContext';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import ChipsState from '../../components/ChipsState';

const Submission = () => {
  const { submissionId } = useParams();
  const { auth, setAuth } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [submission, setSubmission] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const { confirm } = useConfirm();

  const notifySave = () => {
    toast.success(t('toast.contributionUpdatedSuccess'), {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const notifyDelete = () => {
    toast.success(t('toast.contributionDeletedSuccess'), {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  useEffect(() => {
    setSubmission(
      auth.contributions
        ?.find((contribution) =>
          contribution.submissions?.find((submission) => submission._id.toString() === submissionId)
        )
        .submissions?.find((submission) => submission._id.toString() === submissionId)
    );
  }, [submissionId]);

  const handleConfirmation = async () => {};

  async function handleSaveChanges() {}

  function handleCancelChanges() {}

  const handleDownload = async (e) => {};

  return (
    <>
      <NavBar />
      <Container>
        {!isEditing ? (
          <IconLink onClick={() => navigate(-1)}>
            <HiOutlineArrowLeft /> {t('global.back')}
          </IconLink>
        ) : (
          <IconLink onClick={() => setIsEditing(false)}>
            <HiOutlineArrowLeft /> {t('global.back')}
          </IconLink>
        )}
        <Navigation>
          <NavLink to='/'>
            <HiOutlineBookOpen />
            {t('layout.overview')}
          </NavLink>
          <NavLink to='/contributions'>
            <HiOutlineNewspaper />
            {t('global.contributions')}
          </NavLink>
          <NavLink to='/statistics'>
            <HiOutlineChartPie />
            {t('layout.statistics')}
          </NavLink>
        </Navigation>
        <Sidebar>
          <Heading2>{t('contribution.actions')}</Heading2>

          <Button secondary onClick={() => console.log('stats')}>
            {t('contribution.stats')}
          </Button>
          {!isEditing && (
            <Button secondary onClick={() => setIsEditing(true)}>
              edit the submission
            </Button>
          )}
          <Button
            secondary
            type='negative'
            onClick={handleConfirmation}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              columnGap: '8px',
            }}>
            supprimer la submission
            <HiOutlineTrash />
          </Button>
        </Sidebar>
        <ContributionInfosContainer style={{ rowGap: '56px' }}>
          {!isEditing ? (
            <>
              <DivSectionContribution>
                <Heading2>{t('contribution.informations')}</Heading2>
                <ContributionInfo>
                  <Label> {t('contribution.title')}</Label>
                  <Value>{submission?.title}</Value>
                </ContributionInfo>
                <ContributionInfo>
                  <Label>{t('global.contribution')}</Label>
                  {/* <Value>
                    {contribution?.relatedContributions.length > 0
                      ? contribution?.relatedContributions.map((c, index) => (
                          <RelatedContributionLink key={index} to={`/contributions/${c._id}`}>
                            <abbr title={c.title}>{c.title}</abbr>
                          </RelatedContributionLink>
                        ))
                      : '-'}
                  </Value> */}
                </ContributionInfo>
                <ContributionInfosLineWrapper>
                  <ContributionInfo>
                    <Label> {t('submission.date')}</Label>
                    <Value>
                      {new Intl.DateTimeFormat(i18n.language, {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      }).format(new Date(submission?.submissionDate ?? 0))}
                    </Value>
                  </ContributionInfo>
                  <ContributionInfo>
                    <Label>{t('submission.type')}</Label>
                    <Value>{t(`submission.${submission?.type}`)}</Value>
                  </ContributionInfo>
                </ContributionInfosLineWrapper>
                <ContributionInfosLineWrapper>
                  <ContributionInfo>
                    <Label>Abstract</Label>
                    <Link onClick={handleDownload}>{t('global.download')}</Link>
                  </ContributionInfo>
                  <ContributionInfo>
                    <Label> {t('submission.state')}</Label>
                    <Value>
                      <ChipsState type='neutral'>{t(`submission.${submission?.state}`)}</ChipsState>
                    </Value>
                  </ContributionInfo>
                </ContributionInfosLineWrapper>
              </DivSectionContribution>
              <DivSectionContribution>
                <Heading2>{t('contribution.files')}</Heading2>
                <ContributionInfo>
                  <Label>{t('submission.abstract')}</Label>
                  <Link onClick={handleDownload}>{t('global.download')}</Link>
                </ContributionInfo>
                <ContributionInfo>
                  <Label>{t('submission.zipFolder')}</Label>
                  <Link onClick={handleDownload}>{t('global.download')}</Link>
                </ContributionInfo>
                <ContributionInfo>
                  <Label>{t('submission.compiledPDF')}</Label>
                  <Link onClick={handleDownload}>{t('global.download')}</Link>
                </ContributionInfo>
                <ContributionInfo>
                  <Label>{t('submission.diffPDF')}</Label>
                  <Link onClick={handleDownload}>{t('global.download')}</Link>
                </ContributionInfo>
                <ContributionInfo>
                  <Label>{t('submission.commentsPDF')}</Label>
                  <Link onClick={handleDownload}>{t('global.download')}</Link>
                </ContributionInfo>
              </DivSectionContribution>
            </>
          ) : (
            <>
              <p>en mode edit</p>
            </>
          )}
        </ContributionInfosContainer>
      </Container>
    </>
  );
};

export default Submission;
