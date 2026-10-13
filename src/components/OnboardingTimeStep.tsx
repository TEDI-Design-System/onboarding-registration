import { Alert, Card, ChoiceGroup, Link, List, Text, VerticalSpacing } from '@tedi-design-system/react/tedi';
import { UPCOMING_DATES } from '../constants/dates';

interface OnboardingTimeStepProps {
  value: string;
  onChange: (value: string) => void;
  invalid: boolean;
}

export const OnboardingTimeStep = ({ value, onChange, invalid }: OnboardingTimeStepProps): JSX.Element => {
  return (
    <VerticalSpacing size={1.5}>
      <Card background="secondary">
        <Card.Content>
          <VerticalSpacing size={0.5}>
            <Text>
              TEDI onboarding on sissejuhatav sessioon, kus tutvustame teile TEDI disainisüsteemi
              põhimõtteid, komponente ja parimaid praktikaid. Sessioon hõlmab:
            </Text>
            <List style="styled">
              <List.Item>TEDI disainisüsteemi ülevaade ja põhimõtted</List.Item>
              <List.Item>Komponentide kasutamine ja integreerimine projektis</List.Item>
              <List.Item>Figma ja arenduse vaheline töövoog</List.Item>
              <List.Item>Küsimused ja vastused</List.Item>
            </List>
          </VerticalSpacing>
        </Card.Content>
      </Card>
      {UPCOMING_DATES.length === 0 ? (
        <Alert type="info" role="none" title="Onboardingu aegu praegu ei ole">
          Saate siiski registreeruda. Kui uus aeg on kokku lepitud, võtame teiega ühendust. Küsimuste
          korral kirjutage meile aadressil <Link href="mailto:info@tedi.ee">info@tedi.ee</Link>.
        </Alert>
      ) : (
        <ChoiceGroup
          id="onboardingTime"
          name="onboardingTime"
          label="Valige sobiv onboardingu aeg"
          required
          value={value || null}
          onChange={(selected) => onChange(typeof selected === 'string' ? selected : '')}
          helper={invalid ? { type: 'error', text: 'Palun valige sobiv onboardingu aeg' } : undefined}
          items={UPCOMING_DATES.map((date) => ({ id: date.id, label: date.label, value: date.label }))}
        />
      )}
    </VerticalSpacing>
  );
};
