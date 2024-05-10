import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import ParagraphText from './paragraphTexts/ParagraphText';
import MainTitle from './titles/MainTitle';
import MainImg from '../assets/images/main.png';
import themeList from '../data/themeList';


const MainSectionStyles = styled.div`

/* Add this keyframe for the fade-in and move-up animation */
@keyframes fadeInMoveUp {
  from {
    opacity: 0;
    transform: translateY(100vh); /* Start from the bottom of the screen */
  }
  to {
    opacity: 1;
    transform: translateY(0); /* Move to its final position */
  }
}

@keyframes slideAndFadeIn {
  0% {
    opacity: 0;
    transform: translateX(100vh);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.clockstyle.animate-class{
  animation-duration: 5s;
}

.clockstyle.fade-in-class{
  animation-duration: 5s;
  opacity: 1; 
}

.main__img.slide-in-class {
  animation: slideAndFadeIn 10s ease-out forwards;
}

.clockstyle{  
  min-height: 100vh;
  height: 100%;
  width: 100%;
  padding-top: calc(var(--header-height) + 150px); // height of header
  margin: 0;
  overflow: hidden;

  animation: fadeInMoveUp 1s ease-out;

  font-family: 'LCD', sans-serif;
  font-family: 'LCD2', sans-serif;
  font-family: 'LCDMono2', sans-serif;
  font-family: 'LCDMono', sans-serif;
  font-family: 'Digitalism', sans-serif;


  --_refl:${({ theme: { theme } }) =>
  theme === themeList.light ? 'var(--_1refl)' : 'var(--_1refl)'};

  --_bloom:${({ theme: { theme } }) =>
  theme === themeList.light ? 'var(--_1bloom)' : 'var(--_1bloom)'};

  --_y1:${({ theme: { theme } }) =>
  theme === themeList.light ? 'var(--_yb1)' : 'var(--_ya1)'};

  --_y2:${({ theme: { theme } }) =>
  theme === themeList.light ? 'var(--_yb2)' : 'var(--_ya2)'};

  --_o1:${({ theme: { theme } }) =>
  theme === themeList.light ? 'var(--_red1)' : 'var(--_orange1)'};

  --_o2:${({ theme: { theme } }) =>
  theme === themeList.light ? 'var(--_red2)' : 'var(--_orange2)'};

  --_o3:${({ theme: { theme } }) =>
  theme === themeList.light ? 'var(--_red3)' : 'var(--_orange3)'};

  --mw1:${({ theme: { theme } }) =>
  theme === themeList.light ? 'var(--mwa1)' : 'var(--mwa1)'};
  
  --m1:${({ theme: { theme } }) =>
  theme === themeList.light ? 'var(--mb1)' : 'var(--ma1)'};

  --m2:${({ theme: { theme } }) =>
  theme === themeList.light ? 'var(--mb2)' : 'var(--ma2)'};

  --m3:${({ theme: { theme } }) =>
  theme === themeList.light ? 'var(--mb3)' : 'var(--ma3)'};


  
.clock {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(var(--_size) * 0.01); /* em hack for shade scaling */

  --_factor: min(400px, 60vh);
  --_size: min(var(--_factor), 60vw);
}
.shadow {
  position: absolute;
  bottom: 0;
  top: 0;
  margin: auto;
  width: 100%;
  height: 0em;
  transform: translateY(45em);
  box-shadow: 
    0 0 3em 2em #040909,
    0 0 8em 3em var(--_o3),
    0 0 10em 4em var(--_o2),
    0 0 10em 5em var(--_o1);
  opacity: 0.6;
}

.shadow::before {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  height: 1em;
  width: 0;
  box-shadow: 
    0 0 8em 4em var(--_y1),
    0 0 8em 6em var(--_y2),
    0 0 8em 8em var(--_o1),
    0 0 8em 10em var(--_o2),
    0 0 8em 12em var(--_o3);
}

.shadow::after {
  content: '';
  display: block;
  position: absolute;
  z-index: -1;
  opacity: 0.5;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 50%;
  height: 0em;
  width: 10em;
  border: 2px solid red;
  transform: rotateX(80deg);
  box-shadow: 
    0 0em 12em 40em var(--_o1),
    0 0em 12em 60em var(--_o2),
    0 0em 12em 80em var(--_o3);
}

.clock.off .shadow {
  box-shadow: 
    0 0 4em 3em #040909,
    0 0 8em 3em var(--_o3),
    0 0 10em 4em var(--_o2),
    0 0 10em 5em var(--_o1);
  opacity: 0;
}

.outer-pipe {
  position: absolute;
  z-index: 2;
  width: calc(var(--_size) * (8/15));
  height: var(--_size);
  border-radius: 20% / 10%;
  overflow: hidden;
  opacity: 1;
  --_clip-btm: 85.8%;
  clip-path: polygon(0 0, 100% 0, 100% var(--_clip-btm), 0 var(--_clip-btm));
}

.inner-pipe {
  width: 100%;
  height: 100%;
  transform: scale(0.84, 0.91); /* Fix: use transform instead of scale */
  border-radius: 15% / 7%;
  box-shadow: 
    0em 104em 16em 20em #040909,
    /* light on */
    0em 1.2em 1em 0.2em var(--m3),
    0em 1.2em 1em 0.5em var(--m2),
    0em 1.2em 0.5em 1.2em var(--m1),
    0em 1.2em 1.2em 1.5em var(--m2),
    0em 1.2em 2em 2em var(--m3),
    /* ---- */
    0em 90em 16em 20em #040909,
    /* nat light */
    -1em 1em 2em 3.7em #040909,
    0.5em 0em 2em 3.7em #040909,
    0em 0em 0em 4.6em var(--mw1),
    0em 0em 0.5em 5em var(--mw1),
    /* --------- */
    0em 0em 0em 20em #040909;
}

.pipe-accents {  
  width: calc(var(--_size) * (8/15));
  height: var(--_size);
  position: absolute;
}

.pipe-accents .top-tube,
.pipe-accents .top,
.pipe-accents .topinset,
.pipe-accents .left,
.pipe-accents .right {  
  z-index: 3;
}

.pipe-accents .top-tube {
  position: absolute;
  top: 3%;
  left: 0;
  right: 0;
  margin: auto;
  width: 16%;
  height: 6%;
  background: #040909;
  background: linear-gradient(120deg, rgba(60,62,62,1) 0%, rgba(4,9,0,1) 60%);
  box-shadow: 
    inset -0.2em 1.1em 1.4em -0.4em var(--mw1),
    /* light on */
    inset 0em -1.2em 0.5em -1.1em var(--m1),
    inset 0em -1.2em 1em -0.8em var(--m2),
    inset 0em -1.2em 1em -0.2em var(--m3);
  border-radius: 20%;
}

.pipe-accents .tube-holders {
  position: absolute;
  width: 26em;
  height: 70em;
  transform: translateY(-7em); /* Fix: use transform instead of translate */
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
}

.pipe-accents .tube-holders div{
  position: absolute;
  width: 3em;
  height: 3em;
  border-radius: 50%;
  --_metal-1: #30241d;
  --_metal-2: #000000;
  --_metal-3: #5f5f5f;
  --_vl: -8%;
  background: conic-gradient(from 0deg at 50% 50%, 
  var(--_metal-1) 0%, 
  var(--_metal-2) 7%, 
  var(--_metal-1) 21%, 
  var(--_metal-2) 35%, 
  var(--_metal-2) 42%, 
  var(--_metal-3) 56%, 
  var(--_metal-1) 63%, 
  var(--_metal-1) 70%, 
  var(--_metal-2) 77%, 
  var(--_metal-3) 84%, 
  var(--_metal-2) 91%, 
  var(--_metal-1) 100%);
  box-shadow: 
  inset 0 0 0.1em 0.1em #ffffff5d,
  /* light on */
  inset 0em -1.2em 0.5em -1.1em var(--m1),
  inset 0em -1.2em 1em -0.8em var(--m2),
  inset 0em -1.2em 1em -0.2em var(--m3)
  /* -------- */;
}
.pipe-accents .tube-holders div:nth-child(1) {
  top: 12%;
  left: var(--_vl);
  transform: rotate(-65deg); /* Fix: use transform instead of rotate */
}

.pipe-accents .tube-holders div:nth-child(2) {
  top: 12%;
  right: var(--_vl);
  transform: rotate(65deg); /* Fix: use transform instead of rotate */
}

.pipe-accents .tube-holders div:nth-child(3) {
  top: 26%;
  left: var(--_vl);
  transform: rotate(-85deg); /* Fix: use transform instead of rotate */
}

.pipe-accents .tube-holders div:nth-child(4) {
  top: 26%;
  right: var(--_vl);
  transform: rotate(85deg); /* Fix: use transform instead of rotate */
}

.pipe-accents .tube-holders div:nth-child(5) {
  top: 78.5%;
  left: var(--_vl);
  transform: rotate(-115deg); /* Fix: use transform instead of rotate */
}

.pipe-accents .tube-holders div:nth-child(6) {
  top: 78.5%;
  right: var(--_vl);
  transform: rotate(115deg); /* Fix: use transform instead of rotate */
}

.pipe-accents .top {
  position: absolute;
  top: -0.7%;
  left: 0;
  right: 0;
  margin: auto;
  width: 22%;
  height: 6%;
  background: #040909;
  background: linear-gradient(120deg, rgba(60, 62, 62, 1) 0%, rgba(4, 9, 0, 1) 60%);
  box-shadow:
    inset -0.2em 1.1em 1.4em -0.4em var(--mw1),
    /* light on */
    inset 0em -1.2em 0.5em -1.1em var(--m1),
    inset 0em -1.2em 1em -0.8em var(--m2),
    inset 0em -1.2em 1em -0.2em var(--m3);
  border-radius: 20%;
}

.pipe-accents .topinset {
  position: absolute;
  top: -1.7%;
  left: 0;
  right: 0;
  margin: auto;
  width: 14%;
  height: 8%;
  background: #040909;
  background: linear-gradient(120deg, rgba(60, 62, 62, 1) 0%, rgba(4, 9, 0, 1) 60%);
  box-shadow:
    inset -0.2em 1.1em 1.4em -0.4em var(--mw1),
    /* light on */
    inset 0em -1.2em 0.5em -1.1em var(--m1),
    inset 0em -1.2em 1em -0.8em var(--m2),
    inset 0em -1.2em 1em -0.2em var(--m3);
  border-radius: 50%;
}

.pipe-accents .topinset::before {
  content: '';
    display: block;
    width: 50%;
    height: 50%;
    border-radius: 50%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    box-shadow: 
    inset 0 0 0em 0.1em #040909,
    /* light on */
    0 0 0.5em 0.1em var(--_bloom),
    inset 0 0 1.3em 0.2em var(--_o3),
    inset 0 0 1.3em 0.4em var(--_o2),
    inset 0 0 1.3em 0.6em var(--_o1),
    inset 0 0 1.3em 2em var(--_y1)
    /* -------- */;
    animation: 5s flicker linear infinite;
   /* Fix: use transform instead of rotateX */
}

.pipe-accents .left,
.pipe-accents .right {
  width: 100%;
  height: 100%;
  position: absolute;
}

.pipe-accents .left div,
.pipe-accents .right div {
  --_pipe-pos-x: -3%;
  position: absolute;
  margin: auto;
  width: 14%;
  height: 2.4%;
  border-radius: 0.7em;
  background: #040909;
}

.pipe-accents .left div:nth-child(1) {
  top: 16%;
  left: var(--_pipe-pos-x);
  border-top-right-radius: 50%;
  border-top-left-radius: 50%;
  box-shadow:
    inset -0.1em 0.4em 0.6em -0.2em var(--mw1),
    /* light on */
    inset -1em -0.5em 0.8em -0.8em var(--m3),
    inset -1em -0.5em 0.9em -0.5em var(--m2),
    inset -1em -0.5em 1em -0.3em var(--m1);
  /* -------- */
}

.pipe-accents .left div:nth-child(1)::before {
  content: '';
  display: block;
  width: 98%;
  height: 1em;
  background: #040909;
  position: absolute;
  left: 78%;
  top: 40%;
  transform: rotate(5deg); /* Fix: use transform instead of rotate */
  bottom: 0;
  margin: auto;
  z-index: -1;
  box-shadow:
    inset 0em 0.3em 0.6em -0.4em var(--mw1),
    /* light on */
    inset 1em -0.5em 0.3em -0.5em var(--m3),
    inset 1em -0.5em 0.4em -0.3em var(--m2),
    inset 1em -0.5em 0.6em -0.2em var(--m1);
  /* -------- */
}

.pipe-accents .left div:nth-child(2) {
  top: 26%;
  left: var(--_pipe-pos-x);
  border-top-right-radius: 30%;
  border-top-left-radius: 30%;
  border-bottom-right-radius: 30%;
  border-bottom-left-radius: 30%;
  box-shadow:
    inset -0.1em 0.4em 0.6em -0.2em var(--mw1),
    /* light on */
    inset -1em 0em 0.8em -0.6em var(--m3),
    inset -1em 0em 0.9em 0em var(--m2),
    inset -1em 0em 1em 0.1em var(--m1);
  /* -------- */
}

.pipe-accents .left div:nth-child(2)::before {
  content: '';
  display: block;
  width: 98%;
  height: 1em;
  background: #040909;
  position: absolute;
  left: 78%;
  top: 0%;
  transform: rotate(2deg); /* Fix: use transform instead of rotate */
  bottom: 0;
  margin: auto;
  z-index: -1;
  box-shadow:
    inset 0em 0.3em 0.6em -0.4em var(--mw1),
    /* light on */
    inset 1em -0.1em 0.3em 0em var(--m3),
    inset 1em -0.1em 0.4em 0.2em var(--m2),
    inset 1em -0.1em 0.6em -0.3em var(--m1);
  /* -------- */
}

.pipe-accents .left div:nth-child(3) {
  top: 64%;
  left: var(--_pipe-pos-x);
  border-bottom-right-radius: 40%;
  border-bottom-left-radius: 40%;
  box-shadow:
    inset -0.1em 0.4em 0.6em -0.2em var(--mw1),
    /* light on */
    inset -1em 0.3em 0.8em -0.5em var(--m3),
    inset -1em 0.3em 0.9em -0.3em var(--m2),
    inset -1em 0.3em 1em 0em var(--m1);
  /* -------- */
}

.pipe-accents .left div:nth-child(3)::before {
  content: '';
  display: block;
  width: 98%;
  height: 1em;
  background: #040909;
  position: absolute;
  left: 78%;
  top: 20%;
  transform: rotate(-4deg); /* Fix: use transform instead of rotate */
  margin: auto;
  z-index: -1;
  box-shadow:
    inset 0em 0.3em 0.6em -0.4em var(--mw1),
    /* light on */
    inset 1em 0.2em 0.3em -0.1em var(--m3),
    inset 1em 0.2em 0.4em 0em var(--m2),
    inset 1em 0.2em 0.6em 0.1em var(--m1);
  /* -------- */
}

.pipe-accents .right div:nth-child(1){
  top: 16%;
  right: var(--_pipe-pos-x);
  border-top-right-radius: 50%;
  border-top-left-radius: 50%;
  box-shadow: 
  inset -0.1em 0.4em 0.6em -0.2em var(--mw1),
  /* light on */
  inset 1em -0.5em 0.8em -0.8em var(--m3),
  inset 1em -0.5em 0.9em -0.5em var(--m2),
  inset 1em -0.5em 1em -0.3em var(--m1);
  /* -------- */
}
.pipe-accents .right div:nth-child(1)::before {
  content: '';
  display: block;
  width: 98%;
  height: 1em;
  background: #040909;
  position: absolute;
  right: 78%;
  top: 40%;
  rotate: -5deg;
  bottom: 0;
  margin: auto;
  z-index: -1;
  box-shadow: 
  inset 0em 0.3em 0.6em -0.4em var(--mw1),
  /* light on */
  inset -1em -0.5em 0.3em -0.5em var(--m3),
  inset -1em -0.5em 0.4em -0.3em var(--m2),
  inset -1em -0.5em 0.6em -0.2em var(--m1)
  /* -------- */;
}

.pipe-accents .right div:nth-child(2) {
  top: 26%;
  right: var(--_pipe-pos-x);
  border-top-right-radius: 30%;
  border-top-left-radius: 30%;
  border-bottom-right-radius: 30%;
  border-bottom-left-radius: 30%;
  box-shadow:
    inset -0.1em 0.4em 0.6em -0.2em var(--mw1),
    /* light on */
    inset 1em 0em 0.8em -0.6em var(--m3),
    inset 1em 0em 0.9em 0em var(--m2),
    inset 1em 0em 1em 0.1em var(--m1);
  /* -------- */
}

.pipe-accents .right div:nth-child(2)::before {
  content: '';
  display: block;
  width: 98%;
  height: 1em;
  background: #040909;
  position: absolute;
  right: 78%;
  top: 0%;
  transform: rotate(-2deg); /* Fix: use transform instead of rotate */
  bottom: 0;
  margin: auto;
  z-index: -1;
  box-shadow:
    inset 0em 0.3em 0.6em -0.4em var(--mw1),
    /* light on */
    inset -1em -0.1em 0.3em 0em var(--m3),
    inset -1em -0.1em 0.4em 0.2em var(--m2),
    inset -1em -0.1em 0.6em -0.3em var(--m1);
  /* -------- */
}

.pipe-accents .right div:nth-child(3) {
  top: 64%;
  right: var(--_pipe-pos-x);
  border-bottom-right-radius: 40%;
  border-bottom-left-radius: 40%;
  box-shadow:
    inset -0.1em 0.4em 0.6em -0.2em var(--mw1),
    /* light on */
    inset 1em 0.3em 0.8em -0.5em var(--m3),
    inset 1em 0.3em 0.9em -0.3em var(--m2),
    inset 1em 0.3em 1em 0em var(--m1);
  /* -------- */
}

.pipe-accents .right div:nth-child(3)::before {
  content: '';
  display: block;
  width: 98%;
  height: 1em;
  background: #040909;
  position: absolute;
  right: 78%;
  top: 20%;
  transform: rotate(4deg); /* Fix: use transform instead of rotate */
  margin: auto;
  z-index: -1;
  box-shadow:
    inset 0em 0.3em 0.6em -0.4em var(--mw1),
    /* light on */
    inset -1em 0.2em 0.3em -0.1em var(--m3),
    inset -1em 0.2em 0.4em 0em var(--m2),
    inset -1em 0.2em 0.6em 0.1em var(--m1);
  /* -------- */
}

.pipe-accents .bottom-left {
  position: absolute;
  bottom: 12%;
  left: -6%;
  width: 20%;
  height: 2.4%;
  background: #040909;
  border-radius: 40%;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  box-shadow:
    inset -0.4em -0.1em 1em -0.4em var(--mw1),
    /* light on */
    inset -2em 0em 1.8em -1.5em var(--m3),
    inset -2em 0em 1.9em -1.3em var(--m2),
    inset -2em 0em 2em -1em var(--m1);
  /* -------- */
}

.pipe-accents .bottom-left::before {
  display: block;
  content: '';
  position: absolute;
  top: -24%;
  left: 0;
  right: 0;
  margin: auto;
  background: #040909;
  width: 90%;
  height: 70%;
  border-radius: 50%;
  border-top-left-radius: 40%;
  border-top-right-radius: 40%;
  box-shadow:
    inset -0.4em 0em 1em -0.3em var(--mw1),
    /* light on */
    inset -2em 0em 1.8em -1.5em var(--m3),
    inset -2em 0em 1.9em -1.3em var(--m2),
    inset -2em 0em 2em -1em var(--m1);
  /* -------- */
}

.pipe-accents .bottom-right {
  position: absolute;
  bottom: 12%;
  right: -6%;
  width: 20%;
  height: 2.4%;
  background: #040909;
  border-radius: 40%;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  box-shadow: 
    inset -0.4em -0.1em 1em -0.4em var(--mw1),    
    /* light on */
    inset 2em 0em 1.8em -1.5em var(--m3),
    inset 2em 0em 1.9em -1.3em var(--m2),
    inset 2em 0em 2em -1em var(--m1);
  /* -------- */
}

.pipe-accents .bottom-right::before {
  display: block;
  content: '';
  position: absolute;
  top: -24%;
  left: 0;
  right: 0;
  margin: auto;
  background: #040909;
  width: 90%;
  height: 70%;
  border-radius: 50%;
  border-top-left-radius: 40%;
  border-top-right-radius: 40%;
  box-shadow: 
    inset -0.4em 0em 1em -0.3em var(--mw1),    
    /* light on */
    inset 2em 0em 1.8em -1.5em var(--m3),
    inset 2em 0em 1.9em -1.3em var(--m2),
    inset 2em 0em 2em -1em var(--m1);
  /* -------- */
}

.small-outer-pipe {
  position: absolute;
  transform: translate(0, -5.6%); /* Fix: use transform instead of translate */
  width: calc(var(--_size) * (1/2.7));
  height: calc(var(--_size) * 0.87);
  border-radius: 40% / 10%;
  overflow: hidden;
  opacity: 1;
  --_clip-btm: 96%;
  clip-path: polygon(0 0, 100% 0, 100% var(--_clip-btm), 0 var(--_clip-btm));
  border-top: 0.3em solid var(--mw1);
}

.small-inner-pipe {
  width: 100%;
  height: 100%;
  transform: scale(0.92, 0.98); /* Fix: use transform instead of scale */
  border-radius: 35% / 10%;
  box-shadow: 
    0em -94em 20em 20em #040909,
    0em 104em 20em 20em #040909,
    /* light on */
    0em 1em 1em 0.2em var(--m3),
    0em 1em 1em 0.5em var(--m2),
    0em 1em 0.5em 1.2em var(--m1),
    0em 1em 1.2em 1.5em var(--m2),
    0em 1em 2em 2em var(--m3),
    /* ---- */
    /* nat light */
    -0.2em 0.5em 0.8em -0.2em var(--mw1),
    0em 90em 16em 20em #040909,
    -1em 1em 2em 2em #040909,
    0.5em 0em 2em 2em #040909,
    0em 0em 0em 4.6em var(--mw1),
    0em 0em 1.5em 5em var(--mw1),
    /* --------- */
    0em 0em 0em 20em #040909;
}

.base-container {
  position: absolute;
  width: calc(var(--_size) * (8/15));
  height: var(--_size);
}

.base-container .base {
  width: 100%;
  height: 100%;
  position: absolute;
}

.base-container .base div {
  background: #040909;
  position: absolute;
  bottom: 4%;
  left: -10%;
  width: 120%;
  height: 12%;
  border-radius: 40% 40% / 30% 30%;    
  box-shadow: 
    0 2em 2em -1.4em #000,
    inset -0.4em 0.1em 0.8em -0.2em var(--mw1);
  /* -------- */
}

.base-container .base div::before {
  content: "";
  display: block;
  width: 100%;
  height: 50%;
  border-radius: 100%;    
  box-shadow: 
    0 2em 10em 0 #000,
    inset -0.4em 0em 0.8em 0em var(--mw1),
    inset 0em 0em 0.5em 0.3em #040909,
    inset 0em 0em 0.5em 0.3em #040909,
    inset 0em 0em 1em 0em #040909,
    inset 0em 0em 2em 0em #040909,
    inset 0em 0em 3em 0em #040909,
    /* light on */
    inset 0em 0em 1em 0em var(--m3),
    inset 0em 0em 1em 2em var(--m2),
    inset 1em 0.3em 10em 10em var(--m1);
  /* -------- */
}

.display {
  color: var(--_bloom);
  font-size: 12em;
  line-height: 0.8em;
  transform: translateY(-0.4em); /* Corrected: use transform instead of translate */
}

.display .row {
  display: flex;
}

.display .small-row {
  font-size: 0.3em;
  position: absolute;
  left: 95%;
  top: 10%;
}

.display .small-row .row {
  flex-direction: column;
  line-height: 1.02em;
}

.display .row .col {
  display: flex;
  position: relative;
}

.display .row .col > div:nth-child(1) {
  opacity: 0.2;
}

.display .row .col > div:nth-child(2) {
  position: absolute;
  right: 0;
  z-index: 2;
}

.display .row .col > div:nth-child(3) {
  position: absolute;
  right: 0;
  color: var(--_bloom);
  --_o1-size: 0.1em;
  --_o2-size: 0.4em;
  --_o3-size: 0.6em;
  text-shadow: 
    0em 0em 0.04em var(--_bloom),
    0em 0em 0.04em var(--_bloom),
    0em 0em var(--_o3-size) var(--_o3),
    0em 0em var(--_o3-size) var(--_o3),
    0em 0em var(--_o3-size) var(--_o3),
    0em 0em var(--_o3-size) var(--_o3),
    0em 0em var(--_o2-size) var(--_o2),
    0em 0em var(--_o2-size) var(--_o2),
    0em 0em var(--_o2-size) var(--_o2),
    0em 0em var(--_o2-size) var(--_o2),
    0em 0em var(--_o1-size) var(--_o1),
    0em 0em var(--_o1-size) var(--_o1),
    0em 0em var(--_o1-size) var(--_o1),
    0em 0em var(--_o1-size) var(--_o1);
}

.glass-tube {
  position: absolute;
  width: 26em;
  height: 70em;
  transform: translateY(-7em); /* Corrected: use transform instead of translate */
  border-radius: 1000px;
  box-shadow: 
    /* light on */
    0em 0em 1em -0.2em var(--m1),
    0em 0em 2em -0.4em var(--m2),
    0em 0em 3em -0.4em var(--m2),
    inset 0em 0em 0.4em 0.2em var(--m3),
    inset 0em 0em 0.6em 0.4em var(--m2),
    inset 0em 0em 1em 0.7em var(--m1),
    inset 0em 0em 3em 0em var(--m2),
    inset 0em 0em 5em 1em var(--m3),
    /* -------- */
    inset -0.1em 0.1em 0.1em 0em var(--mw1),
    inset 0 0 1em 0.1em var(--mw1);
}
.glass-tube::before {
  content: "";
  display: block;
  width: 6%;
  opacity: 0.9;
  height: 60%;
  box-shadow: 
  inset 1.5em 0em 1em -1em var(--mw1);
  position: absolute;
  left: 4%;
  top: 16%;
  filter: blur(0.6px);
  opacity: 0.8;
  border-radius: 50% 1% / 50% 100%;
}
.glass-tube::after {
  content: "";
  display: block;
  width: 30%;
  opacity: 0.9;
  height: 60%;
  box-shadow: 
  inset -1em 0.5em 1em -1em var(--mw1);
  position: absolute;
  right: 4%;
  top: 4%;
  filter: blur(0.6px);
  opacity: 1;
  border-radius: 0% 100% / 10% 30%;
}
.hex {
  position: absolute;
  width: 17.7em;
  height: 70em;
  transform: translateY(-7em); /* Corrected: use transform instead of translate */
  border-radius: 1000px;
  overflow: hidden;
  z-index: -1;
  opacity: 0.7;
  --_hex-cl1: #040909;
  --_hex-cl2: var(--_o1);
  --_hex-size: 2.18em;
  background:
    radial-gradient(circle farthest-side at 0% 50%, var(--_hex-cl1) 23.5%, rgba(240, 166, 17, 0) 0) calc(1.06 * var(--_hex-size)) calc(1.5 * var(--_hex-size)),
    radial-gradient(circle farthest-side at 0% 50%, var(--_hex-cl2) 24%, rgba(240, 166, 17, 0) 0) calc(0.94 * var(--_hex-size)) calc(1.5 * var(--_hex-size)),
    linear-gradient(var(--_hex-cl1) 14%, rgba(240, 166, 17, 0) 0, rgba(240, 166, 17, 0) 85%, var(--_hex-cl1) 0) 0 0,
    linear-gradient(150deg, var(--_hex-cl1) 24%, var(--_hex-cl2) 0, var(--_hex-cl2) 26%, rgba(240, 166, 17, 0) 0, rgba(240, 166, 17, 0) 74%, var(--_hex-cl2) 0, var(--_hex-cl2) 76%, var(--_hex-cl1) 0) 0 0,
    linear-gradient(30deg, var(--_hex-cl1) 24%, var(--_hex-cl2) 0, var(--_hex-cl2) 26%, rgba(240, 166, 17, 0) 0, rgba(240, 166, 17, 0) 74%, var(--_hex-cl2) 0, var(--_hex-cl2) 76%, var(--_hex-cl1) 0) 0 0,
    linear-gradient(90deg, var(--_hex-cl2) 2%, var(--_hex-cl1) 0, var(--_hex-cl1) 98%, var(--_hex-cl2) 0%) 0 0 var(--_hex-cl1);
  background-size: calc(2 * var(--_hex-size)) calc(3 * var(--_hex-size));
}
.hex .overlay {
  position: absolute;
  background: #fff;
  mix-blend-mode: overlay;
  width: 200%;
  left: -40%;
  height: 12%;
  transform: rotate(40deg); /* Corrected: use transform instead of rotate */
  animation: 5s electric ease-in infinite;
}

@keyframes electric {
  0% { top: 700%;}
  100% { top: -20%;}
}

.tube-base-container {
  position: absolute;
  width: 34em;
  height: 30em;
  transform: translateY(24em); /* Corrected: use transform instead of translate */
}

.tube-base {
  position: absolute;
  bottom: 4%;
  width: 60%;
  height: 20%;
  background: #040909;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 80% / 40%;
  box-shadow: 
    inset 0em -0.1em 1.2em -0.4em var(--mw1),
    /* light on */
    inset 0em 3em 2.8em -2.5em var(--m3),
    inset 0em 3em 3.9em -2.3em var(--m2),
    inset 0em 3em 4em -2em var(--m1);
}

.tube-base::before {
  display: block;
  content: '';
  width: 99%;
  height: 42%;
  background: #040909;
  border-radius: 50%;
  box-shadow: 
    inset 0em -0.1em 1.2em -0.4em var(--mw1),
    /* light on */
    inset 0em 0em 1.8em -0.5em var(--m3),
    inset 0em 0em 1.9em -0.3em var(--m2),
    inset 0em 0em 2em -0em var(--m1);
}

.tube-btm {
  width: 40%;
  height: 10%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 34%;
  background-color: #040909;
  border-radius: 20% 20% 100% 100%;
  box-shadow: 
    inset 0em 0em 1.2em -0.2em var(--mw1),
    /* light on */
    inset 0em 0.3em 1.2em 0em var(--m1),
    inset 0em 0.3em 1.2em 0.3em var(--m2),
    inset 0em 0.3em 1.2em 0.6em var(--m3);
}

.tube-btm::before {
  content: '';
  display: block;
  width: 60%;
  height: 40%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  bottom: -158%;
  border-radius: 30% 30% 100% 100%;
  background-color: #040909;
  box-shadow: 
    inset 0em -0.1em 0.7em -0.2em var(--mw1),
    /* light on */
    inset 0em 0.1em 1em -0.7em var(--m1),
    inset 0em 0.1em 1em -0.3em var(--m2),
    inset 0em 0.1em 1em -0em var(--m3);
}

.rods {
  width: 50%;
  height: 28%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 14%;
  --_clip-btm: 80%;
  clip-path: polygon(0 0, 100% 0, 100% var(--_clip-btm), 0 var(--_clip-btm));
}

.rods .left-rod {
  width: 60%;
  height: 12%;
  rotate: 60deg;
  position: absolute;
  bottom: 40%;
  left: 0;
  background: #040909;
}

.rods .center-rod {
  width: 30%;
  height: 12%;
  rotate: 90deg;
  position: absolute;
  bottom: 40%;
  right: 0;
  left: 0;
  margin: auto;
  background: #040909;
}

.rods .right-rod {
  width: 60%;
  height: 12%;
  rotate: -60deg;
  position: absolute;
  bottom: 40%;
  right: 0;
  background: #040909;
}

.rods .left-rod,
.rods .center-rod,
.rods .right-rod {
  box-shadow: 
    inset 0em 0.1em 0.8em -0.2em var(--mw1),
    /* light on */
    inset 0em 0.1em 1em -0.7em var(--m1),
    inset 0em 0.1em 1em -0.3em var(--m2),
    inset 0em 0.1em 1em -0em var(--m3);
}

.wires {
  width: 100%;
  height: 100%;
  z-index: -1;
}

.wires div:nth-child(1),
.wires div:nth-child(2) {
  width: 18%;
  height: 18%;
  rotate: 25deg;
  translate: 14em -5em;
  position: absolute;
  bottom: 0;
  box-shadow: 
    inset 0em 0.1em 0.4em 0em var(--mw1),
    inset 0 0 0 0.5em #040909;
  border-radius: 0% 100% / 50% 100%;
}

.wires div:nth-child(2) {
  translate: 15em -8em;
  rotate: 122deg;
  scale: 0.7;
}

.button {
  z-index: 100;
  cursor: pointer;
  .out-container {
    --object-size: 100px;
    --radius: 50%;
    scale: 0.25;
    transform: translate(0em, 172em);
  }
  .out-container,
  .out-container *{
      background-color: #fff;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      border-radius: var(--radius);
      overflow: hidden;
  }
  .out-container {
      width: var(--object-size);
      height: var(--object-size);
      border-radius: var(--radius);
  .in-container {
      overflow: hidden;
      width: calc(var(--object-size) * 0.79);
      height: calc(var(--object-size) * 0.79);
      box-shadow: 
      -5px 5px 5px rgba(0, 0, 0, 0.3),
      -20px 20px 25px rgba(0, 0,0, 0.5),
      -30px 200px 75px 100px rgba(0, 0, 0, 0.5),
      0px 0px 15px 33px rgba(255, 255, 255, 0.7),
      -20px 20px 15px 35px rgba(0, 0, 0, 1);
      background: linear-gradient(205deg, rgba(255,255,255,1) 0%, rgba(65,68,72,1) 100%);
  }
  .in-out-container {
      width: calc(var(--object-size) * 0.58);
      height: calc(var(--object-size) * 0.58);
      transition: box-shadow 0.2s ease-in-out;
      box-shadow: 
      inset 0px 0px 12px 100px rgba(0,0,0, 0),
      inset 0px 0px 12px 12px rgba(0, 0, 0, 0.1),
      0px 0px 4px 5px rgba(0, 0, 0, 1),
      10px -10px 12px 2px rgba(0, 0, 0, 0.4),
      0px 0px 12px 27px rgba(255, 255, 255, 0.8),
      -20px 20px 15px 35px rgba(0, 0, 0, 0.7);
      background: linear-gradient(205deg, rgba(255,255,255,1) 0%, rgba(65,68,72,1) 100%);

  }
  .in-out-container.animate {
      animation: boxshadow 0.3s;
  }
    .in-out-container svg{
        position: absolute;
        width: 50px;
        height: 50px;
        background-color: transparent;
        opacity: 1;
        fill: rgba( 248,	255, 12, 1);
        transition: filter 0.1s ease-in-out;
      }
    .in-out-container svg > *{
      scale: 0.09;
      margin: auto;
      position: absolute;
      translate: 5px 3px;
      filter: drop-shadow( 0px 0px 18px rgba(43,255, 0, 1));
    }
  }

  
}


.power-cord {
  z-index: -1;
  scale: 1.4 0.9;
  position: absolute;
  width: 100%;
  height: 50em;
  top: 0;
  bottom: 0;
  margin: auto;
  translate: -36em 44em;
  transform: rotateX(55deg) rotateZ(-64deg);
}

.power-cord div:nth-child(1) {
  width: 20em;
  height: 18em;
  box-shadow: 0.3em 0.3em 0.2em 0.1em rgba(255, 255, 255, 0.2);
  border-bottom: 6px solid #040909;
  border-right: 4px solid #040909;
  position: absolute;
  left: 0;
  right: 0;
  translate: 39.3em 0em;
  margin: auto;
  bottom: 4%;
  border-radius: 100% 30% / 100% 0;
}

.power-cord div:nth-child(2) {
  width: 20em;
  height: 12em;
  box-shadow: inset 0.3em 0.1em 0.2em -0.1em rgba(255, 255, 255, 0.2);
  border-top: 3px solid #04090977;
  border-left: 4px solid #040909;
  position: absolute;
  translate: 58em 0.2em;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 40%;
  border-radius: 100% 30% / 100% 0;
}

/* --------------- */
/* -- CLOCK OFF -- */
/* --------------- */
*, *:before, *:after {
  transition: box-shadow 0.2s ease-in-out, opacity 0.2s ease-in-out;
  user-select: none;
}


.clock.off .hex {
  opacity: 0.3;
  filter: grayscale(1);
}

.clock.off .hex .overlay {
  display: none;
}

.clock.off .pipe-accents .top-tube,
.clock.off .pipe-accents .top,
.clock.off .pipe-accents .topinset {
  box-shadow: 
    inset -0.2em 1.1em 1.4em -0.4em var(--mw1),
    /* light off */
    inset 0em -1.2em 0.5em -1.1em rgba(0, 0, 0, 0),
    inset 0em -1.2em 1em -0.8em rgba(0, 0, 0, 0),
    inset 0em -1.2em 1em -0.2em rgba(0, 0, 0, 0)
    /* -------- */;
}

.clock.off .pipe-accents .topinset::before {
  box-shadow: 
    inset 0 0 0em 0.1em #040909,
    /* light off */
    -0.1em 0.2em 0.7em 0.1em rgba(255, 255, 255, 0.4),
    inset 0 0 1.3em 0.2em rgba(0, 0, 0, 0),
    inset 0 0 1.3em 0.4em rgba(0, 0, 0, 0),
    inset 0 0 1.3em 0.6em rgba(0, 0, 0, 0),
    inset 0 0 1.3em 2em rgba(0, 0, 0, 0)
    /* -------- */;
  animation-play-state: paused;
}

.clock.off .pipe-accents .tube-holders div {
  box-shadow: 
    inset 0 0 0.1em 0.1em #ffffff5d,
    /* light off */
    inset 0em -1.2em 0.5em -1.1em rgba(0, 0, 0, 0),
    inset 0em -1.2em 1em -0.8em rgba(0, 0, 0, 0),
    inset 0em -1.2em 1em -0.2em rgba(0, 0, 0, 0)
    /* -------- */;
}

.clock.off .inner-pipe {
  box-shadow: 
    0em 104em 16em 20em #040909,
    /* light off */
    0em 1.2em 1em 0.2em rgba(0, 0, 0, 0),
    0em 1.2em 1em 0.5em rgba(0, 0, 0, 0),
    0em 1.2em 0.5em 1.2em rgba(0, 0, 0, 0),
    0em 1.2em 1.2em 1.5em rgba(0, 0, 0, 0),
    0em 1.2em 2em 2em rgba(0, 0, 0, 0),
    /* ---- */
    0em 90em 16em 20em #040909,
    /* nat light */
    -1em 1em 2em 3.7em #040909,
    0.5em 0em 2em 3.7em #040909,
    0em 0em 0em 4.6em var(--mw1),
    0em 0em 0.5em 5em var(--mw1),
    /* --------- */
    0em 0em 0em 20em #040909;
}

.clock.off .small-inner-pipe {
  width: 100%;
  height: 100%;
  scale: 0.92 0.98;
  border-radius: 35% / 10%;
  box-shadow: 
    0em -94em 20em 20em #040909,
    0em 104em 20em 20em #040909,
    /* light off */
    0em 1em 1em 0.2em rgba(0, 0, 0, 0),
    0em 1em 1em 0.5em rgba(0, 0, 0, 0),
    0em 1em 0.5em 1.2em rgba(0, 0, 0, 0),
    0em 1em 1.2em 1.5em rgba(0, 0, 0, 0),
    0em 1em 2em 2em rgba(0, 0, 0, 0),
    /* ---- */
    /* nat light */
    -0.2em 0.5em 0.8em -0.2em var(--mw1),
    0em 90em 16em 20em #040909,
    -1em 1em 2em 2em #040909,
    0.5em 0em 2em 2em #040909,
    0em 0em 0em 4.6em var(--mw1),
    0em 0em 1.5em 5em var(--mw1),
    /* --------- */
    0em 0em 0em 20em #040909;
}

.clock.off .pipe-accents .bottom-left {
  box-shadow: 
    inset -0.4em -0.1em 1em -0.4em var(--mw1),
    /* light off */
    inset -3em 0em 1.8em -1.5em rgba(0, 0, 0, 0),
    inset -3em 0em 1.9em -1.3em rgba(0, 0, 0, 0),
    inset -3em 0em 2em -1em rgba(0, 0, 0, 0)
    /* -------- */;
}

.clock.off .pipe-accents .bottom-left::before {
  box-shadow: 
    inset -0.4em 0em 1em -0.3em var(--mw1),
    /* light off */
    inset -3em 0em 1.8em -1.5em rgba(0, 0, 0, 0),
    inset -3em 0em 1.9em -1.3em rgba(0, 0, 0, 0),
    inset -3em 0em 2em -1em rgba(0, 0, 0, 0)
    /* -------- */;
}

.clock.off .pipe-accents .bottom-right {
  box-shadow: 
    inset -0.4em -0.1em 1em -0.4em var(--mw1),    
    /* light off */
    inset 3em 0em 1.8em -1.5em rgba(0, 0, 0, 0),
    inset 3em 0em 1.9em -1.3em rgba(0, 0, 0, 0),
    inset 3em 0em 2em -1em rgba(0, 0, 0, 0)
    /* -------- */;
}

.clock.off .pipe-accents .bottom-right::before {
  box-shadow: 
    inset -0.4em 0em 1em -0.3em var(--mw1),    
    /* light off */
    inset 3em 0em 1.8em -1.5em rgba(0, 0, 0, 0),
    inset 3em 0em 1.9em -1.3em rgba(0, 0, 0, 0),
    inset 3em 0em 2em -1em rgba(0, 0, 0, 0)
    /* -------- */;
}


.clock.off .pipe-accents .left div:nth-child(1){
  box-shadow: 
    inset -0.1em 0.4em 0.6em -0.2em var(--mw1),
    /* light off */
    inset -1em -0.5em 0.8em -0.8em rgba(0, 0, 0, 0),
    inset -1em -0.5em 0.9em -0.5em rgba(0, 0, 0, 0),
    inset -1em -0.5em 1em -0.3em rgba(0, 0, 0, 0);
    /* -------- */;
}

.clock.off .pipe-accents .left div:nth-child(1)::before,
.clock.off .pipe-accents .left div:nth-child(2)::before,
.clock.off .pipe-accents .left div:nth-child(3)::before,
.clock.off .pipe-accents .right div:nth-child(1)::before,
.clock.off .pipe-accents .right div:nth-child(2)::before,
.clock.off .pipe-accents .right div:nth-child(3)::before {
  box-shadow: 
    inset 0em 0.3em 0.6em -0.3em var(--mw1),
    /* light off */
    inset 1em -0.5em 0.3em -0.5em rgba(0, 0, 0, 0),
    inset 1em -0.5em 0.4em -0.3em rgba(0, 0, 0, 0),
    inset 1em -0.5em 0.6em -0.2em rgba(0, 0, 0, 0)
    /* -------- */;
}

.clock.off .pipe-accents .left div:nth-child(2){
  box-shadow: 
    inset -0.1em 0.4em 0.6em -0.2em var(--mw1),
    /* light off */
    inset -1em 0em 0.8em -0.6em rgba(0, 0, 0, 0),
    inset -1em 0em 0.9em 0em rgba(0, 0, 0, 0),
    inset -1em 0em 1em 0.1em rgba(0, 0, 0, 0);
    /* -------- */;
}

.clock.off .pipe-accents .left div:nth-child(3){
  box-shadow: 
    inset -0.1em 0.4em 0.6em -0.2em var(--mw1),
    /* light off */
    inset -1em 0.3em 0.8em -0.5em rgba(0, 0, 0, 0),
    inset -1em 0.3em 0.9em -0.3em rgba(0, 0, 0, 0),
    inset -1em 0.3em 1em 0em rgba(0, 0, 0, 0);
    /* -------- */;
}

.clock.off .pipe-accents .right div:nth-child(1){
  box-shadow: 
    inset -0.1em 0.4em 0.6em -0.2em var(--mw1),
    /* light off */
    inset 1em -0.5em 0.8em -0.8em rgba(0, 0, 0, 0),
    inset 1em -0.5em 0.9em -0.5em rgba(0, 0, 0, 0),
    inset 1em -0.5em 1em -0.3em rgba(0, 0, 0, 0);
    /* -------- */;
}

.clock.off .pipe-accents .right div:nth-child(2){
  box-shadow: 
    inset -0.1em 0.4em 0.6em -0.2em var(--mw1),
    /* light off */
    inset 1em 0em 0.8em -0.6em rgba(0, 0, 0, 0),
    inset 1em 0em 0.9em 0em rgba(0, 0, 0, 0),
    inset 1em 0em 1em 0.1em rgba(0, 0, 0, 0);
    /* -------- */;
}

.clock.off .pipe-accents .right div:nth-child(3){
  box-shadow: 
    inset -0.1em 0.4em 0.6em -0.2em var(--mw1),
    /* light off */
    inset 1em 0.3em 0.8em -0.5em rgba(0, 0, 0, 0),
    inset 1em 0.3em 0.9em -0.3em rgba(0, 0, 0, 0),
    inset 1em 0.3em 1em 0em rgba(0, 0, 0, 0);
    /* -------- */;
}

.clock.off .base-container .base div::before {
  box-shadow: 
    0 2em 10em 0 #000,
    inset -0.4em 0em 0.8em 0em var(--mw1),
    inset 0em 0em 0.5em 0.3em #040909,
    inset 0em 0em 0.5em 0.3em #040909,
    inset 0em 0em 1em 0em #040909,
    inset 0em 0em 2em 0em #040909,
    inset 0em 0em 3em 0em #040909,
    /* light off */
    inset 0em 0em 1em 0em rgba(0, 0, 0, 0),
    inset 0em 0em 1em 2em rgba(0, 0, 0, 0),
    inset 1em 0.3em 10em 10em rgba(0, 0, 0, 0)
    /* -------- */;
}

.clock.off .display .row .col > div:nth-child(2){
  opacity: 0;
}

.clock.off .display .row .col > div:nth-child(3){
  opacity: 0;
}

.clock.off .glass-tube {
  box-shadow: 
    /* light off */
    0em 0em 1em -0.2em rgba(0, 0, 0, 0),
    0em 0em 2em -0.4em rgba(0, 0, 0, 0),
    0em 0em 3em -0.4em rgba(0, 0, 0, 0),
    inset 0em 0em 0.4em 0.2em rgba(0, 0, 0, 0),
    inset 0em 0em 0.6em 0.4em rgba(0, 0, 0, 0),
    inset 0em 0em 1em 0.7em rgba(0, 0, 0, 0),
    inset 0em 0em 3em 0em rgba(0, 0, 0, 0),
    inset 0em 0em 5em 1em rgba(0, 0, 0, 0),
    /* -------- */
    inset -0.1em 0.1em 0.1em 0em var(--mw1),
    inset 0 0 1em 0.1em var(--mw1);
}

.clock.off .tube-base {
  box-shadow: 
    inset 0em -0.1em 1.2em -0.4em var(--mw1),
    /* light off */
    inset 0em 3em 2.8em -2.5em rgba(0, 0, 0, 0),
    inset 0em 3em 3.9em -2.3em rgba(0, 0, 0, 0),
    inset 0em 3em 4em -2em rgba(0, 0, 0, 0)
    /* -------- */;
}

.clock.off .tube-base::before {
  box-shadow: 
    inset 0em -0.1em 1.2em -0.4em var(--mw1),
    /* light off */
    inset 0em 0em 1.8em -0.5em rgba(0, 0, 0, 0),
    inset 0em 0em 1.9em -0.3em rgba(0, 0, 0, 0),
    inset 0em 0em 2em -0em rgba(0, 0, 0, 0)
    /* -------- */;
}

.clock.off .tube-btm {
  box-shadow: 
    inset 0em 0em 1.2em -0.2em var(--mw1),
    /* light off */
    inset 0em 0.3em 1.2em 0em rgba(0, 0, 0, 0),
    inset 0em 0.3em 1.2em 0.3em rgba(0, 0, 0, 0),
    inset 0em 0.3em 1.2em 0.6em rgba(0, 0, 0, 0)
    /* -------- */;
}

.clock.off .tube-btm::before {
  box-shadow: 
    inset 0em -0.1em 0.7em -0.2em var(--mw1),
    /* light off */
    inset 0em 0.1em 1em -0.7em rgba(0, 0, 0, 0),
    inset 0em 0.1em 1em -0.3em rgba(0, 0, 0, 0),
    inset 0em 0.1em 1em -0em rgba(0, 0, 0, 0)
    /* -------- */;
}

.clock.off .rods .left-rod,
.clock.off .rods .center-rod,
.clock.off .rods .right-rod {
  box-shadow: 
    inset 0em 0.1em 0.8em -0.2em var(--mw1),
    /* light off */
    inset 0em 0.1em 1em -0.7em rgba(0, 0, 0, 0),
    inset 0em 0.1em 1em -0.3em rgba(0, 0, 0, 0),
    inset 0em 0.1em 1em -0em rgba(0, 0, 0, 0)
    /* -------- */;
}

.clock.off .wires div:nth-child(1),
.clock.off .wires div:nth-child(2) {
  box-shadow: 
    inset 0em 0.1em 0.4em -0.1em var(--mw1),
    inset 0 0 0 0.5em #040909;
}

.clock.off .button {
    .in-out-container svg{
        fill: rgba(60, 60, 60);
        transition: filter 0.1s ease-in-out;
      }
    .in-out-container svg > *{
      filter: drop-shadow( 0px 0px 18px rgba(43,255, 0, 0));
    }
  }
}
`;

