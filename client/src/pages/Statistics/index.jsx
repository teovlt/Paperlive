import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

import { Heading2, SectionContainer, Paragraph } from '../../theme/appElements';

const Statistics = () => {
  const { auth } = useAuth();

  const contributions = auth.contributions;
  const submissions = auth.contributions.reduce((acc, curr) => acc.concat(curr.submissions), []);

  const venues = submissions.map((submission) => submission.venue);

  const ranks = venues.map((venue) => venue.rank);
  const rankA = ranks.filter((rank) => rank === 'a');
  const rankB = ranks.filter((rank) => rank === 'b');
  const rankC = ranks.filter((rank) => rank === 'c');

  const roles = auth.contributions.reduce((acc, curr) => acc.concat(curr.teamRole), []);
  const leader = roles.filter((role) => role === 'leader');
  const coLeader = roles.filter((role) => role === 'coLeader');
  const guest = roles.filter((role) => role === 'guest');

  return (
    <>
      <SectionContainer>
        <Heading2> {ranks}</Heading2>
        <Paragraph>Il y a : {rankA.length} rang A utilisé</Paragraph>
        <Paragraph> Il y a : {rankB.length}rang B utilisé</Paragraph>
        <Paragraph>Il y a : {rankC.length}rang C utilisé</Paragraph>
        <Heading2> {roles}</Heading2>
        <Paragraph>Il y a : {leader.length} contribution ou je suis leader</Paragraph>
        <Paragraph> Il y a : {coLeader.length} contribution ou je suis coLeader</Paragraph>
        <Paragraph>Il y a : {guest.length} contribution ou je suis guest</Paragraph>
      </SectionContainer>
    </>
  );
};

export default Statistics;
