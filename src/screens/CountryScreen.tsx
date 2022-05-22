import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  Navigation,
  NavigationComponentProps,
  NavigationFunctionComponent,
} from 'react-native-navigation';
import styled from 'styled-components/native';
import {Loading, Error} from '~/components';
import {useMobileCountryLazyQuery} from '../graphql/types-generated';
import {getScreenStyle} from '../misc/getScreenStyle';

type CountryScreenProps = NavigationComponentProps & {
  code: string;
};

export const CountryScreen: NavigationFunctionComponent<CountryScreenProps> = (
  props: CountryScreenProps,
) => {
  const {code, componentId} = props;

  const [getCountry, {data, loading, error}] = useMobileCountryLazyQuery({
    variables: {
      code,
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      Navigation.mergeOptions(props.componentId, {
        topBar: {
          title: {
            text: data?.country?.name,
          },
        },
      });
    },
  });

  const goToContinent = () => {
    Navigation.push(componentId, {
      component: {
        name: 'ContinentScreen',
        passProps: {
          code: data?.country?.continent.code,
        },
      },
    });
  };

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  const getData = async () => {
    await getCountry();
  };

  const renderContent = () => {
    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <Error onTryAgain={getData} />;
    }

    return (
      <>
        <InformationContainer>
          <Flag>{data?.country?.emoji}</Flag>
          <Title>{data?.country?.name}</Title>
        </InformationContainer>
        <InformationItem>
          <InformationName>Code</InformationName>
          <InformationData>{code}</InformationData>
        </InformationItem>
        <InformationItem>
          <InformationName>Capital</InformationName>
          <InformationData>{data?.country?.capital}</InformationData>
        </InformationItem>
        <InformationItem>
          <InformationName>Phone Code</InformationName>
          <InformationData>{`+${data?.country?.phone}`}</InformationData>
        </InformationItem>
        <TouchableOpacity activeOpacity={0.8} onPress={goToContinent}>
          <InformationItem>
            <InformationName>Continent</InformationName>
            <ContinentText>{`${data?.country?.continent.name}`}</ContinentText>
          </InformationItem>
        </TouchableOpacity>
      </>
    );
  };

  return <Root>{renderContent()}</Root>;
};

const Root = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const InformationContainer = styled.View`
  margin-bottom: 24px;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin-bottom: 24px;
`;

const Flag = styled.Text`
  font-size: 72px;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 24px;
`;

const InformationItem = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 8px;
  padding-bottom: 8px;
  border-bottom-color: #dddddd;
  border-bottom-width: 1px;
  margin: 0px 32px 16px;
`;

const InformationName = styled.Text`
  font-weight: bold;
`;

const InformationData = styled.Text`
  color: #888888;
`;

const ContinentText = styled.Text`
  color: #096dd9;
`;

CountryScreen.options = getScreenStyle();
//#endregion
