import { Button, Card, Heading, Link, List, Text, VerticalSpacing } from '@tedi-design-system/react/tedi';
import { TEDI_LINKS } from '../constants/links';

interface ThankYouPageProps {
  onNewRegistration: () => void;
}

export const ThankYouPage = ({ onNewRegistration }: ThankYouPageProps): JSX.Element => {
  return (
    <main className="app-container">
      <VerticalSpacing size={2}>
        <div>
          <VerticalSpacing size={0.5}>
            <Heading element="h1">Aitäh registreerimise eest!</Heading>
            <Text color="secondary">Teie registreering on edukalt saadetud. Võtame teiega peatselt ühendust.</Text>
          </VerticalSpacing>
        </div>

        <Card>
          <Card.Content>
            <VerticalSpacing size={1}>
              <Heading element="h2" modifiers="h3">Kasulikud lingid</Heading>
              <List style="styled">
                {TEDI_LINKS.map((link) => (
                  <List.Item key={link.url}>
                    <Link href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </Link>
                  </List.Item>
                ))}
              </List>
              <div>
                <Button onClick={onNewRegistration}>Registreeri uus projekt</Button>
              </div>
            </VerticalSpacing>
          </Card.Content>
        </Card>
      </VerticalSpacing>
    </main>
  );
};
