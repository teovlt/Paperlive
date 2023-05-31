import React, { useState, useEffect } from 'react';
import useSearch from '../../hooks/useSearch';
import {
  Button,
  Container,
  Counter,
  Search,
  SearchResultContainer,
  SelectedContainer,
  Toggler,
  Wrapper,
} from './selectorElements';
import { HiXMark } from 'react-icons/hi2';
import Checkbox from '../Checkbox';

const Selector = (props) => {
  const search = useSearch();

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerms, setSearchTerms] = useState('');
  const [searchResults, setSearchResults] = useState(props.list);

  const [selected, setSelected] = useState(props.selected);

  const handleChanges = (checked, contribution) => {
    if (checked) {
      const updatedSelected = [...selected];
      updatedSelected.push(contribution);
      setSelected(updatedSelected);
    } else {
      const updatedSelected = [...selected.filter((c) => c !== contribution)];
      setSelected(updatedSelected);
    }
  };

  useEffect(() => {
    props.onChange(selected);
  }, [selected]);

  useEffect(() => {
    const results = search(searchTerms, props.list, 'title');
    setSearchResults(results);
  }, [searchTerms, selected]);

  return (
    <Container>
      <Toggler onClick={() => setIsOpen((prev) => !prev)} className={`${isOpen && 'open'}`}>
        {props.label}
        <Wrapper>
          <Counter>{selected.length}</Counter>
          {/* FIXME don't close selector on click */}
          <Button onClick={(e) => setSelected((prev) => [])}>
            <HiXMark />
          </Button>
        </Wrapper>
      </Toggler>
      {isOpen && (
        <>
          <Search
            placeholder='Rechercher...'
            value={searchTerms}
            onInput={(e) => setSearchTerms(e.target.value)}
          />
          {selected.length > 0 && (
            <SelectedContainer>
              {selected.map((item) => (
                <Checkbox
                  key={item._id}
                  label={item.title}
                  defaultChecked={true}
                  onChange={(checked) => handleChanges(checked, item)}
                />
              ))}
            </SelectedContainer>
          )}
          {searchResults.filter((c) => !selected.includes(c)).length > 0 && (
            <SearchResultContainer>
              {searchResults
                .filter((c) => !selected.includes(c))
                .map((item) => (
                  <Checkbox
                    key={item._id}
                    label={item.title}
                    onChange={(checked) => handleChanges(checked, item)}
                  />
                ))}
            </SearchResultContainer>
          )}
        </>
      )}
    </Container>
  );
};

export default Selector;
