import React from 'react';
import ContactSection from '../components/contactSection/ContactSection';
import Footer from '../components/Footer';
import OldMainSection from '../components/OldMainSection';
import AboutSection from '../components/AboutSection';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import Header from '../components/Header';
import Profile from '../components/Profile';
import PrivateRoute from '../components/PrivateRoute';
import Sidebar from '../components/sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import AnimatedCursor  from "../hooks/AnimatedCursor";
import NetworkAISection from '../components/netWorkAI/netWorkAI';
import MainSection from '../components/MainSection';


function LandingPage() {
  return (
    <>
      <Header />
      <Sidebar />
      {/* <AnimatedCursor/> */}
      <Routes>
      <Route path='/' element={<MainSection/>}/>
        <Route path='/about' element={<AboutSection/>}/>
        <Route path='/contact' element={<ContactSection/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/networkai' element={<NetworkAISection/>}/>
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
      {/*<MainSection />
      <AboutSection />
      <ContactSection />*/}
      <Footer />
    </>
  );
}

export default LandingPage;