const TextSectionStyles = styled.div`
margin-left: 50px;
padding-top: calc(var(--header-height) + 130px); /* height of header */
position: relative;
  
.main__wrapper {
  width: 100%;
  gap: 1rem;
}


.main__title {
  position: absolute;
  top: 50%;
  left: 49%;
  transform: translate(-50%, -50%);
  margin-bottom: 1.5rem;
  max-width: 400px;
}

.main__desc {
  position: absolute;
  top: 100%; /* Adjust as needed */
  left: 35%;
  margin-bottom: 1.5rem;
  max-width: 500px;
}

.main__img {
  position: absolute;
  top: 25em;
  right: 10em;
  z-index:2;
}

.main__img img {
  max-width: 400px;
}

.main__img.slide-in-class {
  animation: slideAndFadeIn 10s ease-out forwards;
}

.main__text1 {
  position: absolute;
  top: 20em;
  left: 3em;
  z-index: 3; 
}

.main__text {
  padding: 10px;
  max-width: 450px;
}

@keyframes slideAndFadeIn {
  0% {
    opacity: 0;
    transform: translateX(100vh);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}


@media only screen and (max-width: 768px) {

  .main__img,
  .main__img2 {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    img {
      max-width: 200px;
      margin-top: auto;
    }
    position: relative; /* Set back to relative for mobile */
    top: auto;
    right: auto;
    left: auto;
  }

  .main__title{
    margin-top: -50px;
  }
  .main__title,
  .main__desc {
    position: static;
    text-align: center;
    transform: none;
    margin-bottom: 1.5rem;
    max-width: none;
  }
}
`;


