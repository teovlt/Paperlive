import React from 'react';

import { BarChart, Bar, CartesianGrid, Tooltip, XAxis, YAxis, Label, Legend } from 'recharts';
import { Heading3, SectionContainer } from '../../../theme/appElements';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
const DistributionPerRank = ({ contributions }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const submissions = contributions.flatMap((c) => c.submissions);

  const data = Object.entries(
    submissions
      .filter((s) => s.type === 'longPaper')
      .reduce((acc, s) => {
        const { rank } = s.venue;

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

  return (
    <SectionContainer>
      <Heading3>{t('statistics.data4.title')}</Heading3>

      <BarChart width={752} height={500} margin={{ top: 15 }} data={data}>
        <CartesianGrid strokeDasharray='3 3' />

        <XAxis dataKey='rank' />
        <YAxis interval={1} tick={{ fontSize: 12 }} />

        <Bar dataKey='approved' fill='var(--positive)' name={t('statistics.approved')} />
        <Bar dataKey='rejected' fill='var(--negative)' name={t('statistics.rejected')} />

        <Legend />
      </BarChart>
    </SectionContainer>
  );
};

export default DistributionPerRank;
