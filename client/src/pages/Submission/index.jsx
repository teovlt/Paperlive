import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { InfoContainer, Label, LineWrapper, Value, Link } from './submissionElements';
import { Heading2, SectionContainer } from '../../theme/appElements';
import { useTranslation } from 'react-i18next';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Submission = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const contribution = auth.contributions.find((c) => c.submissions?.find((s) => s._id === id));
  const submission = contribution.submissions?.find((c) => c._id === id);

  const handleDownload = async (label) => {
    const res = await axiosPrivate.get(`${import.meta.env.VITE_API_URI}/api/files/${label}`, {
      responseType: 'blob',
    });

    const url = URL.createObjectURL(res.data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `submission?.${label}`);
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
            <Value>{submission.venue?.name || '-'}</Value>
          </InfoContainer>
        </LineWrapper>

        <LineWrapper>
          <InfoContainer>
            <Label>{t('submission.type')}</Label>
            <Value>{submission.type ? t(`submission.${submission.type}`) : '-'}</Value>
          </InfoContainer>
          <InfoContainer>
            <Label>{t('submission.state')}</Label>
            <Value> {t(`submission.${submission.state}`) || '-'}</Value>
          </InfoContainer>
        </LineWrapper>

        <InfoContainer>
          <Label>{t('submission.authors')}</Label>
          <Value>
            {submission.authors.length > 0
              ? submission.authors.map((author, index) => (
                  <Link key={index} to={`/authors/${author._id}`}>
                    {author.name}
                  </Link>
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
            <Link onClick={() => handleDownload(submission.abstract)}>Download</Link>
          ) : (
            <Value>-</Value>
          )}
        </InfoContainer>

        <InfoContainer>
          <Label>{t('submission.zipFolder')}</Label>
          {submission.zipFolder ? (
            <Link onClick={() => handleDownload(submission.zipFolder)}>Download</Link>
          ) : (
            <Value>-</Value>
          )}
        </InfoContainer>

        <InfoContainer>
          <Label>{t('submission.compiledPDF')}</Label>
          {submission.compiledPDF ? (
            <Link onClick={() => handleDownload(submission.compiledPDF)}>Download</Link>
          ) : (
            <Value>-</Value>
          )}
        </InfoContainer>

        <InfoContainer>
          <Label>{t('submission.diffPDF')}</Label>
          {submission.diffPDF ? (
            <Link onClick={() => handleDownload(submission.diffPDF)}>Download</Link>
          ) : (
            <Value>-</Value>
          )}
        </InfoContainer>

        <InfoContainer>
          <Label>{t('submission.commentPDF')}</Label>
          {submission.commentPDF ? (
            <Link onClick={() => handleDownload(submission.commentPDF)}>Download</Link>
          ) : (
            <Value>-</Value>
          )}
        </InfoContainer>
      </SectionContainer>
    </>
  );
};

export default Submission;
