import { Col, Row, TextField, Textarea, VerticalSpacing } from '@tedi-design-system/react/tedi';
import { FormData } from '../constants/formDefaults';

interface AdditionalInfoStepProps {
  formData: FormData;
  onChange: (name: keyof FormData) => (value: string) => void;
}

export const AdditionalInfoStep = ({ formData, onChange }: AdditionalInfoStepProps): JSX.Element => {
  return (
    <Row>
      <Col width={12} md={6}>
        <VerticalSpacing size={1.5}>
          <TextField
            id="frontendFramework"
            label="Mis front-end raamistikku kasutatakse?"
            value={formData.frontendFramework}
            onChange={onChange('frontendFramework')}
            placeholder="Näiteks: React, Angular, Vue.js jne"
          />
          <Textarea
            id="tediUsageQuestions"
            label="Küsimused TEDI (kasutamise) kohta millele soovid saada onboardingult vastuse"
            value={formData.tediUsageQuestions}
            onChange={onChange('tediUsageQuestions')}
            placeholder="Kirjeldage oma küsimusi"
          />
        </VerticalSpacing>
      </Col>
    </Row>
  );
};
