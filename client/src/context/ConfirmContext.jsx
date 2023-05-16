import { createContext, useCallback, useContext, useRef, useState } from 'react';
import Popup from '../components/Popup';

const defaultFunction = (p) => Promise.resolve(true);

const defaultValue = {
  confirmRef: {
    current: defaultFunction,
  },
};

const ConfirmContext = createContext(defaultValue);

export function ConfirmContextProvider({ children }) {
  const confirmRef = useRef(defaultFunction);
  return (
    <ConfirmContext.Provider value={{ confirmRef }}>
      {children}

      <ConfirmDialogWithContext />
    </ConfirmContext.Provider>
  );
}

function ConfirmDialogWithContext() {
  const [open, setOpen] = useState(false);
  const [props, setProps] = useState({});
  const resolveRef = useRef((v) => {});
  const { confirmRef } = useContext(ConfirmContext);
  confirmRef.current = (props) =>
    new Promise((resolve) => {
      setProps(props);
      setOpen(true);
      resolveRef.current = resolve;
    });
  return (
    <Popup
      onConfirm={() => {
        resolveRef.current(true);
        setOpen(false);
      }}
      onCancel={() => {
        resolveRef.current(false);
        setOpen(false);
      }}
      open={open}
      template={{
        title: props.title,
        caption: props.caption,
        cancelLabel: props.cancelLabel,
        confirmLabel: props.confirmLabel,
      }}
    />
  );
}

export function useConfirm() {
  const { confirmRef } = useContext(ConfirmContext);
  return {
    confirm: useCallback(
      (p) => {
        return confirmRef.current(p);
      },
      [confirmRef]
    ),
  };
}
