import { Button, VerticalSpacing, Card } from '@tedi-design-system/react/tedi';
import { TEDI_LINKS } from '../constants/links';

interface ThankYouPageProps {
  onNewRegistration: () => void;
}

export const ThankYouPage = ({ onNewRegistration }: ThankYouPageProps): JSX.Element => {
  return (
    <div className="app-container">
      <h1>Aitäh registreerimise eest!</h1>
      <p>Teie registreering on edukalt saadetud. Võtame teiega peatselt ühendust.</p>

      <Card>
        <Card.Content>
          <VerticalSpacing size={2}>
            <VerticalSpacing.Item>
              <h2 className="thank-you-heading">Kasulikud lingid</h2>
            </VerticalSpacing.Item>
            <VerticalSpacing.Item>
              <h3>TEDI dokumentatsioon ja ressursid:</h3>
              <ul className="thank-you-list">
                {TEDI_LINKS.map((link, index) => (
                  <li key={index} className="thank-you-list-item">
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </VerticalSpacing.Item>
            <VerticalSpacing.Item>
              <Button onClick={onNewRegistration}>
                Registreeri uus projekt
              </Button>
            </VerticalSpacing.Item>
          </VerticalSpacing>
        </Card.Content>
      </Card>
    </div>
  );
};
