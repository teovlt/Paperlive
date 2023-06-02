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
} from './selectorElements';
import { HiXMark } from 'react-icons/hi2';
import Checkbox from '../Checkbox';

const Selector = (props) => {
  const { t } = useTranslation();
  const search = useSearch();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedItems, setSelectedItems] = useState(props.selected);
  const [displayedList, setDisplayedList] = useState(
    props.list.filter((item) =>
      props.list.filter((item) => !props.selected.map((i) => i._id).includes(item._id))
    )
  );

  const handleChanges = (checked, item) => {
    if (checked) {
      const updatedSelectedItems = [...selectedItems, item];
      setSelectedItems(updatedSelectedItems);
    } else {
      const updatedSelectedItems = selectedItems.filter((selectedItem) => selectedItem !== item);
      setSelectedItems(updatedSelectedItems);
    }
  };

  useEffect(() => {
    props.onChange(selectedItems);
    setDisplayedList(
      props.list.filter(
        (item) =>
          !selectedItems.map((c) => c._id).includes(item._id) &&
          search(searchQuery, props.list, 'title')
            .map((c) => c._id)
            .includes(item._id)
      )
    );
  }, [selectedItems]);

  useEffect(() => {
    setDisplayedList(
      props.list.filter(
        (item) =>
          !selectedItems.map((c) => c._id).includes(item._id) &&
          search(searchQuery, props.list, 'title')
            .map((c) => c._id)
            .includes(item._id)
      )
    );
  }, [searchQuery]);

  return (
    <Container>
      <Toggler
        onClick={(e) => setIsOpen(!isOpen)}
        className={`${isOpen && 'open'} ${selectedItems.length > 0 && 'filled'}`}>
        <Placeholder>{t('contribution.related')}</Placeholder>
        <PillContainer>
          {selectedItems.slice(0, 4).map((item) => (
            <Pill key={item._id}>
              <PillLabel>{item.title}</PillLabel>
              <PillButton
                onClick={(e) => {
                  e.stopPropagation();
                  const updatedSelectedItems = selectedItems.filter(
                    (selectedItem) => selectedItem !== item
                  );
                  setSelectedItems(updatedSelectedItems);
                }}>
                <HiXMark />
              </PillButton>
            </Pill>
          ))}
          {selectedItems.length > 4 && '...'}
        </PillContainer>
        <Wrapper>
          <Counter>{selectedItems.length}</Counter>
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
            placeholder='Rechercher...'
            value={searchQuery}
            onInput={(e) => setSearchQuery(e.target.value)}
          />
          {selectedItems.length > 0 && (
            <SelectedItemsContainer>
              {selectedItems.map((item) => (
                <Checkbox
                  key={item._id}
                  label={item.title}
                  onChange={(checked) => handleChanges(checked, item)}
                  defaultChecked={true}
                />
              ))}
            </SelectedItemsContainer>
          )}
          {displayedList.length > 0 && (
            <DisplayedListContainer>
              {displayedList.slice(0, 8).map((item) => (
                <Checkbox
                  key={item._id}
                  label={item.title}
                  onChange={(checked) => handleChanges(checked, item)}
                />
              ))}
              {/* TODO: Search for more resutls */}
            </DisplayedListContainer>
          )}
        </>
      )}
    </Container>
  );
};

export default Selector;
