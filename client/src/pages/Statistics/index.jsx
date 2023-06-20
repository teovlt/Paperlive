import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { Heading2 } from '../../theme/appElements';
import AcceptationRejectionChartByType from './Charts/AcceptationRejectionChartByType';
import TeamRoleDistributionChart from './Charts/TeamRoleDistributionChart';

import ProductionTime from './Charts/ProductionTime';
import ProductionCost from './Charts/ProductionCost';
import DistributionPerRank from './Charts/DistributionPerRank';

const Statistics = () => {
  const { t } = useTranslation();
  const { auth } = useAuth();

  const contributions = auth.contributions;

  return (
    <>
      <Heading2>{t('statistics.statistics')}</Heading2>
      <AcceptationRejectionChartByType contributions={contributions} />
      <TeamRoleDistributionChart contributions={contributions} />

      {/* <ProductionTime contributions={contributions} /> */}
      {/* <ProductionCost contributions={contributions} /> */}
      {/* <DistributionPerRank contributions={contributions} /> */}
    </>
  );
};

export default Statistics;
