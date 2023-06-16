import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';
import { Heading2 } from '../../theme/appElements';
import DistributionPerRank from './Charts/DistributionPerRank';

const Statistics = () => {
  const { t } = useTranslation();
  const { auth } = useAuth();

  const contributions = auth.contributions;
  const submissions = contributions.flatMap((c) => c.submissions);

  return (
    <>
      <Heading2>{t('statistics.statistics')}</Heading2>
      <DistributionPerRank contributions={contributions} />
    </>
  );
};

export default Statistics;
