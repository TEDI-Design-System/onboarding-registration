import { Button, Card, ChoiceGroup, Col, Heading, Row, Text, TextField, VerticalSpacing } from '@tedi-design-system/react/tedi';
import { MeetingParticipant } from '../constants/formDefaults';

interface MeetingParticipantsListProps {
  participants: MeetingParticipant[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: string, value: string) => void;
}

const MEETINGS = [
  {
    value: 'design',
    label: 'Disainikoosolek',
    description:
      'Disainikoosolekul arutatakse uute komponentide vajadusi, muudatuse vajadusi, probleeme komponentides, projektid annavad kasutatavuse tagasiside ning otsitakse lahendusi projektidele. TEDI tiimi poolt tutvustatakse mis komponendid on valmimisel, kogutatakse tagasisidet ning antakse teada kui uued komponendid on valmis kasutamiseks.',
    time: 'Toimumisaeg: E kell 16-17, üle nädala',
  },
  {
    value: 'dev',
    label: 'Arenduse koosolek',
    description:
      'Arenduse koosolekul arutatakse mis on hetkel TEDI tiimi poolt töös, lahendatakse projektide probleeme ja murekohti, kogutakse kasutatavuse tagasisidet ning projektid annavad teada komponentide arenduse soovist ning kui nad ise on midagi Communitysse arendanud ning see vajab ülevaatamist.',
    time: 'Toimumisaeg: K kell 15-16, üle nädala',
  },
];

export const MeetingParticipantsList = ({ participants, onAdd, onRemove, onUpdate }: MeetingParticipantsListProps): JSX.Element => {
  return (
    <VerticalSpacing size={1}>
      <Heading element="h2" modifiers="h3">Koosolekutel osalemine</Heading>
      <Text>Üle nädala toimuvad koosolekud TEDI kasutajatele, nii disaineritele kui arendajatele.</Text>

      {MEETINGS.map((meeting) => (
        <Card key={meeting.value} background="secondary">
          <Card.Content>
            <VerticalSpacing size={0.5}>
              <Heading element="h3" modifiers="h4">{meeting.label}</Heading>
              <Text>{meeting.description}</Text>
              <Text modifiers="bold">{meeting.time}</Text>
            </VerticalSpacing>
          </Card.Content>
        </Card>
      ))}

      {participants.map((participant, index) => (
        <Card key={index}>
          <Card.Content>
            <Row>
              <Col width={12} md={6}>
                <VerticalSpacing size={1}>
                  <TextField
                    id={`meeting-email-${index}`}
                    label="E-post"
                    value={participant.email}
                    onChange={(value) => onUpdate(index, 'email', value)}
                    placeholder="nimi@email.ee"
                    input={{ required: true, type: 'email' }}
                  />
                  <ChoiceGroup
                    id={`meeting-type-${index}`}
                    name={`meetingType-${index}`}
                    label="Koosoleku tüüp"
                    value={participant.meetingType || null}
                    onChange={(value) => onUpdate(index, 'meetingType', typeof value === 'string' ? value : '')}
                    items={MEETINGS.map((meeting) => ({
                      id: `meeting-${meeting.value}-${index}`,
                      value: meeting.value,
                      label: meeting.label,
                    }))}
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
          Lisa koosolekul osaleja
        </Button>
      </div>
    </VerticalSpacing>
  );
};
