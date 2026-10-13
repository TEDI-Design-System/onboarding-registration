import { Button, Card, ChoiceGroup, Col, Heading, Link, List, Row, Text, TextField, VerticalSpacing } from '@tedi-design-system/react/tedi';
import { FigmaMember } from '../constants/formDefaults';

interface FigmaLicenseListProps {
  members: FigmaMember[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: string, value: string) => void;
}

const LICENSE_TYPES = [
  { value: 'full', label: 'Full seat' },
  { value: 'dev', label: 'Dev mode' },
  { value: 'collab', label: 'Collab' },
];

export const FigmaLicenseList = ({ members, onAdd, onRemove, onUpdate }: FigmaLicenseListProps): JSX.Element => {
  return (
    <VerticalSpacing size={1}>
      <Heading element="h2" modifiers="h3">Figma ligipääsud</Heading>
      <Card background="secondary">
        <Card.Content>
          <VerticalSpacing size={0.5}>
            <Text>
              Kui projekt hakkab TEDI disainisüsteemi kasutama ning soovib seda teha TEDI Figmas, tuleb projektifail TEDI Figmas luua või sinna üle tuua.
            </Text>
            <Text>
              Litsentsitasud kasutajate eest esitatakse tellijale kord aastas. Orienteeruvad hinnad leiab{' '}
              <Link href="https://www.figma.com/pricing/" target="_blank" rel="noopener noreferrer">
                Figma hinnakirjast
              </Link>{' '}
              (TEDI kasutab Enterprise paketti). Figmas on kolm litsentsi tüüpi: full seat, dev mode ja collab.
            </Text>
            <List style="styled">
              <List.Item><strong>Full seat</strong> - mõeldud disaineritele, kes prototüüpe loovad ja muudavad.</List.Item>
              <List.Item><strong>Dev mode</strong> - mõeldud arendajatele, kes komponente ja vaateid arendavad.</List.Item>
              <List.Item><strong>Collab</strong> - mõeldud meeskonnaliikmetele, kes töötavad FigJamis või Figma Slidesis.</List.Item>
            </List>
            <Text>Kujunduste vaatamiseks ja kommenteerimiseks litsentsi vaja ei ole.</Text>
          </VerticalSpacing>
        </Card.Content>
      </Card>

      {members.map((member, index) => (
        <Card key={index}>
          <Card.Content>
            <Row>
              <Col width={12} md={6}>
                <VerticalSpacing size={1}>
                  <TextField
                    id={`figma-email-${index}`}
                    label="E-post"
                    value={member.email}
                    onChange={(value) => onUpdate(index, 'email', value)}
                    placeholder="nimi@email.ee"
                    input={{ required: true, type: 'email' }}
                  />
                  <ChoiceGroup
                    id={`figma-license-${index}`}
                    name={`figmaLicense-${index}`}
                    label="Litsentsi tüüp"
                    value={member.licenseType || null}
                    onChange={(value) => onUpdate(index, 'licenseType', typeof value === 'string' ? value : '')}
                    items={LICENSE_TYPES.map((type) => ({ id: `figma-${type.value}-${index}`, ...type }))}
                  />
                  <div>
                    <Button type="button" onClick={() => onRemove(index)} visualType="secondary" size="small" iconLeft="delete">
                      Eemalda
                    </Button>
                  </div>
                </VerticalSpacing>
              </Col>
            </Row>
          </Card.Content>
        </Card>
      ))}

      <div>
        <Button type="button" onClick={onAdd} iconLeft="add">
          Lisa litsentsi soov
        </Button>
      </div>
    </VerticalSpacing>
  );
};
