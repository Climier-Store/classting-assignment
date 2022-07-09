import styled from 'styled-components';

export const QuizSelectFormWrapper = styled.div`
  display: flex;

  flex-direction: column;

  & > p.title {
    font-size: 18px;
    font-weight: bold;
  }

  & > p.quiz-content {
    font-size: 12px;
  }

  & > p.answer-result {
    text-align: center;
  }

  & > label {
    display: flex;
    flex-direction: row;
  }
`;
