import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
//* Core Components
import Header from '../Header';
import Footer from '../Footer';
//* HTTP Requests
import { isLoggedIn } from '../../http/Auth';

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const checkLoggedIn = async () => {
    setLoggedIn(await isLoggedIn());
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  useEffect(() => {
    if (loggedIn) history.push('/');
  }, [loggedIn, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/.netlify/functions/api/auth', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        username: e.currentTarget.username.value,
        password: e.currentTarget.password.value,
      }),
    });

    if (response.status === 200) {
      // Logged in
      setError('');
      setLoggedIn(true);
    } else {
      // eslint-disable-next-line no-shadow
      const { error } = await response.json();
      setError(error);
    }
  };

  return (
    <>
      <Header loggedIn={loggedIn} />
      <div className="flex items-center justify-center min-h-9xl  bg-gray-200">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8  bg-white shadow-lg overflow-hidden w-full max-w-lg"
          noValidate
          onSubmit={handleSubmit}
        >
          {error ? <p className="text-red-600 font-extrabold text-base italic flex justify-center  pb-6">{error}</p> : null}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-medium text-base font-bold mb-2" htmlFor="username">
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="login-username"
                name="username"
                type="username"
                placeholder="Email Address"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block font-medium text-base uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="login-password"
                name="password"
                type="password"
                placeholder="******************"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-black hover:bg-opacity-50 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-white hover:text-gray-300" href="/">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
