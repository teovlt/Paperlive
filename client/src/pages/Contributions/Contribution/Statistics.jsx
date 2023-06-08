import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../../../hooks/useAuth';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { Heading2, Label, SectionContainer } from '../../../theme/appElements';
import Loading from '../../../components/Loading';
import { InfoContainer, LineWrapper, Value } from '../../Statistics/statisticsElements';

const ContributionStatistics = () => {
  const { t, i18n } = useTranslation();
  const { auth } = useAuth();
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();

  const [contribution, setContribution] = useState(null);

  useEffect(() => {
    setContribution(auth.contributions?.find((c) => c._id === id));
  }, [auth.contributions, id]);

  if (!contribution) return <Loading />;

  const hourlyCost = contribution.submissions.map((sub) =>
    sub.authors.map((author) => author.hourlyCost)
  );

  const workTime = contribution.submissions.map((sub) =>
    sub.authors.map((author) => author.workTime)
  );

  const average = (list) => {
    let av = 0;
    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      av += parseFloat(element);
    }
    av /= list.length;
    return av;
  };

  const nbAuthors = contribution.submissions.map((submission) =>
    submission.authors.reduce((acc, curr) => (acc += 1), 0)
  );

  return (
    <SectionContainer>
      <Heading2>{contribution.title}</Heading2>
      <InfoContainer>
        <Label>Number of authors</Label>
        <Value>{nbAuthors}</Value>
      </InfoContainer>
      <LineWrapper>
        <InfoContainer>
          <Label>Average hourly cost</Label>
          <Value>{average(hourlyCost)} €</Value>
        </InfoContainer>
        <InfoContainer>
          <Label>Average time of work</Label>
          <Value>{average(workTime)} months</Value>
        </InfoContainer>
      </LineWrapper>
    </SectionContainer>
  );
};

export default ContributionStatistics;
