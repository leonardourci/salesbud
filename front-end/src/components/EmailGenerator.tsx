import React, { useState } from 'react';
import { MeetingContext, GeneratedEmail } from '../services/api';

interface EmailGeneratorProps {
  meetingId: string;
  onGenerate: (context: MeetingContext) => Promise<GeneratedEmail>;
  isLoading: boolean;
}

export const EmailGenerator: React.FC<EmailGeneratorProps> = ({
  onGenerate,
  isLoading,
}) => {
  const [context, setContext] = useState<MeetingContext>({
    name: 'Leonardo Urci - FullStack Software Engineer',
    last_interaction: 'CV pelo Linkedin - 7 dias atrás',
    objective: 'Contrato - AI SDE Pleno - SalesBud',
  });
  const [generatedEmail, setGeneratedEmail] = useState<GeneratedEmail | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await onGenerate(context);
      setGeneratedEmail(result);
    } catch (error) {
      console.error('Error generating email:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-black mb-4">Gerar E-mail Personalizado</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-black">
            Nome do Cliente
          </label>
          <input
            type="text"
            id="name"
            value={context.name}
            onChange={(e) => setContext({ ...context, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-primary focus:ring-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="last_interaction" className="block text-sm font-medium text-black">
            Última Interação
          </label>
          <input
            type="text"
            id="last_interaction"
            value={context.last_interaction}
            onChange={(e) => setContext({ ...context, last_interaction: e.target.value })}
            className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-primary focus:ring-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="objective" className="block text-sm font-medium text-black">
            Objetivo do E-mail (opcional)
          </label>
          <input
            type="text"
            id="objective"
            value={context.objective}
            onChange={(e) => setContext({ ...context, objective: e.target.value })}
            className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Gerando...' : 'Gerar E-mail Com IA'}
        </button>
      </form>

      {generatedEmail && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-black mb-2">E-mail Gerado</h3>
          <div className="bg-black p-4 rounded-md">
            <p className="whitespace-pre-wrap text-white">{generatedEmail.email}</p>
            <div className="mt-2 text-sm text-primary">
              Gerado em: {new Date().toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 