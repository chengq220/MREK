import '../css/tailwind.css';
import '../css/navbar.css';
import { Link } from "react-router-dom";
import { useAuth } from './auth/AuthContext';

function NavUnsigned(){
  return(
    <nav className="w-full bg-slate-900 text-white shadow-md px-4 py-3 mt-10">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between flex-wrap">
        <div className="text-lg font-semibold">
           <Link to="/">MusicRecPlus</Link>
        </div>
        <div className="hidden lg:flex gap-6 text-sm">
          <Link to="/login">Login</Link>
        </div>

        <div className="lg:hidden">
          <button
            type="button"
            className="text-gray-300 focus:outline-none"
            onClick={() => alert("Implement mobile menu logic here")}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

function NavSigned(){
  const {user, token, login, logout, verify} = useAuth();
  const username = sessionStorage.getItem("username")

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
            <button className="dropbtn">{username}</button>
            <div className="dropdown-content">
              <Link to="/preference">Preference</Link>
              <Link to="/Account">Account</Link>
              <Link onClick={logout}>Logout</Link>
            </div>
          </div> 
        </div>

        <div className="lg:hidden">
          <button
            type="button"
            className="text-gray-300 focus:outline-none"
            onClick={() => alert("Implement mobile menu logic here")}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

function Nav(){
  const {user, token, login, logout, verify} = useAuth();
  console.log(token)
  return(
    <>
      {verify  ? <NavSigned /> : <NavUnsigned />}
    </>
  );
}

export default Nav;