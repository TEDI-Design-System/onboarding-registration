import { Radio, VerticalSpacing, Card } from '@tedi-design-system/react/tedi';
import { ONBOARDING_DATES } from '../constants/dates';

export const OnboardingTimeStep = ({ value, onChange }) => {
  return (
    <VerticalSpacing size={1.5}>
      <VerticalSpacing.Item>
        <Card background="neutral" className="info-card-neutral">
          <Card.Content>
            <p style={{ marginTop: 0, marginBottom: '0.5rem' }}>
              TEDI onboarding on sissejuhatav sessioon, kus tutvustame teile TEDI disainisüsteemi
              põhimõtteid, komponente ja parimaid praktikaid. Sessioon hõlmab:
            </p>
            <ul style={{ marginTop: '0.5rem', marginBottom: 0, paddingLeft: '1.5rem' }}>
              <li>TEDI disainisüsteemi ülevaade ja põhimõtted</li>
              <li>Komponentide kasutamine ja integreerimine projektis</li>
              <li>Figma ja arenduse vaheline töövoog</li>
              <li>Küsimused ja vastused</li>
            </ul>
          </Card.Content>
        </Card>
      </VerticalSpacing.Item>
      <VerticalSpacing.Item>
        <div role="group" aria-labelledby="onboarding-date-label">
          <div id="onboarding-date-label" style={{ marginBottom: '0.5rem', fontWeight: 500 }}>
            Valige sobiv onboardingu aeg: <span style={{ color: '#D73E3E' }}>*</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {ONBOARDING_DATES.map((date) => (
              <Radio
                key={date.id}
                id={date.id}
                name="onboardingTime"
                label={date.label}
                value={date.value}
                checked={value === date.value}
                onChange={onChange}
              />
            ))}
          </div>
        </div>
      </VerticalSpacing.Item>
    </VerticalSpacing>
  );
};
