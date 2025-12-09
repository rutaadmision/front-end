export interface Choice {
  id: number;
  choiceText: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  title: string;
  body: string;
  category: string;
  explanation: string;
  tags: string[];
  choices: Choice[];
}

export interface QuestionParams {
  category?: string;
  solved?: boolean;
  random?: boolean;
  limit?: number;
}

// Payload para enviar respuesta
export interface SubmissionPayload {
  question: string;
  choice: string;
}

// Respuesta del endpoint de submission
export interface SubmissionResponse {
  id: number;
  question: number;
  choice: number;
  isCorrect: boolean;
  submittedAt: Date;
}