export interface Choice {
  choice_text: string;
  is_correct: boolean;
}

export interface Question {
  title: string;
  body: string;
  category: string;
  explanation: string;
  tags: string[];
  choices: Choice[];
}
