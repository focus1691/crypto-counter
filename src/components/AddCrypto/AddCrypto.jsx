import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

const AddCrypto = ({ cryptos, getMyCoins, setIsLoading }) => {
  const [error, setError] = useState('');
  const [coin, setCoin] = useState({});
  const [quantity, setQuantity] = useState(null);
  const [date, setDate] = useState(null);

  const handleSelection = (e) => {
    const key = e.currentTarget.options.selectedIndex;
    setCoin(cryptos[key]);
  };

  const handleAmountChange = (e) => {
    e.preventDefault();
    setQuantity(e.currentTarget.value);
  };

  const handleDateSelection = (newDate) => {
    setDate(newDate);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const { id, name, symbol } = coin;
    const body = {
      id, name, symbol, quantity, purchaseDate: date,
    };

    const response = await fetch('/.netlify/functions/api/coins', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    });
    if (response.status === 201) {
      await response.json();
      getMyCoins();
      // Set the state here
    } else {
      setError(await response.text());
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center space-x-4 m-5 p-6 bg-purple-200 border-solid border border-purple-700 rounded-lg w-10/12">
        <div className="inline-block relative block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          <select onChange={handleSelection} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm">
            {Object.keys(cryptos).map((key) => (
              <option key={key} name={key}>{cryptos[key].name}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center mx-10 text-gray-700">
            {coin.image ? <img src={coin.image.thumb} alt={coin.symbol} /> : null }
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
        <input className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm" type="text" name="quantity" placeholder="Quantity Brought" onChange={handleAmountChange} />
        <div className="appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-3 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm">
          <DatePicker
            className="w-full"
            selected={date}
            onChange={handleDateSelection}
            placeholderText="Purchase date"
          />
        </div>
        <span style={{ display: 'contents' }} className="fill-current min-h-full w-full cursor-pointer" role="button" tabIndex={0} onClick={handleSubmit}>
          <img className="fill-current min-h-full w-8 ml-4 cursor-pointer" src={`${window.location.origin}/add.svg`} alt="Add" />
        </span>
      </div>
    </>
  );
};

export default AddCrypto;
