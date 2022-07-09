import React from 'react';
import { useForm } from 'react-hook-form';
import { useStopwatch } from 'react-timer-hook';
import QuizSelectForm from 'src/components/recycles/QuizSelectForm';
import Result from 'src/components/recycles/Result';
import { QuizFormData } from './interface';
import { MainWrapper } from './styled';
import useMain from './hooks';

function Main() {
  const { reset, setValue, watch } = useForm<QuizFormData>();

  const { start, pause, reset: watchReset, minutes, seconds } = useStopwatch({ autoStart: false });

  const { quizCount, handleStartQuiz, questions, handleNextQuiz, handleClickAnswer } = useMain({
    watchReset,
    reset,
    start,
    pause,
    setValue,
  });

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
          onRetry={handleStartQuiz}
        />
      )}
    </MainWrapper>
  );
}

export default Main;
