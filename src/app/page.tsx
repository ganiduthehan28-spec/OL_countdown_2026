'use client';

import { useState, useEffect } from 'react';
import Countdown from '@/components/countdown';
import DailyReminderWrapper from '@/components/DailyReminderWrapper';
import AddToHomeScreen from '@/components/AddToHomeScreen';
import ThemeToggle from '@/components/ThemeToggle';
import PreparationBar from '@/components/PreparationBar';
import StudyTips from '@/components/StudyTips';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <header className="w-full p-4 pb-8 flex justify-center">
        <div className="flex gap-4">
          <ThemeToggle />
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
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">2026 O/L Countdown</h1>
        <PreparationBar />
        <Countdown targetDate="2026-02-17T08:30:00" />
        <StudyTips />
      </main>
      <Footer />
    </>
  );
}