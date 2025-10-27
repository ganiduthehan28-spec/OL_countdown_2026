'use client';
import { useState } from 'react';

declare global {
  interface Window {
    OneSignal: any;
  }
}

const DailyReminderButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState('09:00');
  const [status, setStatus] = useState('');

  const handleSubscribeAndSave = async () => {
    if (typeof window === 'undefined' || !window.OneSignal) {
      setStatus('Push SDK not ready, please try again in a moment.');
      return;
    }

    setStatus('Requesting permission…');
    try {
      await window.OneSignal.push(async function(OneSignal: any) {
        await OneSignal.registerForPushNotifications();
        const playerId = await OneSignal.getUserId();
        if (playerId) {
          localStorage.setItem('playerId', playerId);
          console.log("Subscribed Player ID:", playerId);
        }
        await OneSignal.sendTag('reminderTime', time);
      });

      localStorage.setItem('reminderTime', time);

      setStatus('Reminder scheduled ✔');
      setTimeout(() => setStatus(''), 3000);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      setStatus('Error scheduling reminder.');
    }
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} className="px-5 py-2 rounded-md bg-primary-color text-white">
        Get Daily Reminders
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full text-center">
            <h3 className="text-lg font-bold mb-3">Select daily reminder time</h3>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="mb-4 w-full p-2 border" />
            <div className="flex justify-end gap-2">
              <button onClick={handleSubscribeAndSave} className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {status && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded">
          {status}
        </div>
      )}
    </>
  );
};

export default DailyReminderButton;