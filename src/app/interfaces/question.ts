export interface Choice {
  id: number;
  choiceText: string;
  is_correct: boolean;
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
