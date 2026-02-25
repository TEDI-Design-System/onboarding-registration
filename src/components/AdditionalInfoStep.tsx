import { TextField, TextArea, VerticalSpacing } from '@tedi-design-system/react/tedi';
import { FormData } from '../constants/formDefaults';

interface AdditionalInfoStepProps {
  formData: FormData;
  onChange: (name: keyof FormData) => (value: string) => void;
}

export const AdditionalInfoStep = ({ formData, onChange }: AdditionalInfoStepProps): JSX.Element => {
  return (
    <VerticalSpacing size={1.5}>
      <VerticalSpacing.Item>
        <TextField
          id="frontendFramework"
          label="Mis front-end raamistikku kasutatakse?"
          value={formData.frontendFramework}
          onChange={onChange('frontendFramework')}
          placeholder="Näiteks: React, Angular, Vue.js jne"
          className="text-field-half-width"
        />
      </VerticalSpacing.Item>
      <VerticalSpacing.Item>
        <TextArea
          id="tediUsageQuestions"
          label="Küsimused TEDI (kasutamise) kohta millele soovid saada onboardingult vastuse"
          value={formData.tediUsageQuestions}
          onChange={onChange('tediUsageQuestions')}
          placeholder="Kirjeldage oma küsimusi"
          input={{ rows: 5 }}
        />
      </VerticalSpacing.Item>
    </VerticalSpacing>
  );
};
