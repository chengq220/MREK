import "../css/dropdown.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/user';

function NavUnsigned(){
  return(
    <nav className="w-full bg-slate-900 text-white shadow-md px-4 py-3 mt-1">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between flex-wrap">
        <div className="text-lg font-semibold">
           <Link to="/">MusicRecPlus</Link>
        </div>
        <div className="hidden lg:flex gap-6 text-sm">
          <Link to="/search">Search</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}

function NavSigned(){
  const username = useSelector(state => state.user.username)
  const dispatch = useDispatch();
  
  return(
    <nav className="w-full bg-slate-900 text-white shadow-md px-4 py-3 mt-1">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between flex-wrap">
        <div className="text-lg font-semibold">
           <Link to="/">MusicRecPlus</Link>
        </div>
        <div className="hidden lg:flex gap-6 text-sm">
          <Link to="/search">Search</Link>
          <Link to="/feed" className="hover:text-gray-300">Feed</Link>
          <Link to="/playlist" className="hover:text-gray-300">Playlist</Link>
          <div className="dropdown">
            <button className="dropbtn">{username}</button>
            <div className="dropdown-content">
              <Link to="/">Account</Link>
              <Link onClick={() => dispatch(logout())}>Logout</Link>
            </div>
          </div> 
        </div>
      </div>
    </nav>
  );
}

function Nav(){
  const verify = useSelector(state => state.user.verify);
  
  return(
    <>
      {verify  ? <NavSigned /> : <NavUnsigned />}
    </>
  );
}

export default Nav;