import { useTranslation } from 'react-i18next';
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts';
import { Heading3, InlineGroup, SectionContainer } from '../../../theme/appElements';
import { useState } from 'react';
import Select from '../../../components/Select';

const TeamRoleDistributionChart = ({ contributions }) => {
  const { t } = useTranslation();

  const [filter, setFilter] = useState(null);

  const stats = Object.entries(
    contributions
      .filter(
        (c) =>
          c.state === 'approved' &&
          (!filter?.start || filter.start <= new Date(c.startDate).getFullYear()) &&
          (!filter?.end || filter.end >= new Date(c.startDate).getFullYear())
      )
      .reduce((acc, c) => {
        c.submissions
          .filter((s) => s.type === 'longPaper' && s.state === 'approved')
          .sort((a, b) => new Date(a.submissionDate) - new Date(b.submissionDate))
          .slice(0, 1)
          .filter((s) => !filter?.type || filter.type === s.venue.type)
          .flatMap((s) => {
            const { rank } = s.venue;
            const { teamRole: role } = c;
            acc[rank] = { ...acc[rank], [role]: (acc[rank]?.[role] ?? 0) + 1 };
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

  const contributionsMinYear = contributions.reduce((min, c, i) => {
    const year = new Date(c.startDate).getFullYear();
    if (i === 0) min = year;
    else if (min > year) min = year;

    return min;
  }, -1);

  const contributionsMaxYear = contributions.reduce((max, c, i) => {
    const year = new Date(c.startDate).getFullYear();
    if (i === 0) max = year;
    else if (max < year) max = year;

    return max;
  }, -1);

  return (
    <SectionContainer>
      <Heading3>{t('statistics.distributionPerRank.title')}</Heading3>

      <InlineGroup>
        <Select
          label={t('statistics.parameters.venueType')}
          onChange={(e) => setFilter((filter) => ({ ...filter, type: e.target.value }))}>
          <option value=''>-</option>
          <option value='conference'>{t('statistics.parameters.conference')}</option>
          <option value='journal'>{t('statistics.parameters.journal')}</option>
        </Select>

        <Select
          label={t('statistics.parameters.begin')}
          onChange={(e) => setFilter((filter) => ({ ...filter, start: e.target.value }))}>
          <option value=''>-</option>
          {Array.from({ length: contributionsMaxYear - contributionsMinYear + 1 }, (_, i) => (
            <option
              key={contributionsMinYear + i}
              value={contributionsMinYear + i}
              disabled={filter?.end && contributionsMinYear + i >= filter?.end}>
              {contributionsMinYear + i}
            </option>
          ))}
        </Select>

        <Select
          label={t('statistics.parameters.end')}
          onChange={(e) => setFilter((filter) => ({ ...filter, end: e.target.value }))}>
          <option value=''>-</option>
          {Array.from({ length: contributionsMaxYear - contributionsMinYear + 1 }, (_, i) => (
            <option
              key={contributionsMinYear + i}
              value={contributionsMinYear + i}
              disabled={filter?.start && contributionsMinYear + i <= filter?.start}>
              {contributionsMinYear + i}
            </option>
          ))}
        </Select>
      </InlineGroup>

      <BarChart width={752} height={500} data={stats}>
        <CartesianGrid strokeDasharray='3 3' />

        <XAxis dataKey='rank' tick={{ fontSize: 15 }} />
        <YAxis tick={{ fontSize: 15 }} interval={1} />

        <Bar
          dataKey='leader'
          stackId='roleStack'
          fill='var(--data-visualisation-positive)'
          name={t('statistics.distributionPerRank.leader')}
        />
        <Bar
          dataKey='coLeader'
          stackId='roleStack'
          fill='var(--data-visualisation-negative)'
          name={t('statistics.distributionPerRank.coLeader')}
        />
        <Bar
          dataKey='guest'
          stackId='roleStack'
          fill='var(--data-visualisation-neutral)'
          name={t('statistics.distributionPerRank.guest')}
        />

        <Legend />
      </BarChart>
    </SectionContainer>
  );
};

export default TeamRoleDistributionChart;
