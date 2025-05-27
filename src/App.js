import './css/tailwind.css';
import Nav from './components/Nav';
import Home from './pages/Homepage'
import Feed from './pages/Feed';
import Login from './pages/Login';
import Register from './pages/Register';
import PlayList from './pages/PlayList';
import Preference from './pages/Preference'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/auth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <Routes>
          <Route path = "/" element = {<Home/>} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/playlist" element={<PlayList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/preference" element={<Preference />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
