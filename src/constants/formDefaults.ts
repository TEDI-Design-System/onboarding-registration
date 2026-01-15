export interface FigmaMember {
  email: string;
  licenseType: string;
}

export interface MeetingParticipant {
  email: string;
  meetingType: string;
}

export interface FormData {
  onboardingTime: string;
  name: string;
  email: string;
  projectName: string;
  client: string;
  contractor: string;
  projectManager: string;
  figmaMembers: FigmaMember[];
  meetingParticipants: MeetingParticipant[];
  previousFigmaFiles: string;
  frontendFramework: string;
  tediUsageQuestions: string;
  links: string;
}

export interface FormErrors {
  projectName: boolean;
  client: boolean;
  contractor: boolean;
  projectManager: boolean;
}

export const INITIAL_FORM_DATA: FormData = {
  onboardingTime: '',
  name: '',
  email: '',
  projectName: '',
  client: '',
  contractor: '',
  projectManager: '',
  figmaMembers: [],
  meetingParticipants: [],
  previousFigmaFiles: '',
  frontendFramework: '',
  tediUsageQuestions: '',
  links: ''
};

export const INITIAL_ERRORS: FormErrors = {
  projectName: false,
  client: false,
  contractor: false,
  projectManager: false
};

export const TOTAL_STEPS: number = 4;
