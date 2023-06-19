import React from 'react';
import { BarChart, Bar, CartesianGrid, Tooltip, XAxis, YAxis, Label, Legend } from 'recharts';
import { Heading3, SectionContainer } from '../../../theme/appElements';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const DIstributionByVenueType = ({ contributions }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const submissions = contributions.flatMap((c) => c.submissions);

  const data = Object.entries(
    submissions
      .filter((s) => s.type === 'longPaper')
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
  return (
    <SectionContainer>
      <Heading3>{t('statistics.data6.title')}</Heading3>

      <BarChart width={752} height={500} margin={{ top: 15 }} data={data}>
        <CartesianGrid strokeDasharray='3 3' />

        <XAxis dataKey='type' />
        <YAxis interval={1} tick={{ fontSize: 12 }} />

        <Bar dataKey='approved' fill='var(--positive)' name={t('statistics.approved')} />
        <Bar dataKey='rejected' fill='var(--negative)' name={t('statistics.rejected')} />

        <Legend />
      </BarChart>
    </SectionContainer>
  );
};

export default DIstributionByVenueType;
