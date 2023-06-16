import React, { useState } from 'react';

import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button, Heading1, Heading2, Heading3, SectionContainer } from '../../theme/appElements';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import RadioGroup from '../../components/RadioGroup';
import Input from '../../components/Input';

function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const Statistics = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const contributions = auth.contributions;
  const submissions = contributions.flatMap((c) => c.submissions);

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

          acc[id] = {
            title,
            cost:
              (acc[id]?.cost ?? 0) +
              authors.reduce(
                (acc, curr) => (acc += curr.hourlyCost * curr.workTime * 21.67 * 7),
                0
              ),
          };
        });
        return acc;
      }, {})
  )
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => b.cost - a.cost);

  const data4 = Object.entries(
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

  const data5 = Object.entries(
    submissions
      .filter((s) => s.type === 'longPaper')
      .reduce((acc, s) => {
        const { rank } = s.venue;
        const year = new Date(s.submissionDate).getFullYear();

        switch (s.state) {
          case 'approved':
            acc[year] = {
              ...acc[year],
              [rank]: { ...acc[year]?.[rank], approved: (acc[year]?.[rank]?.approved ?? 0) + 1 },
            };
            break;
          case 'rejected':
            acc[year] = {
              ...acc[year],
              [rank]: { ...acc[year]?.[rank], rejected: (acc[year]?.[rank]?.rejected ?? 0) + 1 },
            };
            break;
        }

        return acc;
      }, {})
  )
    .map(([year, data]) => ({ year, ...data }))
    .sort((a, b) => a.year - b.year);

  const data6 = Object.entries(
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

  const filter7 = { type: 'conference' };

  const [yearDisplay, setYearDisplay] = useState(null);
  const [yearDisplay2, setYearDisplay2] = useState(null);

  const data7 = Object.entries(
    submissions.reduce((acc, s) => {
      const { type } = s.venue;
      const submissionYear = new Date(s.submissionDate).getFullYear();

      if (
        yearDisplay !== null &&
        yearDisplay2 !== null &&
        submissionYear >= yearDisplay &&
        submissionYear <= yearDisplay2
      ) {
        console.log(submissionYear);
        //Changer en fonction des types
        if (!acc[submissionYear]) {
          acc[submissionYear] = { approved: 0, rejected: 0 };
        }

        switch (s.state) {
          case 'approved':
            acc[submissionYear].approved += 1;
            break;
          case 'rejected':
            acc[submissionYear].rejected += 1;
            break;
          default:
            break;
        }
      }

      return acc;
    }, {})
  )
    .map(([year, counts]) => ({ year, ...counts }))
    .sort((a, b) => a.year - b.year);

  const filter = {
    rank: 'B',
  };

  const data8 = Object.entries(
    submissions
      .filter(
        (s) => s.state === 'approved' && s.type === 'longPaper' && s.venue.rank === filter.rank
      )
      .reduce((acc, s) => {
        const year = new Date(s.submissionDate).getFullYear();

        s.authors.flatMap((author) => {
          const { _id: id } = author;
          acc[year] = { ...acc[year], [id]: (acc[year]?.[id] ?? 0) + 1 };
        });

        return acc;
      }, {})
  )
    .map(([year, data]) => ({ year, ...data }))
    .sort((a, b) => a.year - b.year);

  return (
    <>
      <Heading2>Statistics</Heading2>

      {/* <RadioGroup
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
      /> */}

      <Heading3>{t('statistics.data7.title')}</Heading3>
      <Input type='text' onChange={(e) => setYearDisplay(e.target.value)} label='année'></Input>
      <Input type='text' onChange={(e) => setYearDisplay2(e.target.value)} label='année'></Input>
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
            value={t('statistics.data7.label')}
            offset={20}
            angle={-90}
            fontSize={12}
            textAnchor='middle'
          />
        </YAxis>
        <Legend />
        <Bar dataKey='approved' fill='#20a4f3' name={t('statistics.approved')} />
        <Bar dataKey='rejected' fill='#ff3366' name={t('statistics.rejected')} />
      </BarChart>
    </>

    //   <Heading3>{t('statistics.data.title')}</Heading3>
    //   <BarChart width={752} height={500} margin={{ top: 15 }} data={data}>
    //     <CartesianGrid strokeDasharray='3 3' />
    //   <SectionContainer>
    //     <BarChart width={752} height={500} data={data8} margin={{ top: 15 }}>
    //       <CartesianGrid strokeDasharray='3 3' />
    //       <XAxis dataKey='year' tick={{ fontSize: 12 }} />
    //       <YAxis interval={1} tick={{ fontSize: 12 }} />
    //     </BarChart>
    //   </SectionContainer>

    //   {/* <SectionContainer>
    //     <LineChart width={752} height={200} data={data8} margin={{ top: 15 }}>
    //       <CartesianGrid strokeDasharray='3 3' />

    //       <XAxis dataKey='year' />
    //       <YAxis interval={3} />
    //       {Object.entries(data8).map(([_, e]) =>
    //         Object.entries(e).map(([key, _], index) => {
    //           if (key !== 'year') {
    //             return (
    //               <Line key={index} dataKey={key} stroke={getRandomColor()} activeDot={{ r: 8 }} />
    //             );
    //           }
    //         })
    //       )}
    //     </LineChart>
    //   </SectionContainer> */}

    //   <SectionContainer>
    //     <Heading3>Distribution of Approved Long Papers per Venue Rank and Team Roles</Heading3>
    //     <BarChart width={752} height={500} margin={{ top: 15 }} data={data}>
    //       <CartesianGrid strokeDasharray='3 3' />

    //       <XAxis dataKey='rank' tick={{ fontSize: 12 }} />
    //       <YAxis interval={1} tick={{ fontSize: 12 }}>
    //         <Label
    //           value='Nombre de participations'
    //           offset={20}
    //           angle={-90}
    //           fontSize={12}
    //           textAnchor='middle'
    //         />
    //       </YAxis>

    //       <Bar dataKey='leader' fill='#20a4f3' />
    //       <Bar dataKey='coLeader' fill='#2ec4b6' />
    //       <Bar dataKey='guest' fill='#ff3366' />

    //       <Legend />
    //     </BarChart>
    //   </SectionContainer>

    //   <Heading3>{t('statistics.data2.title')}</Heading3>
    //   <SectionContainer>
    //     <Heading3>
    //       Production Time for Contributions: Longest Approval Time by Contribution and Duration
    //     </Heading3>

    //     <BarChart width={752} height={500} margin={{ top: 15 }} data={data2}>
    //       <CartesianGrid strokeDasharray='3 3' />
    //       <Tooltip cursor={{ fill: 'transparent' }} />

    //       <XAxis dataKey='title' tick={null} />

    //       <YAxis dataKey='monthDiff' tick={{ fontSize: 12 }}>
    //         <Label value='Durée (mois)' offset={20} angle={-90} fontSize={12} textAnchor='middle' />
    //       </YAxis>

    //       <Bar
    //         dataKey='monthDiff'
    //         fill='var(--accent)'
    //         cursor='pointer'
    //         onClick={(data) => navigate(`/contributions/${data.id}`)}
    //       />
    //     </BarChart>
    //   </SectionContainer>

    //   <SectionContainer>
    //     <Heading3>
    //       Production Cost for Contributions: Cost Analysis by Contribution and Expense Amount
    //     </Heading3>

    //     <BarChart width={752} height={500} margin={{ top: 15 }} data={data3}>
    //       <CartesianGrid strokeDasharray='3 3' />
    //       <Tooltip cursor={{ fill: 'transparent' }} />

    //       <XAxis dataKey='title' tick={null} />

    //       <YAxis dataKey='cost' tick={{ fontSize: 12 }}>
    //         <Label value='Coût (€)' offset={20} angle={-90} fontSize={12} textAnchor='middle' />
    //       </YAxis>

    //       <Bar
    //         dataKey='cost'
    //         fill='var(--accent)'
    //         cursor='pointer'
    //         onClick={(data) => navigate(`/contributions/${data.id}`)}
    //       />
    //     </BarChart>
    //   </SectionContainer>

    //   <SectionContainer>
    //     <Heading3>Distribution of Approved and Rejected Submissions by Rank</Heading3>

    //     <BarChart width={752} height={500} margin={{ top: 15 }} data={data4}>
    //       <CartesianGrid strokeDasharray='3 3' />

    //       <XAxis dataKey='rank' />
    //       <YAxis interval={1} tick={{ fontSize: 12 }} />

    //       <Bar dataKey='approved' fill='var(--positive)' />
    //       <Bar dataKey='rejected' fill='var(--negative)' />

    //       <Legend />
    //     </BarChart>
    //   </SectionContainer>

    //   <SectionContainer>
    //     <Heading3>Distribution of Approved and Rejected Submissions by Venue Type</Heading3>

    //     <BarChart width={752} height={500} margin={{ top: 15 }} data={data6}>
    //       <CartesianGrid strokeDasharray='3 3' />

    //       <XAxis dataKey='type' />
    //       <YAxis interval={1} tick={{ fontSize: 12 }} />

    //       <Bar dataKey='approved' fill='var(--positive)' />
    //       <Bar dataKey='rejected' fill='var(--negative)' />

    //       <Legend />
    //     </BarChart>
    //   </SectionContainer>

    //   <SectionContainer>
    //     <Heading3>Number of reject and acceptation per year and per type of venue</Heading3>
    //     <BarChart
    //       width={752}
    //       height={500}
    //       margin={{
    //         top: 15,
    //       }}
    //       data={data7}>
    //       <CartesianGrid strokeDasharray='3 3' />
    //       <XAxis dataKey='year' tick={{ fontSize: 12 }} />
    //       <YAxis interval={1} tick={{ fontSize: 12 }}>
    //         <Label
    //           value='Nombre de rejet/acceptation'
    //           offset={20}
    //           angle={-90}
    //           fontSize={12}
    //           textAnchor='middle'
    //         />
    //       </YAxis>
    //       <Legend />
    //       <Bar dataKey='approved' fill='#20a4f3' />
    //       <Bar dataKey='rejected' fill='#ff3366' />
    //     </BarChart>
    //   </SectionContainer>
    // </>
  );
};

export default Statistics;
