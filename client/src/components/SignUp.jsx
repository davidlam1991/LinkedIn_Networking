import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OAuth from './OAuth';
import styled from 'styled-components';
import ParagraphText from './paragraphTexts/ParagraphText';
import themeList from '../data/themeList';

const SignUpContainer = styled.div`
  margin-left: 50px;
  padding-top: calc(var(--header-height) + 30px);
  padding: 4rem;
  max-width: 45rem;
  height: 640px;
  margin: 6rem auto;
  background: #fff;
  border-radius: 25px;
  box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.562);

  h1 {
    color: #111;
    font-size: 2.8rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 5rem;
    text-transform: uppercase;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2.2rem;

    input {
      width: 100%;
      height: 50px;
      border: 3px solid #000000;
      padding: 30px 25px;
      font-size: 1.5rem;
      border-radius: 30px;
      background: transparent;
      outline: none;
      transition: 0.3s;

      &::placeholder {
        color: #000000;
      }

      &:focus,
      &:valid {
        border-color: #000000;
      }
    }

    button {
      display: block;
      width: 100%;
      padding: 20px 20px;
      text-align: center;
      border: 1.5px solid #000000;
      background: #a29bfe;
      outline: none;
      border-radius: 30px;
      font-size: 1.8rem;
      color: #fff;
      cursor: pointer;
      transition: 0.3s;
      text-transform: uppercase;

      &:hover {
        transform: translateY(-5px);
        background: #6c5ce7;
        box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.562);
      }

      &:disabled {
        opacity: 0.8;
      }
    }

    .buttong {
      display: block;
      width: 100%;
      padding: 20px 20px;
      text-align: center;
      border: 1.5px solid #000000;
      background: #dc143c;
      outline: none;
      border-radius: 30px;
      font-size: 1.8rem;
      color: #fff;
      cursor: pointer;
      transition: 0.3s;

      &:hover {
        transform: translateY(-5px);
        background: #ff0000;
        box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.562);
      }

      &:disabled {
        opacity: 0.8;
      }
    }
  }

  .mt-5 {
    margin-top: -14.8rem;
    color: ${({ theme: { theme } }) =>
        theme === themeList.light ? 'var(--darkBlue_2)' : 'var(--lightBlue_1)'};
  }

  .signin-link:hover {
    color: #0000FF; 
  }

  .text-red-700 {
    color: #ff0000;
    margin-top: 1.25rem;
  }

  @media (max-width: 430px) {
    width: 300px;
  }
`;

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <SignUpContainer>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4' style={{ height: '100%' }}>
        <input
          type='text'
          placeholder='Username'
          id='username'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='Email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth />
      </form>
        <ParagraphText className='mt-5'>
          <p>Have an account?</p>
          <a href='/sign-in'>
            <span className='signin-link'>Sign in</span>
          </a>
          <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
        </ParagraphText>
    </SignUpContainer>
  );
}
