import React from 'react';
import { useLocation , useNavigate} from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import { BiCog } from 'react-icons/bi';
//import { BiChat } from 'react-icons/bi';
//import { RiServiceLine } from 'react-icons/ri';
import { BiMessageSquareDetail } from 'react-icons/bi';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const IconSize = '2.5rem'; // Set the desired size for the icons

const SidebarStyles = styled.nav`
background: linear-gradient(to bottom, white, skyblue); /* Set the gradient from white to black */
backdrop-filter: blur(10px);
width: max-content;
height: wrap-content;
display: flex;
flex-direction: column;
padding: 3% 0.3rem;
z-index: 2;
position: fixed;
left: 8px;
top: 35%;
gap: 1rem;
border-radius: 1rem;
backdrop-filter: blur(15px);

a {
  background: transparent;
  padding: 1rem;
  border-radius: 50%;
  display: flex;
  color: var(--color-light);
  font-size: ${IconSize};
}

a:hover {
  background: rgba(0, 0, 0, 0.3);
}

a.active {
  background: var(--color-black);
  color: var(--color-white);
}
`;

const Sidebar = () => {
  const location = useLocation();
  const [activeNav, setActiveNav] = React.useState(location.pathname);
  const navigate = useNavigate(); // Use useNavigate hook
  const { currentUser } = useSelector((state) => state.user);

  React.useEffect(() => {
    setActiveNav(location.pathname);
  }, [location.pathname]);

  const handleIconClick = (path) => {
    if (path == '/networkai') {
      const isAuthenticated = currentUser !== null;

      console.log('currentUser:', currentUser);
      console.log('isAuthenticated:', isAuthenticated);

      if (isAuthenticated) {
        console.log('Navigating to /networkai');
        navigate('/networkai');
      } else {
        console.log('Navigating to /sign-in');
        navigate('/sign-in');
      }
    } else {
      console.log('Navigating to', path);
      navigate(path);
    }
  };


  return (
    <SidebarStyles>
      <a href="/" onClick={() => handleIconClick('/')} className={activeNav === '/' ? 'active' : ''}>
        <AiOutlineHome />
      </a>
      <a href="/about" onClick={() => handleIconClick('/about')} className={activeNav === '/about' ? 'active' : ''}>
        <AiOutlineUser />
      </a>
      <a href="" onClick={() => handleIconClick('/networkai')} className={activeNav === '/networkai' ? 'active' : ''}>
        <BiCog />
      </a>
      <a href="/contact" onClick={() => handleIconClick('/contact')} className={activeNav === '/contact' ? 'active' : ''}>
        <BiMessageSquareDetail />
      </a>
    </SidebarStyles>
  );
};

export default Sidebar;
