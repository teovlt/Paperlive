import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { Heading2 } from '../../theme/appElements';
import DistributionByRolePerRank from './Charts/DistributionByRolePerRank';
import ProductionTime from './Charts/ProductionTime';
import ProductionCost from './Charts/ProductionCost';
import DistributionPerRank from './Charts/DistributionPerRank';

const Statistics = () => {
  const { t } = useTranslation();
  const { auth } = useAuth();

  const contributions = auth.contributions;
  const submissions = contributions.flatMap((c) => c.submissions);

  return (
    <>
      <Heading2>{t('statistics.statistics')}</Heading2>
      <DistributionByRolePerRank contributions={contributions} />
      <ProductionTime contributions={contributions}></ProductionTime>
      <ProductionCost contributions={contributions}></ProductionCost>
      <DistributionPerRank contributions={contributions} />
    </>
  );
};

export default Statistics;
