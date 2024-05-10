import React from 'react';
import styled from 'styled-components';
import MainImg from '../assets/images/main.png';
import PrimaryButton from './buttons/PrimaryButton';
import ParagraphText from './paragraphTexts/ParagraphText';
import MainTitle from './titles/MainTitle';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const OldMainSectionStyles = styled.div`
  min-height: 100vh;
  margin-left: 50px;
  padding-top: calc(var(--header-height) + 30px); // height of header
  display: flex;
  align-items: center;
  justify-content: center;
  .main__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 1rem;
  }
  .main__info {
    flex: 3;
  }
  .main__img {
    flex: 3;
    img {
      object-fit: contain;
    }
  }
  .main__title {
    margin-bottom: 1.5rem;
    max-width: 400px;
  }
  .main__desc {
    margin-bottom: 1.5rem;
    max-width: 300px;
  }
  @media only screen and (max-width: 768px) {
    .main__wrapper {
      flex-direction: column-reverse;
      gap: 0.5rem;
    }
    .main__img {
      display: flex;
      justify-content: flex-end;
      img {
        max-width: 400px;
        margin-top: auto;
      }
    }
  }
`;

function MainSection() {
  const navigate = useNavigate(); // Use useNavigate hook
  const { currentUser } = useSelector((state) => state.user);

  const handleButtonClick = () => {
    const isAuthenticated = currentUser !== null;

    if (isAuthenticated) {
      // User is signed in, navigate to /networkai
      navigate('/networkai');
    } else {
      // User is not signed in, navigate to /sign-in
      navigate('/sign-in');
    }
  };
  return (
    <OldMainSectionStyles id="home">
      <div className="container">
        <div className="main__wrapper">
          <div className="main__info">
            <MainTitle className="main__title">
             Welcome, 
            </MainTitle>
            <ParagraphText className="main__desc">
              Career growth has been longing for you....
            </ParagraphText>
            <PrimaryButton
              onClick={handleButtonClick}
              className="main__cta"
            >
              Let's Get started
            </PrimaryButton>
          </div>
          <div className="main__img">
            <img src={MainImg} alt="Weconnect" />
          </div>
        </div>
        
      </div>
    </OldMainSectionStyles>
  );
}

export default MainSection;
