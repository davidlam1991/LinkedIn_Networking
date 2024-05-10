import { useState, useEffect } from 'react';
import styled from 'styled-components';
import themeList from '../../data/themeList';

const FieldStyles = styled.div`
  label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    font-size: 1.6rem;
    text-transform: Capitalize;
    color: ${({ theme: { theme } }) =>
      theme === themeList.light ? 'var(--darkBlue_2)' : 'var(--lightBlue_2)'};
  }
  input,
  text,
  select {
    margin-top: 1rem;
    width: 100%;
    height: 40px;
    padding: 1rem;
    border: none;
    border-radius: 4px;
    font-size: 1.6rem;
    background-color: var(--white);
    color: ${({ theme: { theme } }) =>
      theme === themeList.light ? 'var(--black)' : 'var(--black)'};
  }
  textarea {
    margin-top: 1rem;
    width: 100%;
    height: 80px;
    padding: 1rem;
    border: none;
    border-radius: 4px;
    font-size: 1.6rem;
    background-color: var(--white);
    color: ${({ theme: { theme } }) =>
      theme === themeList.light ? 'var(--black)' : 'var(--black)'};
  }
  .textarea-container {
    position: relative;
    margin-top: 1rem;
  }

  .word-count {
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 1rem; // Adjusted font size
    color: ${({ theme: { theme } }) =>
      theme === themeList.light ? 'var(--white)' : 'var(--black)'};
  }
  @media only screen and (max-width: 768px) {
    input,
    select,
    textarea {
      font-size: 1.4rem;
    }
  }
`;

function FormField({ label, id, type, options, rows = 1, className, onChange, ...rest }) {
  const [wordsRemaining, setWordsRemaining] = useState(100); // Initialize with the max word count

  const handleInputChange = (e) => {
    if (onChange) onChange(e);

    if (type === 'textarea') {
      const Chars = e.target.value;
      if (Chars.length > 100) {
        // Truncate the Chars to 100
        e.target.value = Chars.slice(0, 100);
      }
      setWordsRemaining(101 - Math.min(Chars.length, 100)); // Update the remaining word count
    }
  };

  useEffect(() => {
    if (type === 'textarea' && !rest.value) {
      setWordsRemaining(100);
    }
  }, [rest.value, type]);

  const renderInputField = () => {
    switch (type) {
      case 'textarea':
        return (
          <div className="textarea-container">
            <textarea id={id} rows={rows} onChange={handleInputChange} {...rest} />
            <span className="word-count">Characters remaining: {wordsRemaining}</span>
          </div>
        );
      case 'select':
        return (
          <select id={id} onChange={onChange} {...rest}>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return <input id={id} type={type} onChange={onChange} {...rest} />;
    }
  };

  return (
    <FieldStyles className={className}>
      <label htmlFor={id}>
        {label}
        {renderInputField()}
      </label>
    </FieldStyles>
  );
}

export default FormField;