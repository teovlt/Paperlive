import { useParams } from 'react-router-dom';

const ContributionStatistics = () => {
  const { id } = useParams();

  return id;
};

export default ContributionStatistics;
