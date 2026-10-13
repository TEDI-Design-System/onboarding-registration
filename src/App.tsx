import { useState } from 'react';
import { Alert, Button, Card, Heading, HorizontalStepper, Text, VerticalSpacing } from '@tedi-design-system/react/tedi';
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
import { TOTAL_STEPS, UPCOMING_DATES } from './constants';
import { submitToGoogleSheets } from './utils/googleSheets';
import { FigmaMember, MeetingParticipant } from './constants/formDefaults';

const STEP_LABELS = ['Onboardingu aeg', 'Projekti info', 'Ligipääsud ja litsentsid', 'Lisainfo'];

interface Status {
  type: string;
  message: string;
}

function App(): JSX.Element {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [status, setStatus] = useState<Status>({ type: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [timeError, setTimeError] = useState<boolean>(false);

  const { formData, errors, handleChange, resetForm, validateStep2, setFormData } = useFormData();

  const figmaList = useDynamicList<FigmaMember>(formData, setFormData, 'figmaMembers');
  const meetingList = useDynamicList<MeetingParticipant>(formData, setFormData, 'meetingParticipants');

  const handleNext = (): void => {
    if (currentStep === 0 && UPCOMING_DATES.length > 0 && !formData.onboardingTime) {
      setTimeError(true);
      return;
    }

    if (currentStep === 1 && !validateStep2()) {
      setStatus({ type: 'error', message: 'Palun täitke kõik kohustuslikud väljad' });
      return;
    }

    if (currentStep < TOTAL_STEPS - 1) {
      setStatus({ type: '', message: '' });
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = (): void => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (): Promise<void> => {

    if (currentStep !== TOTAL_STEPS - 1) {
      return;
    }
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await submitToGoogleSheets(formData);
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
    <main className="app-container">
      <VerticalSpacing size={2}>
        <div>
          <VerticalSpacing size={0.5}>
            <Heading element="h1">Onboardingule registreerimine</Heading>
            <Text color="secondary">
              TEDI on Eesti riigi ühtne disainisüsteem, mis aitab luua kasutajasõbralikke ja järjepidevaid digitaalseid
              teenuseid. Registreerige oma meeskond TEDI onboarding sessioonile, et alustada TEDI disainisüsteemi
              kasutamist oma projektis.
            </Text>
          </VerticalSpacing>
        </div>

        {status.message && (
          <Alert type="danger" onClose={() => setStatus({ type: '', message: '' })}>
            {status.message}
          </Alert>
        )}

        <Card>
          <Card.Content padding={0} hasSeparator>
            <HorizontalStepper aria-label="TEDI Onboarding sammud">
              {STEP_LABELS.map((label, index) => (
                <HorizontalStepper.Item
                  key={label}
                  label={label}
                  selected={index === currentStep}
                  completed={index < currentStep}
                  disabled={index > currentStep}
                  onSelect={() => setCurrentStep(index)}
                />
              ))}
            </HorizontalStepper>
          </Card.Content>
          <Card.Content hasSeparator>
            {currentStep === 0 && (
              <OnboardingTimeStep
                value={formData.onboardingTime}
                onChange={(value) => {
                  handleChange('onboardingTime')(value);
                  setTimeError(false);
                }}
                invalid={timeError}
              />
            )}

            {currentStep === 1 && (
              <ProjectInfoStep
                formData={formData}
                errors={errors}
                onChange={handleChange}
              />
            )}

            {currentStep === 2 && (
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
            )}

            {currentStep === 3 && (
              <AdditionalInfoStep
                formData={formData}
                onChange={handleChange}
              />
            )}
          </Card.Content>
          <Card.Content padding={{ vertical: 0.5, horizontal: 1 }}>
            <div className="form-navigation">
              {currentStep > 0 && (
                <Button type="button" onClick={handlePrevious} visualType="link" iconLeft="arrow_back">
                  Tagasi
                </Button>
              )}

              {currentStep < TOTAL_STEPS - 1 ? (
                <Button type="button" onClick={handleNext} iconRight="arrow_forward">
                  Edasi
                </Button>
              ) : (
                <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? 'Saadan...' : 'Registreeri'}
                </Button>
              )}
            </div>
          </Card.Content>
        </Card>
      </VerticalSpacing>
    </main>
  );
}

export default App;
