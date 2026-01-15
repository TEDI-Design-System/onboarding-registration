import { Radio, VerticalSpacing, Card } from '@tedi-design-system/react/tedi';
import { ONBOARDING_DATES } from '../constants/dates';

interface OnboardingTimeStepProps {
  value: string;
  onChange: (value: string) => void;
}

export const OnboardingTimeStep = ({ value, onChange }: OnboardingTimeStepProps): JSX.Element => {
  return (
    <VerticalSpacing size={1.5}>
      <VerticalSpacing.Item>
        <Card background="neutral" className="info-card-neutral">
          <Card.Content>
            <p className="card-content-text">
              TEDI onboarding on sissejuhatav sessioon, kus tutvustame teile TEDI disainisüsteemi
              põhimõtteid, komponente ja parimaid praktikaid. Sessioon hõlmab:
            </p>
            <ul className="card-list">
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
          <div id="onboarding-date-label" className="field-label">
            Valige sobiv onboardingu aeg: <span className="required-asterisk">*</span>
          </div>
          <div className="radio-group">
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
