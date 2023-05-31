import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { InfoContainer, Label, SectionContainer, Value } from './submissionElements';
import { Heading2 } from '../../theme/appElements';
import { useTranslation } from 'react-i18next';

const Submission = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const { auth } = useAuth();

  const submission = auth.contributions
    .find((c) => c.submissions?.find((c) => c._id === id))
    .submissions.find((c) => c._id === id);

  return (
    <>
      <SectionContainer>
        <Heading2>{t('submission.informations')}</Heading2>
        <InfoContainer>
          <Label>Titre</Label>
          <Value>{submission.title}</Value>
        </InfoContainer>
      </SectionContainer>
    </>
  );
};

export default Submission;
