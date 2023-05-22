import React, { useEffect, useState } from 'react';
import { Heading2, Button, IconLink } from '../../theme/appElements';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import { useTranslation } from 'react-i18next';
import RadioGroup from '../../components/RadioGroup';
import { Group } from '../../components/ProfileSidebar/sidebarElements';
import Avatar from '../../components/Avatar';
import { DivConnected, DivLeftInfos } from './settingsElements';

const ProfilSettings = () => {
  const { auth, setAuth } = useAuth();
  const { t } = useTranslation();

  const axiosPrivate = useAxiosPrivate();

  const [profilData, setProfilData] = useState(auth);

  useEffect(() => {
    setProfilData(auth);
  }, [auth]);

  async function handleChanges() {
    const updatedProfilData = { ...profilData };
    updatedProfilData.website &&
      (updatedProfilData.website = updatedProfilData.website.replace(/^https?:\/\//i, ''));

    await axiosPrivate.put('/teams/update', { ...updatedProfilData });
    setAuth((prev) => ({ ...prev, ...updatedProfilData }));
    console.log(profilData.visibility);
  }

  return (
    <>
      <IconLink to='/'>
        Team <strong>{auth.name}</strong>
      </IconLink>
      <Heading2 style={{ borderBottom: '1px solid var(--black-quaternary)' }}>My account</Heading2>
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
        <Group inline>
          <Button secondary onClick={handleChanges} style={{ width: '100%' }}>
            Update profile
          </Button>
        </Group>
      </>
    </>
  );
};

export default ProfilSettings;
