import { FormData } from '../constants/formDefaults';

interface SubmitResponse {
  status: string;
  message: string;
}

export const submitToGoogleSheets = async (formData: FormData): Promise<SubmitResponse> => {
  const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL as string | undefined;

  if (!scriptUrl || scriptUrl === 'your-google-apps-script-web-app-url-here') {
    throw new Error('Google Apps Script URL ei ole seadistatud. Palun kontrollige .env faili.');
  }

  const dataToSubmit = {
    timestamp: new Date().toISOString(),
    onboardingTime: formData.onboardingTime || '',
    projectName: formData.projectName || '',
    client: formData.client || '',
    contractor: formData.contractor || '',
    projectManager: formData.projectManager || '',
    figmaMembers: JSON.stringify(formData.figmaMembers || []),
    meetingParticipants: JSON.stringify(formData.meetingParticipants || []),
    frontendFramework: formData.frontendFramework || '',
    tediUsageQuestions: formData.tediUsageQuestions || ''
  };

  console.log('Submitting data to Google Sheets:', dataToSubmit);

  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSubmit)
    });

    console.log('Request sent successfully. Note: Response cannot be read due to no-cors mode.');

    return { status: 'success', message: 'Andmed edukalt salvestatud' };
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    throw new Error('Viga andmete saatmisel. Palun proovige hiljem uuesti.');
  }
};
