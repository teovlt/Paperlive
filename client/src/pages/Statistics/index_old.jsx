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
