import React from 'react';
import { BarChart, Bar, CartesianGrid, Tooltip, XAxis, YAxis, Label } from 'recharts';
import { Heading3 } from '../../../theme/appElements';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const ProductionTime = ({ contributions }) => {
  const { t } = useTranslation();
  const { navigate } = useNavigate();

  const data2 = Object.entries(
    contributions
      .filter((c) => c.state === 'approved')
      .reduce((acc, c) => {
        c.submissions
          .filter((s) => s.type === 'longPaper' && s.state === 'approved')
          .sort((a, b) => new Date(a.submissionDate) - new Date(b.submissionDate))
          .slice(0, 1)
          .flatMap((s) => {
            const { _id: id, title, startDate } = c;
            const { submissionDate: endDate } = s;

            const monthDiff =
              (new Date(endDate).getFullYear() - new Date(startDate).getFullYear()) * 12 +
              (new Date(endDate).getMonth() - new Date(startDate).getMonth());

            acc[id] = { title, monthDiff };
          });
        return acc;
      }, {})
  )
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => b.monthDiff - a.monthDiff)
    .filter((m) => m.monthDiff !== 0);

  return (
    <>
      <Heading3>{t('statistics.data2.title')}</Heading3>
      <BarChart width={752} height={500} margin={{ top: 15 }} data={data2}>
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip cursor={{ fill: 'transparent' }} />

        <XAxis dataKey='title' tick={null} />

        <YAxis dataKey='monthDiff' tick={{ fontSize: 12 }}>
          <Label
            value={t('statistics.data2.label')}
            offset={20}
            angle={-90}
            fontSize={12}
            textAnchor='middle'
          />
        </YAxis>

        <Bar
          dataKey='monthDiff'
          name={t('statistics.data2.bar')}
          formatter={(value) => `${value} ${t('statistics.months')}`}
          fill='var(--accent)'
          cursor='pointer'
          onClick={(data) => navigate(`/contributions/${data.id}`)}
        />
      </BarChart>
    </>
  );
};

export default ProductionTime;
