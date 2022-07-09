import React from 'react';
import { QuizSelectFormWrapper } from './styled';

interface Props {
  quizCount: number;
  onNextQuiz: () => void;

  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];

  onClickAnswer: (item: string) => void;

  currentValue?: string;
}

function QuizSelectForm(props: Props) {
  const { quizCount, onNextQuiz, question, correctAnswer, incorrectAnswers, onClickAnswer, currentValue } = props;

  const randomAnswers = React.useMemo(() => {
    return [correctAnswer, ...incorrectAnswers].sort(() => Math.random() - 0.5);
  }, [correctAnswer, incorrectAnswers]);

  const answerResult = React.useMemo(() => {
    return currentValue === correctAnswer ? '정답입니다!' : '틀렸습니다.';
  }, [currentValue, correctAnswer]);

  return (
    <QuizSelectFormWrapper>
      <p className="title">Quiz {quizCount + 1}</p>

      <p className="quiz-content">{question}</p>

      {!currentValue &&
        randomAnswers.map((it) => {
          return (
            <label key={it + 'select'}>
              <input type="radio" value={it} onClick={() => onClickAnswer(it)} />
              <p>{it}</p>
            </label>
          );
        })}

      {currentValue && (
        <>
          {randomAnswers.map((it) => {
            return (
              <div key={it + 'result'}>
                <p>{it}</p>
              </div>
            );
          })}
          <p className="answer-result">{answerResult}</p>
        </>
      )}

      <button type="button" onClick={onNextQuiz}>
        다음
      </button>
    </QuizSelectFormWrapper>
  );
}

export default QuizSelectForm;
