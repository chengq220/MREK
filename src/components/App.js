import '../css/tailwind.css';
import Nav from './Nav';
import Feed from './Feed';
import PlayList from './PlayList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from "react";

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/playlist" element={<PlayList />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

export default App;
