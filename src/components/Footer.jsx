import React, { useState } from 'react';

const Footer = ({ updateViewport }) => {
  const [termsOpen, setTermsOpen] = useState(false);

  const handleTermsChange = () => {
    setTermsOpen(!termsOpen);
    if (updateViewport) updateViewport(termsOpen);
  };

  return (
    <footer
      className={`flex flex-col items-center justify-center fixed bottom-0 w-full bg-gray-800 py-6 ${
        termsOpen ? ' divide-y divide-gray-400 space-y-6' : ''
      }`}
    >
      <div className="flex flex-row space-x-2 divide-x divide-gray-400">
        <p className="text-white ml-8 sm:text-base font-medium">
          &copy; Copyright
          {' '}
          {new Date().getFullYear()}
          {' '}
          trackmycrypto.co.uk
        </p>
        <a className="text-yellow-400 text-base font-medium hover:text-yellow-500 px-2" href="#terms" onClick={handleTermsChange}>
          Terms &amp; Conditions
        </a>
      </div>
      <div className="flex flex-col items-center justify-center xs:w-full sm:w-2/3 md:w-2/3 px-2 text-center">
        <p className={`${termsOpen ? ' ' : 'hidden '}text-white`}>
          TrackMyCrypto disclaims all liabilities regarding the content of these calculators and any use thereof that could be made by any person.
          TopBetCalculator do not make any representations or warranties, express or implied, as to the accuracy, completeness, or fitness for any
          purpose or use of the content provided. Accordingly, you should not rely on any of the information as authoritative or as a substitute for
          the exercise of your own skill and judgment in making a trade or other decision
        </p>
      </div>
    </footer>
  );
};

export default Footer;
