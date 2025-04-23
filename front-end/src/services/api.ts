import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export interface MeetingContext {
  name: string;
  last_interaction: string;
  objective?: string;
}

export interface MeetingSummary {
  summary: string;
  meetingId: string;
  generatedAt: string;
}

export interface GeneratedEmail {
  email: string;
  meetingId: string;
  generatedAt: string;
}

export const summarizeMeeting = async (meetingId: string): Promise<MeetingSummary> => {
  const response = await api.post(`/meetings/${meetingId}/summarize`);
  return response.data;
};

export const generateEmail = async (
  meetingId: string,
  context: MeetingContext
): Promise<GeneratedEmail> => {
  const response = await api.post(`/meetings/${meetingId}/generate-email`, { context });
  return response.data;
}; 