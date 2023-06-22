import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { Heading2 } from '../../theme/appElements';
import AcceptationRejectionChartByType from './Charts/AcceptationRejectionChartByType';
import TeamRoleDistributionChart from './Charts/TeamRoleDistributionChart';
import ProductionTimeChart from './Charts/ProductionTimeChart';
import ProductionCostChart from './Charts/ProductionCostChart';

import DistributionPerRank from './Charts/DistributionChartPerRank';
import AuthorParticipationCharts from './Charts/AuthorParticipationCharts';

const Statistics = () => {
  const { t } = useTranslation();
  const { auth } = useAuth();

  const contributions = auth.contributions;

  return (
    <>
      <Heading2>{t('statistics.statistics')}</Heading2>
      <AcceptationRejectionChartByType contributions={contributions} />
      <TeamRoleDistributionChart contributions={contributions} />
      <ProductionTimeChart contributions={contributions} />
      <ProductionCostChart contributions={contributions} />
      <DistributionPerRank contributions={contributions} />
      <AuthorParticipationCharts contributions={contributions} />
    </>
  );
};

export default Statistics;
