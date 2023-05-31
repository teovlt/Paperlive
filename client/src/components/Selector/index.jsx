import React, { useEffect, useRef, useState } from 'react';
import useSearch from '../../hooks/useSearch';
import { Container, Input, Label } from './selectorElements';
import { HiXMark } from 'react-icons/hi2';
import { useTranslation } from 'react-i18next';

const Selector = ({ list, id, name, onChange, selected = [], label }) => {
  const search = useSearch();

  const inputRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);
  const [searchTerms, setSearchTerms] = useState('');
  const [selectedList, setSelectedList] = useState(selected);
  const [searchResults, setSearchResults] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    const listWithoutSelected = list.filter((item) => !selectedList.includes(item));
    setSearchResults(search(searchTerms, listWithoutSelected, 'title'));
  }, [searchTerms, selectedList]);

  useEffect(() => {
    onChange(selectedList);
  }, [selectedList]);

  return (
    <Container className={`${isFocused && 'focus'}`}>
      <Input
        ref={inputRef}
        small
        id={id}
        name={name}
        placeholder={' '}
        value={searchTerms}
        autoComplete='off'
        onChange={(e) => setSearchTerms(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Label small htmlFor={id} className={`${list.length > 0 && 'filled'}`}>
        {label}
      </Label>
    </Container>
  );
};

export default Selector;
