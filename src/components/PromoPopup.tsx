'use client';

import { useState, useEffect } from 'react';

const PromoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 25000); // 25 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[6px]">
      <div className="bg-white rounded-2xl shadow-lg p-6 m-4 max-w-sm w-full text-center popup-animate relative">
        <h2 className="text-xl font-bold mb-4">
          Follow the Success Behind 9A (OL) 🇱🇰✨ official channel on WhatsApp
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <a
            href="https://whatsapp.com/channel/0029VaDgoQDLSmbS6vs09W1A"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full sm:w-auto bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors text-center"
          >
            Join Now
          </a>
          <button
            onClick={() => setIsOpen(false)}
            className="block w-full sm:w-auto bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoPopup;