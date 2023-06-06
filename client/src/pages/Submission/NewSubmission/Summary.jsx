import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { Button, Heading2 } from '../../../theme/appElements';
import { toast } from 'react-toastify';
import Chips from '../../../components/Chips';
import {
  Group,
  InfoContainer,
  Label,
  LineWrapper,
  SectionContainer,
  Value,
} from '../submissionElements';
import useAuth from '../../../hooks/useAuth';

const Summary = ({ data }) => {
  const { t, i18n } = useTranslation();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [errMsg, setErrMsg] = useState(null);

  const notify = () => {
    toast.success(t('toast.submissionCreatedSucess'), {
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

  const handleSave = async () => {
    if (data.contribution && data.title) {
      const submission = {
        contributionId: data.contribution._id,
        commentPdf: data.commentPdf?.name,
        ...data,
      };
      delete submission.contribution;
      delete submission.abstract;
      delete submission.zipFolder;
      delete submission.compiledPdf;
      delete submission.diffPdf;
      delete submission.commentPdf;
      try {
        await axiosPrivate.post('/submissions/new', submission);
        const contributions = await axiosPrivate.get('/contributions');
        setAuth((prev) => ({ ...prev, contributions: contributions.data }));
        navigate(`/contributions/${data.contribution._id}`);
        notify();
      } catch (error) {}
    } else
      setErrMsg(
        `Missing fields: ${Object.keys(data)
          .filter(
            (key) => (key === 'contribution' && !data[key]) || (key === 'title' && !data[key])
          )
          .map((key) => t(`submission.${key}`))
          .join(', ')}`
      );
  };

  useEffect(() => {
    setErrMsg('');
  }, [i18n.language]);

  return (
    <SectionContainer>
      <Heading2>Summary</Heading2>
      <InfoContainer>
        <Label>Contribution</Label>
        <Value>{data.contribution?.title || '-'}</Value>
      </InfoContainer>
      <InfoContainer>
        <Label>Title</Label>
        <Value>{data.title || '-'}</Value>
      </InfoContainer>
      <LineWrapper>
        <InfoContainer>
          <Label>Submission Date</Label>
          <Value>
            {/* {data.submissionDate
              ? new Intl.DateTimeFormat(i18n.language, {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                }).format(data.submissionDate)
              : '-'} */}
          </Value>
        </InfoContainer>
        <InfoContainer>
          <Label>Venue</Label>
          <Value>{data.venue?.name || '-'}</Value>
        </InfoContainer>
      </LineWrapper>
      <LineWrapper>
        <InfoContainer>
          <Label>Type</Label>
          <Value>{data.type || '-'}</Value>
        </InfoContainer>
        <InfoContainer>
          <Label>State</Label>
          <Value>{data.state || '-'}</Value>
        </InfoContainer>
      </LineWrapper>
      <InfoContainer>
        <Label>Authors</Label>
        <Value>{data.authors?.map((author) => author.name).join(', ') || '-'}</Value>
      </InfoContainer>
      <InfoContainer>
        <Label>Documents</Label>
        <Value>{data.zipFolder?.name || '-'}</Value>
      </InfoContainer>
      <InfoContainer>
        <Label>Abstract</Label>
        <Value>{data.abstract?.name || '-'}</Value>
      </InfoContainer>
      <InfoContainer>
        <Label>File</Label>
        <Value>{data.compiledPdf?.name || '-'}</Value>
      </InfoContainer>
      <InfoContainer>
        <Label>Difference</Label>
        <Value>{data.diffPdf?.name || '-'}</Value>
      </InfoContainer>
      <InfoContainer>
        <Label>Comments</Label>
        <Value>{data.commentPdf?.name || '-'}</Value>
      </InfoContainer>
      {errMsg && <Chips type='negative'>{errMsg}</Chips>}
      <Group inline>
        <Button type='neutral' onClick={() => navigate('../files')}>
          Previous
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </Group>
    </SectionContainer>
  );
};

export default Summary;
