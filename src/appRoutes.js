import './css/tailwind.css';
import Nav from './components/Nav';
import Home from './pages/Homepage'
import Feed from './pages/Feed';
import Login from './pages/Login';
import Register from './pages/Register';
import PlayList from './pages/PlayList';
import Preference from './pages/Preference'
import Loading from './components/Loading';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useEffect } from "react";


function AppRoutes() {
  const {verify, token, isLoading, verifyToken} = useAuth();
  useEffect(() =>{
    const authenticate = async () =>{
      await verifyToken();
    }
    if(sessionStorage.getItem("login_token") != null){
      authenticate();
    }
  }, [token]);

  if(isLoading){
    return <Loading /> 
  }
  
  function PrivateRoute(){
    return verify ? <Outlet />: <Navigate to="/" replace /> ;
  }

  function RestricteRoute(){
    return verify ? <Navigate to="/feed" replace /> : <Outlet />;
  }

  return (
  <>
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
  </>
  );
}

export default AppRoutes;