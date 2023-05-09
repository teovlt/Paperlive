import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { HiPlus, HiChevronDown, HiOutlineClock } from 'react-icons/hi2';
import { SectionMain, Btn, Table } from './contributionsElements';
import { useTranslation } from 'react-i18next';

function Contributions() {
  const { t } = useTranslation();
  const { auth } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <h2>{auth.contributions?.length} contribution(s)</h2>
      <SectionMain>
        <input type='text' placeholder='Rechercher une contribution' />
        <Btn onClick={() => navigate('/contributions/new')}>
          {t('contribution.addContribution')}
          <HiPlus />
        </Btn>{' '}
      </SectionMain>
      <Table>
        <thead>
          <tr>
            <th className='title'>
              Title of the contribution
              <HiChevronDown />
            </th>
            <th>
              Date
              <HiChevronDown />
            </th>
            <th>
              Role
              <HiChevronDown />
            </th>
            <th>
              Etat <HiChevronDown />
            </th>
          </tr>
        </thead>
        <tbody>
          {!auth.contributions?.length > 0 ? (
            <tr className='trNoContri'>
              <td>Vous ne possédez pas de contributions, rajoutez en une !</td>
            </tr>
          ) : (
            auth.contributions.map((contribution) => (
              <tr className='trBody'>
                <td className='title'>{contribution.title}</td>
                <td className='date'>{contribution.startDate}</td>
                <td className='role'>{contribution.role}</td>
                <td className='etat'>
                  {contribution.state}
                  <HiOutlineClock />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
}

export default Contributions;
