import { Heading2 } from '../../theme/appElements';
import { Container, Link, Section } from './sidebarNavigationElements';

const SidebarNavigation = ({ template }) => {
  return (
    <Container>
      {template.map((item, index) => {
        return (
          <Section key={index}>
            <Heading2>{item.title}</Heading2>
            {item.links.map((link, index) => {
              return (
                <Link key={index} end to={link.to}>
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
