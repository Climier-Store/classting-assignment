import React from 'react';
import { useForm } from 'react-hook-form';
import { useStopwatch } from 'react-timer-hook';
import QuizSelectForm from 'src/components/recycles/QuizSelectForm';
import Result from 'src/components/recycles/Result';
import { MainWrapper } from './styled';

interface QuestionsType {
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

function Main() {
  const [quizCount, setQuizCount] = React.useState<number>(-1);

  const { reset, setValue, watch } = useForm<QuizFormData>();

  const { start, pause, reset: watchReset, minutes, seconds } = useStopwatch({ autoStart: false });

  const handleStartQuiz = React.useCallback(() => {
    watchReset();
    reset();
    setQuizCount(0);
    start();
  }, [reset, start, watchReset]);

  const handleNextQuiz = React.useCallback(() => {
    if (quizCount === 9) {
      pause();
      setQuizCount(10);
    } else {
      setQuizCount(quizCount + 1);
    }
  }, [pause, quizCount]);

  const [questions, setQuestions] = React.useState<QuestionsType>();

  const fetchQuestions = React.useCallback(async () => {
    const res = await fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple');
    const resJson = await res.json();

    setQuestions(resJson);
  }, []);

  const handleClickAnswer = React.useCallback(
    (item: string) => {
      setValue(`selectAnswers.${quizCount}`, item);
    },
    [quizCount, setValue]
  );

  React.useLayoutEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const selectAnswers = watch('selectAnswers');

  return (
    <MainWrapper>
      {quizCount === -1 && (
        <button type="button" onClick={handleStartQuiz}>
          퀴즈풀기
        </button>
      )}
      {questions && quizCount > -1 && quizCount < 10 && (
        <QuizSelectForm
          quizCount={quizCount}
          onNextQuiz={handleNextQuiz}
          question={questions.results[quizCount].question}
          correctAnswer={questions.results[quizCount].correct_answer}
          incorrectAnswers={questions.results[quizCount].incorrect_answers}
          onClickAnswer={handleClickAnswer}
          currentValue={selectAnswers?.[quizCount]}
        />
      )}

      {quizCount === 10 && (
        <Result
          time={`${minutes}:${seconds}`}
          successCount={
            questions?.results.filter((result, idx) => result.correct_answer === selectAnswers?.[idx]).length ?? 0
          }
        />
      )}
    </MainWrapper>
  );
}

export default Main;
