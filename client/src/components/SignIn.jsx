// SignIn.js
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from './OAuth';
import styled from 'styled-components';
import ParagraphText from './paragraphTexts/ParagraphText';
import themeList from '../data/themeList';

const SignInContainer = styled.div`
margin-left: 50px;
padding-top: calc(var(--header-height) + 30px);
padding: 4rem;
max-width: 45rem;
height: 580px;
margin: 10rem auto;
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

.signup-link:hover {
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

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <SignInContainer>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4' style={{ height: '100%' }}>
        <input
          type='email'
          placeholder='Email'
          id='email'
          required={true}
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          required={true}
          id='password'
          onChange={handleChange}
        />
        <button
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <ParagraphText className='mt-5'>
        <p>Dont Have an account?</p>
        <a href='/sign-up'>
          <span className='signup-link'>Sign up</span>
        </a>
        <p className='text-red-700 mt-5'>
        {error ? error.message || 'Something went wrong!' : ''}
      </p>
      </ParagraphText>
    </SignInContainer>
  );
}
