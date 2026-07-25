
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import GuestBook from "./pages/GuestBook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guestbook" element={<GuestBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

