import OpenAI from 'openai';

interface EmailContext {
  name: string;
  last_interaction: string;
  objective?: string;
}

export class EmailGenerator {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.AI_API_KEY,
    });
  }

  async generateEmail(summary: string, context: EmailContext): Promise<string> {
    const prompt = `
      # Gere um e-mail profissional de follow-up baseado no resumo da reunião e contexto fornecidos abaixo.
      
      ## Requisitos
      - Conciso
      - Tom profissional
      - Foco nos pontos principais da reunião
      
      ## Resumo da Reunião
      ${summary}
      
      ## Contexto
      - **Nome**: ${context.name}
      - **Última Interação**: ${context.last_interaction}
      ${context.objective ? `- **Objetivo**: ${context.objective}` : ''}
      
      ## Estrutura do E-mail
      1. Reconhecimento da reunião realizada
      2. Síntese dos principais pontos discutidos
      3. Proposta clara de próximos passos
      4. Manutenção de tom profissional e engajador
    `;

    try {
      const response = await this.openai.chat.completions.create({
        model: process.env.AI_MODEL ?? '',
        messages: [
          {
            role: "system",
            content: "Você é um especialista em comunicação profissional, focado em criar e-mails de follow-up que são concisos, claros e estrategicamente estruturados para manter o engajamento e promover ações efetivas."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 300,
        n: 1
      });

      return response.choices[0].message?.content || 'No email generated';
    } catch (error) {
      console.error('Error in email generation:', error);
      throw new Error('Failed to generate email');
    }
  }
} 