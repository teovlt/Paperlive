import React from 'react';
import { Heading2, Link, Paragraph, SectionContainer } from '../../theme/appElements';
import { useTranslation } from 'react-i18next';
import { Ul } from './aboutElements';

const About = () => {
  const { t } = useTranslation();

  return (
    <SectionContainer>
      <Heading2>{t('about.aboutPaperLive')}</Heading2>
      <Paragraph>{t('about.par1')}</Paragraph>
      <Paragraph>{t('about.par2')}</Paragraph>
      <Paragraph>{t('about.par3')}</Paragraph>
      <Paragraph>{t('about.par4')}</Paragraph>
      <Paragraph>
        <Ul>
          <li>
            Alain TCHANA :&nbsp;
            <Link to='mailto:alain.tchana@grenoble-inp.fr'>alain.tchana@grenoble-inp.fr</Link>
          </li>
          <li>
            Téo VILLET :&nbsp;
            <Link to='mailto:teo.villet2@gmail.com'>teo.villet2@gmail.com</Link>
          </li>
          <li>
            Gabriel HALUS :&nbsp;
            <Link to='mailto:gabrielhalus@gmail.com'>gabrielhalus@gmail.com</Link>
          </li>
        </Ul>
      </Paragraph>
      <Paragraph>{t('about.par5')}</Paragraph>
    </SectionContainer>
  );
};

export default About;
