import { useTranslation } from 'react-i18next';
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts';
import { Heading3, SectionContainer } from '../../../theme/appElements';

const DistributionPerRank = ({ contributions }) => {
  const { t } = useTranslation();

  const data = Object.entries(
    contributions
      .filter((c) => c.state === 'approved')
      .reduce((acc, c) => {
        c.submissions
          .filter((s) => s.type === 'longPaper' && s.state === 'approved')
          .sort((a, b) => new Date(a.submissionDate) - new Date(b.submissionDate))
          .slice(0, 1)
          .flatMap((s) => {
            if (s.venue) {
              const { rank } = s.venue;
              const { teamRole: role } = c;
              acc[rank] = { ...acc[rank], [role]: (acc[rank]?.[role] ?? 0) + 1 };
            }
          });
        return acc;
      }, {})
  )
    .map(([rank, grades]) => ({ rank, ...grades }))
    .sort((a, b) => {
      const rankA = a.rank.replace('*', '');
      const rankB = b.rank.replace('*', '');

      if (rankA < rankB) return -1;
      else if (rankA > rankB) return 1;
      else {
        if (a.rank.includes('*') && !b.rank.includes('*')) return -1;
        else if (!a.rank.includes('*') && b.rank.includes('*')) return 1;
        else return 0;
      }
    });

  return (
    <SectionContainer>
      <Heading3>{t('statistics.distributionPerRank.title')}</Heading3>

      <BarChart width={752} height={500} data={data}>
        <CartesianGrid strokeDasharray='3 3' />

        <XAxis dataKey='rank' tick={{ fontSize: 15 }} />
        <YAxis tick={{ fontSize: 15 }} />

        <Bar dataKey='leader' fill='#20a4f3' />
        <Bar dataKey='coLeader' fill='#2ec4b6' />
        <Bar dataKey='guest' fill='#ff3366' />

        <Legend />
      </BarChart>
    </SectionContainer>
  );
};

export default DistributionPerRank;
