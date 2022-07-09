import React from 'react';
import { RadialChart } from 'react-vis';
import { ResultWrapper } from './styled';

interface Props {
  time: string;
  successCount: number;
  onRetry: () => void;
}

function Result(props: Props) {
  const { time, successCount, onRetry } = props;

  const chartData = React.useMemo(() => {
    return [
      { angle: successCount, label: '정답' },
      { angle: 10 - successCount, label: '오답' },
    ];
  }, [successCount]);

  return (
    <ResultWrapper>
      <RadialChart data={chartData} width={300} height={300} showLabels />

      <p>퀴즈를 마칠 때까지 소요된 시간: {time}</p>
      <p>정답 개수: {successCount}</p>
      <p>오답 수: {10 - successCount}</p>
      <button type="button" onClick={onRetry}>
        다시 풀기
      </button>
    </ResultWrapper>
  );
}

export default Result;
