import React, { useState } from 'react';
import { MeetingSummary } from './components/MeetingSummary';
import { EmailGenerator } from './components/EmailGenerator';
import { summarizeMeeting, generateEmail, MeetingSummary as MeetingSummaryType } from './services/api';

const App: React.FC = () => {
  const [selectedMeeting, setSelectedMeeting] = useState<string>('meeting-001');
  const [summary, setSummary] = useState<MeetingSummaryType | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">SalesBud</h1>
          <p className="text-lg text-gray-600">Gerador de E-mails Personalizados com IA</p>
        </header>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Selecione uma Reunião</h2>
            <div className="flex space-x-4">
              <button
                onClick={() => setSelectedMeeting('meeting-001')}
                className={`px-4 py-2 rounded-md ${
                  selectedMeeting === 'meeting-001'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Reunião 001
              </button>
              <button
                onClick={() => setSelectedMeeting('meeting-002')}
                className={`px-4 py-2 rounded-md ${
                  selectedMeeting === 'meeting-002'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Reunião 002
              </button>
            </div>
            <button
              onClick={handleSummarize}
              disabled={isLoadingSummary}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoadingSummary ? 'Carregando...' : 'Resumir Reunião'}
            </button>
          </div>

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