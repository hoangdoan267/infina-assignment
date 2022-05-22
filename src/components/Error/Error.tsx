import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

interface Props {
  onTryAgain: () => void;
}

export const Error = (props: Props) => {
  const {onTryAgain} = props;
  return (
    <ErrorContainer>
      <Title>Error occured.</Title>
      <TouchableOpacity onPress={onTryAgain}>
        <TryAgain>Try again</TryAgain>
      </TouchableOpacity>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 16px;
  color: #888888;
`;

const TryAgain = styled.Text`
  font-size: 16px;
  color: #096dd9;
`;
