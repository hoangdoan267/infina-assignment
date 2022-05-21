import {Navigation} from 'react-native-navigation';
import {createApolloWrapperScreen} from '~/misc/functions';
import {ContinentScreen, CountryScreen, HomeScreen} from '~/screens';
import WithApollo from './src/graphql';
import {Linking} from 'react-native';

const startApp = async () => {
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
  getURL();
};

const getURL = async () => {
  const url = await Linking.getInitialURL();
  Linking.addEventListener('url', ({url}) => {
    handleDeepLinking(url);
  });
  if (url !== null) {
    handleDeepLinking(url);
  }
};

const handleDeepLinking = url => {
  const route = url.replace(/.*?:\/\//g, '');
  const routeType = route.split('/')[0];
  const routeId = route.split('/')[1];
  switch (routeType) {
    case 'country':
      Navigation.push(WithApollo.currentScreen, {
        component: {
          name: 'CountryScreen',
          passProps: {
            code: routeId,
          },
          options: {
            topBar: {
              visible: true,
            },
          },
        },
      });
      break;
    case 'continent':
      Navigation.push(WithApollo.currentScreen, {
        component: {
          name: 'ContinentScreen',
          passProps: {
            code: routeId,
          },
        },
      });
      break;

    default:
      break;
  }
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

Navigation.events().registerComponentWillAppearListener(
  ({componentId, componentName, passProps}) => {
    WithApollo.setCurrentScreen(componentId);
  },
);
