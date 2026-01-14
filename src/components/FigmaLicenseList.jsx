import { Button, TextField, Radio, VerticalSpacing, Card } from '@tedi-design-system/react/tedi';

export const FigmaLicenseList = ({ members, onAdd, onRemove, onUpdate }) => {
  return (
    <VerticalSpacing.Item>
      <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Figma ligipääsud</h3>
      <Card background="neutral" className="info-card-neutral" style={{ marginBottom: '1.5rem' }}>
        <Card.Content>
          <p style={{ marginTop: 0, marginBottom: '0.5rem' }}>
            Kui projekt hakkab TEDI disainisüsteemi kasutama Figmas siis tuleb projektifail luua või üle tuua TEDI Figmasse.
          </p>
          <p style={{ marginBottom: '0.5rem' }}>
            Litsentsitasud kasutajate eest esitatakse tellijale kord aastas. Figmas on eristatud full seat ning dev mode litsentsid.
          </p>
          <ul style={{ marginTop: '0.5rem', marginBottom: 0, paddingLeft: '1.5rem' }}>
            <li><strong>Full seat</strong> - mõeldud disaineritele kes prototüüpe loovad ja muudavad.</li>
            <li><strong>Dev mode</strong> - mõeldud arendajatele kes komponente ja vaateid arendavad.</li>
          </ul>
        </Card.Content>
      </Card>

      <VerticalSpacing size={1}>
        {members.map((member, index) => (
          <VerticalSpacing.Item key={index}>
            <Card>
              <Card.Content>
                <VerticalSpacing size={1}>
                <VerticalSpacing.Item>
                  <TextField
                    id={`figma-email-${index}`}
                    label="Email"
                    value={member.email}
                    onChange={(value) => onUpdate(index, 'email', value)}
                    placeholder="nimi@email.ee"
                    input={{ required: true, type: 'email' }}
                    style={{ maxWidth: '50%' }}
                  />
                </VerticalSpacing.Item>
                <VerticalSpacing.Item>
                  <div role="group" aria-labelledby={`figma-license-label-${index}`}>
                    <div id={`figma-license-label-${index}`} style={{ marginBottom: '0.75rem', fontWeight: 500 }}>
                      Litsentsi tüüp:
                    </div>
                    <VerticalSpacing size={0.5}>
                      <VerticalSpacing.Item>
                        <Radio
                          id={`figma-full-${index}`}
                          name={`figmaLicense-${index}`}
                          label="Full seat"
                          value="full"
                          checked={member.licenseType === 'full'}
                          onChange={(value) => onUpdate(index, 'licenseType', value)}
                        />
                      </VerticalSpacing.Item>
                      <VerticalSpacing.Item>
                        <Radio
                          id={`figma-dev-${index}`}
                          name={`figmaLicense-${index}`}
                          label="Dev mode"
                          value="dev"
                          checked={member.licenseType === 'dev'}
                          onChange={(value) => onUpdate(index, 'licenseType', value)}
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
          <Button type="button" onClick={onAdd}>
            + Lisa litsentsi soov
          </Button>
        </VerticalSpacing.Item>
      </VerticalSpacing>
    </VerticalSpacing.Item>
  );
};
