import React, { useState } from 'react';
import { MeetingSummary as MeetingSummaryType } from '../services/api';
import ReactMarkdown from 'react-markdown';

interface MeetingSummaryProps {
  summary: MeetingSummaryType;
  isLoading: boolean;
}

export const MeetingSummary: React.FC<MeetingSummaryProps> = ({ summary, isLoading }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-primary bg-opacity-30 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-primary bg-opacity-30 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-primary bg-opacity-30 rounded w-5/6"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-2xl font-bold text-black">Resumo da Reunião</h2>
        <button className="text-primary hover:text-black">
          {isExpanded ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
      </div>
      {isExpanded && (
        <>
          <div className="mt-4 prose max-w-none text-black">
            <ReactMarkdown>{summary.summary}</ReactMarkdown>
          </div>
          <div className="mt-4 text-sm text-primary">
            Gerado em: {new Date().toLocaleString()}
          </div>
        </>
      )}
    </div>
  );
}; 