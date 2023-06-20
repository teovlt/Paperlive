import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { Heading2 } from '../../theme/appElements';
import DistributionByRolePerRank from './Charts/DistributionByRolePerRank';
import ProductionTime from './Charts/ProductionTime';
import ProductionCost from './Charts/ProductionCost';
import DistributionPerRank from './Charts/DistributionPerRank';
import AcceptationRejectionChart from './Charts/AcceptationRejectionChart';

const Statistics = () => {
  const { t } = useTranslation();
  const { auth } = useAuth();

  const contributions = auth.contributions;

  return (
    <>
      <Heading2>{t('statistics.statistics')}</Heading2>
      <AcceptationRejectionChart contributions={contributions} />

      {/* <DistributionByRolePerRank contributions={contributions} /> */}
      {/* <ProductionTime contributions={contributions} /> */}
      {/* <ProductionCost contributions={contributions} /> */}
      {/* <DistributionPerRank contributions={contributions} /> */}
    </>
  );
};

export default Statistics;
