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
      <header className="w-full p-4 pb-8 flex justify-center">
        <div className="flex gap-4">
          <ThemeToggle />
          <LanguageToggle setLanguage={(lang: string) => { setLanguage(lang); setT(locales[lang as keyof typeof locales]); }} />
          <DailyReminderWrapper />
          <AddToHomeScreen />
        </div>
      </header>
      <main className="min-h-screen flex flex-col items-center pt-16 px-4 pb-16">
        <div className="relative w-[200px] h-[200px] mb-8 rounded-lg overflow-hidden">
          <Image
            src="/background.jpg"
            alt="Success Behind 9As"
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
        <PreparationBar t={t} />
        <Countdown targetDate="2026-02-17T08:30:00" />
        <StudyTips t={t} />
      </main>
      <Footer t={t} />
    </>
  );
}
