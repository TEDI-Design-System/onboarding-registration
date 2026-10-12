// Re-export dates from root config for easier maintenance
import { ONBOARDING_DATES } from '../../content.config';

export { ONBOARDING_DATES };

export interface OnboardingDate {
  id: string;
  label: string;
  value: string;
  date: string;
}

// Sessions that haven't started yet, evaluated when the page loads
export const UPCOMING_DATES: OnboardingDate[] = (ONBOARDING_DATES as OnboardingDate[]).filter(
  (session) => new Date(session.date).getTime() > Date.now()
);
