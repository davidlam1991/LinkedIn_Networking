import React from 'react';
import styled from 'styled-components';
import themeList from '../../data/themeList';

const TitleStyles = styled.h1`
  font-size: 6rem;
  color: ${({ theme: { theme } }) =>
    theme === themeList.light ? 'var(--white)' : 'var(--lightBlue_4)'};
  font-weight: 900;
  text-transform: capitalize;
  @media only screen and (max-width: 768px) {
    font-size: 4rem;
  }
`;

function MainTitle({ children, ...rest }) {
  return <TitleStyles {...rest}>{children}</TitleStyles>;
}

export default MainTitle;
