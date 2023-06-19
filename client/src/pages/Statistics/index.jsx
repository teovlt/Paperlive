import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { Heading2 } from '../../theme/appElements';
import DistributionPerRank from './Charts/DistributionPerRank';
import ProductionTime from './Charts/ProductionTime';
import MultiRangeSlider from '../../components/MultiRangeSlider';

const Statistics = () => {
  const { t } = useTranslation();
  const { auth } = useAuth();

  const contributions = auth.contributions;
  const submissions = contributions.flatMap((c) => c.submissions);

  return (
    <>
      <MultiRangeSlider min={0} max={25} onChange={() => console.log('change')} />
      <Heading2>{t('statistics.statistics')}</Heading2>
      <DistributionPerRank contributions={contributions} />
      <ProductionTime contributions={contributions}></ProductionTime>
    </>
  );
};

export default Statistics;