function updateTimeAndDate() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  let amPm = hours >= 12 ? 'PM' : 'AM';
  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }
  let timeStr = hours.toString().padStart(1, '0') + minutes;
  if (timeStr.startsWith('0')) {
    timeStr = ' ' + timeStr.slice(1);
  }
  let month = (now.getMonth() + 1).toString().padStart(2, '0');
  let day = now.getDate().toString().padStart(2, '0');
  const year = now.getFullYear().toString().slice(-2);
  if (month.startsWith('0')) {
    month = ' ' + month.slice(1);
  }
  if (day.startsWith('0')) {
    day = ' ' + day.slice(1);
  }
  const displayStr = timeStr + amPm + month + day + year;

  for (let i = 0; i < 12; i++) {
    const element1 = document.getElementById(`char${i + 1}1`);
    const element2 = document.getElementById(`char${i + 1}2`);

    // Check if elements exist before updating textContent
    if (element1 && element2) {
      element1.textContent = displayStr[i];
      element2.textContent = displayStr[i];
    }
  }
}

function MainSection1() {
  const [animate, setAnimate] = useState(false);
  const [fade, setFade] = useState(false);
  const [showImage, setShowImage] = useState(false);
  
  useEffect(() => {
    updateTimeAndDate();

    // Set interval to update time and date every minute
    const intervalId = setInterval(updateTimeAndDate, 60000);

    // Trigger animation after the initial render
    setAnimate(true);
    setFade(true);

    // Image Animation
    const timeoutId = setTimeout(() => {
      setShowImage(true);
    }, 10000); // Set a delay of 10s


    // Clean up the interval on component unmount
    return () => clearInterval(intervalId), clearTimeout(timeoutId);
  }, []);


  return (
  

    <MainSectionStyles>

      <TextSectionStyles>
                  <MainTitle className="main__title">
                    Welcome, 
                  </MainTitle>
                  <ParagraphText className="main__desc">
                  Career growth has been longing for you....
                  </ParagraphText>
                  <ParagraphText className="main__text1 main__text">Stop waiting, start climbing that success ladder now. </ParagraphText>
                  <div className={`main__img ${showImage ? 'slide-in-class' : ''} ${fade ? 'fade-in-class' : ''}`}>
                    <img src={MainImg} alt="Weconnect" />
                  </div>
      </TextSectionStyles>
    <div className={`clockstyle ${animate ? 'animate-class' : ''} ${fade ? 'fade-in-class' : ''}`}>
        <div className="clock off">
        <div className="shadow"></div>
        <div className="base-container">
          <div className="base">
            <div></div>
          </div>
        </div>
        <div className="small-outer-pipe">
          <div className="small-inner-pipe"></div>
        </div>
        <div className="outer-pipe">
          <div className="inner-pipe"></div>
        </div>
        <div className="pipe-accents">
          <div className="top-tube"></div>
          <div className="tube-holders">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="top"></div>
          <div className="topinset"></div>
          <div className="left"><div></div><div></div><div></div></div>
          <div className="right"><div></div><div></div><div></div></div>
          <div className="bottom-left"></div>
          <div className="bottom-right"></div>
        </div>
        <div className="display">
          <div className="row" style={{ marginLeft: '10px' }}>
            <div className="col"><div>8</div><div id="char01">0</div><div id="char02">0</div></div>
            <div className="col"><div>8</div><div id="char11">0</div><div id="char12">0</div></div>
          </div>
          <div className="row" style={{ marginLeft: '10px' }}>
            <div className="col"><div>8</div><div id="char21">0</div><div id="char22">0</div></div>
            <div className="col"><div>8</div><div id="char31">0</div><div id="char32">0</div></div>
          </div>
          <div style={{ height: '0.2em' }}></div>
          <div className="small-row">
            <div className="row">
              <div className="col"><div>8</div><div id="char41">0</div><div id="char42">0</div></div>
              <div className="col"><div>8</div><div id="char51">0</div><div id="char52">0</div></div>
            </div>
          </div>
          <div className="row" style={{fontSize: '0.8em', marginLeft: '14px' }}>
            <div className="col"><div>8</div><div id="char81">0</div><div id="char82">0</div></div>
            <div className="col"><div>8</div><div id="char91">0</div><div id="char92">0</div></div>
          </div>
          <div className="row" style={{fontSize: '0.8em', marginLeft: '14px' }}>
            <div className="col"><div>8</div><div id="char61">0</div><div id="char62">0</div></div>
            <div className="col"><div>8</div><div id="char71">0</div><div id="char72">0</div></div>
          </div>
          <div className="row" style={{ fontSize: '0.7em' }}>
            <div className="col"><div>8</div><div>2</div><div>2</div></div>
            <div className="col"><div>8</div><div>0</div><div>0</div></div>
            <div className="col"><div>8</div><div id="char101">0</div><div id="char102">0</div></div>
            <div className="col"><div>8</div><div id="char111">0</div><div id="char112">0</div></div>
          </div>
        </div>
        <div className="glass-tube"></div>
        <div className="hex">
          <div className="overlay"></div>
        </div>
        <div className="tube-base-container">
          <div className="wires"><div></div><div></div></div>
          <div className="tube-base"></div>
          <div className="rods">
            <div className="left-rod"></div>
            <div className="center-rod"></div>
            <div className="right-rod"></div>
          </div>
          <div className="tube-btm"></div>
        </div>
        <div className="power-cord">
          <div></div>
          <div></div>
        </div>
        <div className="button" onClick={() => document.body.querySelector('.clock').classList.toggle('off')}>
          
          <div className="out-container">
            <div className="in-container">
                <div className="in-out-container">
                  <svg xmlns="http://www.w3.org/2000/svg">
                    <rect x="192.09" width="64.06" height="223.8" rx="31.11" ry="31.11"/>
                      <path d="M123.52,95.04c4.3,6.37,5.88,13.77,4.73,22.2-1.05,7.74-4.64,14.41-10.77,20-28.44,25.96-45.59,57.74-51.46,95.33-1.02,6.55-1.58,13.19-1.68,19.92-.62,41.97,12.91,78.58,40.6,109.81,19.15,21.61,42.63,36.91,70.46,45.89,6.25,2.02,12.72,3.62,19.39,4.81,40.13,7.15,77.46,.33,111.97-20.44,5.83-3.51,11.31-7.3,16.44-11.37,15.46-12.26,28.23-26.83,38.3-43.7,11.73-19.65,18.9-41.06,21.5-64.25,2.66-23.7-.11-47.12-8.3-70.27-9.11-25.71-23.76-47.69-43.96-65.96-6.97-6.31-10.7-13.92-11.18-22.83-.31-5.69,.81-11.02,3.36-16,2.46-4.83,5.89-8.82,10.28-11.97,5.98-4.29,12.91-6.2,20.8-5.72,4.34,.27,8.46,1.41,12.36,3.42,2.69,1.39,6.03,3.93,10,7.63,29.45,27.35,50.1,60.32,61.95,98.89,8.74,28.43,11.69,57.47,8.85,87.13-.62,6.53-1.57,13.12-2.84,19.78-8.81,46.05-29.73,85.37-62.76,117.96-35.38,34.92-77.92,55.84-127.63,62.75-6.63,.93-13.27,1.52-19.92,1.79-47.37,1.9-90.93-9.82-130.7-35.16-25.45-16.23-46.91-37.17-64.36-62.84C15.7,347.65,2.84,310.03,.39,268.98c-.4-6.67-.49-13.34-.27-19.99,1.13-34.77,9.84-67.52,26.13-98.25,11.5-21.7,26.24-41,44.21-57.9,5-4.7,9.41-7.91,13.23-9.63,8.19-3.69,16.35-3.85,24.47-.48,6.54,2.72,11.66,6.82,15.36,12.31Z"/>
                  </svg>
                </div>
              </div>
        </div>
          
          <div></div>
        </div>
      </div>
    </div>
    </MainSectionStyles>
  );
}

export default MainSection1;