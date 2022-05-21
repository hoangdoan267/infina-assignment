import {ApolloClient, InMemoryCache} from '@apollo/client';

class WithApollo {
  currentScreen: any;
  constructor() {}

  initClient = () => {
    return new ApolloClient({
      uri: 'https://countries.trevorblades.com/',
      cache: new InMemoryCache(),
    });
  };

  setCurrentScreen = (screenId: string) => {
    this.currentScreen = screenId;
  };
}

export default new WithApollo();
