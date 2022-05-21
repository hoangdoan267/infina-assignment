import React from 'react';
import {ApolloProvider} from '@apollo/client';

export const createApolloWrapperScreen = (
  WrappedComponent: any,
  client: any,
) => (props: any) => {
  return (
    <ApolloProvider client={client}>
      <WrappedComponent {...props} />
    </ApolloProvider>
  );
};
