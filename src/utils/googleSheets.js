/**
 * Submit form data to Google Sheets via Google Apps Script
 * @param {Object} formData - The form data to submit
 * @returns {Promise<Object>} Response from the Google Apps Script
 */
export const submitToGoogleSheets = async (formData) => {
  const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

  if (!scriptUrl || scriptUrl === 'your-google-apps-script-web-app-url-here') {
    throw new Error('Google Apps Script URL ei ole seadistatud. Palun kontrollige .env faili.');
  }

  // Format the data for Google Sheets
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
      mode: 'no-cors', // Google Apps Script requires no-cors mode
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSubmit)
    });

    console.log('Request sent successfully. Note: Response cannot be read due to no-cors mode.');

    // Note: With no-cors mode, we can't read the response
    // We assume success if no error was thrown
    return { status: 'success', message: 'Andmed edukalt salvestatud' };
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    throw new Error('Viga andmete saatmisel. Palun proovige hiljem uuesti.');
  }
};
