import { Request, Response } from 'express';
import { EmailGenerator } from '../services/EmailGenerator';
import { MeetingSummarizer } from '../services/MeetingSummarizer';

export class EmailController {
  private emailGenerator: EmailGenerator;
  private meetingSummarizer: MeetingSummarizer;

  constructor() {
    this.emailGenerator = new EmailGenerator();
    this.meetingSummarizer = new MeetingSummarizer();
  }

  async generateEmail(req: Request, res: Response): Promise<void> {
    try {
      const { meetingId } = req.params;
      const { context } = req.body;
      
      if (!meetingId) {
        res.status(400).json({ error: 'Meeting ID is required' });
        return;
      }

      if (!context) {
        res.status(400).json({ error: 'Context is required' });
        return;
      }

      const summary = await this.meetingSummarizer.summarize(meetingId);
      const email = await this.emailGenerator.generateEmail(summary, context);
      
      res.json({ email });
    } catch (error) {
      console.error('Error generating email:', error);
      res.status(500).json({ error: 'Failed to generate email' });
    }
  }
} 