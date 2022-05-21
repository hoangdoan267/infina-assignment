import React from 'react';
import {ApolloProvider} from '@apollo/client';

export const createApolloWrapperScreen = (
  WrappedComponent,
  client,
) => props => {
  return (
    <ApolloProvider client={client}>
      <WrappedComponent {...props} />
    </ApolloProvider>
  );
};
