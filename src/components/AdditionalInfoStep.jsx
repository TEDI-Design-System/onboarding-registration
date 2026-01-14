import { TextField, TextArea, VerticalSpacing } from '@tedi-design-system/react/tedi';

export const AdditionalInfoStep = ({ formData, onChange }) => {
  return (
    <VerticalSpacing size={1.5}>
      <VerticalSpacing.Item>
        <TextField
          id="frontendFramework"
          label="Mis front-end raamistikku kasutatakse?"
          value={formData.frontendFramework}
          onChange={onChange('frontendFramework')}
          placeholder="Näiteks: React, Angular, Vue.js jne"
          style={{ maxWidth: '50%' }}
        />
      </VerticalSpacing.Item>
      <VerticalSpacing.Item>
        <TextArea
          id="tediUsageQuestions"
          label="Mis lahtised küsimused on seoses TEDI kasutamisega, vabas vormis saab küs kirja panna"
          value={formData.tediUsageQuestions}
          onChange={onChange('tediUsageQuestions')}
          placeholder="Kirjeldage oma küsimusi ja muresid"
          input={{ rows: 5 }}
        />
      </VerticalSpacing.Item>
    </VerticalSpacing>
  );
};
