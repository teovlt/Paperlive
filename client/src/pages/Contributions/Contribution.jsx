import React, { useEffect, useState } from 'react';
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
} from './contributionsElements';
import { useTranslation } from 'react-i18next';
import { Button, IconLink, Heading2, Link } from '../../theme/appElements';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Popup from '../../components/Popup';

const Contribution = () => {
  const { contributionId } = useParams();
  const { auth } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [contribution, setContribution] = useState(
    auth.contributions.find((c) => c._id === contributionId)
  );
  const [popup, setPopup] = useState(false);

  function handleDelete() {
    setPopup(true);
  }

  const handleDownload = async (e) => {
    e.preventDefault();
    const res = await axiosPrivate.get(
      `${import.meta.env.VITE_API_URI}/api/files/${contribution.abstract}`,
      { responseType: 'blob' }
    );
    const url = URL.createObjectURL(res.data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.pdf');
    link.click();
  };

  return (
    <>
      {popup && (
        <Popup
          template={{
            title: 'Voulez vous vraiment supprimer cette contribution',
            caption:
              "Cette action est irréversible, une fois la contribution actuelle supprimé il n'existeras aucun moyen de la récupérer. Soyez sur de votre action",
            cancelLabel: 'Annuler',
            confirmLabel: 'Supprimer',
          }}
        />
      )}
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
          <Button secondary onClick={() => console.log('edit')}>
            {t('contribution.editContribution')}
          </Button>
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
          <ContributionInfo>
            <Label> {t('contribution.title')}</Label>
            <Value>{contribution.title}</Value>
          </ContributionInfo>
          <ContributionInfo>
            <Label> {t('contribution.related')}</Label>
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
        </ContributionInfosContainer>
      </Container>
    </>
  );
};

export default Contribution;
