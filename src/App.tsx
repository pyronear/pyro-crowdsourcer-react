import './App.css';
import Navbar from './components/navbar/Navbar';
import Intro from './components/intro/Intro';
import Carousel from './components/carousel/Carousel';

function App() {
  return (
    <div id="rootOrganizer">
      <Navbar/>
      <div id="straightCarouselContainer">
        <div id="carouselContainer">
          <Carousel/>
          <Carousel directionLeftToRight={false}/>
          <Carousel/>
        </div>
      </div>
      <Intro/>
    </div>
  );
}

export default App;
