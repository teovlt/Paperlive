import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Container, NavLink, Navigation } from '../../components/Layout/layoutElements';
import NavBar from '../../components/Navbar';
import {
  HiOutlineBookOpen,
  HiOutlineChartPie,
  HiOutlineNewspaper,
  HiChevronDown,
  HiOutlineTrash,
  HiOutlineArrowLeft,
} from 'react-icons/hi2';
import {
  Sidebar,
  Table,
  DivTable,
  DivInfos,
  SectionContribution,
  Span,
  Link,
} from './contributionsElements';
import { useTranslation } from 'react-i18next';
import { Button, Paragraph, IconLink, Heading2 } from '../../theme/appElements';
import { useNavigate } from 'react-router-dom';
import Popup from '../../components/Popup';

const Contribution = () => {
  const { contributionId } = useParams();
  const { auth } = useAuth();

  const { t } = useTranslation();

  const [contribution, setContribution] = useState();
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    if (auth.contributions) {
      setContribution(
        auth.contributions.find((contribution) => contribution._id === contributionId)
      );
    }
  }, [auth]);

  function handleDelete() {
    setPopup(true);
  }

  return (
    <>
      {popup ? (
        <Popup
          template={
            ({
              title: 'Voulez vous vraiment supprimer cette contribution',
              caption:
                "Cette action est irréversible, une fois la contribution actuelle supprimé il n'existeras aucun moyen de la récupérer. Soyez sur de votre action",
                cancelLabel: 'Annuler',
                confirmLabel: 'Supprimer',
            }
            )
          }
        />
      ) : (
        <>
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
            <SectionContribution>
              <DivTable>
                <Heading2>Informations</Heading2>
                <DivInfos>
                  <Span>
                    <Paragraph> {t('contribution.title')}:</Paragraph>
                    {contribution?.title}
                  </Span>
                </DivInfos>
                <DivInfos>
                  <Span>
                    {contribution?.relatedContribution ? (
                      <>
                        <Paragraph>{t('contribution.related2')}:</Paragraph>
                        {contribution?.relatedContribution}
                      </>
                    ) : (
                      t('contribution.noRelated')
                    )}
                  </Span>
                </DivInfos>
                <DivInfos>
                  <Span>
                    <Paragraph>Date:</Paragraph>
                    {contribution?.startDate}
                  </Span>
                  <Span>
                    <Paragraph>Role:</Paragraph>
                    {contribution?.teamRole === 'leader'
                      ? t('contribution.leader')
                      : contribution?.teamRole === 'co-leader'
                      ? t('contribution.coLeader')
                      : t('contribution.guest')}
                  </Span>
                </DivInfos>
                <DivInfos>
                  <Span>
                    <Paragraph>Abstract:</Paragraph>
                    <Link onClick={() => console.log('download')}>{t('global.download')}</Link>
                  </Span>
                  <Span>
                    <Paragraph>{t('contribution.state')}:</Paragraph>
                    {contribution?.state}
                  </Span>
                </DivInfos>
              </DivTable>
              <DivTable>
                <Heading2>Tableau des soumissions de cette contribution</Heading2>
                <Table>
                  <thead>
                    <tr>
                      <th /*onClick={handleSortOrderChange}*/>
                        {t('contribution.titleTable')}
                        <HiChevronDown />
                      </th>
                      <th /*onClick={handleSortDateChange}*/>
                        {t('contribution.startDate')}
                        <HiChevronDown />
                      </th>
                      <th /*onClick={handleSortJournalChange}*/>
                        Journal
                        <HiChevronDown />
                      </th>
                      <th>
                        {t('contribution.state')}
                        <HiChevronDown />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>titre soumission</td>
                      <td>date</td>
                      <td>nom du journal</td>
                      <td>etat</td>
                    </tr>
                  </tbody>
                </Table>
              </DivTable>
            </SectionContribution>
          </Container>{' '}
        </>
      )}
    </>
  );
};

export default Contribution;
