import React, { useEffect, useRef, useState } from 'react';
import {
  Dropdown,
  DropdownContainer,
  DropdownToggle,
  MenuButton,
  MenuGroup,
  MenuLabel,
} from './dropdownMenuElements';

const DropdownMenu = ({ template, gap = 48 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ left: 0 });

  const menuToggleRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const listener = (event) => {
      if (!menuRef.current || menuRef.current.contains(event.target)) {
        return;
      }
      setIsOpen(false);
    };
    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [menuRef]);

  useEffect(() => {
    if (menuRef.current) {
      const { right } = menuRef.current.getBoundingClientRect();
      const delta = right - window.innerWidth;
      if (delta > -16) {
        setMenuPosition((prev) => ({
          ...prev,
          left: prev.left - delta - 16,
        }));
      }
    }
  }, [isOpen]);

  const handleAction = (action) => {
    action();
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownToggle
        className={isOpen && 'open'}
        ref={menuToggleRef}
        onClick={() => setIsOpen(!isOpen)}>
        {template.toggle}
      </DropdownToggle>
      {isOpen && (
        <Dropdown style={menuPosition} gap={gap} ref={menuRef}>
          {template.groups.map((group, index) => (
            <MenuGroup key={index}>
              {group.label && (
                <MenuLabel>
                  {group.label}
                  <br></br>
                  <span>{group.value}</span>
                </MenuLabel>
              )}
              {group.actions &&
                group.actions.map((action, index) => (
                  <MenuButton key={index} onClick={() => handleAction(action.onClick)}>
                    {action.label}
                  </MenuButton>
                ))}
            </MenuGroup>
          ))}
        </Dropdown>
      )}
    </DropdownContainer>
  );
};

export default DropdownMenu;
