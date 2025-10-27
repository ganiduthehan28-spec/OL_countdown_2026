
import Countdown from '@/components/countdown';
import Footer from '@/components/Footer';
import PreparationBar from '@/components/PreparationBar';
import StudyTips from '@/components/StudyTips';
import Image from 'next/image';
import AddToHomeScreen from '@/components/AddToHomeScreen';

export default function Home() {
  return (
    <>
      <header className="w-full p-4 flex justify-end">
        <div className="flex gap-4">
          <AddToHomeScreen />
        </div>
      </header>
      <main className="min-h-screen flex flex-col items-center pt-16 px-4 border border-blue-800 rounded-lg">
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
        <Countdown />
        <StudyTips />
        <Footer />
      </main>
    </>
  );
}