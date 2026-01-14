import { Button, VerticalSpacing, Card } from '@tedi-design-system/react/tedi';
import { TEDI_LINKS } from '../constants/links';

export const ThankYouPage = ({ onNewRegistration }) => {
  return (
    <div className="app-container">
      <h1>Aitäh registreerimise eest!</h1>
      <p>Teie registreering on edukalt saadetud. Võtame teiega peatselt ühendust.</p>

      <Card>
        <Card.Content>
          <VerticalSpacing size={2}>
            <VerticalSpacing.Item>
              <h2 style={{ marginTop: 0 }}>Kasulikud lingid</h2>
            </VerticalSpacing.Item>
            <VerticalSpacing.Item>
              <h3>TEDI dokumentatsioon ja ressursid:</h3>
              <ul style={{ paddingLeft: '1.5rem' }}>
                {TEDI_LINKS.map((link, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>
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
