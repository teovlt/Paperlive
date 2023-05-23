import React, { useEffect, useState } from 'react';
import { Heading2, Button, Caption, Small } from '../../theme/appElements';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import { useTranslation } from 'react-i18next';
import RadioGroup from '../../components/RadioGroup';
import Avatar from '../../components/Avatar';
import {
  DivConnected,
  DivLeftInfos,
  DivDeleteAccountBtns,
  DivConfirmDelete,
} from './settingsElements';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HiOutlineExclamationCircle } from 'react-icons/hi2';

const ProfilSettings = () => {
  const { auth, setAuth } = useAuth();
  const { t } = useTranslation();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const [profilData, setProfilData] = useState(auth);

  useEffect(() => {
    setProfilData(auth);
  }, [auth]);

  const notify = () => {
    toast.success(t('toast.profileUpdatedSuccess'), {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const handleChanges = async () => {
    // TODO: Vérifier changements
    const updatedProfilData = { ...profilData };
    updatedProfilData.website &&
      (updatedProfilData.website = updatedProfilData.website.replace(/^https?:\/\//i, ''));

    await axiosPrivate.put('/teams/update', { ...updatedProfilData });
    setAuth((prev) => ({ ...prev, ...updatedProfilData }));
    notify();
  };

  const handleConfirmDelete = () => {
    setDeleteConfirmation(!deleteConfirmation);
  };

  const handleDeleteAccount = async () => {
    //TODO
    //Verifier les inputs avants, si pas bon => chips ou toast d'erreur, si bon => delete account
  };

  return (
    <>
      <Heading2 style={{ borderBottom: '1px solid var(--black-quaternary)' }}>
        {t('settings.pages.myAccount')}
      </Heading2>
      <DivConnected>
        <DivLeftInfos>
          <RadioGroup
            name='visibility'
            template={{
              label: t('sideBar.visibility'),
              radios: [
                {
                  label: t('sideBar.private'),
                  value: false,
                  defaultChecked: profilData.visibility === false,
                },
                {
                  label: t('sideBar.public'),
                  value: true,
                  defaultChecked: profilData.visibility === true,
                },
              ],
            }}
            onChange={(event) => {
              setProfilData((prev) => ({ ...prev, visibility: JSON.parse(event.target.value) }));
            }}
          />
          <TextArea
            id='description'
            label={t('sideBar.description')}
            maxLength='240'
            autoComplete='off'
            small
            value={profilData.description}
            onChange={(e) => {
              const newProfilData = { ...profilData, description: e.target.value };
              setProfilData(newProfilData);
            }}
          />
        </DivLeftInfos>

        <div style={{ width: '200px' }}>
          <Avatar />
        </div>
      </DivConnected>
      <Input
        id='location'
        label={t('sideBar.location')}
        autoComplete='off'
        small
        value={profilData.location}
        onChange={(e) => {
          const newProfilData = { ...profilData, location: e.target.value };
          setProfilData(newProfilData);
        }}
      />
      <Input
        id='website'
        label={t('sideBar.webSite')}
        autoComplete='off'
        small
        value={profilData.website}
        onChange={(e) => {
          const newProfilData = { ...profilData, website: e.target.value };
          setProfilData(newProfilData);
        }}
      />
      <Button type='neutral' onClick={handleChanges} style={{ width: '100%' }}>
        {t('settings.profile.updateProfile')}
      </Button>
      <Heading2
        style={{ borderBottom: '1px solid var(--black-quaternary)', color: 'var(--negative)' }}>
        {t('settings.profile.deleteAccount')}
      </Heading2>{' '}
      {!deleteConfirmation ? (
        <>
          <Caption>{t('settings.profile.deleteAccountWarning1')}</Caption>

          <Button
            type='negative'
            style={{ width: '250px' }}
            secondary
            onClick={handleConfirmDelete}>
            {t('settings.profile.deleteAccount')}
          </Button>
        </>
      ) : (
        <>
          <Caption
            style={{
              color: 'var(--negative)',
              display: 'flex',
              columnGap: '4px',
              alignItems: 'center',
            }}>
            <HiOutlineExclamationCircle /> {t('settings.profile.deleteAccountWarning2')}
          </Caption>
          <Caption>{t('settings.profile.deleteAccountWarning3')}</Caption>
          <Input id='name' label={t('settings.profile.teamName')} autoComplete='off' small />
          <Input id='password' label={t('settings.profile.password')} autoComplete='off' small />
          <DivConfirmDelete>
            <Caption>{t('settings.profile.captionConfirm')}</Caption>
            <Input
              id='confirm'
              label={t('settings.profile.inputConfirm')}
              autoComplete='off'
              small
            />
          </DivConfirmDelete>

          <DivDeleteAccountBtns>
            <Button style={{ width: '250px' }} secondary onClick={handleConfirmDelete}>
              {t('global.cancel')}
            </Button>
            <Button
              type='negative'
              style={{ width: '250px' }}
              secondary
              onClick={handleDeleteAccount}>
              {t('settings.profile.deleteAccount')}
            </Button>
          </DivDeleteAccountBtns>
        </>
      )}
      <ToastContainer toastStyle={{ backgroundColor: 'var(--positive)' }} />
    </>
  );
};

export default ProfilSettings;
