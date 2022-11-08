import './App.scss';
import Navbar from './components/navbar/Navbar';
import Intro from './components/intro/Intro';
import { Send } from './components/send/Send';
import { useEffect, useState } from 'react';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  const onWindowResize = () => {
    if (window.innerWidth < 650) {
      setIsMobile(true);
      return;
    }
    setIsMobile(false);
  }
  useEffect(() => {
    window.addEventListener("resize", onWindowResize);
    onWindowResize();
  })

  return (
    <div id="rootOrganizer">
      <Navbar isMobile={isMobile} />
      <Intro isMobile={isMobile}/>
      <Send isMobile={isMobile}/>
    </div>
  );
}

export default App;
