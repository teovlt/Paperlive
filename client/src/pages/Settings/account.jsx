import React, { useEffect, useState } from 'react';
import { Heading2, Button, Caption, Small } from '../../theme/appElements';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import { useTranslation } from 'react-i18next';
import RadioGroup from '../../components/RadioGroup';
import Avatar from '../../components/Avatar';
import Chips from '../../components/Chips';
import {
  DivConnected,
  DivLeftInfos,
  DivDeleteAccountBtns,
  DivConfirmDelete,
  SectionContainer,
} from './settingsElements';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AccountSettings = () => {
  const { auth, setAuth } = useAuth();
  const { t } = useTranslation();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [profilData, setProfilData] = useState(auth);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    setProfilData(auth);
  }, [auth]);

  useEffect(() => {
    setErrMsg('');
  }, [name, password, confirmation]);

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

  const handleSubmit = async () => {
    if (profilData !== auth) {
      try {
        const updatedProfilData = { ...profilData };
        updatedProfilData.website &&
          (updatedProfilData.website = updatedProfilData.website.replace(/^https?:\/\//i, ''));

        await axiosPrivate.put('/teams/update', { ...updatedProfilData });
        setAuth((prev) => ({ ...prev, ...updatedProfilData }));
        notify();
      } catch (error) {}
    }
  };

  const handleCancel = () => {
    setDeleteConfirmation(false);
    setName('');
    setPassword('');
    setConfirmation('');
  };

  const handleDeleteAccount = async () => {
    if (confirmation === t('settings.profile.accountDeletionText')) {
      try {
        await axiosPrivate.post('/teams/delete', {
          name: name,
          password: password,
        });
        navigate('/login');
      } catch (error) {
        if (!error?.response) {
          setErrMsg(t('authentication.servorError'));
        } else {
          setErrMsg(t('settings.profile.credentialsError'));
        }
      }
    } else {
      setErrMsg(t('settings.profile.verificationError'));
    }
  };

  return (
    <>
      <Heading2 style={{ borderBottom: '1px solid var(--black-quaternary)' }}>
        {t('settings.pages.myAccount')}
      </Heading2>
      {!deleteConfirmation ? (
        <>
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
                  setProfilData((prev) => ({
                    ...prev,
                    visibility: JSON.parse(event.target.value),
                  }));
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
          <Button type='neutral' onClick={handleSubmit} style={{ width: '100%' }}>
            {t('settings.profile.updateProfile')}
          </Button>
          <SectionContainer>
            <Heading2
              style={{
                borderBottom: '1px solid var(--black-quaternary)',
                color: 'var(--negative)',
              }}>
              {t('settings.profile.deleteAccount')}
            </Heading2>
            <Caption>{t('settings.profile.deleteAccountWarning1')}</Caption>

            <Button
              type='negative'
              style={{ width: '250px' }}
              onClick={() => setDeleteConfirmation(true)}>
              {t('settings.profile.deleteAccount')}
            </Button>
          </SectionContainer>
        </>
      ) : (
        <>
          <Chips type='notice'>{t('settings.profile.deleteAccountWarning2')}</Chips>
          <Caption>{t('settings.profile.deleteAccountWarning3')}</Caption>

          <Input
            id='name'
            label={t('settings.profile.teamName')}
            autoComplete='off'
            small
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            id='password'
            type='password'
            label={t('global.password')}
            autoComplete='off'
            small
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <DivConfirmDelete>
            <Caption>{t('settings.profile.verificationPrompt')}</Caption>
            <Input
              id='confirm'
              label={t('settings.profile.inputConfirm')}
              autoComplete='off'
              small
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
            />
          </DivConfirmDelete>

          {errMsg && <Chips type='negative'>{errMsg}</Chips>}

          <DivDeleteAccountBtns>
            <Button style={{ width: '250px' }} type='neutral' onClick={handleCancel}>
              {t('global.cancel')}
            </Button>
            <Button type='negative' style={{ width: '250px' }} onClick={handleDeleteAccount}>
              {t('settings.profile.deleteAccount')}
            </Button>
          </DivDeleteAccountBtns>
        </>
      )}
    </>
  );
};

export default AccountSettings;
