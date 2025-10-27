// src/lib/analytics.ts

// Function to log events to Google Analytics 4 (GA4)
export const logGA4Event = (eventName: string, eventParams: { [key: string]: any }) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }
};

// Function to log events to Plausible Analytics
export const logPlausibleEvent = (eventName: string, eventProps?: { [key: string]: any }) => {
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible(eventName, { props: eventProps });
  }
};

// Unified function to log events to both analytics platforms
export const logEvent = (eventName: string, eventParams: { [key: string]: any }) => {
  logGA4Event(eventName, eventParams);
  logPlausibleEvent(eventName, eventParams);
};
