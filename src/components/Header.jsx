import React from 'react';
import { useHistory, Link } from 'react-router-dom';

const Header = ({ loggedIn }) => {
  const history = useHistory();

  return (
    <nav className="flex items-center justify-between flex-wrap bg-purple-500 p-6">
      <div className="flex items-center flex-shrink-1 text-white mr-6 cursor-pointer" onClick={(e) => history.push('/')}>
        <img className="fill-current h-8 mr-4" src={`${window.location.origin}/bitcoin.svg`} alt="" />
        <span className="font-semibold text-xl tracking-tight">Track My Crypto</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div className="w-full bloc lg:w-auto">

        <div className="flex space-x-4">
          {loggedIn
            ? <Link to="logout" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:bg-purple-400 mt-4 lg:mt-0">Logout</Link>
            : (
              <>
                <Link to="login" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:bg-purple-400 mt-4 lg:mt-0">Login</Link>
                <Link to="register" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:bg-purple-400 mt-4 lg:mt-0">Register</Link>
              </>
            )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
