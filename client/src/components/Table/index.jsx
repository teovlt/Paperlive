import { useState, useEffect } from 'react';
import {
  Attr,
  BodyButton,
  Button,
  Container,
  DataCell,
  DataRow,
  Label,
  Search,
  TBody,
  TFooter,
  THead,
  THeader,
  Value,
} from './tableElements';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useSearch from '../../hooks/useSearch';

const Table = ({ name, list, fields, defaultSort, searchAttr, urlParams }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const search = useSearch();

  const [sort, setSort] = useState('');
  const [searchTerms, setSearchTerms] = useState('');
  const [resultList, setResultList] = useState(list);

  useEffect(() => {
    const sortedList = [...resultList];
    sortedList.sort((a, b) => {
      const ValueA = a[sort.attr];
      const ValueB = b[sort.attr];
      if (ValueA < ValueB) return sort.direction === 'asc' ? -1 : 1;
      if (ValueA > ValueB) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });
    setResultList(sortedList);
  }, [sort]);

  useEffect(() => {
    setSort(defaultSort);
    setResultList(search(searchTerms, list, searchAttr));
  }, [searchTerms, defaultSort]);

  return (
    <Container>
      <THeader>
        <Search
          placeholder={t('table.search')}
          value={searchTerms}
          onInput={(e) => setSearchTerms(e.target.value)}></Search>
        <Button onClick={() => navigate(`/${name}/new/${urlParams ?? ''}`)}>
          {t('table.new')} {t(`global.${name.slice(0, -1)}`).toLowerCase()}
        </Button>
      </THeader>
      <THead>
        {fields?.map((field, index) => (
          <Attr
            key={index}
            className={`${sort.attr === field.name && 'active'} ${
              sort.attr === field.name && sort.direction === 'desc' && 'sortDesc'
            }`}
            onClick={() =>
              setSort((prev) => {
                if (prev.attr === field.name && prev.direction === 'asc')
                  return { ...prev, direction: 'desc' };
                else if (prev.attr === field.name && prev.direction === 'desc')
                  return { ...prev, direction: 'asc' };
                else return { attr: field.name, direction: 'asc' };
              })
            }>
            {field.icon}
            {t(`${name.slice(0, -1)}.${field.label.toLowerCase()}`)}
          </Attr>
        ))}
      </THead>
      <TBody>
        {resultList?.length > 0 ? (
          resultList.map((item, index) => (
            <DataRow key={index}>
              {fields?.map((field, index) => {
                return (
                  <DataCell
                    key={index}
                    style={{ color: `var(--${{ ...field.style }[item[field.name]]})` }}
                    onClick={() => navigate(`/${name}/${item._id}`)}>
                    {field.operator(item[field.name]) || item[field.name]}
                  </DataCell>
                );
              })}
            </DataRow>
          ))
        ) : (
          <DataRow>
            <BodyButton onClick={() => navigate(`/${name}/new/${urlParams ?? ''}`)}>
              {t('table.new')} {t(`global.${name.slice(0, -1)}`).toLowerCase()}
            </BodyButton>
          </DataRow>
        )}
      </TBody>
      <TFooter>
        <Label>
          {t('table.count')} <Value>{resultList?.length}</Value>
        </Label>
      </TFooter>
    </Container>
  );
};

export default Table;
