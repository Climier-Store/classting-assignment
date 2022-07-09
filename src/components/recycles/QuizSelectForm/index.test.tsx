import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import QuizSelectForm from '.';

function renderQuizSelectForm() {
  const onNextQuiz = jest.fn();
  const onClickAnswer = jest.fn();

  const result = render(
    <QuizSelectForm
      quizCount={1}
      onNextQuiz={onNextQuiz}
      question="U quiz?"
      correctAnswer="a"
      incorrectAnswers={['b', 'c', 'd']}
      onClickAnswer={onClickAnswer}
    />
  );

  const Heading = () => result.getByText(`Quiz 2`);
  const Question = () => result.getByText('U quiz?');

  const FirstSelect = () => result.getByLabelText('a');
  const SecondSelect = () => result.getByLabelText('b');
  const ThridSelect = () => result.getByLabelText('c');
  const FourthSelect = () => result.getByLabelText('d');

  const NextButton = () => result.queryByText('다음');

  async function clickChoice() {
    await act(async () => {
      userEvent.click(FirstSelect());
    });
  }

  function clickNextButton() {
    userEvent.click(NextButton() as HTMLElement);
  }

  return {
    Heading,
    Question,
    FirstSelect,
    SecondSelect,
    ThridSelect,
    FourthSelect,

    clickChoice,
    NextButton,
    onClickAnswer,

    clickNextButton,
  };
}

describe('<QuizSelectForm />', () => {
  it('기본 렌더링 되는 필드', async () => {
    const { Heading, Question, FirstSelect, SecondSelect, ThridSelect, NextButton, FourthSelect } =
      renderQuizSelectForm();

    expect(Heading()).toBeInTheDocument();
    expect(Question()).toBeInTheDocument();

    expect(FirstSelect()).toBeInTheDocument();
    expect(SecondSelect()).toBeInTheDocument();
    expect(ThridSelect()).toBeInTheDocument();
    expect(FourthSelect()).toBeInTheDocument();

    expect(NextButton()).not.toBeInTheDocument();
  });

  it('select시 버튼 나오기', async () => {
    const { clickChoice, NextButton } = renderQuizSelectForm();

    expect(NextButton()).not.toBeInTheDocument();

    await clickChoice();

    expect(NextButton()).toBeInTheDocument();
  });

  it('선택된 값으로 onNextQuiz 함수를 호출하는가', async () => {
    const { clickChoice, clickNextButton, onClickAnswer } = renderQuizSelectForm();

    await clickChoice();

    clickNextButton();

    expect(onClickAnswer).toHaveBeenCalledWith('a');
  });
});
