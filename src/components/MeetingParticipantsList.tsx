import { Button, TextField, Radio, VerticalSpacing, Card } from '@tedi-design-system/react/tedi';
import { MeetingParticipant } from '../constants/formDefaults';

interface MeetingParticipantsListProps {
  participants: MeetingParticipant[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: string, value: string) => void;
}

export const MeetingParticipantsList = ({ participants, onAdd, onRemove, onUpdate }: MeetingParticipantsListProps): JSX.Element => {
  return (
    <VerticalSpacing.Item>
      <h3 className="section-heading">Koosolekutel osalemine</h3>
      <p>
        Üle nädala toimuvad koosolekud TEDI kasutajatele, nii disaineritele kui arendajatele.
      </p>

      <VerticalSpacing size={1}>
        <VerticalSpacing.Item>
          <Card background="neutral" className="info-card-neutral">
            <Card.Content>
              <h4 className="card-subheading">Disainikoosolek</h4>
              <p className="card-text">
                Disainikoosolekul arutatakse uute komponentide vajadusi, muudatuse vajadusi, probleeme komponentides, projektid annavad kasutatavuse tagasiside ning otsitakse lahendusi projektidele. TEDI tiimi poolt tutvustatakse mis komponendid on valmimisel, kogutatakse tagasisidet ning antakse teada kui uued komponendid on valmis kasutamiseks.
              </p>
              <p className="card-text-bold">Toimumisaeg: E kell 16-17, üle nädala</p>
            </Card.Content>
          </Card>
        </VerticalSpacing.Item>

        <VerticalSpacing.Item>
          <Card background="neutral" className="info-card-neutral">
            <Card.Content>
              <h4 className="card-subheading">Arenduse koosolek</h4>
              <p className="card-text">
                Arenduse koosolekul arutatakse mis on hetkel TEDI tiimi poolt töös, lahendatakse projektide probleeme ja murekohti, kogutakse kasutatavuse tagasisidet ning projektid annavad teada komponentide arenduse soovist ning kui nad ise on midagi Communitysse arendanud ning see vajab ülevaatamist.
              </p>
              <p className="card-text-bold">Toimumisaeg: K kell 15-16, üle nädala</p>
            </Card.Content>
          </Card>
        </VerticalSpacing.Item>
      </VerticalSpacing>

      <VerticalSpacing size={1} className="list-spacing-top">
        {participants.map((participant, index) => (
          <VerticalSpacing.Item key={index}>
            <Card>
              <Card.Content>
                <VerticalSpacing size={1}>
                <VerticalSpacing.Item>
                  <TextField
                    id={`meeting-email-${index}`}
                    label="Email"
                    value={participant.email}
                    onChange={(value) => onUpdate(index, 'email', value)}
                    placeholder="nimi@email.ee"
                    input={{ required: true, type: 'email' }}
                    className="text-field-half-width"
                  />
                </VerticalSpacing.Item>
                <VerticalSpacing.Item>
                  <div role="group" aria-labelledby={`meeting-type-label-${index}`}>
                    <div id={`meeting-type-label-${index}`} className="radio-label">
                      Koosoleku tüüp:
                    </div>
                    <VerticalSpacing size={0.5}>
                      <VerticalSpacing.Item>
                        <Radio
                          id={`meeting-design-${index}`}
                          name={`meetingType-${index}`}
                          label="Disainikoosolek"
                          value="design"
                          checked={participant.meetingType === 'design'}
                          onChange={(value) => onUpdate(index, 'meetingType', value)}
                        />
                      </VerticalSpacing.Item>
                      <VerticalSpacing.Item>
                        <Radio
                          id={`meeting-dev-${index}`}
                          name={`meetingType-${index}`}
                          label="Arenduse koosolek"
                          value="dev"
                          checked={participant.meetingType === 'dev'}
                          onChange={(value) => onUpdate(index, 'meetingType', value)}
                        />
                      </VerticalSpacing.Item>
                    </VerticalSpacing>
                  </div>
                </VerticalSpacing.Item>
                <VerticalSpacing.Item>
                  <Button
                    type="button"
                    onClick={() => onRemove(index)}
                    visualType="secondary"
                    size="small"
                  >
                    Eemalda
                  </Button>
                </VerticalSpacing.Item>
              </VerticalSpacing>
              </Card.Content>
            </Card>
          </VerticalSpacing.Item>
        ))}
        <VerticalSpacing.Item>
          <Button type="button" onClick={onAdd} className="button-spacing-top">
            + Lisa koosolekul osaleja
          </Button>
        </VerticalSpacing.Item>
      </VerticalSpacing>
    </VerticalSpacing.Item>
  );
};
