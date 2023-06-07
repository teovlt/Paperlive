import React, { useState, useEffect, useRef } from 'react';
import useSearch from '../../hooks/useSearch';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Container,
  Counter,
  DisplayedListContainer,
  PillContainer,
  Pill,
  Search,
  SelectedItemsContainer,
  Toggler,
  Wrapper,
  PillLabel,
  PillButton,
  Placeholder,
  NoResults,
} from './selectorElements';
import { HiXMark } from 'react-icons/hi2';
import Checkbox from '../Checkbox';

const Selector = ({ list, selected, displayedAttribute, label, onChange, unique = false }) => {
  const { t } = useTranslation();
  const search = useSearch();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedItems, setSelectedItems] = useState(selected);
  const [displayedList, setDisplayedList] = useState(
    list.filter((item) => !selected.includes(item))
  );

  const selectorRef = useRef(null);

  const handleChanges = (checked, item) => {
    if (checked) {
      if (unique) {
        setSelectedItems([item]); // Only select the current item if unique is true
      } else {
        const updatedSelectedItems = [...selectedItems, item];
        setSelectedItems(updatedSelectedItems);
      }
    } else {
      const updatedSelectedItems = selectedItems.filter((selectedItem) => selectedItem !== item);
      setSelectedItems(updatedSelectedItems);
    }
  };

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }

    function handleClickOutside(e) {
      if (selectorRef.current && !selectorRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen === true) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    onChange(selectedItems);
    setDisplayedList(
      list.filter(
        (item) =>
          !selectedItems.map((c) => c._id).includes(item._id) &&
          search(searchQuery, list, displayedAttribute)
            .map((c) => c._id)
            .includes(item._id)
      )
    );
  }, [selectedItems]);

  useEffect(() => {
    setDisplayedList(
      list.filter(
        (item) =>
          !selectedItems.map((c) => c._id).includes(item._id) &&
          search(searchQuery, list, displayedAttribute)
            .map((c) => c._id)
            .includes(item._id)
      )
    );
  }, [searchQuery]);

  return (
    <Container ref={selectorRef}>
      <Toggler
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen && 'open'} ${selectedItems.length > 0 && 'filled'}`}>
        <Placeholder>{t(`submission.${label.toLowerCase()}`)}</Placeholder>
        <PillContainer>
          {selectedItems.slice(0, 4).map((item, index) => (
            <Pill key={item._id || index}>
              <PillLabel>{item[displayedAttribute]}</PillLabel>
              <PillButton
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItems((prev) => prev.filter((i) => i !== item));
                }}>
                <HiXMark />
              </PillButton>
            </Pill>
          ))}
          {selectedItems.length > 4 && '...'}
        </PillContainer>
        <Wrapper>
          {!unique && <Counter>{selectedItems.length}</Counter>}
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedItems([]);
            }}>
            <HiXMark />
          </Button>
        </Wrapper>
      </Toggler>
      {isOpen && (
        <>
          <Search
            placeholder={t('global.search') + '...'}
            value={searchQuery}
            onInput={(e) => setSearchQuery(e.target.value)}
          />
          {selectedItems.length > 0 && (
            <SelectedItemsContainer>
              {selectedItems.map((item, index) => (
                <Checkbox
                  key={item._id || index}
                  label={item[displayedAttribute]}
                  onChange={(checked) => handleChanges(checked, item)}
                  defaultChecked={true}
                />
              ))}
            </SelectedItemsContainer>
          )}
          <DisplayedListContainer>
            {displayedList.length > 0 ? (
              displayedList
                .slice(0, 8)
                .map((item) => (
                  <Checkbox
                    key={item._id}
                    label={item[displayedAttribute]}
                    onChange={(checked) => handleChanges(checked, item)}
                  />
                ))
            ) : (
              <NoResults>{t('contribution.noResults')}</NoResults>
            )}
          </DisplayedListContainer>
        </>
      )}
    </Container>
  );
};

export default Selector;
