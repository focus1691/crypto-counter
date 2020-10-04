/* eslint-disable no-await-in-loop */
/* eslint-disable no-shadow */
import React, { useState, useEffect, useCallback } from 'react';
import './assets/css/tailwind.output.css';
import { css } from '@emotion/core';
import HashLoader from 'react-spinners/HashLoader';
//* Core Components
import AddCrypto from './components/AddCrypto/AddCrypto';
import Portfolio from './components/Portfolio/Portfolio';
import Summary from './components/Summary/Summary';
import Header from './components/Header';
import Footer from './components/Footer';
//* HTTP Requests
import { isLoggedIn } from './http/Auth';
//* Utility
import { percentChange } from './utils/calculations';

const override = css`
  display: block;
  margin: 0 auto;
  background-color: #f7fafc;
  border-color: red;
  height: 100vh;
`;

function App() {
  const [minViewportH, setMinViewportH] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [cryptos, setCryptos] = useState({});
  const [buyTotal, setBuyTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [myCryptos, setMyCryptos] = useState([]);
  const [ISO] = useState('usd');

  const checkLoggedIn = async () => {
    setLoggedIn(await isLoggedIn());
  };

  const getCryptoList = async () => {
    const response = await fetch('https://api.coingecko.com/api/v3/coins');
    const data = await response.json();
    setCryptos(data);
  };

  const getMyCoins = useCallback(async () => {
    if (!loggedIn) return;
    const response = await fetch('/.netlify/functions/api/coins');
    const { coins } = await response.json();
    let total = 0;
    let buyTotal = 0;

    for (let i = 0; i < coins.length; i += 1) {
      const { id } = coins[i];
      const purchaseDate = new Date(coins[i].purchaseDate).toLocaleDateString('en-GB').replace(/\//g, '-');
      const now = new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString('en-GB').replace(/\//g, '-');

      {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/history?date=${purchaseDate}`);
        const data = await response.json();
        if (response.status === 200) coins[i].buyTimeMarketData = data.market_data;
      }

      {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/history?date=${now}`);
        const data = await response.json();
        if (response.status === 200) coins[i].marketData = data.market_data;
        coins[i].image = data.image;
      }
      if (coins[i].marketData && coins[i].buyTimeMarketData) {
        // eslint-disable-next-line no-multi-assign
        const buyPrice = (coins[i].buyPrice = coins[i].buyTimeMarketData.current_price[ISO]);
        // eslint-disable-next-line no-multi-assign
        const price = (coins[i].price = coins[i].marketData.current_price[ISO]);
        coins[i].change = percentChange(buyPrice, price);

        buyTotal += coins[i].buyTimeMarketData.current_price[ISO] * coins[i].quantity;
        total += coins[i].marketData.current_price[ISO] * coins[i].quantity;
      }
    }
    setTotal(total);
    setBuyTotal(buyTotal);
    setMyCryptos(coins);
    setIsLoading(false);
  }, [ISO, loggedIn]);

  const deleteCoin = useCallback(
    (coin) => async () => {
      setIsLoading(true);
      const response = await fetch('/.netlify/functions/api/coins', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
        body: JSON.stringify({
          _id: coin._id,
        }),
      });
      if (response.status === 200) getMyCoins();
      else setIsLoading(false);
    },
    [getMyCoins]
  );

  const updateViewport = (isTermsOpen) => {
    setMinViewportH(!isTermsOpen);
  };

  useEffect(() => {
    checkLoggedIn();
    getCryptoList();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      getMyCoins();
    } else {
      setIsLoading(false);
    }
  }, [loggedIn, getMyCoins]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      {isLoading ? (
        <HashLoader css={override} size={50} color="#9f7aea" loading={isLoading} />
      ) : (
        <div className={` mb-20${minViewportH ? ' min-h-screen' : ''} bg-gray-100 h-screen `}>
          <div className="flex items-center bg-gray-100 justify-center">
            <Summary total={total} buyTotal={buyTotal} />
          </div>
          <div className="flex items-center justify-center ">
            <AddCrypto cryptos={cryptos} getMyCoins={getMyCoins} setIsLoading={setIsLoading} />
          </div>
          <div className="flex justify-center items-center justify-center  px-auto overflow-x-auto sm:p-0  sm:items-center bg-gray-100 sm:justify-center ">
            <Portfolio coins={myCryptos} deleteCoin={deleteCoin} />
          </div>
        </div>
      )}
      <Footer updateViewport={updateViewport} />
    </>
  );
}

export default App;
