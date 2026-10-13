import { Separator, VerticalSpacing } from '@tedi-design-system/react/tedi';
import { FigmaLicenseList } from './FigmaLicenseList';
import { MeetingParticipantsList } from './MeetingParticipantsList';
import { FigmaMember, MeetingParticipant } from '../constants/formDefaults';

interface AccessAndLicensesStepProps {
  figmaMembers: FigmaMember[];
  meetingParticipants: MeetingParticipant[];
  onAddFigmaLicense: () => void;
  onRemoveFigmaLicense: (index: number) => void;
  onUpdateFigmaLicense: (index: number, field: string, value: string) => void;
  onAddMeetingParticipant: () => void;
  onRemoveMeetingParticipant: (index: number) => void;
  onUpdateMeetingParticipant: (index: number, field: string, value: string) => void;
}

export const AccessAndLicensesStep = ({
  figmaMembers,
  meetingParticipants,
  onAddFigmaLicense,
  onRemoveFigmaLicense,
  onUpdateFigmaLicense,
  onAddMeetingParticipant,
  onRemoveMeetingParticipant,
  onUpdateMeetingParticipant
}: AccessAndLicensesStepProps): JSX.Element => {
  return (
    <VerticalSpacing size={2}>
      <div>
        <FigmaLicenseList
          members={figmaMembers}
          onAdd={onAddFigmaLicense}
          onRemove={onRemoveFigmaLicense}
          onUpdate={onUpdateFigmaLicense}
        />
      </div>
      <Separator />
      <div>
        <MeetingParticipantsList
          participants={meetingParticipants}
          onAdd={onAddMeetingParticipant}
          onRemove={onRemoveMeetingParticipant}
          onUpdate={onUpdateMeetingParticipant}
        />
      </div>
    </VerticalSpacing>
  );
};
