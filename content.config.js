// Content configuration for TEDI Onboarding
// This file centralizes all content that needs regular updates

// Onboarding dates
// Update these dates as needed for upcoming onboarding sessions.
// `date` is the session start in Estonian time (+02:00 in winter, +03:00 in summer).
// Sessions whose start has passed are hidden; when none are left, the form shows
// a "no upcoming onboardings" message instead.
export const ONBOARDING_DATES = [
  {
    id: 'date1',
    label: 'Teisipäev, 3. veebruar 2026 kell 11:00',
    value: 'Teisipäev, 3. veebruar 2026 kell 11:00',
    date: '2026-02-03T11:00:00+02:00'
  },
];

// TEDI related links
// Update these links as needed
export const TEDI_LINKS = [
  {
    url: 'https://tedi.ee',
    label: 'TEDI avalehekülg'
  },
  {
    url: 'https://storybook.tedi.ee',
    label: 'TEDI Storybook'
  },
  {
    url: 'https://github.com/TEDI-Design-System',
    label: 'TEDI GitHub'
  },
  {
    url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.30.43?m=auto&node-id=1-1578&t=b1XRxrZpLBGs5Emf-1',
    label: 'TEDI Figma'
  }
];
