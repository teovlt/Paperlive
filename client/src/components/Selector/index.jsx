import React, { useEffect, useRef, useState } from 'react';
import useSearch from '../../hooks/useSearch';
import {
  ChipsButton,
  ChipsContainer,
  Container,
  Input,
  Label,
  SearchResult,
  SearchResultCaption,
  SearchResultContainer,
} from './selectorElements';
import { HiXMark } from 'react-icons/hi2';
import { Caption } from '../Popup/popupElements';

const Selector = ({ list, id, name, onChange, selected = [], label }) => {
  const search = useSearch();

  const inputRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);
  const [searchTerms, setSearchTerms] = useState('');
  const [selectedList, setSelectedList] = useState(selected);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const listWithoutSelected = list.filter((item) => !selectedList.includes(item));
    setSearchResults(search(searchTerms, listWithoutSelected, 'title'));
  }, [searchTerms, selectedList]);

  useEffect(() => {
    onChange(selectedList);
  }, [selectedList]);

  return (
    <Container>
      {selectedList.length > 0 &&
        selectedList.map((item, index) => (
          <ChipsContainer key={index}>
            {item.title}
            <ChipsButton
              onMouseDown={(e) => {
                e.preventDefault();
                setSelectedList((prev) => prev.filter((c) => c._id !== item._id));
              }}>
              <HiXMark />
            </ChipsButton>
          </ChipsContainer>
        ))}
      <Input
        ref={inputRef}
        small
        id={id}
        name={name}
        placeholder={label}
        value={searchTerms}
        onChange={(e) => setSearchTerms(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Label small htmlFor={id} className={`${list.length > 0 && 'filled'}`}>
      {label}
      </Label>
      {isFocused && (
        <SearchResultContainer className='open'>
          {searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <SearchResult
                key={index}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setSearchTerms('');
                  setSelectedList((prev) => {
                    const newList = [...prev];
                    newList.push(result);
                    return newList;
                  });
                }}>
                {result.title}
              </SearchResult>
            ))
          ) : (
            <SearchResultCaption>No result</SearchResultCaption>
          )}
        </SearchResultContainer>
      )}
    </Container>
  );
};

export default Selector;
