import React, { useEffect, useState } from 'react';
import { BarChart, Bar, CartesianGrid, Tooltip, XAxis, YAxis, Label, Legend } from 'recharts';
import { Heading3, InlineGroup, SectionContainer } from '../../../theme/appElements';
import Select from '../../../components/Select';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
const DistributionPerRank = ({ contributions }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const submissions = contributions.flatMap((c) => c.submissions);
  const [filter, setFilter] = useState(null);

  const data = Object.entries(
    submissions
      .filter(
        (s) =>
          s.type !== 'poster' &&
          (!filter?.type || filter.type === s.venue?.type) &&
          (!filter?.start || filter.start <= new Date(s.submissionDate).getFullYear()) &&
          (!filter?.end || filter.end >= new Date(s.submissionDate).getFullYear())
      )
      .reduce((acc, s) => {
        const rank = s.venue?.rank;
        if (!rank) return acc;

        switch (s.state) {
          case 'approved':
            acc[rank] = { ...acc[rank], approved: (acc[rank]?.approved ?? 0) + 1 };
            break;
          case 'rejected':
            acc[rank] = { ...acc[rank], rejected: (acc[rank]?.rejected ?? 0) + 1 };
            break;
        }

        return acc;
      }, {})
  )
    .map(([rank, data]) => ({ rank, ...data }))
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

  const submissionsVenuesTypes = contributions
    .flatMap((c) => c.submissions)
    .reduce((acc, s) => {
      const type = s.venue?.type;
      if (!type) return acc;

      if (!acc.includes(type)) acc.push(type);
      return acc;
    }, []);

  const submissionsMinYear = contributions
    .flatMap((c) => c.submissions)
    .reduce((min, s, i) => {
      const year = new Date(s.submissionDate).getFullYear();
      if (i === 0) min = year;
      else if (min > year) min = year;

      return min;
    }, -1);

  const submissionsMaxYear = contributions
    .flatMap((c) => c.submissions)
    .reduce((max, s, i) => {
      const year = new Date(s.submissionDate).getFullYear();
      if (i === 0) max = year;
      else if (max < year) max = year;

      return max;
    }, -1);

  return (
    <SectionContainer>
      <Heading3>{t('statistics..title')}</Heading3>

      <InlineGroup>
        <Select
          label={t('statistics.parameters.venueType')}
          onChange={(e) => setFilter((filter) => ({ ...filter, type: e.target.value }))}>
          <option value=''>-</option>
          {submissionsVenuesTypes.map((type, index) => (
            <option key={index} value={type}>
              {t(`statistics.parameters.${type}`)}
            </option>
          ))}
        </Select>

        <Select
          label={t('statistics.parameters.begin')}
          onChange={(e) => setFilter((filter) => ({ ...filter, start: e.target.value }))}>
          <option value=''>-</option>
          {Array.from({ length: submissionsMaxYear - submissionsMinYear + 1 }, (_, i) => (
            <option
              key={submissionsMinYear + i}
              value={submissionsMinYear + i}
              disabled={filter?.end && submissionsMinYear + i >= filter?.end}>
              {submissionsMinYear + i}
            </option>
          ))}
        </Select>

        <Select
          label={t('statistics.parameters.end')}
          onChange={(e) => setFilter((filter) => ({ ...filter, end: e.target.value }))}>
          <option value=''>-</option>
          {Array.from({ length: submissionsMaxYear - submissionsMinYear + 1 }, (_, i) => (
            <option
              key={submissionsMinYear + i}
              value={submissionsMinYear + i}
              disabled={filter?.start && submissionsMinYear + i <= filter?.start}>
              {submissionsMinYear + i}
            </option>
          ))}
        </Select>
      </InlineGroup>

      <BarChart width={752} height={500} margin={{ top: 15 }} data={data}>
        <CartesianGrid strokeDasharray='3 3' />

        <XAxis dataKey='rank' tick={{ fontSize: 15 }} />
        <YAxis interval={1} tick={{ fontSize: 15 }} />

        <Bar
          dataKey='approved'
          fill='var(--data-visualisation-positive)'
          name={t('statistics.approved')}
        />
        <Bar
          dataKey='rejected'
          fill='var(--data-visualisation-negative)'
          name={t('statistics.rejected')}
        />

        <Legend />
      </BarChart>
    </SectionContainer>
  );
};

export default DistributionPerRank;
