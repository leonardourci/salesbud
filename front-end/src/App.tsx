import React, { useState } from 'react';
import { MeetingSummary } from './components/MeetingSummary';
import { EmailGenerator } from './components/EmailGenerator';
import { TranscriptionViewer } from './components/TranscriptionViewer';
import { summarizeMeeting, generateEmail, getTranscription, MeetingSummary as MeetingSummaryType, Transcription } from './services/api';

const App: React.FC = () => {
  const [selectedMeeting, setSelectedMeeting] = useState<string>('meeting-003');
  const [summary, setSummary] = useState<MeetingSummaryType | null>(null);
  const [transcription, setTranscription] = useState<Transcription | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [isLoadingTranscription, setIsLoadingTranscription] = useState(false);

  const handleMeetingChange = (meetingId: string) => {
    setSelectedMeeting(meetingId);
    // Clear previous states
    setSummary(null);
    setTranscription(null);
  };

  const handleSummarize = async () => {
    setIsLoadingSummary(true);
    try {
      const result = await summarizeMeeting(selectedMeeting);
      setSummary(result);
    } catch (error) {
      console.error('Error summarizing meeting:', error);
    } finally {
      setIsLoadingSummary(false);
    }
  };

  const handleGenerateEmail = async (context: any) => {
    setIsLoadingEmail(true);
    try {
      return await generateEmail(selectedMeeting, context);
    } finally {
      setIsLoadingEmail(false);
    }
  };

  const handleViewTranscription = async () => {
    setIsLoadingTranscription(true);
    try {
      const result = await getTranscription(selectedMeeting);
      setTranscription(result);
    } catch (error) {
      console.error('Error getting transcription:', error);
    } finally {
      setIsLoadingTranscription(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">SalesBud</h1>
          <p className="text-lg text-white">Gerador de E-mails Personalizados com IA</p>
        </header>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-black mb-4">Selecione uma Reunião</h2>
            <div className="flex space-x-4">
              <button
                onClick={() => handleMeetingChange('meeting-003')}
                className={`px-4 py-2 rounded-md ${
                  selectedMeeting === 'meeting-003'
                    ? 'bg-primary text-white'
                    : 'bg-black text-white hover:bg-primary hover:bg-opacity-80'
                }`}
              >
                AI SDE - Urci
              </button>
              <button
                onClick={() => handleMeetingChange('meeting-001')}
                className={`px-4 py-2 rounded-md ${
                  selectedMeeting === 'meeting-001'
                    ? 'bg-primary text-white'
                    : 'bg-black text-white hover:bg-primary hover:bg-opacity-80'
                }`}
              >
                Reunião 001
              </button>
              <button
                onClick={() => handleMeetingChange('meeting-002')}
                className={`px-4 py-2 rounded-md ${
                  selectedMeeting === 'meeting-002'
                    ? 'bg-primary text-white'
                    : 'bg-black text-white hover:bg-primary hover:bg-opacity-80'
                }`}
              >
                Reunião 002
              </button>
            </div>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={handleSummarize}
                disabled={isLoadingSummary}
                className="flex-1 bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
              >
                {isLoadingSummary ? 'Carregando...' : 'Resumir Reunião Com IA'}
              </button>
              <button
                onClick={handleViewTranscription}
                disabled={isLoadingTranscription}
                className="flex-1 bg-black text-white py-2 px-4 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50"
              >
                {isLoadingTranscription ? 'Carregando...' : 'Ver Transcrição'}
              </button>
            </div>
          </div>

          {transcription && (
            <TranscriptionViewer transcription={transcription} isLoading={isLoadingTranscription} />
          )}

          {summary && (
            <MeetingSummary summary={summary} isLoading={isLoadingSummary} />
          )}

          <EmailGenerator
            meetingId={selectedMeeting}
            onGenerate={handleGenerateEmail}
            isLoading={isLoadingEmail}
          />
        </div>
      </div>
    </div>
  );
};

export default App; 