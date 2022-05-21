import {Navigation} from 'react-native-navigation';
import {HomeScreen} from '~/HomeScreen';
import {createApolloWrapperScreen} from '~/misc/functions';
import WithApollo from './src/graphql';

const startApp = async () => {
  // await WithApollo.initCache();
  const client = WithApollo.initClient();
  registerScreens(client);
};

const start = async () => {
  await startApp();
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'HomeScreen',
            },
          },
        ],
      },
    },
  });
};

Navigation.events().registerAppLaunchedListener(start);

const registerScreens = client => {
  Navigation.registerComponent('HomeScreen', () =>
    createApolloWrapperScreen(HomeScreen, client),
  );
};

const screenEventListener = Navigation.events().registerComponentDidAppearListener(
  ({componentId, componentName, passProps}) => {
    WithApollo.setCurrentScreen(componentId);
  },
);
