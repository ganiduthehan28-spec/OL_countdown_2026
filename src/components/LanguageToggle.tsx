'use client';

import { useState, useEffect } from 'react';

interface LanguageToggleProps {
  setLanguage: (lang: string) => void;
}

const LanguageToggle = ({ setLanguage }: LanguageToggleProps) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    setLanguage(savedLanguage);
  }, [setLanguage]);

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'si' : 'en';
    setCurrentLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <button onClick={toggleLanguage} className="px-3 py-1 border rounded text-sm">
      {currentLanguage === 'en' ? 'Sinhala' : 'English'}
    </button>
  );
};

export default LanguageToggle;
