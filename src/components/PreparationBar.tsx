'use client';

import { useState, useEffect } from 'react';

interface PreparationBarProps {
  t: any; // Adjust this type based on your translation object structure
}

const PreparationBar = ({ t }: PreparationBarProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const targetDate = new Date('February 17, 2026 08:30:00').getTime();
    const startDate = new Date('January 1, 2024 00:00:00').getTime(); // Project start date
    const now = new Date().getTime();

    if (now < startDate) {
      setProgress(0);
    } else if (now > targetDate) {
      setProgress(100);
    } else {
      const totalDuration = targetDate - startDate;
      const elapsed = now - startDate;
      setProgress((elapsed / totalDuration) * 100);
    }
  }, []);

  const percentagePassed = progress.toFixed(2);

  return (
    <div className="w-full max-w-md mt-8">
      <h2 className="text-xl font-bold mb-2">{t.preparationProgress}</h2>
      <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-4 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
        <span>{t.preparationStarts}: Jan 1, 2024</span>
        <span className="float-right">{t.preparationEnds}: Feb 17, 2026</span>
      </p>
      <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
        {percentagePassed}% {t.preparationTimePassed}
      </p>
    </div>
  );
};

export default PreparationBar;

export default PreparationBar;