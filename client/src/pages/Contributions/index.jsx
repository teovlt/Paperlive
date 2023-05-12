import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useSearch from '../../hooks/useSearch';
import {
  LinearContainer,
  SectionMain,
  Table,
  TableCell,
  TableFoot,
  TableHead,
  TableRow,
  Button,
  TableCellButton,
} from './contributionsElements';
import { useTranslation } from 'react-i18next';
import Input from '../../components/Input';
import { Heading2 } from '../../theme/appElements';
import {
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlineSparkles,
  HiOutlineUsers,
} from 'react-icons/hi2';

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
        const order = ['leader', 'coLeader', 'guest'];
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
        const order = ['inProgress', 'approved', 'dropped'];
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
      <Heading2>Contributions</Heading2>
      <LinearContainer>
        <Input
          small
          name='search'
          label={t('global.search')}
          id='searchBar'
          value={searchTerm}
          placeholder={t('contribution.searchBar')}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoComplete='off'
        />
        <Button onClick={() => navigate('/contributions/new')}>
          {t('contribution.newContribution')}
        </Button>
      </LinearContainer>
      <Table>
        <thead>
          <TableHead>
            <TableCell
              className={`${sort.attr === 'title' && sort.direction === 'desc' && 'sortDesc'}`}
              onClick={() =>
                setSort((prev) => {
                  if (prev.attr === 'title' && prev.direction === 'asc')
                    return { ...prev, direction: 'desc' };
                  else if (prev.attr === 'title' && prev.direction === 'desc')
                    return { ...prev, direction: 'asc' };
                  else return { attr: 'title', direction: 'asc' };
                })
              }>
              <HiOutlineDocumentText />
              {t('contribution.title')}
            </TableCell>
            <TableCell
              className={`${sort.attr === 'startDate' && sort.direction === 'desc' && 'sortDesc'}`}
              onClick={() =>
                setSort((prev) => {
                  if (prev.attr === 'startDate' && prev.direction === 'asc')
                    return { ...prev, direction: 'desc' };
                  else if (prev.attr === 'startDate' && prev.direction === 'desc')
                    return { ...prev, direction: 'asc' };
                  else return { attr: 'startDate', direction: 'asc' };
                })
              }>
              <HiOutlineClock />
              {t('contribution.date')}
            </TableCell>
            <TableCell
              className={`${sort.attr === 'teamRole' && sort.direction === 'desc' && 'sortDesc'}`}
              onClick={() =>
                setSort((prev) => {
                  if (prev.attr === 'teamRole' && prev.direction === 'asc')
                    return { ...prev, direction: 'desc' };
                  else if (prev.attr === 'teamRole' && prev.direction === 'desc')
                    return { ...prev, direction: 'asc' };
                  else return { attr: 'teamRole', direction: 'asc' };
                })
              }>
              <HiOutlineUsers />
              {t('contribution.role')}
            </TableCell>
            <TableCell
              className={`${sort.attr === 'state' && sort.direction === 'desc' && 'sortDesc'}`}
              onClick={() =>
                setSort((prev) => {
                  console.log(prev);
                  if (prev.attr === 'state' && prev.direction === 'asc')
                    return { ...prev, direction: 'desc' };
                  else if (prev.attr === 'state' && prev.direction === 'desc')
                    return { ...prev, direction: 'asc' };
                  else return { attr: 'state', direction: 'asc' };
                })
              }>
              <HiOutlineSparkles />
              {t('contribution.state')}
            </TableCell>
          </TableHead>
        </thead>
        <tbody>
          {searchResults.length > 0 ? (
            searchResults.map((contribution, index) => (
              <TableRow key={index} onClick={() => navigate(`/contributions/${contribution._id}`)}>
                <TableCell>{contribution.title}</TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat(i18n.language, {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                  }).format(new Date(contribution.startDate))}
                </TableCell>
                <TableCell>{t(`contribution.${contribution.teamRole}`)}</TableCell>
                <TableCell>{t(`contribution.${contribution.state}`)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow onClick={() => navigate('/contributions/new')}>
              <TableCellButton>+ {t('contribution.newContribution')}</TableCellButton>
            </TableRow>
          )}
        </tbody>
        <tfoot>
          <TableFoot>
            <TableCell>
              {t('contribution.count')} <span>{searchResults.length}</span>
            </TableCell>
          </TableFoot>
        </tfoot>
      </Table>
    </>
  );
}

export default Contributions;
