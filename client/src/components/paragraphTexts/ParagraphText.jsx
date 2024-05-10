import React from 'react';
import styled from 'styled-components';
import themeList from '../../data/themeList';

const ParagraphStyles = styled.p`
  font-size: 2rem;
  line-height: 1.4em;
  color: ${({ theme: { theme } }) =>
    theme === themeList.light ? 'var(--white)' : 'var(--lightBlue_2)'};
  @media only screen and (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

function ParagraphText({ children, ...rest }) {
  return <ParagraphStyles {...rest}>{children}</ParagraphStyles>;
}

export default ParagraphText;
