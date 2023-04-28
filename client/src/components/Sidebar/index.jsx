import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import { Container, Group, IconLabel } from './sidebarElements';
import { Button, Heading1, Link, WebLink } from '../../theme/appElements';
import {
  HiOutlineLink,
  HiOutlineLockClosed,
  HiOutlineLockOpen,
  HiOutlineMapPin,
  HiOutlineNewspaper,
} from 'react-icons/hi2';
import Avatar from '../Avatar';
import Input from '../Input';

const Sidebar = () => {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [isEditing, setIsEditing] = useState(false);

  const [profilData, setProfilData] = useState();

  useEffect(() => {
    setProfilData(auth);
  }, [auth]);

  async function handleSaveChanges() {
    // TODO: Popup
    setIsEditing(false);
    await axiosPrivate.put('/teams/update', { ...profilData });
    setAuth((prev) => ({ ...prev, ...profilData }));
  }

  function handleCancelChanges() {
    // TODO: Popup
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
            Edit profile
          </Button>
          <Group>
            <IconLabel>
              {auth.visibility ? <HiOutlineLockOpen /> : <HiOutlineLockClosed />}
              Visibility <span>{auth.visibility ? 'public' : 'private'}</span>
            </IconLabel>
            <IconLabel>
              <HiOutlineNewspaper /> <span>0</span> contribution(s)
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
          <Input
            id='description'
            label='Description'
            autoComplete='off'
            value={profilData.description}
            onChange={(e) => setProfilData((prev) => ({ ...prev, description: e.target.value }))}
          />
          <IconLabel>
            <HiOutlineMapPin />
            <Input
              id='location'
              label='Location'
              autoComplete='off'
              value={profilData.location}
              onChange={(e) => setProfilData((prev) => ({ ...prev, location: e.target.value }))}
            />
          </IconLabel>
          <IconLabel>
            <HiOutlineLink />
            <Input
              id='website'
              label='Website'
              autoComplete='off'
              value={profilData.website}
              onChange={(e) => setProfilData((prev) => ({ ...prev, website: e.target.value }))}
            />
          </IconLabel>
          <Group inline>
            <Button secondary onClick={handleCancelChanges}>
              Cancel
            </Button>
            <Button secondary onClick={handleSaveChanges}>
              Save
            </Button>
          </Group>
        </>
      )}
    </Container>
  );
};

export default Sidebar;
