import { TextField, VerticalSpacing } from '@tedi-design-system/react/tedi';

export const ProjectInfoStep = ({ formData, errors, onChange }) => {
  const fields = [
    {
      id: 'projectName',
      label: 'Projekti nimi',
      placeholder: 'Projekti nimi'
    },
    {
      id: 'client',
      label: 'Tellija',
      placeholder: 'Tellija organisatsioon/nimi'
    },
    {
      id: 'contractor',
      label: 'Täitja',
      placeholder: 'Täitja organisatsioon/nimi'
    },
    {
      id: 'projectManager',
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
            value={formData[field.id]}
            onChange={onChange(field.id)}
            placeholder={field.placeholder}
            required={true}
            input={{ required: true }}
            invalid={errors[field.id]}
            helper={errors[field.id] ? { text: "See väli on kohustuslik", type: "error" } : undefined}
            style={{ maxWidth: '50%' }}
          />
        </VerticalSpacing.Item>
      ))}
    </VerticalSpacing>
  );
};
