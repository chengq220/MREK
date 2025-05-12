import '../css/tailwind.css';

function Nav() {
  return (
    <nav className="w-full bg-slate-900 text-white shadow-md px-4 py-3 mt-10">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between flex-wrap">
        <div className="text-lg font-semibold">fdasfwer</div>

        <div className="hidden lg:flex gap-6 text-sm">
          <a href="#" className="hover:text-gray-300">Markasdfwreets</a>
          <a href="#" className="hover:text-gray-300">faewarwar shit</a>
          <a href="#" className="hover:text-gray-300">Exchange</a>
          <a href="#" className="hover:text-gray-300">Support</a>
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