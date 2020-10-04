import React from 'react';
import { twoDecimalPlaces } from '../../utils/calculations';

const Portfolio = ({ coins, deleteCoin }) => (
  <table className="table-auto shadow-lg mx-auto overflow-hidden w-11/12 m-5   bg-white rounded-lg ">
    <thead>
      <tr className="">
        <th className="text-tiny px-2 font-bold text-xs md:px-4 sm:text-lg border-r border-purple-300 leading-4 sm:font-medium text-gray-800 py-2">
          Coin
        </th>
        <th className="text-xs p-1 font-bold text-xs  md:px-4 sm:text-lg border-r border-purple-300 leading-4 sm:font-medium text-gray-800 py-2">
          Quantity
        </th>
        <th className="text-xs p-1 font-bold text-xs  md:px-4 sm:text-lg border-r border-purple-300 leading-4 sm:font-medium text-gray-800 py-2">
          Purchased
        </th>
        <th className="text-xs p-1 font-bold text-xs  md:px-4 sm:text-lg border-r border-purple-300 leading-4 sm:font-medium text-gray-800 py-2">
          Buy
        </th>
        <th className="text-xs p-1 font-bold text-xs  md:px-4 sm:text-lg border-r border-purple-300 leading-4 sm:font-medium text-gray-800 py-2">
          Current
        </th>
        <th className="text-xs p-1 font-bold text-xs  md:px-4 sm:text-lg border-r border-purple-300 leading-4 sm:font-medium text-gray-800 py-2">
          Change
        </th>
        <th className="text-xs p-1 font-bold   md:px-4 sm:text-lg border-r border-purple-300 leading-4 sm:font-medium text-gray-800 py-2">Delete</th>
      </tr>
    </thead>
    <tbody>
      {coins.map((coin) => (
        <tr v-for="row in rows" className=" border-solid border-t-2  overflow-hidden border-purple-300" key={coin._id}>
          <td className="text-xs p-2 sm:text-base border-solid border-purple-300 border-r md:px-4 py-2">
            <span>
              {coin.image ? <img className="inline-block pr-2" src={coin.image.thumb} alt={coin.symbol} /> : null}
              {coin.name}
            </span>
          </td>
          <td className="border-solid text-xs p-2 sm:text-base  border-purple-300 border-r md:px-4 py-2 text-center">{coin.quantity}</td>
          <td className="border-solid text-xs p-2 sm:text-base  border-purple-300 border-r md:px-4 py-2 text-center">
            {new Date(coin.purchaseDate).toLocaleDateString('en-GB')}
          </td>
          <td className="border-solid text-xs p-2 sm:text-base  border-purple-300 border-r md:px-4 py-2 text-center">
            <p>{twoDecimalPlaces(coin.buyPrice * coin.quantity)}</p>
            <p className="text-xs font-bold">
              {'('}
              {twoDecimalPlaces(coin.buyPrice)}
              {')'}
            </p>
          </td>
          <td className="border-solid text-xs p-2 sm:text-base  border-purple-300 border-r md:px-4 py-2 text-center">
            <p>{twoDecimalPlaces(coin.price * coin.quantity)}</p>
            <p className="text-xs font-bold">
              {'('}
              {twoDecimalPlaces(coin.price)}
              {')'}
            </p>
          </td>
          <td
            className={`border-solid text-xs p-2 sm:text-base border-purple-300 border-r md:px-4 py-2 text-center font-bold${
              coin.change < 0 ? ' text-red-600' : ' text-green-500'
            }`}
          >
            {coin.change}%
          </td>
          <td className="border text-xs sm:text-lg  p-2 md:px-4 py-2">
            <img
              onClick={deleteCoin(coin)}
              className="fill-current min-h-full w-4 sm:w-6 cursor-pointer m-2 sm:m-auto"
              src={`${window.location.origin}/criss-cross.png`}
              alt="Delete"
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Portfolio;
