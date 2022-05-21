import React, {useEffect} from 'react';
import {Button, Text} from 'react-native';
import {NavigationFunctionComponent} from 'react-native-navigation';
import styled from 'styled-components/native';
import {useMobileCountriesLazyQuery} from './graphql/types-generated';
import {getScreenStyle} from './misc/getScreenStyle';

export const HomeScreen: NavigationFunctionComponent<Props> = () => {
  const [
    getCountries,
    {data, loading, networkStatus},
  ] = useMobileCountriesLazyQuery({
    fetchPolicy: 'network-only',
  });

  const getData = async () => {
    try {
      console.log('loading', loading);
      console.log(networkStatus);
      await getCountries();

      // console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      console.log('finally');
    }
  };
  console.log(data);
  console.log('loading', loading);

  return (
    <Root>
      <Title>Welcome to RN lab!</Title>
      <Text>Your journey starts here</Text>
      <Button title="aaaaa" onPress={getData}></Button>
    </Root>
  );
};

//#region
type Props = {};

const Root = styled.View`
  flex: 1;
  background-color: #e6eeff;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

HomeScreen.options = getScreenStyle();
//#endregion
