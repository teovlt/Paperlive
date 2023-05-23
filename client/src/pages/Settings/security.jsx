import React, { useState, useEffect } from 'react';
import { Button, Heading2 } from '../../theme/appElements';
import Input from '../../components/Input';
import Chips from '../../components/Chips';
import { useTranslation } from 'react-i18next';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useConfirm } from '../../context/ConfirmContext';

const SecuritySettings = () => {
  const { t, i18n } = useTranslation();
  const { confirm } = useConfirm();
  const axiosPrivate = useAxiosPrivate();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConf, setNewPasswordConf] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\|])(?!.*\s).{8,}$/;

  useEffect(() => {
    setErrMsg('');
  }, [oldPassword, newPassword, newPasswordConf]);

  useEffect(() => {
    if (newPasswordConf && newPassword !== newPasswordConf) {
      setErrMsg(t('register.errorPasswordConf'));
    }
    if (newPassword && !passwordRegex.test(newPassword)) {
      setErrMsg(t('register.errorPasswordFormat'));
    }
  }, [newPassword, newPasswordConf, i18n.resolvedLanguage]);

  const handleSubmit = async () => {
    if (!errMsg) {
      const confirmed = await confirm({
        title: t('settings.changePasswordConfirmationTitle'),
        caption: t('settings.changePasswordConfirmationCaption'),
        cancelLabel: t('global.cancel'),
        confirmLabel: t('global.confirm'),
      });

      if (confirmed) {
        try {
          const response = await axiosPrivate.put('/teams/change-password', {
            newPassword: newPassword,
            oldPassword: oldPassword,
          });
          setOldPassword('');
          setNewPassword('');
          setNewPasswordConf('');
          // TODO: Notification succes
        } catch (error) {
          if (!error?.response) {
            setErrMsg(t('authentication.servorError'));
          } else {
            setErrMsg(t('settings.passwordError'));
          }
        }
      }
    }
  };

  return (
    <>
      <Heading2 style={{ borderBottom: '1px solid var(--black-quaternary)' }}>
        Password and authentification
      </Heading2>
      <Input
        id='oldPassword'
        type='password'
        label={t('settings.oldPassword')}
        autoComplete='off'
        small
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <Input
        id='newPassword'
        type='password'
        label={t('settings.newPassword')}
        autoComplete='off'
        small
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Input
        id='newPasswordConf'
        type='password'
        label={t('settings.newPasswordConf')}
        autoComplete='off'
        small
        value={newPasswordConf}
        onChange={(e) => setNewPasswordConf(e.target.value)}
      />
      {errMsg && <Chips type='negative'>{errMsg}</Chips>}
      <Button type='neutral' onClick={handleSubmit}>
        Change password
      </Button>
    </>
  );
};

export default SecuritySettings;
