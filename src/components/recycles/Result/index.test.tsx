import { render } from '@testing-library/react';
import React from 'react';
import Result from '.';

function renderResult() {
  const onRetry = jest.fn();

  const result = render(<Result time={'11:11'} successCount={3} onRetry={onRetry} />);

  const Time = () => result.getByText(`퀴즈를 마칠 때까지 소요된 시간: 11:11`);

  const SuccessCount = () => result.getByText('정답 개수: 3');
  const FailedCount = () => result.getByText('오답 수: 7');

  const RetryButton = () => result.getByText('다시 풀기');

  return {
    Time,
    SuccessCount,
    FailedCount,
    RetryButton,
  };
}

describe('<renderQuizSelectForm />', () => {
  it('기본 렌더링 되는 필드', async () => {
    const { Time, SuccessCount, FailedCount, RetryButton } = renderResult();

    expect(Time()).toBeInTheDocument();

    expect(SuccessCount()).toBeInTheDocument();
    expect(FailedCount()).toBeInTheDocument();

    expect(RetryButton()).toBeInTheDocument();
  });
});
