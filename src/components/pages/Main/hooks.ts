import React from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { QuestionsType, QuizFormData } from './interface';

interface UseMainProps {
  watchReset: () => void;
  reset: () => void;
  start: () => void;
  pause: () => void;
  setValue: UseFormSetValue<QuizFormData>;
}

interface UseMainReturn {
  quizCount: number;
  handleStartQuiz: () => void;
  questions: QuestionsType | undefined;
  handleNextQuiz: () => void;
  handleClickAnswer: (item: string) => void;
}

function useMain(props: UseMainProps): UseMainReturn {
  const { watchReset, reset, start, pause, setValue } = props;

  // Quiz의 Round 수
  const [quizCount, setQuizCount] = React.useState<number>(-1);

  // 퀴즈를 시작하기 위한 func
  const handleStartQuiz = React.useCallback(() => {
    watchReset();
    reset();
    setQuizCount(0);
    start();
  }, [reset, start, watchReset]);

  // 퀴즈에서 정답 선택을 위한 func
  const handleClickAnswer = React.useCallback(
    (item: string) => {
      setValue(`selectAnswers.${quizCount}`, item);
    },
    [quizCount, setValue]
  );

  // 퀴즈에서 정답 선택 후 다음 문제 or result 페이지로 넘어가기 위한 func
  const handleNextQuiz = React.useCallback(() => {
    if (quizCount === 9) {
      pause();
      setQuizCount(10);
    } else {
      setQuizCount(quizCount + 1);
    }
  }, [pause, quizCount]);

  // fetch questions
  const [questions, setQuestions] = React.useState<QuestionsType>();
  const fetchQuestions = React.useCallback(async () => {
    const res = await fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple');
    const resJson = await res.json();

    setQuestions(resJson);
  }, []);

  React.useLayoutEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return {
    quizCount,
    handleStartQuiz,
    questions,
    handleNextQuiz,
    handleClickAnswer,
  };
}

export default useMain;
