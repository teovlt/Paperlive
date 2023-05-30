import React, { useEffect, useState } from 'react';
import {
  HiOutlineBookOpen,
  HiOutlineChartPie,
  HiOutlineNewspaper,
  HiOutlineTrash,
  HiOutlineArrowLeft,
} from 'react-icons/hi2';

import { Group, SectionContainer } from './contributionElements';
import { Button, Heading2, Heading3 } from '../../../theme/appElements';

import Input from '../../../components/Input';
import RadioGroup from '../../../components/RadioGroup';
import FileInput from '../../../components/FileInput';
import Selector from '../../../components/Selector';

import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../../../hooks/useAuth';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import { useConfirm } from '../../../context/ConfirmContext';

import { toast } from 'react-toastify';
import { Container } from '../../../components/Layout/layoutElements';

const ContributionSettings = () => {
  const { id } = useParams();
  const { auth, setAuth } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { confirm } = useConfirm();

  const contribution = auth.contributions?.find((c) => c._id === id);
  const [contributionData, setContributionData] = useState(null);

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
    //TODO : utiliser notify seulement en cas de changements
    await axiosPrivate.put(`/contributions/update/${id}`, {
      ...contributionData,
    });
    const updatedContributions = auth.contributions.filter((c) => c._id !== id);
    updatedContributions.push(contribution);
    setAuth((prev) => ({ ...prev, contributions: updatedContributions }));
    notifySave();
    navigate(`/contributions/${id}`);
  }

  function handleCancelChanges() {
    setContributionData(auth.contributions.find((c) => c._id === id));
  }

  const handleConfirmation = async () => {
    const confirmed = await confirm({
      title: `${t('contribution.suppTitle')}`,
      caption: `${t('contribution.suppCaption')}`,
      cancelLabel: `${t('global.cancel')}`,
      confirmLabel: `${t('global.confirm')}`,
    });

    if (confirmed) {
      await axiosPrivate.delete(`/contributions/delete/${id}`, {
        ...contribution,
      });
      const updatedContributions = auth.contributions.filter((c) => c._id !== id);
      setAuth((prev) => ({ ...prev, contributions: updatedContributions }));
      navigate('/contributions');
      notifyDelete();
    }
  };

  return (
    <>
      <SectionContainer>
        <Heading2>{t('contribution.edit ')}</Heading2>
        <Input
          small
          id='title'
          value={contribution?.title}
          label={t('contribution.title')}
          autoComplete='off'
          onChange={(e) => {
            const newContributionData = { ...contribution, title: e.target.value };
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
          selected={contribution?.relatedContributions}
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
          file={contribution?.abstract}
          endpoint='files/contribution/abstract'
          onChange={(file) => setFile(file?.name)}
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
        <Button
          secondary
          type='negative'
          onClick={handleConfirmation}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            columnGap: '8px',
          }}>
          {t('contribution.delete')}
          <HiOutlineTrash />
        </Button>
      </SectionContainer>
    </>
  );
};

export default ContributionSettings;
