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
    toast.success(t('toast.unsavedChangements'), {
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

  const handleCancelDelete = () => {
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
        if (!error?.response) {
          setErrMsg(t('authentication.servorError'));
        } else {
          setErrMsg(t('contribution.deleteContError'));
        }
        //
      }
    } else {
      setErrMsg(t('contribution.deleteContWrongName'));
    }
  };
  return (
    <>
      {!deleting ? (
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
                const newContributionData = { ...contributionData, relatedContributions: list };
                setContributionData(newContributionData);
              }}
            />
            <Heading3>{t('contribution.abstract')}</Heading3>
            <FileInput
              name='abstract'
              file={contribution.abstract}
              endpoint='files/contribution/abstract'
              onChange={(file) =>
                setContributionData((prev) => ({ ...prev, filename: file?.name }))
              }
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

          <div style={{ display: 'flex', flexDirection: 'column', width: '300px', rowGap: '12px' }}>
            <Heading2> {t('contribution.delete')}</Heading2>
            <Button type='negative' onClick={() => setDeleting(true)} style={{ width: '250px' }}>
              {t('contribution.delete')}
            </Button>
          </div>
        </>
      ) : (
        <SectionContainer>
          <Chips type='notice'>{t('settings.profile.deleteAccountWarning2')}</Chips>
          <Caption>{t('contribution.deleteContWarning1')}</Caption>

          <div style={{ display: 'flex', flexDirection: 'column', rowGap: '12px' }}>
            <Caption>{t('contribution.deleteContWarning2')}</Caption>
            <Input
              id='contributionName'
              label={t('contribution.contributionName')}
              autoComplete='off'
              small
              value={contributionName}
              onChange={(e) => setContributionName(e.target.value)}
            />
          </div>

          {errMsg && <Chips type='negative'>{errMsg}</Chips>}
          <div style={{ width: '100%', display: 'flex', columnGap: '24px' }}>
            <Button style={{ width: '250px' }} type='neutral' onClick={handleCancelDelete}>
              {t('global.cancel')}
            </Button>
            <Button type='negative' style={{ width: '250px' }} onClick={handleDeleteContribution}>
              {t('contribution.delete')}
            </Button>
          </div>
        </SectionContainer>
      )}
    </>
  );
};

export default ContributionSettings;
