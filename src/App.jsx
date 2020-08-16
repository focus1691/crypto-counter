/* eslint-disable no-await-in-loop */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import './assets/css/tailwind.output.css';
//* Core Components
import AddCrypto from './components/AddCrypto/AddCrypto';
import Portfolio from './components/Portfolio/Portfolio';
import Header from './components/Header';
import Footer from './components/Footer';
//* HTTP Requests
import { isLoggedIn } from './http/Auth';
//* Utility
import { percentChange } from './utils/calculations';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cryptos, setCryptos] = useState({});
  const [myCryptos, setMyCryptos] = useState([]);
  const [ISO, setISO] = useState('usd');

  const checkLoggedIn = async () => {
    setLoggedIn(await isLoggedIn());
  };

  const getCryptoList = async () => {
    const response = await fetch('https://api.coingecko.com/api/v3/coins');
    const data = await response.json();
    setCryptos(data);
  };

  const getMyCryptos = async () => {
    if (!loggedIn) return;
    const response = await fetch('/coins');
    const { coins } = await response.json();

    for (let i = 0; i < coins.length; i += 1) {
      const { id } = coins[i];
      const purchaseDate = new Date(coins[i].purchaseDate).toLocaleDateString('en-GB').replace(/\//g, '-');
      const now = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');

      {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/history?date=${purchaseDate}`);
        const data = await response.json();
        if (response.status === 200) coins[i].buyTimeMarketData = data.market_data;
      }

      {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/history?date=${now}`);
        const data = await response.json();
        if (response.status === 200) coins[i].marketData = data.market_data;
      }
      if (coins[i].marketData && coins[i].buyTimeMarketData) {
        // eslint-disable-next-line no-multi-assign
        const buyPrice = coins[i].buyPrice = coins[i].buyTimeMarketData.current_price[ISO];
        // eslint-disable-next-line no-multi-assign
        const price = coins[i].price = coins[i].marketData.current_price[ISO];
        coins[i].change = percentChange(buyPrice, price);
      }
      setMyCryptos(coins);
    }
  };

  useEffect(() => {
    checkLoggedIn();
    getCryptoList();
  }, []);

  useEffect(() => {
    getMyCryptos();
  }, [loggedIn]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <div className="min-h-screen mb-20">
        <div className="flex items-center justify-center">
          <AddCrypto cryptos={cryptos} />
        </div>
        <div className="flex items-center justify-center">
          <Portfolio coins={myCryptos} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
