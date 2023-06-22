import React, { useEffect, useRef, useState } from 'react';
import { HiXMark } from 'react-icons/hi2';
import {
  ButtonCircle,
  Container,
  Counter,
  Input,
  Pill,
  PillButton,
  PillContainer,
  PillLabel,
  Placeholder,
  Toggler,
  Wrapper,
} from './inputSelectorElements';
import { useTranslation } from 'react-i18next';

const InputSelector = ({ label, selected, callback }) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(selected);

  const selectorRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    callback(selectedItems);
  }, [selectedItems]);

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

    async function handleInputKeyDown(e) {
      if (e.key === 'Enter') {
        if (e.target.value !== '') {
          await setSelectedItems((prev) => [...prev, e.target.value]);
          e.target.value = '';
        }
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);

      console.log(isOpen);

      inputRef.current?.focus();
      inputRef.current?.addEventListener('keydown', handleInputKeyDown);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <Container ref={selectorRef}>
      <Toggler
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen && 'open'} ${selectedItems.length > 0 && 'filled'}`}>
        <Placeholder>{label}</Placeholder>
        <PillContainer>
          {selectedItems.map((item, index) => (
            <Pill key={index}>
              <PillLabel>{item}</PillLabel>
              <PillButton
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItems((prev) => prev.filter((_, i) => i !== index));
                }}>
                <HiXMark />
              </PillButton>
            </Pill>
          ))}
        </PillContainer>
        <Wrapper>
          <Counter>{selected.length}</Counter>
          <ButtonCircle
            onClick={(e) => {
              e.stopPropagation();
              setSelectedItems([]);
            }}>
            <HiXMark />
          </ButtonCircle>
        </Wrapper>
      </Toggler>
      {isOpen && <Input ref={inputRef} />}
    </Container>
  );
};

export default InputSelector;
