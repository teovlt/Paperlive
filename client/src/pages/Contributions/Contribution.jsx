import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import {
  Container,
  MainSection,
  NavLink,
  Navigation,
} from '../../components/Layout/layoutElements';
import NavBar from '../../components/Navbar';
import {
  HiOutlineBookOpen,
  HiOutlineChartPie,
  HiOutlineNewspaper,
  HiChevronDown,
} from 'react-icons/hi2';
import { Sidebar, Table, DivTable, DivInfos } from './contributionsElements';
import { useTranslation } from 'react-i18next';
import { Button } from '../../theme/appElements';

const Contribution = () => {
  const { contributionId } = useParams();
  const { auth } = useAuth();

  const { t } = useTranslation();

  const [contribution, setContribution] = useState();

  useEffect(() => {
    if (auth.contributions) {
      setContribution(
        auth.contributions.find((contribution) => contribution._id === contributionId)
      );
    }
  }, [auth]);

  return (
    <>
      <NavBar />
      <Container>
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
          <h2>Actions</h2>
          <Button secondary onClick={() => console.log('stats')}>
            See the statistics
          </Button>
          <Button secondary onClick={() => console.log('edit')}>
            Edit this contribution
          </Button>
          <Button secondary type='negative' onClick={() => console.log('delete')}>
            Delete this contribution
          </Button>
        </Sidebar>
        <MainSection>
          <DivTable>
            <h3>Informations</h3>
            <DivInfos>
              <span>Titre: {contribution?.title}</span>
              <span>Date: {contribution?.startDate}</span>
            </DivInfos>
            <DivInfos>
              <span>Role: {contribution?.teamRole}</span>
              <span> {contribution?.relatedContribution ?? `Aucun contributions en lien avec celle-ci`}</span>
            </DivInfos>
            <DivInfos>
              <span>Abstract: {contribution?.abstract}</span>
              <span>Etat:  {contribution?.state}</span>
            </DivInfos>
          </DivTable>
          <DivTable>
            <h3>Tableau des soumissions de cette contribution</h3>
            <Table>
              <thead>
                <tr>
                  <th /*onClick={handleSortOrderChange}*/>
                    {t('contribution.titleTable')}
                    <HiChevronDown />
                  </th>
                  <th /*onClick={handleSortDateChange}*/>
                    {t('contribution.date')}
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
        </MainSection>
      </Container>
    </>
  );
};

export default Contribution;
