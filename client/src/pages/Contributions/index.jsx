import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { HiPlus, HiChevronDown, HiOutlineClock, HiMagnifyingGlass } from 'react-icons/hi2';
import { SectionMain, Btn, Table, DivRecherche } from './contributionsElements';
import { useTranslation } from 'react-i18next';
import { Button } from '../../theme/appElements';

function Contributions() {
  const { t } = useTranslation();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [sortTitle, setSortTitle] = useState(null);
  const [sortDate, setSortDate] = useState('asc');
  const [sortTeamRole, setSortTeamRole] = useState(null);
  const [sortState, setSortState] = useState(null);

  const [results, setResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  function sortContributions() {
    if (sortTitle != null) {
      const sortedContributions = [...auth.contributions].sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (titleA < titleB) {
          return sortTitle === 'asc' ? -1 : 1;
        } else if (titleA > titleB) {
          return sortTitle === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });
      return sortedContributions;
    } else if (sortDate != null) {
      const sortedContributions = [...auth.contributions].sort((a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        if (dateA < dateB) {
          return sortDate === 'asc' ? -1 : 1;
        } else if (dateA > dateB) {
          return sortDate === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });
      return sortedContributions;
    } else if (sortTeamRole != null) {
      const sortedContributions = [...auth.contributions].sort((a, b) => {
        const roleA = a.teamRole.toLowerCase();
        const roleB = b.teamRole.toLowerCase();
        if (roleA === 'leader' && roleB !== 'leader') {
          return sortTeamRole === 'asc' ? -1 : 1;
        } else if (roleA !== 'leader' && roleB === 'leader') {
          return sortTeamRole === 'asc' ? 1 : -1;
        } else if (roleA === 'guest' && roleB === 'co-leader') {
          return sortTeamRole === 'asc' ? 1 : -1;
        } else if (roleA === 'co-leader' && roleB === 'guest') {
          return sortTeamRole === 'asc' ? -1 : 1;
        } else {
          return 0;
        }
      });
      return sortedContributions;
    } else {
      return auth.contributions;
    }
  }

  function handleSortOrderChange() {
    const newSortTitle = sortTitle === 'asc' ? 'desc' : 'asc';
    setSortTitle(newSortTitle);
    setSortDate(null);
    setSortTeamRole(null);
  }
  function handleSortDateChange() {
    const newSortDate = sortDate === 'asc' ? 'desc' : 'asc';
    setSortTitle(null);
    setSortDate(newSortDate);
    setSortTeamRole(null);
  }
  function handleSortRoleChange() {
    const newSortRole = sortTeamRole === 'asc' ? 'desc' : 'asc';
    setSortTitle(null);
    setSortDate(null);
    setSortTeamRole(newSortRole);
  }

  useEffect(() => {
    setSortDate('desc'); // trier par date par défaut lors du chargement de la table
  }, []);

  function handleSearch(e) {
    setSearchTerm(e.target.value.toLowerCase());
    setResults(false);

    for (let i = 0; i < auth.contributions.length; i++) {
      const element = auth.contributions[i].title.toLowerCase();
      if (element.includes(e.target.value.toLowerCase())) {
        setResults(true);
      }
    }
  }

  return (
    <>
      <h2>{auth.contributions?.length} contribution(s)</h2>
      <SectionMain>
        <DivRecherche>
          <input
            type='text'
            placeholder={`${t('contribution.searchBar')}`}
            id='searchBar'
            onChange={handleSearch}
          />
        </DivRecherche>
        <Btn onClick={() => navigate('/contributions/new')}>
          {t('contribution.addContribution')}
          <HiPlus />
        </Btn>{' '}
      </SectionMain>
      <Table>
        <thead>
          <tr>
            <th className='title' onClick={handleSortOrderChange}>
              {t('contribution.titleTable')}
              <HiChevronDown />
            </th>
            <th onClick={handleSortDateChange}>
              {t('contribution.date')}
              <HiChevronDown />
            </th>
            <th onClick={handleSortRoleChange}>
              Role
              <HiChevronDown />
            </th>
            <th>
              {t('contribution.state')}
              <HiChevronDown />
            </th>
          </tr>
        </thead>
        <tbody>
          {auth.contributions?.length > 0
            ? (() => {
                return results
                  ? sortContributions().map((contribution, index) => {
                      const element = contribution.title.toLowerCase();
                      if (element.includes(searchTerm)) {
                        return (
                          <tr className='trBody' key={index}>
                            <td className='title'>{contribution.title}</td>
                            <td className='date'>{contribution.startDate}</td>
                            <td className='role'>{contribution.teamRole}</td>
                            <td className='etat'>
                              {contribution.state}
                              <HiOutlineClock />
                            </td>
                          </tr>
                        );
                      }
                    })
                  : sortContributions().map((contribution, index) => {
                      const element = contribution.title.toLowerCase();
                      if (element.includes(searchTerm)) {
                        return (
                          <tr className='trBody' key={index}>
                            <td className='title'>{contribution.title}</td>
                            <td className='date'>{contribution.startDate}</td>
                            <td className='role'>{contribution.teamRole}</td>
                            <td className='etat'>
                              {contribution.state}
                              <HiOutlineClock />
                            </td>
                          </tr>
                        );
                      }
                    });
              })()
            : null}
        </tbody>
      </Table>
    </>
  );
}

export default Contributions;
