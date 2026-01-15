import { TextField, VerticalSpacing } from '@tedi-design-system/react/tedi';
import { FormData, FormErrors } from '../constants/formDefaults';

interface ProjectInfoStepProps {
  formData: FormData;
  errors: FormErrors;
  onChange: (name: keyof FormData) => (value: string) => void;
}

export const ProjectInfoStep = ({ formData, errors, onChange }: ProjectInfoStepProps): JSX.Element => {
  const fields = [
    {
      id: 'projectName' as keyof FormData,
      label: 'Projekti nimi',
      placeholder: 'Projekti nimi'
    },
    {
      id: 'client' as keyof FormData,
      label: 'Tellija',
      placeholder: 'Tellija organisatsioon/nimi'
    },
    {
      id: 'contractor' as keyof FormData,
      label: 'Täitja',
      placeholder: 'Täitja organisatsioon/nimi'
    },
    {
      id: 'projectManager' as keyof FormData,
      label: 'Projektijuht',
      placeholder: 'Projektijuhi nimi'
    }
  ];

  return (
    <VerticalSpacing size={1.5}>
      {fields.map((field) => (
        <VerticalSpacing.Item key={field.id}>
          <TextField
            id={field.id}
            label={field.label}
            value={formData[field.id] as string}
            onChange={onChange(field.id)}
            placeholder={field.placeholder}
            required={true}
            input={{ required: true }}
            invalid={errors[field.id as keyof FormErrors]}
            helper={errors[field.id as keyof FormErrors] ? { text: "See väli on kohustuslik", type: "error" } : undefined}
            className="text-field-half-width"
          />
        </VerticalSpacing.Item>
      ))}
    </VerticalSpacing>
  );
};
