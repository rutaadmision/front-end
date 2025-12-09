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