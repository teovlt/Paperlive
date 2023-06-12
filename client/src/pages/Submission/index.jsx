import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import {
  InfoContainer,
  Label,
  LineWrapper,
  Value,
  Link,
  LinkModal,
  Modal,
  BackModal,
} from './submissionElements';
import { Button, Heading2, SectionContainer } from '../../theme/appElements';
import { useTranslation } from 'react-i18next';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Submission = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const contribution = auth.contributions.find((c) => c.submissions?.find((s) => s._id === id));
  const submission = contribution.submissions?.find((c) => c._id === id);
  const [isOpenAuthor, setIsOpenAuthor] = useState(false);
  const [isOpenVenue, setIsOpenVenue] = useState(false);
  const [authorDisplay, setAuthorDisplay] = useState(null);

  const handleDownload = async (name) => {
    const res = await axiosPrivate.get(
      `${import.meta.env.VITE_API_URI}/api/files/submission-${name}-${id}.pdf`,
      { responseType: 'blob' }
    );

    const url = URL.createObjectURL(res.data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `submission-${name}-${id}.pdf`);
    link.click();
  };

  return (
    <>
      <SectionContainer>
        <Heading2>{t('submission.informations')}</Heading2>
        <InfoContainer>
          <Label>{t('global.contribution')}</Label>
          <Link to={`/contributions/${contribution._id}`}>{contribution.title}</Link>
        </InfoContainer>

        <InfoContainer>
          <Label>{t('submission.title')}</Label>
          <Value>{submission.title}</Value>
        </InfoContainer>

        <InfoContainer>
          <Label>{t('submission.link')}</Label>
          {submission.link ? (
            <Link targer='_blank' to={`//${submission.link.split('//').pop()}`} target='_blank'>
              {submission.link}
            </Link>
          ) : (
            <Value>-</Value>
          )}
        </InfoContainer>

        <LineWrapper>
          <InfoContainer>
            <Label>{t('submission.date')}</Label>
            <Value>
              {submission.submissionDate
                ? new Intl.DateTimeFormat(i18n.language, {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  }).format(new Date(submission.submissionDate))
                : '-'}
            </Value>
          </InfoContainer>
          <InfoContainer>
            <Label>{t('submission.venue')}</Label>
            {submission.venue ? (
              <LinkModal onClick={() => setIsOpenVenue(true)}>{submission.venue.name}</LinkModal>
            ) : (
              <Value>-</Value>
            )}
          </InfoContainer>
        </LineWrapper>

        <LineWrapper>
          <InfoContainer>
            <Label>{t('submission.type')}</Label>
            <Value>{submission.type ? t(`submission.${submission.type}`) : '-'}</Value>
          </InfoContainer>
          <InfoContainer>
            <Label>{t('submission.state')}</Label>
            <Value
              style={{
                color: `var(--${
                  { submitted: 'notice', rejected: 'negative', approved: 'positive' }[
                    submission.state
                  ]
                })`,
              }}>
              {t(`submission.${submission.state}`) || '-'}
            </Value>
          </InfoContainer>
        </LineWrapper>

        <LineWrapper>
          {' '}
          <InfoContainer>
            <Label>{t('submission.link')}</Label>
            {submission.link ? (
              <Link targer='_blank' to={`//${submission.link.split('//').pop()}`} target='_blank'>
                {submission.link}
              </Link>
            ) : (
              <Value>-</Value>
            )}
          </InfoContainer>
          <InfoContainer>
            <Label>{t('submission.materialCost')}</Label>
            <Value>{submission.materialCost ? submission.materialCost + ' €' : '-'}</Value>
          </InfoContainer>
        </LineWrapper>
        <InfoContainer>
          <Label>{t('submission.authors')}</Label>
          <Value>
            {submission.authors.length > 0
              ? submission.authors.map((author, index) => (
                  <LinkModal
                    key={index}
                    onClick={() => {
                      setIsOpenAuthor(true);
                      setAuthorDisplay(author);
                    }}>
                    {author.name}
                  </LinkModal>
                ))
              : '-'}
          </Value>
        </InfoContainer>
      </SectionContainer>

      <SectionContainer>
        <Heading2>{t('submission.files')}</Heading2>
        <InfoContainer>
          <Label>{t('submission.abstract')}</Label>
          {submission.abstract ? (
            <Link onClick={() => handleDownload('abstract')}>Download</Link>
          ) : (
            <Value>-</Value>
          )}
        </InfoContainer>

        <InfoContainer>
          <Label>{t('submission.zipFolder')}</Label>
          {submission.zipFolder ? (
            <Link onClick={() => handleDownload('zipfolder')}>Download</Link>
          ) : (
            <Value>-</Value>
          )}
        </InfoContainer>

        <InfoContainer>
          <Label>{t('submission.compiledPDF')}</Label>
          {submission.compiledPDF ? (
            <Link onClick={() => handleDownload('compiledpdf')}>Download</Link>
          ) : (
            <Value>-</Value>
          )}
        </InfoContainer>

        <InfoContainer>
          <Label>{t('submission.diffPDF')}</Label>
          {submission.diffPDF ? (
            <Link onClick={() => handleDownload('diffpdf')}>Download</Link>
          ) : (
            <Value>-</Value>
          )}
        </InfoContainer>

        <InfoContainer>
          <Label>{t('submission.commentPDF')}</Label>
          {submission.commentPDF ? (
            <Link onClick={() => handleDownload('commentpdf')}>Download</Link>
          ) : (
            <Value>-</Value>
          )}
        </InfoContainer>
      </SectionContainer>
      <SectionContainer>
        <Heading2>{t('submission.abstract')}</Heading2>
        <Value style={{ textAlign: 'justify ', whiteSpace: 'pre-wrap' }}>
          {submission?.abstract || '-'}
        </Value>
      </SectionContainer>
      {isOpenAuthor && (
        <BackModal onClick={() => setIsOpenAuthor(false)}>
          <Modal>
            <SectionContainer>
              <InfoContainer>
                <Label>{t('author.name')}</Label>
                <Value>{authorDisplay.name}</Value>
              </InfoContainer>
              <InfoContainer>
                <Label>{t('author.grade')}</Label>
                <Value>{authorDisplay.grade}</Value>
              </InfoContainer>
              <InfoContainer>
                <Label>{t('author.country')}</Label>
                <Value>{authorDisplay.country}</Value>
              </InfoContainer>
              <InfoContainer>
                <Label>{t('author.workTimeMonth')}</Label>
                <Value>{authorDisplay.workTime}</Value>
              </InfoContainer>{' '}
              <InfoContainer>
                <Label>{t('author.hourlyCost')}</Label>
                <Value>{authorDisplay.hourlyCost}</Value>
              </InfoContainer>
              <Button onClick={() => setIsOpenAuthor(false)}>{t('global.back')}</Button>
            </SectionContainer>
          </Modal>
        </BackModal>
      )}
      {isOpenVenue && (
        <BackModal onClick={() => setIsOpenVenue(false)}>
          <Modal>
            <SectionContainer>
              <InfoContainer>
                <Label>{t('venue.name')}</Label>
                <Value>{submission.venue.name}</Value>
              </InfoContainer>
              <InfoContainer>
                <Label>{t('venue.type')}</Label>
                <Value>{submission.venue.type}</Value>
              </InfoContainer>
              <InfoContainer>
                <Label>{t('venue.rank')}</Label>
                <Value>{submission.venue.rank}</Value>
              </InfoContainer>

              <Button onClick={() => setIsOpenVenue(false)}>{t('global.back')}</Button>
            </SectionContainer>
          </Modal>
        </BackModal>
      )}
    </>
  );
};

export default Submission;
