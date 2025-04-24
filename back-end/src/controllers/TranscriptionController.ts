import { Request, Response } from 'express';
import { meetings } from '../mocks';

export class TranscriptionController {
  async getTranscription(req: Request, res: Response): Promise<void> {
    try {
      const { meetingId } = req.params;
      
      if (!meetingId) {
        res.status(400).json({ error: 'Meeting ID is required' });
        return;
      }

      const meeting = meetings[meetingId];
      
      if (!meeting) {
        res.status(404).json({ error: 'Meeting not found' });
        return;
      }

      res.json({
        id: meeting.id,
        transcription: meeting.transcription
      });
    } catch (error) {
      console.error('Error getting transcription:', error);
      res.status(500).json({ error: 'Failed to get transcription' });
    }
  }

  async getAllTranscriptions(req: Request, res: Response): Promise<void> {
    try {
      const transcriptions = Object.values(meetings).map(meeting => ({
        id: meeting.id,
        transcription: meeting.transcription
      }));

      res.json(transcriptions);
    } catch (error) {
      console.error('Error getting all transcriptions:', error);
      res.status(500).json({ error: 'Failed to get transcriptions' });
    }
  }
} 