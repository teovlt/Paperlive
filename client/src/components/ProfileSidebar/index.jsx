import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import { Container, Group } from './sidebarElements';
import { Button, Heading1, Link, Label } from '../../theme/appElements';
import {
  HiOutlineLink,
  HiOutlineLockClosed,
  HiOutlineLockOpen,
  HiOutlineMapPin,
  HiOutlineNewspaper,
} from 'react-icons/hi2';
import Avatar from '../Avatar';
import Input from '../Input';
import TextArea from '../TextArea';
import { useTranslation } from 'react-i18next';
import RadioGroup from '../RadioGroup';

const ProfileSidebar = () => {
  const { t } = useTranslation();

  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [isEditing, setIsEditing] = useState(false);

  const [profilData, setProfilData] = useState();

  useEffect(() => {
    setProfilData(auth);
  }, [auth]);

  async function handleSaveChanges() {
    setIsEditing(false);

    const updatedProfilData = { ...profilData };
    updatedProfilData.website &&
      (updatedProfilData.website = updatedProfilData.website.replace(/^https?:\/\//i, ''));

    await axiosPrivate.put('/teams/update', { ...updatedProfilData });
    setAuth((prev) => ({ ...prev, ...updatedProfilData }));
  }

  function handleCancelChanges() {
    setIsEditing(false);
    setProfilData(auth);
  }

  return (
    <Container>
      {!isEditing ? (
        <>
          <Avatar />
          <Heading1>{auth.name?.toUpperCase()}</Heading1>
          <Button secondary onClick={() => setIsEditing(true)}>
            {t('sideBar.edit')}
          </Button>
          <Group>
            <Label>
              {auth.visibility ? <HiOutlineLockOpen /> : <HiOutlineLockClosed />}
              {t('sideBar.visibility')}
              <span>{auth.visibility ? `${t('sideBar.public')}` : `${t('sideBar.private')}`}</span>
            </Label>
            <Label>
              <HiOutlineNewspaper /> <span>{auth.contributions?.length}</span> contribution(s)
            </Label>
          </Group>
          <Group>
            {auth.location && (
              <Label>
                <HiOutlineMapPin /> {auth.location}
              </Label>
            )}
            {auth.website && (
              <Label>
                <HiOutlineLink />{' '}
                <Link to={`https://${auth.website}`} target='_blank'>
                  {auth.website}
                </Link>
              </Label>
            )}
          </Group>
        </>
      ) : (
        <>
          <Avatar />
          <RadioGroup
            name='visibility'
            template={{
              label: 'Visibility',
              radios: [
                {
                  label: `${t('sideBar.private')}`,
                  value: false,
                  defaultChecked: profilData.visibility === false,
                },
                {
                  label: `${t('sideBar.public')}`,
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
          <Group inline>
            <Button secondary onClick={handleCancelChanges}>
              {t('sideBar.cancel')}
            </Button>
            <Button secondary onClick={handleSaveChanges}>
              {t('sideBar.save')}
            </Button>
          </Group>
        </>
      )}
    </Container>
  );
};

export default ProfileSidebar;
