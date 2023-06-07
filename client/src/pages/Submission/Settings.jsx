import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Group, LineWrapper } from './submissionElements';
import { Button, Heading2, Caption, SectionContainer } from '../../theme/appElements';

import Input from '../../components/Input';
import RadioGroup from '../../components/RadioGroup';
import Chips from '../../components/Chips';
import FileInput from '../../components/FileInput';

import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import FormSelector from '../../components/FormSelector';

const SubmissionSettings = () => {
  const { id } = useParams();
  const { auth, setAuth } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const contribution = auth.contributions.find((c) => c.submissions?.find((s) => s._id === id));
  const submission = contribution.submissions?.find((c) => c._id === id);

  const [authors, setAuthors] = useState(null);
  const [venues, setVenues] = useState(null);

  useEffect(() => {
    async function fetchAuthors() {
      const response = await axiosPrivate.get('/authors');
      setAuthors(response.data);
    }

    fetchAuthors();
    async function fetchVenues() {
      const response = await axiosPrivate.get('/venues');
      setVenues(response.data);
    }

    fetchVenues();
  }, []);

  const [submissionData, setSubmissionData] = useState({ ...submission });
  const [deleting, setDeleting] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [submissionName, setSubmissionName] = useState('');

  useEffect(() => {
    setErrMsg('');
  }, [t]);

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
    toast.success(t('toast.submissionUpdatedSuccess'), notifyOptions);
  };

  const notifyDelete = () => {
    toast.success(t('toast.submissionDeletedSuccess'), notifyOptions);
  };

  const handleSaveChanges = async () => {
    await axiosPrivate.put(`/submissions/${id}`, submissionData);

    const updatedContributions = [
      ...auth.contributions.filter((c) => c._id !== contribution._id),
      {
        ...contribution,
        submissions: [
          ...contribution.submissions?.filter((s) => s._id !== submission._id),
          submissionData,
        ],
      },
    ];

    setAuth((prev) => ({ ...prev, contributions: updatedContributions }));
    notifySave();
    navigate(`/submissions/${id}`);
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

        const contribution = auth.contributions.find((contribution) =>
          contribution.submissions?.map((submission) => submission._id).includes(id)
        );

        const updatedContributions = [
          ...auth.contributions.filter((c) => c._id !== contribution._id),
          {
            ...contribution,
            submissions: [...contribution.submissions?.filter((s) => s._id !== id)],
          },
        ];

        setAuth((prev) => ({ ...prev, contributions: updatedContributions }));
        navigate(`/contributions/${contribution._id}`);
        notifyDelete();
      } catch (error) {
        console.log(error);
        if (!error?.response) {
          setErrMsg(t('authentication.servorError'));
        } else {
          setErrMsg(t('contribution.deleteContError'));
        }
      }
    } else {
      setErrMsg(t('submission.deleteSubWrongName'));
    }
  };

  if (!authors) return <Loading />;
  if (!venues) return <Loading />;

  return (
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
            const newSubmissionData = { ...submission, submissionDate: event.target.value };
            setSubmissionData(newSubmissionData);
          }}
        />
        <RadioGroup
          name='type'
          onChange={(event) => {
            const newSubmissionData = { ...submission, type: event.target.value };
            setSubmissionData(newSubmissionData);
          }}
          label={t('submission.type')}
          template={{
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
                label: t('submission.longPaper'),
                value: 'longPaper',
                defaultChecked: submissionData?.type === 'longPaper',
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
          label={t('submission.state')}
          template={{
            radios: [
              {
                label: t('submission.draft'),
                value: 'draft',
                defaultChecked: submissionData?.state === 'draft',
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
        <FormSelector
          list={authors}
          setList={setAuthors}
          selected={submissionData.authors || []}
          setSelected={(selected) => setSubmissionData((data) => ({ ...data, authors: selected }))}
          label={t('submission.authors')}
          displayedAttribute='name'
          modelName='authors'
          schema={{
            name: {
              label: t('author.name'),
              type: 'text',
              default: '',
              required: true,
            },
            grade: {
              label: t('author.grade'),
              type: 'text',
              default: '',
              required: true,
            },
            country: {
              label: t('author.country'),
              type: 'text',
              default: '',
              required: true,
            },
            isMainAuthor: {
              label: t('author.isMainAuthor'),
              type: 'boolean',
              default: false,
              required: true,
            },
            workTime: {
              label: t('author.workTime'),
              type: 'number',
              default: '',
              required: true,
            },
            hourlyCost: {
              label: t('author.hourlyCost'),
              type: 'number',
              default: '',
              required: true,
            },
          }}
        />
        <FormSelector
          list={venues}
          setList={setVenues}
          selected={submissionData.venue ? [submissionData.venue] : []}
          setSelected={(selected) => setSubmissionData((data) => ({ ...data, venue: selected[0] }))}
          unique
          label={t('submission.venue')}
          displayedAttribute='name'
          modelName='venues'
          schema={{
            name: {
              label: t('venue.name'),
              type: 'text',
              default: '',
              required: true,
            },
            rank: {
              label: t('venue.rank'),
              type: 'text',
              default: '',
              required: true,
            },
          }}
        />
        <FileInput
          name='abstract'
          collection='submission'
          MIMEType='pdf'
          data={submission}
          callback={(file) =>
            setSubmissionData((data) => ({
              ...data,
              abstract: { name: file.name, size: file.size },
            }))
          }
        />
        <FileInput
          name='zipFolder'
          collection='submission'
          MIMEType='zip'
          data={submission}
          callback={(file) =>
            setSubmissionData((data) => ({
              ...data,
              zipFolder: { name: file.name, size: file.size },
            }))
          }
        />
        <FileInput
          name='compiledPDF'
          collection='submission'
          MIMEType='pdf'
          data={submission}
          callback={(file) =>
            setSubmissionData((data) => ({
              ...data,
              compiledPDF: { name: file.name, size: file.size },
            }))
          }
        />
        <FileInput
          name='diffPDF'
          collection='submission'
          MIMEType='pdf'
          data={submission}
          callback={(file) =>
            setSubmissionData((data) => ({
              ...data,
              diffPDF: { name: file.name, size: file.size },
            }))
          }
        />
        <FileInput
          name='commentPDF'
          collection='submission'
          MIMEType='pdf'
          data={submission}
          callback={(file) =>
            setSubmissionData((data) => ({
              ...data,
              commentPDF: { name: file.name, size: file.size },
            }))
          }
        />

        <Group inline>
          <Button type='neutral' onClick={handleSaveChanges} style={{ width: '100%' }}>
            {t('submission.update')}
          </Button>
        </Group>
      </SectionContainer>

      <SectionContainer>
        <Heading2 style={{ color: 'var(--negative)' }}> {t('submission.delete')}</Heading2>
        {!deleting && (
          <Button type='negative' onClick={() => setDeleting(true)} style={{ width: '250px' }}>
            {t('submission.delete')}
          </Button>
        )}
        {deleting && (
          <>
            <Chips type='notice'>{t('settings.profile.deleteAccountWarning2')}</Chips>
            <Caption>{t('submission.deleteSubWarning1')}</Caption>

            <Caption>{t('submission.deleteSubWarning2')}</Caption>
            <Input
              id='contributionName'
              label={t('submission.submissionName')}
              autoComplete='off'
              small
              value={submissionName}
              onChange={(e) => setSubmissionName(e.target.value)}
            />

            {errMsg && <Chips type='negative'>{errMsg}</Chips>}
            <LineWrapper>
              <Button style={{ width: '250px' }} type='neutral' onClick={handleCancelDelete}>
                {t('global.cancel')}
              </Button>
              <Button type='negative' style={{ width: '250px' }} onClick={handleDeleteSubmission}>
                {t('submission.delete')}
              </Button>
            </LineWrapper>
          </>
        )}
      </SectionContainer>
    </>
  );
};

export default SubmissionSettings;
