import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useSearch from '../../hooks/useSearch';
import { HiChevronDown, HiOutlineClock } from 'react-icons/hi2';
import { SectionMain, Table, TableHeader, TitleCell } from './contributionsElements';
import { useTranslation } from 'react-i18next';
import Input from '../../components/Input';

function Contributions() {
  const { t, i18n } = useTranslation();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const search = useSearch();

  const [sort, setSort] = useState({ attr: 'startDate', direction: 'desc' });

  const [searchResults, setSearchResults] = useState(auth.contributions);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setSearchResults(search(searchTerm, auth.contributions, 'title'));
  }, [searchTerm]);

  useEffect(() => {
    const sortedList = [...searchResults];
    sortedList.sort((a, b) => {
      const valueA = a[sort.attr];
      const valueB = b[sort.attr];

      if (sort.attr === 'teamRole') {
        const order = ['leader', 'co-leader', 'guest'];
        const indexA = order.indexOf(valueA);
        const indexB = order.indexOf(valueB);

        if (indexA < indexB) {
          return sort.direction === 'asc' ? -1 : 1;
        }
        if (indexA > indexB) {
          return sort.direction === 'asc' ? 1 : -1;
        }
      }

      if (sort.attr === 'state') {
        const order = ['in-progress', 'approved', 'dropped'];
        const indexA = order.indexOf(valueA);
        const indexB = order.indexOf(valueB);

        if (indexA < indexB) {
          return sort.direction === 'asc' ? -1 : 1;
        }
        if (indexA > indexB) {
          return sort.direction === 'asc' ? 1 : -1;
        }
      }

      if (valueA < valueB) {
        return sort.direction === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sort.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setSearchResults(sortedList);
  }, [sort]);

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
      </SectionMain>
      <Table>
        <TableHeader>
          <th
            onClick={() =>
              setSort((prev) => {
                if (prev.attr === 'title' && prev.direction === 'asc')
                  return { ...prev, direction: 'desc' };
                else if (prev.attr === 'title' && prev.direction === 'desc')
                  return { ...prev, direction: 'asc' };
                else return { attr: 'title', direction: 'asc' };
              })
            }>
            {t('contribution.titleTable')}
            <HiChevronDown />
          </th>
          <th
            onClick={() =>
              setSort((prev) => {
                if (prev.attr === 'startDate' && prev.direction === 'asc')
                  return { ...prev, direction: 'desc' };
                else if (prev.attr === 'startDate' && prev.direction === 'desc')
                  return { ...prev, direction: 'asc' };
                else return { attr: 'startDate', direction: 'asc' };
              })
            }>
            {t('contribution.date')}
            <HiChevronDown />
          </th>
          <th
            onClick={() =>
              setSort((prev) => {
                if (prev.attr === 'teamRole' && prev.direction === 'asc')
                  return { ...prev, direction: 'desc' };
                else if (prev.attr === 'teamRole' && prev.direction === 'desc')
                  return { ...prev, direction: 'asc' };
                else return { attr: 'teamRole', direction: 'asc' };
              })
            }>
            Role
            <HiChevronDown />
          </th>
          <th
            onClick={() =>
              setSort((prev) => {
                if (prev.attr === 'state' && prev.direction === 'asc')
                  return { ...prev, direction: 'desc' };
                else if (prev.attr === 'state' && prev.direction === 'desc')
                  return { ...prev, direction: 'asc' };
                else return { attr: 'state', direction: 'asc' };
              })
            }>
            {t('contribution.state')}
            <HiChevronDown />
          </th>
        </TableHeader>
        <tbody>
          {searchResults?.map((contribution, index) => (
            <tr
              key={index}
              className='trBody'
              onClick={() => navigate(`/contributions/${contribution._id}`)}>
              <TitleCell className='title'>{contribution.title}</TitleCell>
              <td className='date'>
                {new Intl.DateTimeFormat(i18n.language, {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit',
                }).format(new Date(contribution.startDate))}
              </td>
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
