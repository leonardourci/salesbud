# SalesBud - AI-Powered Sales Meeting Analysis

This project consists of a front-end and back-end application that uses AI to analyze sales meetings and generate personalized follow-up emails. The system can summarize meeting transcripts and create contextually relevant email content based on the meeting outcomes.

## 🚀 Running the Project

This approach uses npm's built-in workspace feature and requires only Node.js to be installed.

```bash
# Install all dependencies and start both the back-end and front-end
npm start
```

## 📁 Project Structure

```
.
├── front-end/          # React + TypeScript front-end
├── back-end/           # Node.js + TypeScript back-end
├── package.json        # Root package.json for running both back-end and front-end
├── .env               # Environment variables for both front-end and back-end
```

## 🔧 Requirements

- Node.js (v18 or higher)
- OpenAI API key (required for AI features)

## 📝 Environment Setup

1. Create a `.env` file in the root directory with the following variables:
   ```env
   # API Configuration
   PORT=3001
   NODE_ENV=development

   # OpenAI Configuration
   AI_API_KEY=your_openai_api_key_here
   AI_MODEL=gpt-4.1-nano

   # Front-end Configuration
   REACT_APP_API_URL=http://localhost:3001
   ```

2. Replace `your_openai_api_key_here` with your actual OpenAI API key

## 📝 Notes

- The front-end runs on port 3000
- The back-end runs on port 3001
- Environment variables are loaded from the root `.env` file

## 🔌 Back-end Routes

### Meeting Analysis
- `POST /meetings/:meetingId/summarize`
  - Summarizes a meeting transcript
  - Returns a structured summary with pain points, objections, solutions, and next steps

### Email Generation
- `POST /meetings/:meetingId/generate-email`
  - Generates a personalized follow-up email based on meeting summary
  - Requires context in request body:
    ```json
    {
      "name": "string",
      "last_interaction": "string",
      "objective": "string (optional)"
    }
    ```

### Transcription Management
- `GET /transcriptions`
  - Returns all available meeting transcriptions
  - Response format:
    ```json
    [
      {
        "id": "meeting-001",
        "transcription": "Full transcription text..."
      }
    ]
    ```

- `GET /transcriptions/:meetingId`
  - Returns a specific meeting transcription
  - Response format:
    ```json
    {
      "id": "meeting-001",
      "transcription": "Full transcription text..."
    }
    ```

## 🤖 AI Features

The application uses OpenAI's API to:
1. Analyze meeting transcripts and extract key insights
2. Generate structured meeting summaries
3. Create personalized follow-up emails based on meeting context

The AI is configured to maintain a professional tone while focusing on actionable insights and clear next steps.
