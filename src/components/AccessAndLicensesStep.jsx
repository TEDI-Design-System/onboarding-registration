import { VerticalSpacing } from '@tedi-design-system/react/tedi';
import { FigmaLicenseList } from './FigmaLicenseList';
import { MeetingParticipantsList } from './MeetingParticipantsList';

export const AccessAndLicensesStep = ({
  figmaMembers,
  meetingParticipants,
  onAddFigmaLicense,
  onRemoveFigmaLicense,
  onUpdateFigmaLicense,
  onAddMeetingParticipant,
  onRemoveMeetingParticipant,
  onUpdateMeetingParticipant
}) => {
  return (
    <VerticalSpacing size={2.5}>
      <FigmaLicenseList
        members={figmaMembers}
        onAdd={onAddFigmaLicense}
        onRemove={onRemoveFigmaLicense}
        onUpdate={onUpdateFigmaLicense}
      />

      <VerticalSpacing.Item>
        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '1rem 0' }} />
      </VerticalSpacing.Item>

      <MeetingParticipantsList
        participants={meetingParticipants}
        onAdd={onAddMeetingParticipant}
        onRemove={onRemoveMeetingParticipant}
        onUpdate={onUpdateMeetingParticipant}
      />
    </VerticalSpacing>
  );
};
