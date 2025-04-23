import { OpenAI } from 'openai';
import { MeetingValidator } from '../utils/meetingValidator';

export class MeetingSummarizer {
  private openai: OpenAI;

  constructor() {
    if (!process.env.AI_API_KEY) {
      throw new Error('AI_API_KEY environment variable is not set');
    }

    this.openai = new OpenAI({
      apiKey: process.env.AI_API_KEY,
    });
  }

  async summarize(meetingId: string): Promise<string> {
    const transcription = MeetingValidator.getMeetingTranscription(meetingId);

    const prompt = `
      # Analise a transcrição abaixo e forneça um resumo estruturado seguindo este formato:

      ## Pontos de Dor
      - Liste os principais problemas e desafios mencionados
      - Inclua dados quantitativos quando disponíveis
      
      ## Objeções
      - Identifique resistências ou preocupações expressas
      - Destaque questões que precisam ser endereçadas
      
      ## Soluções/Resultados Esperados  
      - Detalhe as soluções discutidas
      - Especifique resultados e benefícios pretendidos
      
      ## Próximos Passos
      - Liste ações acordadas
      - Inclua datas e responsáveis quando definidos

      Transcrição da reunião:
      ${transcription}`;

    try {
      const response = await this.openai.chat.completions.create({
        model: process.env.AI_MODEL || "meta-llama/llama-3.2-11b-vision-instruct:free",
        messages: [
          {
            role: "system",
            content: "Você é um especialista em análise de reuniões comerciais. Sua função é extrair insights relevantes e estruturá-los em um formato markdown claro e acionável. Mantenha o foco em informações que impactam a tomada de decisão."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      return response.choices[0].message?.content || 'No summary generated';
    } catch (error) {
      console.error('Error in meeting summarization:', error);
      throw new Error('Failed to summarize meeting');
    }
  }
} 