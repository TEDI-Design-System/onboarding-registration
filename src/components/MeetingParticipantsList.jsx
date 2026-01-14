import { Button, TextField, Radio, VerticalSpacing, Card } from '@tedi-design-system/react/tedi';

export const MeetingParticipantsList = ({ participants, onAdd, onRemove, onUpdate }) => {
  return (
    <VerticalSpacing.Item>
      <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Koosolekutel osalemine</h3>
      <p>
        Üle nädala toimuvad koosolekud TEDI kasutajatele, nii disaineritele kui arendajatele.
      </p>

      <VerticalSpacing size={1}>
        <VerticalSpacing.Item>
          <Card background="neutral" className="info-card-neutral">
            <Card.Content>
              <h4 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Disainikoosolek</h4>
              <p style={{ marginBottom: '0.5rem' }}>
                Disainikoosolekul arutatakse uute komponentide vajadusi, muudatuse vajadusi, probleeme komponentides, projektid annavad kasutatavuse tagasiside ning otsitakse lahendusi projektidele. TEDI tiimi poolt tutvustatakse mis komponendid on valmimisel, kogutatakse tagasisidet ning antakse teada kui uued komponendid on valmis kasutamiseks.
              </p>
              <p style={{ margin: 0, fontWeight: 500 }}>Toimumisaeg: E kell 16-17, üle nädala</p>
            </Card.Content>
          </Card>
        </VerticalSpacing.Item>

        <VerticalSpacing.Item>
          <Card background="neutral" className="info-card-neutral">
            <Card.Content>
              <h4 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Arenduse koosolek</h4>
              <p style={{ marginBottom: '0.5rem' }}>
                Arenduse koosolekul arutatakse mis on hetkel TEDI tiimi poolt töös, lahendatakse projektide probleeme ja murekohti, kogutakse kasutatavuse tagasisidet ning projektid annavad teada komponentide arenduse soovist ning kui nad ise on midagi Communitysse arendanud ning see vajab ülevaatamist.
              </p>
              <p style={{ margin: 0, fontWeight: 500 }}>Toimumisaeg: K kell 15-16, üle nädala</p>
            </Card.Content>
          </Card>
        </VerticalSpacing.Item>
      </VerticalSpacing>

      <VerticalSpacing size={1} style={{ marginTop: '1.5rem' }}>
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
                    style={{ maxWidth: '50%' }}
                  />
                </VerticalSpacing.Item>
                <VerticalSpacing.Item>
                  <div role="group" aria-labelledby={`meeting-type-label-${index}`}>
                    <div id={`meeting-type-label-${index}`} style={{ marginBottom: '0.75rem', fontWeight: 500 }}>
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
          <Button type="button" onClick={onAdd} style={{ marginTop: '1rem' }}>
            + Lisa koosolekul osaleja
          </Button>
        </VerticalSpacing.Item>
      </VerticalSpacing>
    </VerticalSpacing.Item>
  );
};
