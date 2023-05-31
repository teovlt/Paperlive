import React, { useEffect, useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi2';
import { toast } from 'react-toastify';

import { Group, SectionContainer } from './contributionElements';
import { Button, Heading2, Heading3, Caption } from '../../../theme/appElements';

import Input from '../../../components/Input';
import RadioGroup from '../../../components/RadioGroup';
import FileInput from '../../../components/FileInput';
import Selector from '../../../components/Selector';
import Chips from '../../../components/Chips';

import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../../../hooks/useAuth';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import { useConfirm } from '../../../context/ConfirmContext';

const ContributionSettings = () => {
  const { id } = useParams();
  const { auth, setAuth } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { confirm } = useConfirm();

  const contribution = auth.contributions?.find((c) => c._id === id);
  const [contributionData, setContributionData] = useState({ ...contribution });

  const [deleting, setDeleting] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const [contributionName, setContributionName] = useState('');

  useEffect(() => {
    setErrMsg('');
  }, [contributionName]);

  const notifySave = () => {
    toast.success(t('toast.contributionUpdatedSuccess'), {
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

  const notifyCancel = () => {
    //traduire
    toast.success(t('changements non sauvegardés'), {
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

  const notifyDelete = () => {
    toast.success(t('toast.contributionDeletedSuccess'), {
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

  async function handleSaveChanges() {
    await axiosPrivate.put(`/contributions/update/${id}`, {
      ...contributionData,
    });
    const updatedContributions = auth.contributions.filter((c) => c._id !== id);
    updatedContributions.push(contributionData);
    setAuth((prev) => ({ ...prev, contributions: updatedContributions }));
    notifySave();
    navigate(`/contributions/${id}`);
  }

  function handleCancelChanges() {
    navigate(`/contributions/${id}`);
    notifyCancel();
  }

  const handleCancel = () => {
    setDeleting(false);
    setContributionName('');
  };

  const handleDeleteContribution = async () => {
    if (contributionName === contribution.title) {
      try {
        await axiosPrivate.delete(`/contributions/delete/${id}`, {
          ...contribution,
        });
        const updatedContributions = auth.contributions.filter((c) => c._id !== id);
        setAuth((prev) => ({ ...prev, contributions: updatedContributions }));
        navigate('/contributions');
        notifyDelete();
      } catch (error) {
        //verifier cca
        if (!error?.response) {
          setErrMsg(t('authentication.servorError'));
        } else {
          setErrMsg(t('settings.profile.credentialsError'));
        }
        //
      }
    } else {
      setErrMsg('Le nom de la contribution nest pas le bon');
    }
  };
  return (
    <>
      <SectionContainer>
        <Heading2>{t('contribution.edit')}</Heading2>
        <Input
          small
          id='title'
          defaultValue={contribution.title}
          label={t('contribution.title')}
          autoComplete='off'
          onChange={(event) => {
            const newContributionData = { ...contribution, title: event.target.value };
            setContributionData(newContributionData);
          }}
        />
        <Input
          small
          id='date'
          type='date'
          defaultValue={contribution?.startDate}
          label={t('contribution.startDate')}
          autoComplete='off'
          onChange={(event) => {
            const newContributionData = {
              ...contribution,
              startDate: event.target.value,
            };
            setContributionData(newContributionData);
          }}
        />
        <RadioGroup
          name='role'
          onChange={(event) => {
            const newContributionData = { ...contribution, teamRole: event.target.value };
            setContributionData(newContributionData);
          }}
          template={{
            label: t('contribution.teamRole'),
            radios: [
              {
                label: t('contribution.leader'),
                value: 'leader',
                defaultChecked: contribution?.teamRole === 'leader',
              },
              {
                label: t('contribution.coLeader'),
                value: 'coLeader',
                defaultChecked: contribution?.teamRole === 'coLeader',
              },
              {
                label: t('contribution.guest'),
                value: 'guest',
                defaultChecked: contribution?.teamRole === 'guest',
              },
            ],
          }}
        />
        <Selector
          list={auth.contributions.filter((c) => c._id !== id)}
          id='relatedContributions'
          name='relatedContributions'
          label={t('contribution.related')}
          selected={contribution.relatedContributions}
          onChange={(list) => {
            setContributionData((prev) => ({
              ...prev,
              relatedContributions: list.map((c) => ({ _id: c._id, title: c.title })),
            }));
          }}
        />
        <Heading3>Abstract</Heading3>
        <FileInput
          name='abstract'
          file={contribution.abstract}
          endpoint='files/contribution/abstract'
          onChange={(file) => setContributionData((prev) => ({ ...prev, filename: file?.name }))}
        />

        <Group inline>
          <Button type='neutral' onClick={handleCancelChanges} style={{ width: '100%' }}>
            {t('global.cancel')}
          </Button>
          <Button type='neutral' onClick={handleSaveChanges} style={{ width: '100%' }}>
            {t('global.save')}
          </Button>
        </Group>
      </SectionContainer>
      <SectionContainer>
        <Heading2> {t('contribution.delete')}</Heading2>

        {!deleting ? (
          <>
            <Button
              secondary
              type='negative'
              onClick={() => setDeleting(true)}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                columnGap: '8px',
              }}>
              {t('contribution.delete')}
              <HiOutlineTrash />
            </Button>
          </>
        ) : (
          <>
            <Chips type='notice'>{t('settings.profile.deleteAccountWarning2')}</Chips>
            <Caption>
              Cette contribution va disparaitre et ses informations ne pourront jamais être
              retrouvés, soyez sur de votre action
            </Caption>

            <div style={{ display: 'flex', flexDirection: 'column', rowGap: '12px' }}>
              <Caption>
                Pour confirmer la suppression de votre contribution, veuillez entrer le titre exact
                de la contribution sur laquelle vous vous situer
              </Caption>
              <Input
                id='contributionName'
                label='Nom de la contribution'
                autoComplete='off'
                small
                value={contributionName}
                onChange={(e) => setContributionName(e.target.value)}
              />
            </div>

            {errMsg && <Chips type='negative'>{errMsg}</Chips>}
            <div style={{ width: '100%', display: 'flex', columnGap: '24px' }}>
              <Button style={{ width: '250px' }} type='neutral' onClick={handleCancel}>
                {t('global.cancel')}
              </Button>
              <Button type='negative' style={{ width: '250px' }} onClick={handleDeleteContribution}>
                {t('contribution.delete')}
              </Button>
            </div>
          </>
        )}
      </SectionContainer>
    </>
  );
};

export default ContributionSettings;
