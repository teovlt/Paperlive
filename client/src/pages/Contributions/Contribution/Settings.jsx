import { useParams } from 'react-router-dom';

const ContributionSettings = () => {
  const { id } = useParams();

  return id;
};

export default ContributionSettings;
