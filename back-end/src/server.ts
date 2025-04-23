import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { MeetingController } from './controllers/MeetingController';
import { EmailController } from './controllers/EmailController';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const meetingController = new MeetingController();
const emailController = new EmailController();

app.post('/meetings/:meetingId/summarize', (req, res) => meetingController.summarizeMeeting(req, res));
app.post('/meetings/:meetingId/generate-email', (req, res) => emailController.generateEmail(req, res));

app.listen(port, () => {
  console.log(`Server running on port ${port} in ${process.env.NODE_ENV} mode`);
}); 