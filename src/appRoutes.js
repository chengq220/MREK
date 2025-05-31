import './css/tailwind.css';
import Nav from './components/Nav';
import Home from './pages/Homepage'
import Feed from './pages/Feed';
import Login from './pages/Login';
import Register from './pages/Register';
import PlayList from './pages/PlayList';
import Loading from './components/Loading';
import Search from './pages/Search';
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
  <div className = "flex flex-col">
    <Nav />
    <Routes>
      <Route path = "/" element = {<Home/>} />
      <Route path = "/search" element = {<Search/>} />
      <Route element={<PrivateRoute />}>
        <Route path="/feed" element={<Feed />} />
        <Route path="/playlist" element={<PlayList />} state={{update: true}}/>
      </Route>
      <Route element={<RestricteRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  </div>
  );
}

export default AppRoutes;