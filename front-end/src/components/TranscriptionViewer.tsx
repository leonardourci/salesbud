import React, { useState } from 'react';
import { Transcription } from '../services/api';

interface TranscriptionViewerProps {
  transcription: Transcription | null;
  isLoading: boolean;
}

export const TranscriptionViewer: React.FC<TranscriptionViewerProps> = ({ transcription, isLoading }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    );
  }

  if (!transcription) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-2xl font-bold">Transcrição da Reunião</h2>
        <button className="text-gray-500 hover:text-gray-700">
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
        <div className="mt-4 prose max-w-none">
          <pre className="whitespace-pre-wrap font-sans text-sm">
            {transcription.transcription}
          </pre>
        </div>
      )}
    </div>
  );
}; 