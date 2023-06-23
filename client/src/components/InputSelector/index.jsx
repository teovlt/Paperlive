import React, { useEffect, useRef, useState } from 'react';
import useSearch from '../../hooks/useSearch';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useTranslation } from 'react-i18next';
import {
  ButtonCircle,
  Container,
  Counter,
  DisplayedListContainer,
  NoResults,
  Pill,
  PillButton,
  PillContainer,
  PillLabel,
  Placeholder,
  Search,
  SelectedItemsContainer,
  Toggler,
  Wrapper,
} from './inputSelectorElements';
import Checkbox from '../Checkbox';
import { HiXMark } from 'react-icons/hi2';

const InputSelector = ({
  list,
  setList,
  selected,
  setSelected,
  displayedAttribute,
  label,
  modelName,
}) => {
  const { t } = useTranslation();
  const search = useSearch();
  const axiosPrivate = useAxiosPrivate();

  // States
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState(selected);
  const [items, setItems] = useState(list);

  // Elements ref
  const selectorRef = useRef(null);
  const inputRef = useRef(null);

  // Values ref
  const queryRef = useRef('');
  const listRef = useRef(list);
  const selectedItemsRef = useRef(selectedItems);

  useEffect(() => {
    async function handleInput(e) {
      if (e.key === 'Enter') {
        if (queryRef.current) {
          const item = listRef.current.find(
            (item) => item[displayedAttribute].toLowerCase() === queryRef.current?.toLowerCase()
          );

          if (item) {
            if (!selectedItemsRef.current.includes(item)) {
              setSelectedItems((prev) => [...prev, item]);
            }
          } else {
            const res = await axiosPrivate.post(`/${modelName}`, {
              [displayedAttribute]: queryRef.current.trim(),
            });
            listRef.current = [...listRef.current, res.data];
            setSelectedItems((prev) => [...prev, res.data]);
          }
        }
        setQuery('');
      }
    }

    if (isOpen === true) {
      inputRef.current?.focus();
      inputRef.current?.addEventListener('keydown', handleInput);
    }
  }, [isOpen]);

  useEffect(() => {
    selectedItemsRef.current = [...selectedItems];
    setSelected(selectedItems);
  }, [selectedItems]);

  useEffect(() => {
    setItems(listRef.current);
    setList(listRef.current);
  }, [listRef.current]);

  return (
    <Container ref={selectorRef}>
      <Toggler
        onClick={() => setIsOpen((prev) => !prev)}
        className={`${isOpen && 'open'} ${selectedItems.length > 0 && 'filled'}`}>
        <Placeholder>{label}</Placeholder>
        <PillContainer>
          {selectedItems.map((item, index) => (
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
        </PillContainer>
        <Wrapper>
          <Counter>{selectedItems.length}</Counter>
          <ButtonCircle
            onClick={(e) => {
              e.stopPropagation();
              setSelectedItems([]);
            }}>
            <HiXMark />
          </ButtonCircle>
        </Wrapper>
      </Toggler>

      {isOpen && (
        <>
          <Search
            ref={inputRef}
            value={query}
            onInput={(e) => {
              setQuery(e.target.value);
              queryRef.current = e.target.value;
            }}
            placeholder={t('global.search') + '...'}
          />
          {selectedItems.length > 0 && (
            <SelectedItemsContainer>
              {selectedItems.map((item, index) => (
                <Checkbox
                  key={item._id || index}
                  label={item[displayedAttribute]}
                  defaultChecked
                  onClick={() => setSelectedItems((prev) => [...prev.filter((i) => i !== item)])}
                />
              ))}
            </SelectedItemsContainer>
          )}
          {items.filter(
            (item) =>
              !selectedItemsRef.current.includes(item) &&
              search(query, items, displayedAttribute).includes(item)
          ).length > 0 ? (
            <DisplayedListContainer>
              {items
                .filter(
                  (item) =>
                    !selectedItemsRef.current.includes(item) &&
                    search(query, items, displayedAttribute).includes(item)
                )
                .slice(0, 8)
                .map((item, index) => (
                  <Checkbox
                    key={item._id || index}
                    label={item[displayedAttribute]}
                    onClick={() => setSelectedItems((prev) => [...prev, item])}
                  />
                ))}
            </DisplayedListContainer>
          ) : (
            <DisplayedListContainer>
              <NoResults>{t('contribution.pressEnter')}</NoResults>
            </DisplayedListContainer>
          )}
        </>
      )}
    </Container>
  );
};

export default InputSelector;
