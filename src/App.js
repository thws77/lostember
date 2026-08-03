
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import Home from "./pages/Home";
import GuestBook from "./pages/GuestBook";

import bgm from "./assets/Lost ember.mp3";


function App() {

  const [playing, setPlaying] = useState(false);

  const audioRef = useRef(new Audio(bgm));

  const toggleMusic = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(prev => !prev);
  };
  useEffect(() => {
    audioRef.current.loop = true;
    audioRef.current.volume = 0.6;
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              playing={playing}
              toggleMusic={toggleMusic}
            />
          }
        />

        <Route
          path="/guestbook"
          element={<GuestBook />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

