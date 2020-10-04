import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
//* Core Components
import Header from '../Header';
import Footer from '../Footer';
//* HTTP Requests
import { isLoggedIn } from '../../http/Auth';

const Register = () => {
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

    const body = {
      firstName: e.currentTarget['first-name'].value,
      lastName: e.currentTarget['last-name'].value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      confirmPassword: e.currentTarget['confirm-password'].value,
    };

    const response = await fetch('/.netlify/functions/api/register', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    });

    if (response.status === 201) {
      setError('');
      setLoggedIn(true);
    } else {
      // eslint-disable-next-line no-shadow
      const { error } = await response.json();
      setError(error);
    }
  };

  return (
    <div>
      <Header loggedIn={loggedIn} />
      <div className="flex items-center justify-center  min-h-9xl  bg-gray-200">
        <form
          className="bg-white shadow-xl  overflow-y-auto  rounded px-4 pt-4 pb-8 mx-12  sm:mx-4 w-full sm:mb-8 sm:max-w-lg"
          noValidate
          onSubmit={handleSubmit}
        >
          {error ? <p className="text-red-600 font-extrabold text-base italic flex justify-center pb-6">{error}</p> : null}
          <div className="flex flex-wrap -mx-3 mb-0">
            <div className="w-full md:w-1/2 px-3  md:mb-0">
              <label className="block uppercase md:font-medium md:text-base tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first-name">
                First Name
              </label>
              <input
                className="appearance-none py-1 block w-full bg-gray-200 text-gray-700 border  rounded sm:py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="first-name"
                name="first-name"
                type="text"
                placeholder="Jane"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase md:font-medium md:text-base tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last-name">
                Last Name
              </label>
              <input
                className="appearance-none py-1 block w-full bg-gray-200 text-gray-700 border  rounded sm:py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="last-name"
                name="last-name"
                type="text"
                placeholder="Doe"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-0">
            <div className="w-full px-3">
              <label className="block uppercase md:font-medium md:text-base tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="appearance-none py-1 block w-full bg-gray-200 text-gray-700 border  rounded sm:py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                name="email"
                type="email"
                placeholder="Email Address"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-0">
            <div className="w-full px-3">
              <label className="block uppercase md:font-medium md:text-base tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="appearance-none py-1 block w-full bg-gray-200 text-gray-700 border  rounded sm:py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="register-password"
                name="password"
                type="password"
                placeholder="******************"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-0">
            <div className="w-full px-3">
              <label className="block uppercase md:font-medium md:text-base tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                Confirm Password
              </label>
              <input
                className="appearance-none py-1 block w-full bg-gray-200 text-gray-700 border  rounded sm:py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="register-password-confirm"
                name="confirm-password"
                type="password"
                placeholder="******************"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-black font-medium text-xs transition duration-500 ease-out md:text-base border border-solid hover:border-red-600 hover:border-8 hover:bg-white hover:shadow hover:text-black text-white font-bold py-2 px-2 sm:py-2 sm:px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
            <Link
              className="inline-block font-medium text-xs md:text-base align-baseline font-bold text-sm text-blue-600 hover:text-black"
              to="/login"
            >
              Already Registered?
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
