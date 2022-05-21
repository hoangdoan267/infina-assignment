import {Navigation} from 'react-native-navigation';
import {createApolloWrapperScreen} from '~/misc/functions';
import {ContinentScreen, CountryScreen, HomeScreen} from '~/screens';
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
        id: 'AppStack',
        options: {
          topBar: {
            title: {
              visible: false,
            },
            leftButtons: [
              {
                id: 'backButton',
                icon: require('./src/assets/images/ic_back.png'),
                color: 'black',
              },
            ],
          },
        },
        children: [
          {
            component: {
              name: 'HomeScreen',
              options: {
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  });
};

Navigation.events().registerAppLaunchedListener(start);

Navigation.events().registerNavigationButtonPressedListener(({buttonId}) => {
  if (buttonId === 'backButton') {
    Navigation.pop(WithApollo.currentScreen);
  }
});

const registerScreens = client => {
  Navigation.registerComponent('HomeScreen', () =>
    createApolloWrapperScreen(HomeScreen, client),
  );
  Navigation.registerComponent('CountryScreen', () =>
    createApolloWrapperScreen(CountryScreen, client),
  );
  Navigation.registerComponent('ContinentScreen', () =>
    createApolloWrapperScreen(ContinentScreen, client),
  );
};

Navigation.events().registerComponentDidAppearListener(
  ({componentId, componentName, passProps}) => {
    WithApollo.setCurrentScreen(componentId);
  },
);
