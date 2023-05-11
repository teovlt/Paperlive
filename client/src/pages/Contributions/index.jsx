import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useSearch from '../../hooks/useSearch';
import { HiChevronDown, HiOutlineClock } from 'react-icons/hi2';
import { SectionMain, Table } from './contributionsElements';
import { useTranslation } from 'react-i18next';
import Input from '../../components/Input';

function Contributions() {
  const { t } = useTranslation();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const search = useSearch();

  const [sort, setSort] = useState({ attr: 'title', direction: 'asc' });

  const [searchResults, setSearchResults] = useState(auth.contributions);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // TODO: Enlever le tri
    setSearchResults(search(searchTerm, auth.contributions, 'title'));
  }, [searchTerm]);

  // function sortContributions() {
  //   if (sortTitle != null) {
  //     const sortedContributions = [...auth.contributions].sort((a, b) => {
  //       const titleA = a.title.toLowerCase();
  //       const titleB = b.title.toLowerCase();
  //       if (titleA < titleB) {
  //         return sortTitle === 'asc' ? -1 : 1;
  //       } else if (titleA > titleB) {
  //         return sortTitle === 'asc' ? 1 : -1;
  //       } else {
  //         return 0;
  //       }
  //     });
  //     return sortedContributions;
  //   } else if (sortDate != null) {
  //     const sortedContributions = [...auth.contributions].sort((a, b) => {
  //       const dateA = new Date(a.startDate);
  //       const dateB = new Date(b.startDate);
  //       if (dateA < dateB) {
  //         return sortDate === 'asc' ? -1 : 1;
  //       } else if (dateA > dateB) {
  //         return sortDate === 'asc' ? 1 : -1;
  //       } else {
  //         return 0;
  //       }
  //     });
  //     return sortedContributions;
  //   } else if (sortTeamRole != null) {
  //     const sortedContributions = [...auth.contributions].sort((a, b) => {
  //       const roleA = a.teamRole.toLowerCase();
  //       const roleB = b.teamRole.toLowerCase();
  //       if (roleA === 'leader' && roleB !== 'leader') {
  //         return sortTeamRole === 'asc' ? -1 : 1;
  //       } else if (roleA !== 'leader' && roleB === 'leader') {
  //         return sortTeamRole === 'asc' ? 1 : -1;
  //       } else if (roleA === 'guest' && roleB === 'co-leader') {
  //         return sortTeamRole === 'asc' ? 1 : -1;
  //       } else if (roleA === 'co-leader' && roleB === 'guest') {
  //         return sortTeamRole === 'asc' ? -1 : 1;
  //       } else {
  //         return 0;
  //       }
  //     });
  //     return sortedContributions;
  //   } else {
  //     return auth.contributions;
  //   }
  // }

  // function handleSortOrderChange() {
  //   const newSortTitle = sortTitle === 'asc' ? 'desc' : 'asc';
  //   setSortTitle(newSortTitle);
  //   setSortDate(null);
  //   setSortTeamRole(null);
  // }
  // function handleSortDateChange() {
  //   const newSortDate = sortDate === 'asc' ? 'desc' : 'asc';
  //   setSortTitle(null);
  //   setSortDate(newSortDate);
  //   setSortTeamRole(null);
  // }
  // function handleSortRoleChange() {
  //   const newSortRole = sortTeamRole === 'asc' ? 'desc' : 'asc';
  //   setSortTitle(null);
  //   setSortDate(null);
  //   setSortTeamRole(newSortRole);
  // }

  // useEffect(() => {
  //   setSortDate('desc'); // trier par date par défaut lors du chargement de la table
  // }, []);

  return (
    <>
      <h2>{auth.contributions?.length} contribution(s)</h2>
      <SectionMain>
        <Input
          small
          name='search'
          label='Search'
          id='searchBar'
          value={searchTerm}
          placeholder={`${t('contribution.searchBar')}`}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoComplete='off'
        />
        {/* <Button onClick={() => navigate('/contributions/new')}>
        {t('contribution.addContribution')}
        <HiPlus />
        </Button> */}
      </SectionMain>
      <Table>
        <thead>
          <tr>
            <th className='title'>
              {t('contribution.titleTable')}
              <HiChevronDown />
            </th>
            <th>
              {t('contribution.date')}
              <HiChevronDown />
            </th>
            <th>
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
          {/* {auth.contributions?.length > 0
            ? (() => {
                return searchResults
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
                          <tr
                            className='trBody'
                            key={index}
                            onClick={() => navigate(`/contributions/${contribution._id}`)}>
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
            : null} */}
          {searchResults?.map((contribution, index) => (
            <tr
              key={index}
              className='trBody'
              onClick={() => navigate(`/contributions/${contribution._id}`)}>
              <td className='title'>{contribution.title}</td>
              <td className='date'>{contribution.startDate}</td>
              <td className='role'>{contribution.teamRole}</td>
              <td className='etat'>
                {contribution.state}
                <HiOutlineClock />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Count: {searchResults.length}</td>
          </tr>
        </tfoot>
      </Table>
    </>
  );
}

export default Contributions;
