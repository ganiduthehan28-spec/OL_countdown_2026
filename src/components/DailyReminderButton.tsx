'use client';
import { useState } from 'react';

declare global {
  interface Window {
    OneSignal: any;
  }
}

const DailyReminderButton = () => {
  const [time, setTime] = useState('09:00');
  const [success, setSuccess] = useState(false);

  const handleSubscribe = async () => {
    if (window.OneSignal) {
      await window.OneSignal.push(async function(OneSignal: any) {
        await OneSignal.registerForPushNotifications();
        const playerId = await OneSignal.getUserId();
        if (playerId) {
          localStorage.setItem('playerId', playerId);
          console.log("Subscribed Player ID:", playerId);
        }
      });
    }
  };

  const handleSaveTime = async () => {
    if (window.OneSignal) {
      await window.OneSignal.push(async function(OneSignal: any) {
        await OneSignal.sendTag('reminderTime', time);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      });
    }
  };

  return (
    <div>
      <button onClick={handleSubscribe} className="px-4 py-2 bg-blue-600 text-white rounded-md mr-2">
        Enable Notifications
      </button>
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="border p-1 rounded-md"/>
      <button onClick={handleSaveTime} className="px-4 py-2 bg-green-600 text-white rounded-md ml-2">
        Save Reminder
      </button>
      {success && <div className="text-green-500 mt-2">Reminder saved!</div>}
    </div>
  );
};

export default DailyReminderButton;
