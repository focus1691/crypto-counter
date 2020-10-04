import React, { useMemo, useState, useEffect } from 'react';
import { twoDecimalPlaces, percentChange } from '../../utils/calculations';

const Summary = ({ total, buyTotal }) => {
  const [bounce, setBounce] = useState('');
  const change = useMemo(() => percentChange(buyTotal, total), [total, buyTotal]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (bounce === '') {
        setBounce('motion-reduce:animate-bounce');
      }
    }, 10000);
    setTimeout(() => {
      if (bounce === 'motion-reduce:animate-bounce') {
        setBounce('');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [bounce]);

  return (
    <div className={`flex items-center shadow-lg overflow-hidden justify-center space-x-4 m-5 p-6 bg-white  rounded-lg w-11/12 `}>
      <h1 className={` text-base ${bounce} md:text-3xl lg:text-6xl text-base text-gray-700 font-bold whitespace-no-wrap`}>
        Total
        {' = '}
        {twoDecimalPlaces(total)}
      </h1>
      <h2 className={`text-lg ${bounce} duration-500 md:text-3xl lg:text-6xl font-bold${change < 0 ? ' text-red-600' : ' text-green-500'}`}>
        {isNaN(change) ? 0 : change}
        %
      </h2>
    </div>
  );
};

export default Summary;
