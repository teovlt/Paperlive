import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../../../hooks/useAuth';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { Heading2 } from '../../../theme/appElements';
import {
  InfoContainer,
  Label,
  LineWrapper,
  Link,
  SectionContainer,
  Value,
} from './contributionElements';
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

  const contribution = auth.contributions?.find((c) => c._id === id);

  const handleDownload = async (e) => {
    e.preventDefault();
    const res = await axiosPrivate.get(
      `${import.meta.env.VITE_API_URI}/api/files/${contribution.abstract}`,
      { responseType: 'blob' }
    );

    const url = URL.createObjectURL(res.data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', contribution?.abstract);
    link.click();
  };

  return (
    <>
      <SectionContainer>
        <Heading2>{t('contribution.informations')}</Heading2>
        <InfoContainer>
          <Label>Titre</Label>
          <Value>{contribution.title}</Value>
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
        <LineWrapper>
          <InfoContainer>
            <Label>{t('contribution.abstract')}</Label>
            <Value>
              <Link onClick={handleDownload}>{t('global.download')}</Link>
            </Value>
          </InfoContainer>
          <InfoContainer>
            <Label>{t('contribution.state')}</Label>
            <Value>{t(`contribution.${contribution.state}`)}</Value>
          </InfoContainer>
        </LineWrapper>
      </SectionContainer>
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
                new Intl.DateTimeFormat(i18n.language, {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                }).format(new Date(value)),
            },
            {
              name: 'state',
              label: 'State',
              icon: <HiOutlineSparkles />,
              operator: (value) => value,
            },
            {
              name: 'venue',
              label: 'Venue',
              icon: <HiOutlineMicrophone />,
              operator: (value) => value?.name,
            },
          ]}
        />
      </SectionContainer>
    </>
  );
};

export default Contribution;
