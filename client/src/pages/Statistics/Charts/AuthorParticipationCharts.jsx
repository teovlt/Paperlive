import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, Tooltip, XAxis, YAxis, Label, Legend } from 'recharts';
import { Heading3, InlineGroup, SectionContainer } from '../../../theme/appElements';
import Select from '../../../components/Select';
import { useTranslation } from 'react-i18next';

const AuthorParticipationCharts = ({ contributions }) => {
  const { t } = useTranslation();

  const [filter, setFilter] = useState(null);

  function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  const stats = contributions
    .flatMap((c) => c.submissions.filter((s) => !filter?.type || filter.type === s.venue?.type))
    .reduce((acc, s) => {
      const year = new Date(s.submissionDate).getFullYear();
      if (!year) return acc;

      s.authors?.forEach((author) => {
        const { _id: id, name } = author;
        const existingData = acc.find((item) => item.year === year && item.id === id);

        if (existingData) existingData.count += 1;
        else acc.push({ year, id, name, count: 1 });
      });

      return acc;
    }, [])
    .sort((a, b) => a.year - b.year);

  return (
    <SectionContainer>
      <InlineGroup>
        <Select
          label={t('statistics.parameters.venueType')}
          onChange={(e) => setFilter((filter) => ({ ...filter, type: e.target.value }))}>
          <option value=''>-</option>
          <option value='conference'>{t('statistics.parameters.conference')}</option>
          <option value='journal'>{t('statistics.parameters.journal')}</option>
        </Select>
      </InlineGroup>
      <LineChart width={752} height={500} margin={{ top: 15 }} data={stats}>
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip />

        <XAxis
          dataKey='year'
          type='number'
          domain={[
            Math.min(...stats.map((item) => item.year)),
            Math.max(...stats.map((item) => item.year)),
          ]}
          tickCount={
            Math.max(...stats.map((item) => item.year)) -
            Math.min(...stats.map((item) => item.year))
          }
        />

        <YAxis
          domain={[0, Math.max(...stats.map((item) => item.count)) + 1]}
          tickCount={Math.max(...stats.map((item) => item.count)) + 2}
        />

        {stats.map((authorData) => (
          <Line
            key={authorData.id}
            type='monotone'
            data={stats.filter(
              (item) => item.year === authorData.year && item.id === authorData.id
            )}
            name={authorData.name}
            dataKey='count'
            stroke={getRandomColor()}
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </SectionContainer>
  );
};

export default AuthorParticipationCharts;
