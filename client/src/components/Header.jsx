import React, { useEffect, useRef, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import themeList from '../data/themeList';
import Logo from './Logo';
import ThemeSwitcher from './ThemeSwitcher';
import { useSelector } from 'react-redux';

const HeaderStyles = styled.header`
  z-index: 3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  background-color: ${({ theme: { theme } }) =>
    theme === themeList.light ? 'var(--lightBlue_3)' : 'var(--black)'};
  border-bottom: 1px solid var(--mediumSlateBlue);
  .navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
  }
  nav ul li {
    display: inline-block;
    margin: 0 0.5rem;
    a {
      display: inline-block;
      font-size: 1.6rem;
      font-weight: 500;
      padding: 0.5rem 1rem;
      color: ${({ theme: { theme } }) =>
        theme === themeList.light ? 'var(--darkBlue_2)' : 'var(--lightBlue_1)'};
      }
        &:hover {
        a {
          text-decoration: underline;
        }
      }
      a.active {
        text-decoration: underline;
      }
      img {
        height: 45px; // Set your desired height
        width: 45px;  // Set your desired width
        border-radius: 50%;
        object-fit: cover;
        margin-top: -1rem;
      }
    }
  .navMenu {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .themeSwitcher {
    z-index: -1;
  }
  .menuIcon,
  .closeIcon {
    width: 30px;
    height: 30px;
    cursor: pointer;
    margin-left: 10px;
    padding: 3px;
    svg {
      color: ${({ theme: { theme } }) =>
        theme === themeList.light ? 'var(--darkBlue_2)' : 'var(--lightBlue_1)'};
    }
    &:hover {
      background-color: #8080803b;
      border-radius: 4px;
    }
  }
  .closeIcon {
    position: absolute;
    right: 10px;
    top: 10px;
    &:hover {
      background-color: #8080803b;
      svg {
        color: white;
      }
    }
  }
  .navOverlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: var(--darkBlue_3);
    opacity: 0.4;
  }
  @media only screen and (max-width: 768px) {
    nav {
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: fixed;
      width: 90%;
      max-width: 250px;
      top: 0;
      right: 0;
      background: ${({ theme: { theme } }) =>
        theme === themeList.light ? 'var(--lightBlue_2)' : 'var(--darkBlue_4)'};
      height: 100vh;
      z-index: 100;
      transform: translateX(100%);
      transition: 0.3s ease-in-out transform;
      overflow: hidden;
    }
    nav.open {
      box-shadow: -1px 4px 10px 3px rgb(0 0 0 / 16%);
      transform: translateX(0);
    }
    nav ul li {
      display: block;
      text-align: right;
      width: 100%;
      margin: 0.5rem 0;
      a {
        display: block;
        width: 100%;
      }
    }
  }
`;
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const headerRef = useRef(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    window.matchMedia('(max-width: 768px)').matches
  );

  useEffect(() => {
    function disableScroll() {
      document.body.style.overflow = 'hidden';
    }
    function enableScroll() {
      document.body.style.overflow = '';
    }

    if (isNavOpen) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [isNavOpen]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    });
    window.addEventListener('scroll', () => {
      if (headerRef.current && window.scrollY > 100) {
        headerRef.current.style.boxShadow =
          '0px 0px 10px 0px rgba(0, 0, 0, 0.5)';
      } else {
        headerRef.current.style.boxShadow = 'none';
      }
    });
  }, []);

  return (
    <HeaderStyles ref={headerRef}>
      <div className="container">
        <div className="navigation">
          <a href='/'>
            <Logo />
          </a>
          <div className="navMenu">
            <nav className={isMobile && isNavOpen ? 'open' : undefined}>
              {isMobile && (
                <div
                  className="closeIcon"
                  tabIndex="0"
                  role="button"
                  onKeyDown={() => setIsNavOpen(false)}
                  onClick={() => setIsNavOpen(false)}
                >
                  <FiX />
                </div>
              )}
              <ul>
              <li>
                  <Link to='/profile'>
                    {currentUser ? (
                      <img
                        src={currentUser.profilePicture}
                        alt='profile'
                        className='h-7 w-7 rounded-full object-cover'
                      />
                    ) : (
                      <span>Sign In</span>
                    )}
                  </Link>
                </li>
              </ul>
            </nav>
            <ThemeSwitcher />
            {isMobile && (
              <div
                className="menuIcon"
                tabIndex="0"
                role="button"
                onKeyDown={() => setIsNavOpen(true)}
                onClick={() => setIsNavOpen(true)}
              >
                <FiMenu />
              </div>
            )}
          </div>
        </div>
      </div>
    </HeaderStyles>
  );
}
