import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import { Container, Group, IconLabel } from './sidebarElements';
import { Button, Heading1, Link } from '../../theme/appElements';
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
            <IconLabel>
              {auth.visibility ? <HiOutlineLockOpen /> : <HiOutlineLockClosed />}
              {t('sideBar.visibility')}
              <span>{auth.visibility ? `${t('sideBar.public')}` : `${t('sideBar.private')}`}</span>
            </IconLabel>
            <IconLabel>
              <HiOutlineNewspaper /> <span>{auth.contributions?.length}</span> contribution(s)
            </IconLabel>
          </Group>
          <Group>
            {auth.location && (
              <IconLabel>
                <HiOutlineMapPin /> {auth.location}
              </IconLabel>
            )}
            {auth.website && (
              <IconLabel>
                <HiOutlineLink />{' '}
                <Link to={`https://${auth.website}`} target='_blank'>
                  {auth.website}
                </Link>
              </IconLabel>
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
            onChange={(e) => setProfilData((prev) => ({ ...prev, description: e.target.value }))}
          />
          <Input
            id='location'
            label={t('sideBar.location')}
            autoComplete='off'
            small
            value={profilData.location}
            onChange={(e) => setProfilData((prev) => ({ ...prev, location: e.target.value }))}
          />
          <Input
            id='website'
            label={t('sideBar.webSite')}
            autoComplete='off'
            small
            value={profilData.website}
            onChange={(e) =>
              setProfilData((prev) => ({
                ...prev,
                website: e.target.value,
              }))
            }
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
