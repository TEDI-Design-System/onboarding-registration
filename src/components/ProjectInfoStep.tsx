import { Col, Row, TextField, VerticalSpacing } from '@tedi-design-system/react/tedi';
import { FormData, FormErrors } from '../constants/formDefaults';

interface ProjectInfoStepProps {
  formData: FormData;
  errors: FormErrors;
  onChange: (name: keyof FormData) => (value: string) => void;
}

const FIELDS: { id: keyof FormErrors; label: string; placeholder: string }[] = [
  { id: 'projectName', label: 'Projekti nimi', placeholder: 'Projekti nimi' },
  { id: 'client', label: 'Tellija', placeholder: 'Tellija organisatsioon/nimi' },
  { id: 'contractor', label: 'Täitja', placeholder: 'Täitja organisatsioon/nimi' },
  { id: 'projectManager', label: 'Projektijuht', placeholder: 'Projektijuhi nimi' },
];

export const ProjectInfoStep = ({ formData, errors, onChange }: ProjectInfoStepProps): JSX.Element => {
  return (
    <Row>
      <Col width={12} md={6}>
        <VerticalSpacing size={1.5}>
          {FIELDS.map((field) => (
            <TextField
              key={field.id}
              id={field.id}
              label={field.label}
              value={formData[field.id]}
              onChange={onChange(field.id)}
              placeholder={field.placeholder}
              required
              input={{ required: true }}
              invalid={errors[field.id]}
              helper={errors[field.id] ? { text: 'See väli on kohustuslik', type: 'error' } : undefined}
            />
          ))}
        </VerticalSpacing>
      </Col>
    </Row>
  );
};
