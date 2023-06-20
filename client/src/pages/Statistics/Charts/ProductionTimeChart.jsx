import React, { useState } from 'react';
import { BarChart, Bar, CartesianGrid, Tooltip, XAxis, YAxis, Label } from 'recharts';
import { Heading3, InlineGroup, SectionContainer } from '../../../theme/appElements';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Select from '../../../components/Select';

const ProductionTimeChart = ({ contributions }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [filter, setFilter] = useState(null);

  const stats = Object.entries(
    contributions
      .filter((c) => c.state === 'approved')
      .reduce((acc, c) => {
        c.submissions
          .filter((s) => s.type === 'longPaper' && s.state === 'approved')
          .sort((a, b) => new Date(a.submissionDate) - new Date(b.submissionDate))
          .slice(0, 1)
          .filter(
            (s) =>
              (!filter?.type || filter.type === s.venue.type) &&
              (!filter?.rank || filter.rank === s.venue.rank)
          )
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

  const submissionsVenuesRank = contributions
    .flatMap((c) => c.submissions)
    .reduce((acc, s) => {
      const { rank } = s.venue;
      if (!acc.includes(rank)) acc.push(rank);
      return acc;
    }, []);

  return (
    <SectionContainer>
      <Heading3>{t('statistics.productionTime.title')}</Heading3>

      <InlineGroup>
        <Select
          label={t('statistics.parameters.venueType')}
          onChange={(e) => setFilter((filter) => ({ ...filter, type: e.target.value }))}>
          <option value=''>-</option>
          <option value='conference'>{t('statistics.parameters.conference')}</option>
          <option value='journal'>{t('statistics.parameters.journal')}</option>
        </Select>

        <Select
          label={t('statistics.parameters.venueRank')}
          onChange={(e) => setFilter((filter) => ({ ...filter, rank: e.target.value }))}>
          <option value=''>-</option>
          {submissionsVenuesRank.map((rank) => (
            <option value={rank}>{rank}</option>
          ))}
        </Select>
      </InlineGroup>

      <BarChart width={752} height={500} margin={{ top: 15 }} data={stats}>
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip cursor={{ fill: 'transparent' }} />

        <XAxis dataKey='title' tick={null} />

        <YAxis dataKey='monthDiff' tick={{ fontSize: 12 }}>
          <Label
            value={t('statistics.productionTime.label')}
            angle={-90}
            fontSize={12}
            textAnchor='middle'
          />
        </YAxis>

        <Bar
          dataKey='monthDiff'
          name={t('statistics.productionTime.bar')}
          formatter={(value) => `${value} ${t('statistics.months')}`}
          fill='var(--accent)'
          cursor='pointer'
          onClick={(data) => navigate(`/contributions/${data.id}`)}
        />
      </BarChart>
    </SectionContainer>
  );
};

export default ProductionTimeChart;
