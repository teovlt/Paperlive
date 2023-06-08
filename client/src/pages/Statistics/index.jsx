import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import Loading from '../../components/Loading';
import { Heading2, SectionContainer } from '../../theme/appElements';
import { InfoContainer, Label, LineWrapper, Value } from './statisticsElements';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const Statistics = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const contributions = auth.contributions;
  const [scientificFields, setScientificFields] = useState(null);

  useEffect(() => {
    async function fetchScientificFields() {
      const res = await axiosPrivate.get('/scientificfields');
      setScientificFields(res.data);
    }

    fetchScientificFields();
  }, []);

  const countByState = (array) => {
    return array.reduce((acc, obj) => {
      const { state } = obj;
      if (acc[state]) {
        acc[state] += 1;
      } else {
        acc[state] = 1;
      }
      return acc;
    }, {});
  };

  const submissions = auth.contributions
    .map((contribution) => contribution.submissions)
    .reduce((acc, curr) => acc.concat(curr), []);

  if (!scientificFields) return <Loading />;

  const averageRejectionRateByScientificField = contributions.reduce((acc, obj) => {
    const { scientificField } = obj;
    if (acc[scientificField.label]) {
      acc[scientificField.label] = {
        count: acc[scientificField.label].count + obj.submissions.length,
        states: { ...acc[scientificField.label].states, ...countByState(obj.submissions) },
      };
    } else {
      acc[scientificField.label] = {
        count: obj.submissions.length,
        states: countByState(obj.submissions),
      };
    }
    return acc;
  }, {});

  const data = Object.entries(averageRejectionRateByScientificField)
    .filter((entry) => {
      console.log(entry);
    })
    .map(([field, { count, states }]) => ({
      name: field,
      approved: Math.floor((states.approved / count) * 100),
      rejected: Math.floor((states.rejected / count) * 100),
    }));

  return (
    <>
      <SectionContainer>
        <Heading2>Team Statistics</Heading2>
        <LineWrapper>
          <InfoContainer>
            <Label>Contributions</Label>
            <Value>{contributions.length}</Value>
          </InfoContainer>

          <InfoContainer>
            <Label>Submissions</Label>
            <Value>{submissions.length}</Value>
          </InfoContainer>
        </LineWrapper>

        <LineWrapper>
          <InfoContainer>
            <Label>Acceptation rate</Label>
            <Value>
              {submissions.length > 0
                ? `${Math.floor((countByState(submissions).approved / submissions.length) * 100)}%`
                : '-'}
            </Value>
          </InfoContainer>
        </LineWrapper>
      </SectionContainer>
    </>
  );
};

export default Statistics;
