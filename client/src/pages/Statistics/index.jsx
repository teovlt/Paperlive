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

  const authors = submissions.map((submission) => submission.authors);
  const hourlyCost = authors.map((author) => author.map((au) => au.hourlyCost));
  const workTime = authors.map((author) => author.map((au) => au.workTime));

  const venues = submissions.map((submission) => submission.venue);

  const average = (list) => {
    let av = 0;
    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      av += parseFloat(element);
    }
    av /= list.length;
    return av;
  };

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

      <InfoContainer>
        <Label>Acceptation rate</Label>
        <Value>{`${Math.floor(
          (countByState.approved /
            submissions.filter((s) => ['approved', 'rejected'].includes(s.state)).length) *
            100
        )}%`}</Value>
      </InfoContainer>

      <Heading2>Authors Statistics</Heading2>
      <LineWrapper>
        <InfoContainer>
          <Label>Average workTime by author</Label>
          <Value>{`${average(workTime)}`}</Value>
        </InfoContainer>
        <InfoContainer>
          <Label>Average hourlyCost by author</Label>
          <Value>{`${average(hourlyCost)}`}</Value>
        </InfoContainer>
      </LineWrapper>
    </SectionContainer>
  );
}

export default Statistics;
