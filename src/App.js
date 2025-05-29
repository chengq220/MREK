import './css/tailwind.css';
import Nav from './components/Nav';
import Home from './pages/Homepage'
import Feed from './pages/Feed';
import Login from './pages/Login';
import Register from './pages/Register';
import PlayList from './pages/PlayList';
import Preference from './pages/Preference'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from "./context/auth";

function PrivateRoute(){
  const token = JSON.parse(localStorage.getItem('login_token'));
  return token ? <Navigate to="/" replace /> : <Outlet />;
}

function RestricteRoute(){
  const token = JSON.parse(localStorage.getItem('login_token'));
  return token ? <Navigate to="/feed" replace /> : <Outlet />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <Routes>
          <Route path = "/" element = {<Home/>} />
          <Route element={<PrivateRoute />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/preference" element={<Preference />} />
            <Route path="/playlist" element={<PlayList />} />
          </Route>
          <Route element={<RestricteRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
