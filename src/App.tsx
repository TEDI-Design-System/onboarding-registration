import { useState } from 'react';
import { Button, Alert } from '@tedi-design-system/react/tedi';
import { Stepper, Step } from '@tedi-design-system/react/community';
import '@tedi-design-system/react/index.css';
import './App.css';

import {
  ThankYouPage,
  OnboardingTimeStep,
  ProjectInfoStep,
  AccessAndLicensesStep,
  AdditionalInfoStep
} from './components';

import { useFormData, useDynamicList } from './hooks';
import { TOTAL_STEPS } from './constants';
import { submitToGoogleSheets } from './utils/googleSheets';
import { FigmaMember, MeetingParticipant } from './constants/formDefaults';

interface Status {
  type: string;
  message: string;
}

function App(): JSX.Element {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [status, setStatus] = useState<Status>({ type: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { formData, errors, handleChange, resetForm, validateStep2, setFormData } = useFormData();

  const figmaList = useDynamicList<FigmaMember>(formData, setFormData, 'figmaMembers');
  const meetingList = useDynamicList<MeetingParticipant>(formData, setFormData, 'meetingParticipants');

  const handleNext = (): void => {
    console.log('handleNext called, currentStep:', currentStep);
    if (currentStep === 0 && !formData.onboardingTime) {
      setStatus({ type: 'error', message: 'Palun valige sobiv onboardingu aeg' });
      return;
    }

    if (currentStep === 1 && !validateStep2()) {
      setStatus({ type: 'error', message: 'Palun täitke kõik kohustuslikud väljad' });
      return;
    }

    if (currentStep < TOTAL_STEPS - 1) {
      setStatus({ type: '', message: '' });
      setCurrentStep(currentStep + 1);
      console.log('Moving to next step:', currentStep + 1);
    }
  };

  const handlePrevious = (): void => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    console.log('handleSubmit called, currentStep:', currentStep);

    if (currentStep !== TOTAL_STEPS - 1) {
      console.log('Not on final step, returning');
      return;
    }

    console.log('Submitting to Google Sheets...');
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await submitToGoogleSheets(formData);
      console.log('Successfully submitted to Google Sheets');
      setIsSubmitted(true);
      resetForm();
      setCurrentStep(0);
    } catch (error) {
      console.error('Error submitting:', error);
      const errorMessage = error instanceof Error ? error.message : 'Viga andmete saatmisel. Palun proovige hiljem uuesti.';
      setStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return <ThankYouPage onNewRegistration={() => setIsSubmitted(false)} />;
  }

  return (
    <div className="app-container">
      <h1>TEDI Onboardingule registreerimine</h1>
      <p>TEDI on Eesti riigi ühtne disainisüsteem, mis aitab luua kasutajasõbralikke ja järjepidevaid digitaalseid teenuseid. Registreerige oma meeskond TEDI onboarding sessioonile, et alustada TEDI disainisüsteemi kasutamist oma projektis.</p>

      {status.message && (
        <div className="alert-container">
          <Alert
            type="danger"
            onClose={() => setStatus({ type: '', message: '' })}
          >
            {status.message}
          </Alert>
        </div>
      )}

      <div>
        <Stepper
          activeStep={currentStep}
          onActiveStepChange={setCurrentStep}
          ariaLabel="TEDI Onboarding sammud"
          card={true}
          className="stepper-container"
        >
          <Step
            label="Onboardingu aeg"
            heading="Valida onboardingu aeg"
            description="Valige sobiv aeg TEDI onboarding sessiooniks"
            completed={currentStep > 0}
          >
            <OnboardingTimeStep
              value={formData.onboardingTime}
              onChange={handleChange('onboardingTime')}
            />
          </Step>

          <Step
            label="Projekti info"
            heading="Projekti üldandmed"
            description="Sisestage projekti põhiandmed ja kontaktisikud"
            completed={currentStep > 1}
          >
            <ProjectInfoStep
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
          </Step>

          <Step
            label="Ligipääsud ja litsentsid"
            heading="Ligipääsud ja litsentsid"
            description="Määrake meeskonnaliikmetele vajalikud ligipääsud"
            completed={currentStep > 2}
          >
            <AccessAndLicensesStep
              figmaMembers={figmaList.items}
              meetingParticipants={meetingList.items}
              onAddFigmaLicense={() => figmaList.addItem({ email: '', licenseType: '' })}
              onRemoveFigmaLicense={figmaList.removeItem}
              onUpdateFigmaLicense={figmaList.updateItem}
              onAddMeetingParticipant={() => meetingList.addItem({ email: '', meetingType: '' })}
              onRemoveMeetingParticipant={meetingList.removeItem}
              onUpdateMeetingParticipant={meetingList.updateItem}
            />
          </Step>

          <Step
            label="Lisainfo"
            heading="Lisainfo"
            description="Front-end raamistik ja küsimused TEDI kasutamise kohta"
            completed={currentStep > 3}
          >
            <AdditionalInfoStep
              formData={formData}
              onChange={handleChange}
            />
          </Step>
        </Stepper>

        <div className="form-navigation">
          {currentStep > 0 && (
            <Button type="button" onClick={handlePrevious} visualType="secondary">
              Tagasi
            </Button>
          )}

          {currentStep < TOTAL_STEPS - 1 ? (
            <Button type="button" onClick={handleNext}>
              Edasi
            </Button>
          ) : (
            <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Saadan...' : 'Registreeri'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
