// Content configuration for TEDI Onboarding
// This file centralizes all content that needs regular updates

// Onboarding dates
// Date and start/end time in Estonian time. The form shows each session as
// "21. oktoober 2026 kell 13:00–14:15".
// Sessions that have started are hidden; when none are left, the form shows
// a notice instead and people can still register.
export const ONBOARDING_DATES = [
  { date: '2026-10-21', start: '13:00', end: '14:15' },
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
