import { Heading2 } from '../../theme/appElements';
import { useLocation } from 'react-router-dom';
import { Container, Link, Section } from './sidebarNavigationElements';

const SidebarNavigation = ({ template }) => {
  const location = useLocation();

  return (
    <Container>
      {template.map((item, index) => {
        return (
          <Section key={index}>
            <Heading2>{item.title}</Heading2>
            {item.links.map((link, index) => {
              return (
                <Link key={index} end to={{ pathname: link.to }}>
                  {link.icon}
                  {link.label}
                </Link>
              );
            })}
          </Section>
        );
      })}
    </Container>
  );
};

export default SidebarNavigation;
