'use client';

import { useState, useEffect } from 'react';

const tips = [
  "Start early and be consistent.",
  "Understand the syllabus thoroughly.",
  "Practice past papers regularly.",
  "Take short breaks to avoid burnout.",
  "Maintain a healthy diet and sleep schedule.",
  "Seek help from teachers or peers when stuck.",
  "Review your notes frequently.",
  "Stay positive and believe in yourself.",
];

const StudyTips = () => {
  const [currentTip, setCurrentTip] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * tips.length);
      setCurrentTip(tips[randomIndex]);
    }, 10000); // Change tip every 10 seconds

    // Set initial tip
    setCurrentTip(tips[Math.floor(Math.random() * tips.length)]);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tip-bar w-full max-w-md mt-8">
      <h2 className="text-xl font-bold mb-2">Study Tip of the Moment</h2>
      <p className="tip-en">{currentTip}</p>
    </div>
  );
};

export default StudyTips;