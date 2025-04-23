import React from 'react';
import { MeetingSummary as MeetingSummaryType } from '../services/api';
import ReactMarkdown from 'react-markdown';

interface MeetingSummaryProps {
  summary: MeetingSummaryType;
  isLoading: boolean;
}

export const MeetingSummary: React.FC<MeetingSummaryProps> = ({ summary, isLoading }) => {
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Resumo da Reunião</h2>
      <div className="prose max-w-none">
        <ReactMarkdown>{summary.summary}</ReactMarkdown>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        Gerado em: {new Date(summary.generatedAt).toLocaleString()}
      </div>
    </div>
  );
}; 