import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { Heading2, SectionContainer } from '../../theme/appElements';
import Table from '../../components/Table';
import {
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlineSparkles,
  HiOutlineUsers,
} from 'react-icons/hi2';
import i18n from '../../translations/i18n';

function Contributions() {
  const { t } = useTranslation();
  const { auth } = useAuth();

  return (
    <>
      <SectionContainer>
        <Heading2>{t('global.contributions')}</Heading2>
        <Table
          name='contributions'
          list={auth.contributions}
          searchAttr='title'
          defaultSort={{ attr: 'startDate', direction: 'desc' }}
          fields={[
            {
              name: 'title',
              label: 'Title',
              icon: <HiOutlineDocumentText />,
              operator: (value) => value,
            },
            {
              name: 'startDate',
              label: 'Date',
              icon: <HiOutlineClock />,
              operator: (value) =>
                new Intl.DateTimeFormat(i18n.language, {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                }).format(new Date(value)),
            },
            {
              name: 'teamRole',
              label: 'Role',
              icon: <HiOutlineUsers />,
              operator: (value) => t(`contribution.${value}`),
            },
            {
              name: 'state',
              label: 'State',
              icon: <HiOutlineSparkles />,
              operator: (value) => t(`contribution.${value}`),
            },
          ]}
        />
      </SectionContainer>{' '}
    </>
  );
}

export default Contributions;
