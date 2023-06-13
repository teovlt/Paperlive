import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../../../hooks/useAuth';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Loading from '../../../components/Loading';
import { Heading2, SectionContainer } from '../../../theme/appElements';
import { InfoContainer, Label, LineWrapper, Link, Value } from './contributionElements';
import Table from '../../../components/Table';
import {
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlineMicrophone,
  HiOutlineSparkles,
} from 'react-icons/hi2';

const Contribution = () => {
  const { t, i18n } = useTranslation();
  const { auth } = useAuth();
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();

  const [contribution, setContribution] = useState(null);

  useEffect(() => {
    setContribution(auth.contributions?.find((c) => c._id === id));
  }, [auth.contributions, id]);

  if (!contribution) return <Loading />;

  return (
    <>
      <SectionContainer>
        <Heading2>{t('contribution.informations')}</Heading2>
        <InfoContainer>
          <Label>{t('contribution.title')}</Label>
          <Value>{contribution.title}</Value>
        </InfoContainer>
        <InfoContainer>
          <Label>{t('contribution.keywords')}</Label>
          <Value>{contribution.keywords.length > 0 ? contribution.keywords.join(', ') : '-'}</Value>
        </InfoContainer>
        <InfoContainer>
          <Label>{t('contribution.related')}</Label>
          <Value>
            {contribution.relatedContributions?.length > 0
              ? contribution.relatedContributions?.map((c, index) => (
                  <Link key={index} to={`/contributions/${c._id}`}>
                    <abbr title={c.title}>{c.title}</abbr>
                  </Link>
                ))
              : '-'}
          </Value>
        </InfoContainer>
        <LineWrapper>
          <InfoContainer>
            <Label>{t('contribution.startDate')}</Label>
            <Value>
              {new Intl.DateTimeFormat(i18n.language, {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }).format(new Date(contribution.startDate ?? 0))}
            </Value>
          </InfoContainer>
          <InfoContainer>
            <Label>{t('contribution.role')}</Label>
            <Value>{t(`contribution.${contribution.teamRole}`)}</Value>
          </InfoContainer>
        </LineWrapper>

        <InfoContainer>
          <Label>{t('contribution.state')}</Label>
          <Value
            style={{
              color: `var(--${
                { inProgress: 'notice', dropped: 'negative', approved: 'positive' }[
                  contribution.state
                ]
              })`,
            }}>
            {t(`contribution.${contribution.state}`)}
          </Value>
        </InfoContainer>
        <InfoContainer>
          <Label>{t('contribution.link')}</Label>
          {contribution.link ? (
            <Link targer='_blank' to={`//${contribution.link.split('//').pop()}`} target='_blank'>
              {contribution.link}
            </Link>
          ) : (
            <Value>-</Value>
          )}
        </InfoContainer>
      </SectionContainer>
      {contribution.abstract && (
        <SectionContainer>
          <Heading2>{t('contribution.abstract')}</Heading2>
          <Value style={{ textAlign: 'justify ', whiteSpace: 'pre-wrap' }}>
            {contribution.abstract}
          </Value>
        </SectionContainer>
      )}

      <SectionContainer>
        <Heading2>{t('global.submissions')}</Heading2>
        <Table
          name='submissions'
          list={contribution.submissions}
          searchAttr='title'
          defaultSort={{ attr: 'submissionDate', direction: 'desc' }}
          fields={[
            {
              name: 'title',
              label: 'Title',
              icon: <HiOutlineDocumentText />,
              operator: (value) => value,
            },
            {
              name: 'submissionDate',
              label: 'Date',
              icon: <HiOutlineClock />,
              operator: (value) =>
                value
                  ? new Intl.DateTimeFormat(i18n.language, {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    }).format(new Date(value))
                  : '-',
            },
            {
              name: 'state',
              label: 'State',
              style: { submitted: 'notice', rejected: 'negative', approved: 'positive' },
              icon: <HiOutlineSparkles />,
              operator: (value) => t(`submission.${value}`),
            },
            {
              name: 'venue',
              label: 'Venue',
              icon: <HiOutlineMicrophone />,
              operator: (value) => value?.name || '-',
            },
          ]}
        />
      </SectionContainer>
    </>
  );
};

export default Contribution;
