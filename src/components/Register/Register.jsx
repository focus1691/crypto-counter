import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
      <div className="flex items-center justify-center min-h-screen bg-purple-200">
        <form className="bg-purple-500 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg" noValidate onSubmit={handleSubmit}>
          {error ? <p className="text-yellow-300 font-extrabold text-base italic flex justify-center pb-6">{error}</p> : null}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first-name">
                First Name
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="first-name" name="first-name" type="text" placeholder="Jane" />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last-name">
                Last Name
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="last-name" name="last-name" type="text" placeholder="Doe" />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="register-email" name="email" type="email" placeholder="Email Address" />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="register-password" name="password" type="password" placeholder="******************" />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                Confirm Password
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="register-password-confirm" name="confirm-password" type="password" placeholder="******************" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-black hover:bg-opacity-50 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Register
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-white hover:text-gray-300" href="/login">
              Already Registered?
            </a>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
