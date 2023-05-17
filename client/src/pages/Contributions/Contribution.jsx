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
} from './contributionsElements';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, IconLink, Heading2, Link, Heading3 } from '../../theme/appElements';
import { useNavigate } from 'react-router-dom';
import { useConfirm } from '../../context/ConfirmContext';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Input from '../../components/Input';
import RadioGroup from '../../components/RadioGroup';
import FileInput from '../../components/FileInput';
import Selector from '../../components/Selector';

const Contribution = () => {
  const { contributionId } = useParams();
  const { auth, setAuth } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [contribution, setContribution] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const { confirm } = useConfirm();

  useEffect(() => {
    setContribution(auth.contributions?.find((c) => c._id === contributionId));
  }, [contributionId]);

  const handleConfirmation = async () => {
    const confirmed = await confirm({
      title: `${t('contribution.suppTitle')}`,
      caption: `${t('contribution.suppCaption')}`,
      cancelLabel: `${t('global.cancel')}`,
      confirmLabel: `${t('global.confirm')}`,
    });

    if (confirmed) {
      await axiosPrivate.delete(`/contributions/delete/${contributionId}`, {
        ...contribution,
      });
      const updatedContributions = auth.contributions.filter((c) => c._id !== contributionId);
      setAuth((prev) => ({ ...prev, contributions: updatedContributions }));
      navigate('/contributions');
    }
  };

  async function handleSaveChanges() {
    setIsEditing(false);

    await axiosPrivate.put(`/contributions/update/${contributionId}`, {
      ...contribution,
    });
    const updatedContributions = auth.contributions.filter((c) => c._id !== contributionId);
    updatedContributions.push(contribution);
    setAuth((prev) => ({ ...prev, contributions: updatedContributions }));
  }

  function handleCancelChanges() {
    setIsEditing(false);
    setContribution(auth.contributions.find((c) => c._id === contributionId));
  }

  const handleDownload = async (e) => {
    e.preventDefault();
    const res = await axiosPrivate.get(
      `${import.meta.env.VITE_API_URI}/api/files/${contribution?.abstract}`,
      { responseType: 'blob' }
    );

    const url = URL.createObjectURL(res.data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', contribution?.abstract);
    link.click();
  };

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
          <Heading2>Actions</Heading2>

          <Button secondary onClick={() => console.log('stats')}>
            {t('contribution.stats')}
          </Button>
          {!isEditing && (
            <Button secondary onClick={() => setIsEditing(true)}>
              {t('contribution.editContribution')}
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
            {t('contribution.delete')}
            <HiOutlineTrash />
          </Button>
        </Sidebar>
        <ContributionInfosContainer>
          <Heading2>Informations</Heading2>
          {!isEditing ? (
            <>
              <ContributionInfo>
                <Label> {t('contribution.title')}</Label>
                <Value>{contribution?.title}</Value>
              </ContributionInfo>
              <ContributionInfo>
                <Label> {t('contribution.related2')}</Label>
                {contribution?.relatedContributions.length > 0 ? (
                  <Value>
                    {contribution.relatedContributions.map((c, index) => (
                      <React.Fragment key={index}>
                        <Link to={`/contributions/${c._id}`}>{c.title}</Link>
                        {index != contribution.relatedContributions.length - 1 && ', '}
                      </React.Fragment>
                    ))}
                  </Value>
                ) : (
                  '-'
                )}
              </ContributionInfo>
              <ContributionInfosLineWrapper>
                <ContributionInfo>
                  <Label> {t('contribution.startDate')}</Label>
                  <Value>
                    {new Intl.DateTimeFormat(i18n.language, {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                    }).format(new Date(contribution?.startDate ?? 0))}
                  </Value>
                </ContributionInfo>
                <ContributionInfo>
                  <Label>Role</Label>
                  <Value>{t(`contribution.${contribution?.teamRole}`)}</Value>
                </ContributionInfo>
              </ContributionInfosLineWrapper>
              <ContributionInfosLineWrapper>
                <ContributionInfo>
                  <Label>Abstract</Label>
                  <Link onClick={handleDownload}>{t('global.download')}</Link>
                </ContributionInfo>
                <ContributionInfo>
                  <Label> {t('contribution.state')}</Label>
                  <Value>{t(`contribution.${contribution?.state}`)}</Value>
                </ContributionInfo>
              </ContributionInfosLineWrapper>
              <Heading2>{t('global.submission')}s</Heading2>

              <Table>
                <thead>
                  <TableHead>
                    <TableCell>Title</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Venue</TableCell>
                  </TableHead>
                </thead>
                <tbody>
                  {false ? (
                    <h1>hého</h1>
                  ) : (
                    <TableRow onClick={() => navigate('/contributions/new')}>
                      <TableCellButton>+ {t('submission.newSubmission')}</TableCellButton>
                    </TableRow>
                  )}
                </tbody>
                <tfoot>
                  <TableFoot>
                    <TableCell>
                      Count: <span>0</span>
                    </TableCell>
                  </TableFoot>
                </tfoot>
              </Table>
            </>
          ) : (
            <>
              <Input
                small
                id='title'
                value={contribution?.title}
                label={t('contribution.title')}
                autoComplete='off'
                onChange={(e) => {
                  const newContributionData = { ...contribution, title: e.target.value };
                  setContribution(newContributionData);
                }}
              />
              <Input
                small
                id='date'
                type='date'
                value={contribution?.startDate}
                label={t('contribution.startDate')}
                autoComplete='off'
                onChange={(event) => {
                  const newContributionData = {
                    ...contribution,
                    startDate: event.target.value,
                  };
                  setContribution(newContributionData);
                }}
              />
              <RadioGroup
                name='role'
                onChange={(event) => {
                  const newContributionData = { ...contribution, teamRole: event.target.value };
                  setContribution(newContributionData);
                }}
                template={{
                  label: t('contribution.teamRole'),
                  radios: [
                    {
                      label: t('contribution.leader'),
                      value: 'leader',
                      defaultChecked: contribution?.teamRole === 'leader',
                    },
                    {
                      label: t('contribution.coLeader'),
                      value: 'coLeader',
                      defaultChecked: contribution?.teamRole === 'coLeader',
                    },
                    {
                      label: t('contribution.guest'),
                      value: 'guest',
                      defaultChecked: contribution?.teamRole === 'guest',
                    },
                  ],
                }}
              />
              <Selector
                list={auth.contributions}
                id='relatedContributions'
                name='relatedContributions'
                label={t('contribution.related2')}
                selected={contribution?.relatedContributions}
                onChange={(list) => {
                  setContribution((prev) => ({
                    ...prev,
                    relatedContributions: list.map((c) => ({ _id: c._idn, title: c.title })),
                  }));
                }}
              />
              <Heading3>Abstract</Heading3>
              <FileInput
                name='abstract'
                file={contribution?.abstract}
                endpoint='files/contribution/abstract'
                onChange={(file) => setFile(file?.name)}
              />

              <Group inline>
                <Button type='neutral' onClick={handleCancelChanges} style={{ width: '100%' }}>
                  {t('global.cancel')}
                </Button>
                <Button type='neutral' onClick={handleSaveChanges} style={{ width: '100%' }}>
                  {t('global.save')}
                </Button>
              </Group>
            </>
          )}
        </ContributionInfosContainer>
      </Container>
    </>
  );
};

export default Contribution;
