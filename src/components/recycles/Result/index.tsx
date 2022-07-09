import React from 'react';
import { ResultWrapper } from './styled';

interface Props {
  time: string;
  successCount: number;
}

function Result(props: Props) {
  const { time, successCount } = props;

  return (
    <ResultWrapper>
      <p>퀴즈를 마칠 때까지 소요된 시간: {time}</p>
      <p>정답 개수: {successCount}</p>
      <p>오답 수: {10 - successCount}</p>
    </ResultWrapper>
  );
}

export default Result;
