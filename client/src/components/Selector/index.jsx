import React, { useState, useEffect } from 'react';
import useSearch from '../../hooks/useSearch';
import {
  Button,
  Container,
  Counter,
  DisplayedListContainer,
  Search,
  SelectedItemsContainer,
  Toggler,
  Wrapper,
} from './selectorElements';
import { HiXMark } from 'react-icons/hi2';
import Checkbox from '../Checkbox';

const Selector = (props) => {
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
      <Toggler onClick={() => setIsOpen((prev) => !prev)} className={`${isOpen && 'open'}`}>
        {props.label}
        <Wrapper>
          <Counter>{selectedItems.length}</Counter>
          <Button onClick={() => setSelectedItems([])}>
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
              {displayedList.map((item) => (
                <Checkbox
                  key={item._id}
                  label={item.title}
                  onChange={(checked) => handleChanges(checked, item)}
                />
              ))}
            </DisplayedListContainer>
          )}
        </>
      )}
    </Container>
  );
};

export default Selector;
