import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
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
  RelatedContributionSearchContainer,
  RelatedContributionSearchResult,
  RelatedContributionSearchResultContainer,
} from './contributionsElements';
import { useTranslation } from 'react-i18next';
import { Button, IconLink, Heading2, Link, Heading3 } from '../../theme/appElements';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Popup from '../../components/Popup';
import Input from '../../components/Input';
import RadioGroup from '../../components/RadioGroup';
import FileInput from '../../components/FileInput';
import useSearch from '../../hooks/useSearch';

const Contribution = () => {
  const { contributionId } = useParams();
  const { auth } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const searchRelatedContributionRef = useRef(null);
  const search = useSearch();

  const [contribution, setContribution] = useState(
    auth.contributions.find((c) => c._id === contributionId)
  );
  const [isFocused, setIsFocused] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [searchResult, setSearchResult] = useState();

  function handleDelete() {
    setPopup(true);
  }

  useEffect(() => {
    setSearchResult(auth.contributions);
  }, [auth]);

  useEffect(() => {
    setSearchResult(search(contribution.relatedContribution, auth.contributions, 'title'));
  }, [contribution.relatedContribution]);

  async function handleSaveChanges() {
    setIsEditing(false);
    const updatedContributionData = { ...contribution };

    await axiosPrivate.put(`/contributions/update/${contributionId}`, {
      ...updatedContributionData,
    });
    setContribution((prev) => ({ ...prev, ...updatedContributionData }));
  }

  function handleCancelChanges() {
    setIsEditing(false);
    setContribution(auth.contributions.find((c) => c._id === contributionId));
  }

  const handleDownload = async (e) => {
    e.preventDefault();
    const res = await axiosPrivate.get(
      `${import.meta.env.VITE_API_URI}/api/files/${contribution.abstract}`,
      { responseType: 'blob' }
    );
    console.log(res.headers['content-disposition']);
    const url = URL.createObjectURL(res.data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', contribution.abstract);
    link.click();
  };

  return (
    <>
      {/* {popup && (
        <Popup
          template={{
            title: 'Voulez vous vraiment supprimer cette contribution',
            caption:
              "Cette action est irréversible, une fois la contribution actuelle supprimé il n'existeras aucun moyen de la récupérer. Soyez sur de votre action",
            cancelLabel: 'Annuler',
            confirmLabel: 'Supprimer',
          }}
        />
      )} */}
      <NavBar />
      <Container>
        <IconLink onClick={() => navigate(-1)}>
          <HiOutlineArrowLeft /> {t('global.back')}
        </IconLink>
        <Navigation>
          <NavLink to='/'>
            <HiOutlineBookOpen />
            {t('layout.overview')}
          </NavLink>
          <NavLink to='/contributions'>
            <HiOutlineNewspaper />
            {t('layout.contributions')}
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
            onClick={handleDelete}
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
                <Value>{contribution.title}</Value>
              </ContributionInfo>
              <ContributionInfo>
                <Label> {t('contribution.related2')}</Label>
                <Value>{contribution.relatedContribution || '-'}</Value>
              </ContributionInfo>
              <ContributionInfosLineWrapper>
                <ContributionInfo>
                  <Label> {t('contribution.startDate')}</Label>
                  <Value>
                    {new Intl.DateTimeFormat(i18n.language, {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                    }).format(new Date(contribution.startDate))}
                  </Value>
                </ContributionInfo>
                <ContributionInfo>
                  <Label>Role</Label>
                  <Value>{t(`contribution.${contribution.teamRole}`)}</Value>
                </ContributionInfo>
              </ContributionInfosLineWrapper>
              <ContributionInfosLineWrapper>
                <ContributionInfo>
                  <Label>Abstract</Label>
                  <Link onClick={handleDownload}>{t('global.download')}</Link>
                </ContributionInfo>
                <ContributionInfo>
                  <Label> {t('contribution.state')}</Label>
                  <Value>{t(`contribution.${contribution.state}`)}</Value>
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
              <RelatedContributionSearchContainer>
                <Input
                  small
                  id='related'
                  value={contribution?.relatedContribution}
                  label={`${t('contribution.related')}*`}
                  ref={searchRelatedContributionRef}
                  autoComplete='off'
                  onChange={(event) => {
                    const newContributionData = {
                      ...contribution,
                      relatedContribution: event.target.value,
                    };
                    setContribution(newContributionData);
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
                {isFocused && searchResult?.length > 0 && (
                  <RelatedContributionSearchResultContainer className='open'>
                    {searchResult.map((result, index) => (
                      <RelatedContributionSearchResult
                        key={index}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          const newContributionData = {
                            ...contribution,
                            relatedContribution: result.title,
                          };
                          setContribution(newContributionData);
                          searchRelatedContributionRef.current.blur();
                        }}>
                        {result.title}
                      </RelatedContributionSearchResult>
                    ))}
                  </RelatedContributionSearchResultContainer>
                )}
              </RelatedContributionSearchContainer>

              <Group inline>
                <Button secondary onClick={handleCancelChanges} style={{ width: '100%' }}>
                  {t('global.cancel')}
                </Button>
                <Button secondary onClick={handleSaveChanges} style={{ width: '100%' }}>
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
