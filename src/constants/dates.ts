// Re-export dates from root config for easier maintenance
import { ONBOARDING_DATES } from '../../content.config';

export { ONBOARDING_DATES };

interface OnboardingSession {
  date: string;
  start: string;
  end: string;
}

export interface OnboardingDate {
  id: string;
  label: string;
}

const TIME_ZONE = 'Europe/Tallinn';

const formatDay = new Intl.DateTimeFormat('et-EE', {
  timeZone: TIME_ZONE,
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

// Estonian time is UTC+2 in winter and UTC+3 in summer. Try both and keep the
// one that shows the configured hour in Tallinn.
const toEstonianTime = (date: string, time: string): Date => {
  const hour = new Intl.DateTimeFormat('en-GB', { timeZone: TIME_ZONE, hour: '2-digit', hourCycle: 'h23' });
  const winter = new Date(`${date}T${time}:00+02:00`);
  return hour.format(winter) === time.slice(0, 2) ? winter : new Date(`${date}T${time}:00+03:00`);
};

// "21. oktoober 2026 kell 13:00–14:15"
const toLabel = (session: OnboardingSession): string =>
  `${formatDay.format(toEstonianTime(session.date, session.start))} kell ${session.start}–${session.end}`;

// Sessions that haven't started yet, evaluated when the page loads
export const UPCOMING_DATES: OnboardingDate[] = (ONBOARDING_DATES as OnboardingSession[])
  .filter((session) => toEstonianTime(session.date, session.start).getTime() > Date.now())
  .map((session) => ({ id: `date-${session.date}-${session.start}`, label: toLabel(session) }));
