'use client';

import { useState, useEffect } from 'react';
import Countdown from '@/components/countdown';
import DailyReminderWrapper from '@/components/DailyReminderWrapper';
import AddToHomeScreen from '@/components/AddToHomeScreen';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import PreparationBar from '@/components/PreparationBar';
import StudyTips from '@/components/StudyTips';
import Footer from '@/components/Footer';
import Image from 'next/image';

import en from '@/locales/en.json';
import si from '@/locales/si.json';

const locales = { en, si };

export default function Home() {
  const [language, setLanguage] = useState('en');
  const [t, setT] = useState(locales.en);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
    setT(locales[savedLanguage as keyof typeof locales]);
  }, []);

  return (
    <>
      <header className="w-full p-4 flex justify-end">
        <div className="flex gap-4">
          <ThemeToggle />
          <LanguageToggle setLanguage={(lang: string) => { setLanguage(lang); setT(locales[lang as keyof typeof locales]); }} />
          <DailyReminderWrapper />
          <AddToHomeScreen />
        </div>
      </header>
        <Footer />
      </main>
    </>
  );
}
