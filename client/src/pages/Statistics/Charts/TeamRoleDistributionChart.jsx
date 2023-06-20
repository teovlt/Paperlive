import { useTranslation } from 'react-i18next';
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts';
import { Heading3, InlineGroup, SectionContainer } from '../../../theme/appElements';
import { useState } from 'react';
import Select from '../../../components/Select';

const TeamRoleDistributionChart = ({ contributions }) => {
  const { t } = useTranslation();

  const [filter, setFilter] = useState(null);

  const data = Object.entries(
    contributions
      .filter(
        (c) =>
          c.state === 'approved' &&
          (!filter?.start || filter.start <= new Date(c.startDate).getFullYear()) &&
          (!filter?.end || filter.end >= new Date(c.startDate).getFullYear())
      )
      .reduce((acc, c) => {
        c.submissions
          .filter(
            (s) =>
              s.type === 'longPaper' &&
              s.state === 'approved' &&
              (!filter?.type || filter.type === s.venue.type)
          )
          .sort((a, b) => new Date(a.submissionDate) - new Date(b.submissionDate))
          .slice(0, 1)
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

  console.log(data);

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
          label='Venue Type'
          onChange={(e) => setFilter((filter) => ({ ...filter, type: e.target.value }))}>
          <option value=''>-</option>
          <option value='conference'>Conference</option>
          <option value='journal'>Journal</option>
        </Select>

        <Select
          label='Begin'
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
          label='End'
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

      <BarChart width={752} height={500} data={data}>
        <CartesianGrid strokeDasharray='3 3' />

        <XAxis dataKey='rank' tick={{ fontSize: 15 }} />
        <YAxis tick={{ fontSize: 15 }} />

        <Bar dataKey='leader' stackId='roleStack' fill='#20a4f3' />
        <Bar dataKey='coLeader' stackId='roleStack' fill='#2ec4b6' />
        <Bar dataKey='guest' stackId='roleStack' fill='#ff3366' />

        <Legend />
      </BarChart>
    </SectionContainer>
  );
};

export default TeamRoleDistributionChart;
