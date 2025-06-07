import './css/tailwind.css';
import Nav from './components/Nav';
import Home from './pages/Homepage'
import Feed from './pages/Feed';
import Login from './pages/Login';
import Register from './pages/Register';
import PlayList from './pages/PlayList';
import Loading from './components/Loading';
import Search from './pages/Search';
import PlaylistSelection from './pages/PlaylistSelection';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { verifyToken } from './redux/user';

function AppRoutes() {
  const dispatch = useDispatch();
  const verify = useSelector(state => state.user.verify);
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(() => {
    const verifyData = async () => {
      setIsLoading(true);
      if(sessionStorage.getItem("login_token") != null){
        await dispatch(verifyToken());
      };
      setIsLoading(false);
    };
    verifyData();
  }, [dispatch]);

  
  function PrivateRoute(){
    return verify ? <Outlet />: <Navigate to="/" replace /> ;
  }
  
  function RestrictedRoute(){
    return verify ? <Navigate to="/feed" replace /> : <Outlet />;
  }

  if( isLoading ){
    return <Loading />;
  }
  
  return (
  <div className = "h-full flex flex-col">
    <Nav />
    <Routes>
      <Route path = "/" element = {<Home/>} />
      <Route path = "/search" element = {<Search/>} />
      <Route element={<PrivateRoute />}>
        <Route path="/feed" element={<Feed />} />
        <Route path="/playlist" element={<PlaylistSelection />}/>
        <Route path="/playlist/:playlist_name" element={<PlayList />} />
      </Route>
      <Route element={<RestrictedRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  </div>
  );
}

export default AppRoutes;