import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';

import { Heading2, SectionContainer } from '../../theme/appElements';
import { InfoContainer, Label, LineWrapper, Value } from './statisticsElements';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ReferenceLine,
  Line,
} from 'recharts';

function Statistics() {
  const { auth } = useAuth();

  const contributions = auth.contributions;

  const submissions = auth.contributions
    .map((contribution) => contribution.submissions)
    .reduce((acc, curr) => acc.concat(curr), []);

  const countByState = submissions.reduce((acc, obj) => {
    const { state } = obj;
    if (acc[state]) {
      acc[state] += 1;
    } else {
      acc[state] = 1;
    }
    return acc;
  }, {});

  const data = [
    { title: 'Contribution 1', value: 10 },
    { title: 'Contribution 2', value: 15 },
    { title: 'Contribution 3', value: 20 },
    { title: 'Contribution 4', value: 30 },
  ];

  const sum = data.reduce((acc, obj) => (acc += obj.value), 0);
  const average = sum / data.length;

  console.log(average);

  return (
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
          <Value>{`${Math.floor(
            (countByState.approved /
              submissions.filter((s) => ['approved', 'rejected'].includes(s.state)).length) *
              100
          )}%`}</Value>
        </InfoContainer>
      </LineWrapper>
    </SectionContainer>
  );
}

export default Statistics;
