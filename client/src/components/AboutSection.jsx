import React from 'react';
import styled from 'styled-components';
import PrimaryButton from './buttons/PrimaryButton';
import ParagraphText from './paragraphTexts/ParagraphText';
import SectionTitle from './titles/SectionTitle';
import AboutImg from '../assets/images/about.png';
import themeList from '../data/themeList';

const AboutStyles = styled.div`
padding-top: calc(var(--header-height) + 30px);
padding: 5rem 0;
margin-left: 50px;
display: flex;
align-items: center;
justify-content: center;

.about__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1rem;
}

.about__subtitle {
  margin-bottom: 1rem;
  font-weight: 600;
  text-transform: capitalize;
  color: ${({ theme: { theme } }) =>
  theme === themeList.light ? 'var(--white)' : 'var(--lightBlue_4)'};
}

.about__title {
  margin-bottom: 2rem;
  max-width: 350px;
  color: ${({ theme: { theme } }) =>
  theme === themeList.light ? 'var(--black)' : 'var(--white)'};
}

.about__desc {
  margin-bottom: 2rem;
  max-width: 300px;
}

.about__img {
  flex: 1; /* Added flex property to allow image to grow and shrink */
  display: flex;
  justify-content: flex-end;

  img {
    max-width: 80%;
    height: auto;
    object-fit: cover;
  }
}

@media only screen and (max-width: 768px) {
  .about__wrapper {
    flex-direction: column-reverse;
    gap: 0.5rem;
  }

  .about__subtitle {
    padding-top: calc(var(--header-height) + 30px);
  }

  .about__img {
    display: flex;
    justify-content: flex-end;
    img {
      max-width: 100%; 
      margin-top: auto;
    }
  }
}
`;

function AboutSection() {
  return (
    <AboutStyles id="about">
      <div className="container">
        <div className="about__wrapper">
          <div className="about__img">
            <img src={AboutImg} alt="WeConnect" />
          </div>
          <div className="about__info">
            <ParagraphText className="about__subtitle">
              Who are we
            </ParagraphText>
            <SectionTitle className="about__title">
              Step up at every step of the way!!!
            </SectionTitle>
            <ParagraphText className="about__desc">
              "WeConnect" is a team of dedicated and passionate developers. Our Goal
              is to provide with best networking tool to help you grow your career while having a outworldly experience.
            </ParagraphText>
            <PrimaryButton as="a" href="/contact">
              Get In Touch
            </PrimaryButton>
          </div>
        </div>
      </div>
    </AboutStyles>
  );
}

export default AboutSection;
