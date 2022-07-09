export interface QuestionsType {
  response_code: number;
  results: {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
  }[];
}

export interface QuizFormData {
  selectAnswers: string[];
}
