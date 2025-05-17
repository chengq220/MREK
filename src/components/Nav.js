import '../css/tailwind.css';
import { Link } from "react-router-dom";

function Nav() {
  
  return (
    <nav className="w-full bg-slate-900 text-white shadow-md px-4 py-3 mt-10">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between flex-wrap">
        <div className="text-lg font-semibold">MusicRecPlus</div>

        <div className="hidden lg:flex gap-6 text-sm">
          <Link to="/" className="hover:text-gray-300">Recommendation Feed</Link>
          <Link to="/playlist" className="hover:text-gray-300">Playlist</Link>
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

export default Nav;