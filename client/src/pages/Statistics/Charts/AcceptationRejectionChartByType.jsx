import React, { useEffect, useState } from 'react';
import { BarChart, Bar, CartesianGrid, Tooltip, XAxis, YAxis, Legend } from 'recharts';
import { Heading3, InlineGroup, SectionContainer } from '../../../theme/appElements';
import Select from '../../../components/Select';
import { useTranslation } from 'react-i18next';

const AcceptationRejectionChartByType = ({ contributions }) => {
  const { t } = useTranslation();

  const submissions = contributions.flatMap((c) => c.submissions);

  const [filter, setFilter] = useState(null);

  const statsByType = Object.entries(
    submissions
      .filter(
        (s) =>
          s.type === 'longPaper' &&
          (!filter?.type || filter.type === s.venue?.type) &&
          (!filter?.start || filter.start <= new Date(s.submissionDate).getFullYear()) &&
          (!filter?.end || filter.end >= new Date(s.submissionDate).getFullYear())
      )
      .reduce((acc, s) => {
        const { type } = s.venue;

        switch (s.state) {
          case 'approved':
            acc[type] = { ...acc[type], approved: (acc[type]?.approved ?? 0) + 1 };
            break;
          case 'rejected':
            acc[type] = { ...acc[type], rejected: (acc[type]?.rejected ?? 0) + 1 };
            break;
        }

        return acc;
      }, {})
  )
    .map(([type, data]) => ({ type, ...data }))
    .sort((a, b) => a.type - b.type);

  const statsByYear = Object.entries(
    submissions
      .filter(
        (s) =>
          s.type === 'longPaper' &&
          (!filter?.type || filter.type === s.venue?.type) &&
          (!filter?.start || filter.start <= new Date(s.submissionDate).getFullYear()) &&
          (!filter?.end || filter.end >= new Date(s.submissionDate).getFullYear())
      )
      .reduce((acc, s) => {
        const { type } = s.venue;
        const year = new Date(s.submissionDate).getFullYear();

        switch (s.state) {
          case 'approved':
            acc[year] = {
              ...acc[year],
              [`${type}Acceptances`]: (acc[year]?.[`${type}Acceptances`] ?? 0) + 1,
            };
            break;
          case 'rejected':
            acc[year] = {
              ...acc[year],
              [`${type}Rejections`]: (acc[year]?.[`${type}Rejections`] ?? 0) + 1,
            };
            break;
        }

        return acc;
      }, {})
  )
    .map(([year, data]) => ({ year, ...data }))
    .sort((a, b) => a.year - b.year);

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
      <Heading3>{t('statistics.acceptationRejectionChartByType.title')}</Heading3>

      <InlineGroup>
        <Select
          label={t('statistics.parameters.groupBy')}
          onChange={(e) => setFilter((filter) => ({ ...filter, groupBy: e.target.value }))}>
          <option value={t('statistics.parameters.type')}>Type</option>
          <option value={t('statistics.parameters.year')}>Year</option>
        </Select>

        <Select
          label={t('statistics.parameters.venueType')}
          onChange={(e) => setFilter((filter) => ({ ...filter, type: e.target.value }))}>
          <option value=''>-</option>
          <option value={t('statistics.parameters.conference')}>Conference</option>
          <option value={t('statistics.parameters.journal')}>Journal</option>
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

      {filter?.groupBy === 'year' ? (
        <BarChart width={752} height={500} margin={{ top: 15 }} data={statsByYear}>
          <CartesianGrid strokeDasharray='3 3' />

          <XAxis dataKey='year' />
          <YAxis interval={1} tick={{ fontSize: 12 }} />

          <Bar
            dataKey='journalAcceptances'
            stackId='journalStack'
            fill='var(--positive)'
            name={t('statistics.acceptationRejectionChartByType.journalAcceptances')}
          />
          <Bar
            dataKey='journalRejections'
            stackId='journalStack'
            fill='var(--negative)'
            name={t('statistics.acceptationRejectionChartByType.journalRejections')}
          />
          <Bar
            dataKey='conferenceAcceptances'
            stackId='conferenceStack'
            fill='#00BFFF'
            name={t('statistics.acceptationRejectionChartByType.conferenceAcceptances')}
          />
          <Bar
            dataKey='conferenceRejections'
            stackId='conferenceStack'
            fill='#DC143C'
            name={t('statistics.acceptationRejectionChartByType.conferenceRejections')}
          />

          <Legend />
        </BarChart>
      ) : (
        <BarChart width={752} height={500} margin={{ top: 15 }} data={statsByType}>
          <CartesianGrid strokeDasharray='3 3' />

          <XAxis dataKey='type' />
          <YAxis interval={1} tick={{ fontSize: 12 }} />

          <Bar dataKey='approved' fill='var(--positive)' name={t('statistics.approved')} />
          <Bar dataKey='rejected' fill='var(--negative)' name={t('statistics.rejected')} />

          <Legend />
        </BarChart>
      )}
    </SectionContainer>
  );
};

export default AcceptationRejectionChartByType;
