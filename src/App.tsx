import './App.css';
import Navbar from './components/navbar/Navbar';
import Intro from './components/intro/Intro';
import Carousel from './components/carousel/Carousel';
import { Send } from './components/send/Send';

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
      <Send/>
    </div>
  );
}

export default App;
