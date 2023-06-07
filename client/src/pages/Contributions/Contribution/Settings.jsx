import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Group, InfoContainer, Value, Label, Link, LineWrapper } from './contributionElements';
import { Button, Heading2, SectionContainer, Caption } from '../../../theme/appElements';

import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../../../hooks/useAuth';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';

import Input from '../../../components/Input';
import RadioGroup from '../../../components/RadioGroup';
import FileInput from '../../../components/FileInput';
import Selector from '../../../components/Selector';
import Chips from '../../../components/Chips';
import Loading from '../../../components/Loading';
import FormSelector from '../../../components/FormSelector';

const ContributionSettings = () => {
  const { id } = useParams();
  const { auth, setAuth } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const contribution = auth.contributions?.find((c) => c._id === id);
  const [contributionData, setContributionData] = useState(contribution);

  const [deleting, setDeleting] = useState(false);
  const [saveErrMsg, setSaveErrMsg] = useState('');
  const [deleteErrMsg, setDeleteErrMsg] = useState('');

  const [contributionName, setContributionName] = useState('');

  useEffect(() => {
    setDeleteErrMsg('');
    setSaveErrMsg('');
  }, [contributionName]);

  const notifyOptions = {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  };

  const notifySave = () => {
    toast.success(t('toast.contributionUpdatedSuccess'), notifyOptions);
  };

  const notifyDelete = () => {
    toast.success(t('toast.contributionDeletedSuccess'), notifyOptions);
  };

  async function handleSaveChanges() {
    const undefinedKeys = Object.keys(contribution).filter(
      (key) => !contributionData[key] && key !== 'relatedContributions' && key !== '__v'
    );

    if (undefinedKeys.length > 0) {
      setSaveErrMsg(
        `${t('contribution.errorMsg')} ${undefinedKeys
          .map((key) => t(`contribution.${key}`))
          .join(', ')}`
      );
    } else {
      await axiosPrivate.put(`/contributions/update/${id}`, {
        ...contributionData,
      });
      const contributions = await axiosPrivate.get('/contributions');
      setAuth((prev) => ({ ...prev, contributions: contributions.data }));
      navigate(`/contributions/${id}`);
      notifySave();
    }
  }

  const handleCancelDelete = () => {
    setDeleting(false);
    setContributionName('');
  };

  const handleDeleteContribution = async () => {
    if (contributionName === contribution.title) {
      try {
        await axiosPrivate.delete(`/contributions/delete/${id}`, {
          ...contributionData,
        });
        const contributions = await axiosPrivate.get('/contributions');
        setAuth((prev) => ({ ...prev, contributions: contributions.data }));
        navigate('/contributions');
        notifyDelete();
      } catch (error) {
        if (!error?.response) {
          setDeleteErrMsg(t('authentication.servorError'));
        } else {
          setDeleteErrMsg(t('contribution.deleteContError'));
        }
        //
      }
    } else {
      setDeleteErrMsg(t('contribution.deleteContWrongName'));
    }
  };

  const [scientificFields, setScientificFields] = useState(null);

  useEffect(() => {
    async function fetchScientificFields() {
      const response = await axiosPrivate.get('/scientificfields');
      setScientificFields(response.data);
    }

    fetchScientificFields();
  }, []);

  if (!scientificFields) return <Loading />;

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
            const newContributionData = { ...contributionData, title: event.target.value };
            setContributionData(newContributionData);
          }}
        />
        <FormSelector
          list={scientificFields}
          setList={setScientificFields}
          selected={contribution.scientificField ? [contribution.scientificField] : []}
          setSelected={(selected) => {
            const newContributionData = { ...contributionData, scientificField: selected[0] };
            setContributionData(newContributionData);
          }}
          label={t('contribution.scientificField')}
          modelName='scientificFields'
          unique
          displayedAttribute='label'
          schema={{
            label: {
              label: 'Label',
              type: 'text',
              default: '',
              required: true,
            },
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
              ...contributionData,
              startDate: event.target.value,
            };
            setContributionData(newContributionData);
          }}
        />
        <RadioGroup
          name='role'
          onChange={(event) => {
            const newContributionData = { ...contributionData, teamRole: event.target.value };
            setContributionData(newContributionData);
          }}
          label={t('contribution.teamRole')}
          template={{
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
          label='related'
          displayedAttribute='title'
          list={auth.contributions.filter((c) => c._id !== id)}
          selected={contribution.relatedContributions}
          onChange={(list) => {
            const newContributionData = { ...contributionData, relatedContributions: list };
            setContributionData(newContributionData);
          }}
        />

        <FileInput
          name='abstract'
          collection='contribution'
          MIMEType='pdf'
          data={contribution}
          callback={(file) =>
            setContributionData((data) => ({
              ...data,
              abstract: { name: file.name, size: file.size },
            }))
          }
        />

        <Input
          small
          id='text'
          type='link'
          defaultValue={contribution?.link}
          label={t('contribution.link')}
          autoComplete='off'
          onChange={(event) => {
            const newContributionData = {
              ...contributionData,
              link: event.target.value,
            };
            setContributionData(newContributionData);
          }}
        />

        {saveErrMsg && <Chips type='negative'>{saveErrMsg}</Chips>}

        <Group inline>
          <Button type='neutral' onClick={handleSaveChanges} style={{ width: '100%' }}>
            {t('contribution.update')}
          </Button>
        </Group>
      </SectionContainer>

      <SectionContainer>
        <Heading2 style={{ color: 'var(--negative)' }}> {t('contribution.delete')}</Heading2>
        {!deleting && (
          <Button type='negative' onClick={() => setDeleting(true)} style={{ width: '250px' }}>
            {t('contribution.delete')}
          </Button>
        )}
        {deleting && (
          <>
            <Chips type='notice'>{t('settings.profile.deleteAccountWarning2')}</Chips>
            <Caption>{t('contribution.deleteContWarning1')}</Caption>

            <Caption>{t('contribution.deleteContWarning2')}</Caption>
            <Input
              id='contributionName'
              label={t('contribution.contributionName')}
              autoComplete='off'
              small
              value={contributionName}
              onChange={(e) => setContributionName(e.target.value)}
            />

            {deleteErrMsg && <Chips type='negative'>{deleteErrMsg}</Chips>}
            <LineWrapper>
              <Button style={{ width: '250px' }} type='neutral' onClick={handleCancelDelete}>
                {t('global.cancel')}
              </Button>
              <Button type='negative' style={{ width: '250px' }} onClick={handleDeleteContribution}>
                {t('contribution.delete')}
              </Button>
            </LineWrapper>
          </>
        )}
      </SectionContainer>
    </>
  );
};

export default ContributionSettings;
