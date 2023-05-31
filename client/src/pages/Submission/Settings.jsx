import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Group, SectionContainer } from './submissionElements';
import { Button, Heading2, Heading3, Caption } from '../../theme/appElements';

import Input from '../../components/Input';
import RadioGroup from '../../components/RadioGroup';
import FileInput from '../../components/FileInput';
import Selector from '../../components/Selector';
import Chips from '../../components/Chips';

import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import { useConfirm } from '../../context/ConfirmContext';

const SubmissionSettings = () => {
  const { id } = useParams();
  const { auth, setAuth } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { confirm } = useConfirm();

  const submission = auth.contributions
    .find((c) => c.submissions?.find((c) => c._id === id))
    .submissions.find((c) => c._id === id);

  const [submissionData, setSubmissionData] = useState({ ...submission });
  const [deleting, setDeleting] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [submissionName, setSubmissionName] = useState('');

  const notifySave = () => {
    toast.success(t('toast.submissionUpdatedSuccess'), {
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
    toast.success(t('toast.submissionDeletedSuccess'), {
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

  const handleSaveChanges = async () => {
    await axiosPrivate.put(`/submissions/update/${id}`, {
      ...submissionData,
    });
    // const updatedContributions = auth.contributions.filter((c) => c._id !== id);
    // updatedContributions.push(contributionData);
    // setAuth((prev) => ({ ...prev, contributions: updatedContributions }));
    notifySave();
    navigate(`/submission/${id}`);
  };
  const handleCancelDelete = () => {
    setDeleting(false);
    setContributionName('');
  };
  const handleDeleteSubmission = async () => {
    if (submissionName === submission.title) {
      try {
        await axiosPrivate.delete(`/submissions/delete/${id}`, {
          ...submission,
        });
        // const updatedContributions = auth.contributions.filter((c) => c._id !== id);
        // setAuth((prev) => ({ ...prev, contributions: updatedContributions }));
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
      setErrMsg(t('le nom de la soumission nest pas le bon'));
    }
  };

  return (
    <>
      {!deleting ? (
        <>
          <SectionContainer>
            <Heading2>{t('submission.edit')}</Heading2>
            <Input
              small
              id='title'
              defaultValue={submission.title}
              label={t('submission.title')}
              autoComplete='off'
              onChange={(event) => {
                const newSubmissionData = { ...submission, title: event.target.value };
                setSubmissionData(newSubmissionData);
              }}
            />
            <Input
              small
              id='date'
              type='date'
              defaultValue={submission.date}
              label={t('submission.date')}
              autoComplete='off'
              onChange={(event) => {
                const newSubmissionData = { ...submission, date: event.target.value };
                setSubmissionData(newSubmissionData);
              }}
            />
            <RadioGroup
              name='type'
              onChange={(event) => {
                const newSubmissionData = { ...submission, type: event.target.value };
                setSubmissionData(newSubmissionData);
              }}
              template={{
                label: t('submission.type'),
                radios: [
                  {
                    label: t('submission.poster'),
                    value: 'poster',
                    defaultChecked: submissionData?.type === 'poster',
                  },
                  {
                    label: t('submission.shortPaper'),
                    value: 'shortPaper',
                    defaultChecked: submissionData?.type === 'shortPaper',
                  },
                  {
                    label: t('global.contribution'),
                    value: 'contribution',
                    defaultChecked: submissionData?.type === 'contribution',
                  },
                ],
              }}
            />
            <RadioGroup
              name='state'
              onChange={(event) => {
                const newSubmissionData = { ...submission, state: event.target.value };
                setSubmissionData(newSubmissionData);
              }}
              template={{
                label: t('submission.state'),
                radios: [
                  {
                    label: t('submission.draft'),
                    value: 'draft',
                    defaultChecked: submissionData?.state === 'draft' || true,
                  },
                  {
                    label: t('submission.submitted'),
                    value: 'submitted',
                    defaultChecked: submissionData?.state === 'submitted',
                  },
                  {
                    label: t('submission.approved'),
                    value: 'approved',
                    defaultChecked: submissionData?.state === 'approved',
                  },
                  {
                    label: t('submission.rejected'),
                    value: 'rejected',
                    defaultChecked: submissionData?.state === 'rejected',
                  },
                ],
              }}
            />
            <span>selector authors</span>
            <span>selector venue</span>
          </SectionContainer>

          <SectionContainer>
            <Heading2>
              <Heading2>{t('submission.files')}</Heading2>
            </Heading2>{' '}
            <Group inline>
              <Button type='neutral' onClick={handleSaveChanges} style={{ width: '100%' }}>
                {t('submission.update')}
              </Button>
            </Group>
          </SectionContainer>
          <div style={{ display: 'flex', flexDirection: 'column', width: '300px', rowGap: '12px' }}>
            <Heading2 style={{ color: 'var(--negative)' }}> {t('submission.delete')}</Heading2>
            <Button type='negative' onClick={() => setDeleting(true)} style={{ width: '250px' }}>
              {t('submission.delete')}
            </Button>
          </div>
        </>
      ) : (
        <SectionContainer>
          <Chips type='notice'>{t('settings.profile.deleteAccountWarning2')}</Chips>
          <Caption>{t('submission.deleteSubWarning1')}</Caption>

          <div style={{ display: 'flex', flexDirection: 'column', rowGap: '12px' }}>
            <Caption>{t('submission.deleteSubWarning2')}</Caption>
            <Input
              id='contributionName'
              label={t('submission.submissionName')}
              autoComplete='off'
              small
              value={submissionName}
              onChange={(e) => setSubmissionName(e.target.value)}
            />
          </div>

          {errMsg && <Chips type='negative'>{errMsg}</Chips>}
          <div style={{ width: '100%', display: 'flex', columnGap: '24px' }}>
            <Button style={{ width: '250px' }} type='neutral' onClick={handleCancelDelete}>
              {t('global.cancel')}
            </Button>
            <Button type='negative' style={{ width: '250px' }} onClick={handleDeleteSubmission}>
              {t('submission.delete')}
            </Button>
          </div>
        </SectionContainer>
      )}
    </>
  );
};

export default SubmissionSettings;
