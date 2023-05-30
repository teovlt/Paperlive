import { useTranslation } from 'react-i18next';
import { Container, Link, LinkContainer } from './navigationElements';
import { HiBookOpen, HiChartPie, HiNewspaper } from 'react-icons/hi2';

const Navigation = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <LinkContainer>
        <Link to='/'>
          <HiBookOpen />
          {t('navigation.overview')}
        </Link>
      </LinkContainer>
      <LinkContainer>
        <Link to='/contributions'>
          <HiNewspaper />
          {t('navigation.contributions')}
        </Link>
      </LinkContainer>
      <LinkContainer>
        <Link to='/statistics'>
          <HiChartPie />
          {t('navigation.statistics')}
        </Link>
      </LinkContainer>
    </Container>
  );
};

export default Navigation;
