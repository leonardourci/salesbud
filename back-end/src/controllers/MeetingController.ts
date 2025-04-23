import { Request, Response } from 'express';
import { MeetingSummarizer } from '../services/MeetingSummarizer';

export class MeetingController {
  private meetingSummarizer: MeetingSummarizer;

  constructor() {
    this.meetingSummarizer = new MeetingSummarizer();
  }

  async summarizeMeeting(req: Request, res: Response): Promise<void> {
    try {
      const { meetingId } = req.params;
      
      if (!meetingId) {
        res.status(400).json({ error: 'Meeting ID is required' });
        return;
      }

      const summary = await this.meetingSummarizer.summarize(meetingId);
      res.json({ summary });
    } catch (error) {
      console.error('Error summarizing meeting:', error);
      res.status(500).json({ error: 'Failed to summarize meeting' });
    }
  }
} 