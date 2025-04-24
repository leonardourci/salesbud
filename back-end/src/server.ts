import { config } from 'dotenv';
import path from 'path';
import express from 'express';
import cors from 'cors';
import { MeetingController } from './controllers/MeetingController';
import { EmailController } from './controllers/EmailController';
import { TranscriptionController } from './controllers/TranscriptionController';

// Load environment variables from root .env file
config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const meetingController = new MeetingController();
const emailController = new EmailController();
const transcriptionController = new TranscriptionController();

// Meeting endpoints
app.post('/meetings/:meetingId/summarize', (req, res) => meetingController.summarizeMeeting(req, res));
app.post('/meetings/:meetingId/generate-email', (req, res) => emailController.generateEmail(req, res));

// Transcription endpoints
app.get('/transcriptions', (req, res) => transcriptionController.getAllTranscriptions(req, res));
app.get('/transcriptions/:meetingId', (req, res) => transcriptionController.getTranscription(req, res));

app.listen(port, () => {
  console.log(`Server running on port ${port} in ${process.env.NODE_ENV} mode`);
}); 