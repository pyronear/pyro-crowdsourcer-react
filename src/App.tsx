import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Intro from './components/intro/Intro';
import Carousel from './components/carousel/Carousel';

function App() {
  return (
    <div id="rootOrganizer">
      <Navbar/>
      <div id="carouselContainer">
        <Carousel/>
      </div>
      <Intro/>
    </div>
  );
}

export default App;
