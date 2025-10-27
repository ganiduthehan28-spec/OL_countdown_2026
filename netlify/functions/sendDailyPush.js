const fetch = require("node-fetch");

const APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
const REST_KEY = process.env.ONESIGNAL_REST_KEY;

exports.handler = async function(event, context) {
  const now = new Date();
  const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });

  // Fetch users with reminderTime = current time
  const response = await fetch(`https://onesignal.com/api/v1/players?app_id=${APP_ID}&tags={"reminderTime":"${time}"}`), {
    headers: { "Authorization": `Basic ${REST_KEY}` }
  });
  const users = await response.json();

  if (!users.players) return { statusCode: 200, body: "No users at this time." };

  for (const user of users.players) {
    await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${REST_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        app_id: APP_ID,
        include_player_ids: [user.id],
        headings: { en: "O/L Countdown 2026 🔔" },
        contents: { en: "Click to open your countdown!" },
        url: "https://ol-countdown-9a.netlify.app/",
        ios_sound: "default",
        android_sound: "default"
      })
    });
  }

  return { statusCode: 200, body: "Notifications sent!" };
};
