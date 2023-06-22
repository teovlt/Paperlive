import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, Tooltip, XAxis, YAxis, Label, Legend } from 'recharts';
import { Heading3, InlineGroup, SectionContainer } from '../../../theme/appElements';
import Select from '../../../components/Select';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const AuthorParticipationCharts = ({ contributions }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const submissions = contributions.flatMap((c) => c.submissions);

  function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  const filter = {
    rank: 'B',
  };

  const stats = Object.entries(
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
    <SectionContainer>
      
    </SectionContainer>
  );
};

export default AuthorParticipationCharts;
