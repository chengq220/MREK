import '../css/navbar.css';
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react'

function NavUnsigned(){
  return(
    <nav className="w-full bg-slate-900 text-white shadow-md px-4 py-3 mt-10">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between flex-wrap">
        <div className="text-lg font-semibold">
           <Link to="/">MusicRecPlus</Link>
        </div>
        <div className="hidden lg:flex gap-6 text-sm">
          <Link to="/">Search</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}

function NavSigned(){
  const {user, logout} = useAuth();
  return(
    <nav className="w-full bg-slate-900 text-white shadow-md px-4 py-3 mt-10">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between flex-wrap">
        <div className="text-lg font-semibold">
           <Link to="/">MusicRecPlus</Link>
        </div>
        <div className="hidden lg:flex gap-6 text-sm">
          <Link to="/feed" className="hover:text-gray-300">Feed</Link>
          <Link to="/playlist" className="hover:text-gray-300">Playlist</Link>
           <div className="dropdown">
            <button className="dropbtn">{user}</button>
            <div className="dropdown-content">
              <Link to="/preference">Preference</Link>
              <Link to="/Account">Account</Link>
              <Link onClick={logout}>Logout</Link>
            </div>
          </div> 
        </div>
      </div>
    </nav>
  );
}

function Nav(){
  const {verify} = useAuth();
  useEffect(() => {}, [verify])
  return(
    <>
      {verify  ? <NavSigned /> : <NavUnsigned />}
    </>
  );
}

export default Nav;