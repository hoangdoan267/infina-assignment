import {ActivityIndicator} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

export const Loading = () => {
  return (
    <LoadingContainer>
      <ActivityIndicator size={'small'} color="#999999" />
    </LoadingContainer>
  );
};

const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
