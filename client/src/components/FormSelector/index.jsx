import React, { useEffect, useState } from 'react';
import useSearch from '../../hooks/useSearch';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import RadioGroup from '../RadioGroup';
import Input from '../Input';
import {
  Container,
  DisplayedListContainer,
  ResultsButton,
  Placeholder,
  Search,
  Toggler,
  Wrapper,
  ButtonCircle,
  Counter,
  PillContainer,
  Pill,
  PillLabel,
  PillButton,
  SelectedItemsContainer,
  ModalBackdrop,
  ModalContainer,
  ModalRowWrapper,
} from './formSelectorElements';
import { Button, Heading2 } from '../../theme/appElements';
import { HiXMark } from 'react-icons/hi2';
import Checkbox from '../Checkbox';
import { useTranslation } from 'react-i18next';

const FormSelector = ({
  list,
  setList,
  selected,
  setSelected,
  displayedAttribute,
  label,
  modelName,
  schema,
  unique = false,
}) => {
  const search = useSearch();
  const axiosPrivate = useAxiosPrivate();

  const { t } = useTranslation();

  const defaultItem = Object.keys(schema).reduce((acc, key) => {
    acc[key] = schema[key].default;
    return acc;
  }, {});

  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, item: defaultItem });
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedItems, setSelectedItems] = useState(selected);
  const [displayedList, setDisplayedList] = useState(null);

  const handleSave = async (item) => {
    if (!Object.keys(defaultItem).some((key) => item[key] === '' || item[key] === undefined)) {
      if (item._id) {
        const res = await axiosPrivate.put(`/${modelName}/${item._id}`, item);
        if (unique) setSelectedItems([{ ...res.data, ...item }]);
        else
          setSelectedItems((prev) => [
            ...prev.filter((i) => i._id !== item._id),
            { ...res.data, ...item },
          ]);
      } else {
        const res = await axiosPrivate.post(`/${modelName}`, item);
        if (unique) setSelectedItems([{ ...res.data, ...item }]);
        else setSelectedItems((prev) => [...prev, { ...res.data, ...item }]);
      }
      setModal({ isOpen: false, item: defaultItem });
    }
  };

  useEffect(() => {
    setDisplayedList(list.filter((item) => !selectedItems.map((i) => i._id).includes(item._id)));
  }, [list]);

  useEffect(() => {
    setList((prev) => [
      ...prev.filter((item) => !selectedItems.map((i) => i._id).includes(item._id)),
      ...selectedItems,
    ]);
    setSelected(selectedItems);
  }, [selectedItems]);

  useEffect(() => {
    setDisplayedList(
      list.filter(
        (i) =>
          !selectedItems.includes(i) && search(searchQuery, list, displayedAttribute).includes(i)
      )
    );
  }, [searchQuery]);

  return (
    <>
      {modal.isOpen && (
        <>
          <ModalBackdrop onClick={() => setModal({ isOpen: false, item: defaultItem })} />
          <ModalContainer>
            <Heading2>{t(`submission.${label.toLowerCase()}`)}</Heading2>
            {Object.keys(schema).map((key, index) => {
              if (schema[key].type === 'boolean')
                return (
                  <RadioGroup
                    key={index}
                    name={key}
                    label={schema[key].label}
                    template={{
                      radios: [
                        {
                          label: t('global.yes'),
                          value: true,
                          defaultChecked: schema[key].default === true,
                        },
                        {
                          label: t('global.no'),
                          value: false,
                          defaultChecked: schema[key].default === false,
                        },
                      ],
                    }}
                    onChange={(e) =>
                      setModal((prev) => ({
                        ...prev,
                        item: { ...prev.item, [key]: JSON.parse(e.target.value) },
                      }))
                    }
                  />
                );
              else
                return (
                  <Input
                    key={index}
                    small
                    type={schema[key].type}
                    label={schema[key].label}
                    id={key}
                    autoComplete='off'
                    value={modal.item[key] || ''}
                    onChange={(e) =>
                      setModal((prev) => ({
                        ...prev,
                        item: { ...prev.item, [key]: e.target.value },
                      }))
                    }
                  />
                );
            })}
            <ModalRowWrapper>
              <Button
                type={selectedItems.includes(modal.item) ? 'negative' : 'neutral'}
                onClick={() => {
                  if (selectedItems.includes(modal.item)) {
                    setSelectedItems((prev) => prev.filter((i) => i !== modal.item));
                    setModal({ isOpen: false, item: defaultItem });
                  } else setModal({ isOpen: false, item: defaultItem });
                }}>
                {selectedItems.includes(modal.item) ? t('global.remove') : t('global.cancel')}
              </Button>
              <Button onClick={() => handleSave(modal.item)}>
                {modal.item._id
                  ? selectedItems.includes(modal.item)
                    ? t('selector.saveChanges')
                    : t('selector.saveChangesAdd')
                  : t('selector.createAdd')}
              </Button>
            </ModalRowWrapper>
          </ModalContainer>
        </>
      )}
      <Container>
        <Toggler
          onClick={() => setIsOpen(!isOpen)}
          className={`${isOpen && 'open'} ${selectedItems.length > 0 && 'filled'}`}>
          <Placeholder>{t(`submission.${label.toLowerCase()}`)}</Placeholder>
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
            {!unique && <Counter>{selectedItems.length}</Counter>}
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
              value={searchQuery}
              placeholder={t('global.search') + '...'}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {selectedItems.length > 0 && (
              <SelectedItemsContainer>
                {selectedItems.map((item, index) => (
                  <Checkbox
                    key={item._id || index}
                    label={item[displayedAttribute]}
                    onClick={() => setModal({ isOpen: true, item: item })}
                    defaultChecked={true}
                  />
                ))}
              </SelectedItemsContainer>
            )}
            <DisplayedListContainer>
              {displayedList.map((item, index) => (
                <Checkbox
                  key={item._id || index}
                  label={item[displayedAttribute]}
                  onClick={() => setModal({ isOpen: true, item: { ...item, isMainAuthor: false } })}
                />
              ))}
              <ResultsButton onClick={() => setModal({ isOpen: true, item: defaultItem })}>
                +{' '}
                {t(
                  `submission.new${unique ? label.toLowerCase() : label.slice(0, -1).toLowerCase()}`
                )}
              </ResultsButton>
            </DisplayedListContainer>
          </>
        )}
      </Container>
    </>
  );
};

export default FormSelector;
