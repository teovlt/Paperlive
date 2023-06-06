import useAuth from '../../../hooks/useAuth';
import { Group } from '../submissionElements';
import Selector from '../../../components/Selector';
import Input from '../../../components/Input';
import RadioGroup from '../../../components/RadioGroup';
import { Button, Heading2, SectionContainer } from '../../../theme/appElements';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Informations = ({ data, setData }) => {
  const { t } = useTranslation();
  const { auth } = useAuth();
  const navigate = useNavigate();

  return (
    <SectionContainer>
      <Heading2>{t('submission.informations')}</Heading2>
      <Selector
        unique
        list={auth.contributions}
        selected={data.contribution ? [data.contribution] : []}
        label='contribution'
        displayedAttribute='title'
        onChange={(selected) => {
          const updatedData = { ...data, contribution: selected[0] };
          setData(updatedData);
        }}
      />
      <Input
        small
        type='text'
        id='title'
        label={t('submission.title')}
        value={data.title}
        onChange={(e) => {
          const updatedData = { ...data, title: e.target.value };
          setData(updatedData);
        }}
      />
      <Input
        small
        type='date'
        id='date'
        label={t('submission.date')}
        value={data.submissionDate}
        onChange={(e) => {
          const updatedData = { ...data, submissionDate: e.target.value };
          setData(updatedData);
        }}
      />
      <RadioGroup
        name='type'
        label={t('submission.type')}
        template={{
          radios: [
            {
              label: t('submission.poster'),
              value: 'poster',
              defaultChecked: data.type === 'poster',
            },
            {
              label: t('submission.shortPaper'),
              value: 'shortPaper',
              defaultChecked: data.type === 'shortPaper',
            },
            {
              label: t('submission.contribution'),
              value: 'contribution',
              defaultChecked: data.type === 'contribution',
            },
          ],
        }}
        onChange={(e) => {
          const updatedData = { ...data, type: e.target.value };
          setData(updatedData);
        }}
      />
      <RadioGroup
        name='state'
        label={t('submission.state')}
        template={{
          radios: [
            {
              label: t('submission.draft'),
              value: 'draft',
              defaultChecked: data.state === 'draft',
            },
            {
              label: t('submission.submitted'),
              value: 'submitted',
              defaultChecked: data.state === 'submitted',
            },
            {
              label: t('submission.approved'),
              value: 'approved',
              defaultChecked: data.state === 'approved',
            },
            {
              label: t('submission.rejected'),
              value: 'rejected',
              defaultChecked: data.state === 'rejected',
            },
          ],
        }}
        onChange={(e) => {
          const updatedData = { ...data, state: e.target.value };
          setData(updatedData);
        }}
      />
      <Group inline>
        <Button type='neutral' onClick={() => navigate('/')}>
          {t('global.cancel')}
        </Button>
        <Button onClick={() => navigate('../authors')}> {t('global.next')}</Button>
      </Group>
    </SectionContainer>
  );
};

export default Informations;
