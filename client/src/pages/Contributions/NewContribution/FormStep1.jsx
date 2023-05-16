import React, { useEffect, useRef, useState } from 'react';
import Input from '../../../components/Input';
import RadioGroup from '../../../components/RadioGroup';
import {
  LinearContainer,
  RelatedContributionSearchContainer,
  RelatedContributionSearchResult,
  RelatedContributionSearchResultContainer,
} from '../contributionsElements';
import Chips from '../../../components/Chips';
import { Button } from '../../../theme/appElements';
import { useTranslation } from 'react-i18next';
import useAuth from '../../../hooks/useAuth';
import useSearch from '../../../hooks/useSearch';
import { useNavigate } from 'react-router-dom';

const FormStep1 = ({ contributionData, setContributionData, errorMsg, setErrorMsg, next }) => {
  const { t } = useTranslation();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const search = useSearch();

  const searchRelatedContributionRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);
  const [searchResult, setSearchResult] = useState();

  useEffect(() => {
    setSearchResult(auth.contributions);
  }, [auth]);

  useEffect(() => {
    setSearchResult(search(contributionData.relatedContribution, auth.contributions, 'title'));
  }, [contributionData.relatedContribution]);

  return (
    <>
      <Input
        small
        id='title'
        value={contributionData?.title}
        label={t('contribution.title')}
        autoComplete='off'
        onChange={(event) => {
          const newContributionData = { ...contributionData, title: event.target.value };
          setContributionData(newContributionData);
        }}
      />
      <Input
        small
        id='date'
        type='date'
        value={contributionData?.startDate}
        label={t('contribution.startDate')}
        autoComplete='off'
        onChange={(event) => {
          const newContributionData = { ...contributionData, startDate: event.target.value };
          setContributionData(newContributionData);
        }}
      />
      <RadioGroup
        name='role'
        onChange={(event) => {
          const newContributionData = { ...contributionData, teamRole: event.target.value };
          setContributionData(newContributionData);
        }}
        template={{
          label: t('contribution.teamRole'),
          radios: [
            {
              label: t('contribution.leader'),
              value: 'leader',
              defaultChecked: contributionData?.teamRole === 'leader',
            },
            {
              label: t('contribution.coLeader'),
              value: 'coLeader',
              defaultChecked: contributionData?.teamRole === 'coLeader',
            },
            {
              label: t('contribution.guest'),
              value: 'guest',
              defaultChecked: contributionData?.teamRole === 'guest',
            },
          ],
        }}
      />
      <RelatedContributionSearchContainer>
        <Input
          small
          id='related'
          value={contributionData?.relatedContribution}
          label={`${t('contribution.related')}*`}
          ref={searchRelatedContributionRef}
          autoComplete='off'
          onChange={(event) => {
            const newContributionData = {
              ...contributionData,
              relatedContribution: event.target.value,
            };
            setContributionData(newContributionData);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {isFocused && searchResult?.length > 0 && (
          <RelatedContributionSearchResultContainer className='open'>
            {searchResult.map((result, index) => (
              <RelatedContributionSearchResult
                key={index}
                onMouseDown={(e) => {
                  e.preventDefault();
                  const newContributionData = {
                    ...contributionData,
                    relatedContribution: result.title,
                  };
                  setContributionData(newContributionData);
                  searchRelatedContributionRef.current.blur();
                }}>
                {result.title}
              </RelatedContributionSearchResult>
            ))}
          </RelatedContributionSearchResultContainer>
        )}
      </RelatedContributionSearchContainer>
      {errorMsg && <Chips type='negative'>{errorMsg}</Chips>}
      <LinearContainer>
        <Button style={{ width: '160px' }} type='neutral' onClick={() => navigate(-1)}>
          {t('global.cancel')}
        </Button>
        <Button
          style={{ width: '160px' }}
          onClick={() => {
            const missings = Object.keys(contributionData).filter(
              (key) =>
                key !== 'filename' && key !== 'relatedContribution' && contributionData[key] === ''
            );
            if (missings.length <= 0) {
              next();
            } else {
              const errorMsg = `${t('contribution.errorMsg')} ${missings
                .map((key) => t(`contribution.${key}`))
                .join(', ')}`;
              setErrorMsg(errorMsg);
            }
          }}>
          {t('global.next')}
        </Button>
      </LinearContainer>
    </>
  );
};

export default FormStep1;
