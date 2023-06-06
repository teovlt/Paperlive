import useAuth from '../../../hooks/useAuth';
import { Group, SectionContainer } from '../submissionElements';
import Selector from '../../../components/Selector';
import Input from '../../../components/Input';
import RadioGroup from '../../../components/RadioGroup';
import { Button, Heading2 } from '../../../theme/appElements';
import { useNavigate } from 'react-router-dom';

const Informations = ({ data, setData }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  return (
    <SectionContainer>
      <Heading2>Informations</Heading2>
      <Selector
        unique
        list={auth.contributions}
        selected={data.contribution ? [data.contribution] : []}
        label='Contribution'
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
        label='Title'
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
        label='Submission date'
        value={data.submissionDate}
        onChange={(e) => {
          const updatedData = { ...data, submissionDate: e.target.value };
          setData(updatedData);
        }}
      />
      <RadioGroup
        name='type'
        label='Type'
        template={{
          radios: [
            { label: 'Poster', value: 'poster' },
            { label: 'ShortPaper', value: 'shortPaper' },
            { label: 'Contribution', value: 'contribution' },
          ],
        }}
        onChange={(e) => {
          const updatedData = { ...data, type: e.target.value };
          setData(updatedData);
        }}
      />
      <RadioGroup
        name='state'
        label='State'
        template={{
          radios: [
            { label: 'Draft', value: 'draft', defaultChecked: true },
            { label: 'Submitted', value: 'submitted' },
            { label: 'Approved', value: 'approved' },
            { label: 'Rejected', value: 'rejected' },
          ],
        }}
        onChange={(e) => {
          const updatedData = { ...data, state: e.target.value };
          setData(updatedData);
        }}
      />
      <Group inline>
        <Button type='neutral' onClick={() => navigate('/')}>
          Cancel
        </Button>
        <Button onClick={() => navigate('../authors')}>Next</Button>
      </Group>
    </SectionContainer>
  );
};

export default Informations;
