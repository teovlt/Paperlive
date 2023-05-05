import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { HiPlus } from 'react-icons/hi2';
import { SectionMain, Btn } from './contributionsElements';

function Contributions() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <h2>{auth.contributions?.length} contribution(s)</h2>
      <SectionMain>
        <input type='text' placeholder='Rechercher une contribution' />
        <Btn onClick={() => navigate('/contributions/new')}>
          Add a contribution
          <HiPlus />
        </Btn>
      </SectionMain>
    </>
  );
}

export default Contributions;
