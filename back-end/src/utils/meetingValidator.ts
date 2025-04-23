import { meetings } from '../mocks';

export class MeetingValidator {
  static getAvailableMeetingIds(): string[] {
    return Object.keys(meetings);
  }

  static isValidMeetingId(meetingId: string): boolean {
    return meetingId in meetings;
  }

  static getMeetingTranscription(meetingId: string): string {
    if (!this.isValidMeetingId(meetingId)) {
      throw new Error(`Invalid meeting ID. Available IDs are: ${this.getAvailableMeetingIds().join(', ')}`);
    }
    return meetings[meetingId].transcription;
  }
} 