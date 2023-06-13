import React, { useState } from 'react';

import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

import { Button, Caption, Heading1, Heading2, SectionContainer } from '../../theme/appElements';
import { Bar, BarChart, CartesianGrid, Label, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import RadioGroup from '../../components/RadioGroup';

const Statistics = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const contributions = auth.contributions;
  const submissions = auth.contributions.reduce((acc, curr) => acc.concat(curr.submissions), []);
  const [typeFilter, setTypeFilter] = useState('conference');

  const data7 = Object.entries(
    submissions.reduce((acc, s) => {
      const { type } = s.venue;
      const year = new Date(s.submissionDate).getFullYear();

      if (type === typeFilter) {
        if (!acc[year]) {
          acc[year] = { approved: 0, rejected: 0 };
        }

        switch (s.state) {
          case 'approved':
            acc[year].approved += 1;
            break;
          case 'rejected':
            acc[year].rejected += 1;
            break;
          default:
            break;
        }
      }

      return acc;
    }, {})
  ).map(([year, counts]) => ({ year, ...counts }));

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
              if (acc[s.venue.rank]) {
                if (acc[s.venue.rank][c.teamRole]) acc[s.venue.rank][c.teamRole] += 1;
                else acc[s.venue.rank] = { ...acc[s.venue.rank], [c.teamRole]: 1 };
              } else {
                acc[s.venue.rank] = { [c.teamRole]: 1 };
              }
            }
          });
        return acc;
      }, {})
  ).map(([rank, grades]) => ({ rank, ...grades }));

  const filters = {
    period: { startingDate: 2000, endingDate: 2025 },
  };

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
    .sort((a, b) => b.monthDiff - a.monthDiff);

  const data3 = Object.entries(
    contributions
      .filter((c) => c.state === 'approved')
      .reduce((acc, c) => {
        c.submissions.flatMap((s) => {
          const { _id: id, title } = c;
          const { materialCost, authors } = s;

          if (acc[id]) {
            acc[id] = {
              ...acc[id],
              cost:
                acc[id].cost +
                materialCost +
                authors.reduce(
                  (acc, curr) => (acc += curr.hourlyCost * curr.workTime * 21.67 * 7),
                  0
                ),
            };
          } else {
            acc[id] = {
              title,
              cost:
                materialCost +
                authors.reduce(
                  (acc, curr) => (acc += curr.hourlyCost * curr.workTime * 21.67 * 7),
                  0
                ),
            };
          }
        });
        return acc;
      }, {})
  )
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => b.cost - a.cost);

  if (contributions.length <= 0 || submissions.length <= 0)
    return <Caption>Missing data for statistics </Caption>;

  return (
    <SectionContainer>
      <RadioGroup
        name='type'
        label='type de venue'
        template={{
          radios: [
            {
              label: 'conference',
              value: 'conference',
              defaultChecked: typeFilter === 'conference',
            },
            {
              label: 'journal',
              value: 'journal',
              defaultChecked: typeFilter === 'journal',
            },
          ],
        }}
        onChange={(e) => {
          setTypeFilter(e.target.value);
        }}
      />
      <BarChart
        width={752}
        height={500}
        margin={{
          top: 15,
        }}
        data={data7}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='year' tick={{ fontSize: 12 }} />
        <YAxis interval={1} tick={{ fontSize: 12 }}>
          <Label
            value='Nombre de rejet/acceptation'
            offset={20}
            angle={-90}
            fontSize={12}
            textAnchor='middle'
          />
        </YAxis>
        <Legend />
        <Bar dataKey='approved' fill='#20a4f3' />
        <Bar dataKey='rejected' fill='#ff3366' />
      </BarChart>
      <Heading1>Statistics</Heading1>
      <Heading2>
        Number of differents roles for each rank with approved longPaper contribution
      </Heading2>
      <BarChart
        width={752}
        height={500}
        margin={{
          top: 15,
        }}
        data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='rank' tick={{ fontSize: 12 }} />
        <YAxis interval={1} tick={{ fontSize: 12 }}>
          <Label
            value='Nombre de participations'
            offset={20}
            angle={-90}
            fontSize={12}
            textAnchor='middle'
          />
        </YAxis>
        <Legend />
        <Bar dataKey='leader' fill='#20a4f3' />
        <Bar dataKey='coLeader' fill='#2ec4b6' />
        <Bar dataKey='guest' fill='#ff3366' />
      </BarChart>
      <Heading2>Time for each contribution to be accepted</Heading2>

      <BarChart width={752} height={500} margin={{ top: 15 }} data={data2}>
        <CartesianGrid strokeDasharray='3 3' />

        <XAxis dataKey='title' tick={{ fontSize: 12 }} />

        <YAxis dataKey='monthDiff' tick={{ fontSize: 12 }}>
          <Label value='Durée (mois)' offset={20} angle={-90} fontSize={12} textAnchor='middle' />
        </YAxis>

        <Bar
          dataKey='monthDiff'
          fill='var(--accent)'
          onClick={(value) => navigate(`/contributions/${value.id}`)}
        />
      </BarChart>
      <Heading2>The total cost for a contribution</Heading2>
      <BarChart width={752} height={500} margin={{ top: 15 }} data={data3}>
        <CartesianGrid strokeDasharray='3 3' />
        {/* <Tooltip /> */}

        <XAxis dataKey='title' tick={{ fontSize: 12 }} />

        <YAxis dataKey='cost' tick={{ fontSize: 12 }}>
          <Label value='Coût (€)' offset={20} angle={-90} fontSize={12} textAnchor='middle' />
        </YAxis>

        <Bar
          dataKey='cost'
          fill='var(--accent)'
          onClick={(value) => navigate(`/contributions/${value.id}`)}
        />
      </BarChart>
    </SectionContainer>
  );
};

export default Statistics;
