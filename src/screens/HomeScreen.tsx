import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {
  NavigationComponentProps,
  NavigationFunctionComponent,
} from 'react-native-navigation';
import styled from 'styled-components/native';
import {Loading, CountryItem, Error} from '~/components';
import {Country, useMobileCountriesLazyQuery} from '../graphql/types-generated';
import {getScreenStyle} from '../misc/getScreenStyle';

export const HomeScreen: NavigationFunctionComponent<NavigationComponentProps> = (
  props: NavigationComponentProps,
) => {
  const [getCountries, {data, loading, error}] = useMobileCountriesLazyQuery({
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    getData();

    return () => {};
  }, []);

  const getData = async () => {
    await getCountries();
  };

  const renderItem = ({item}: {item: Country}) => {
    return <CountryItem item={item} componentId={props.componentId} />;
  };

  const renderContent = () => {
    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <Error onTryAgain={getData} />;
    }

    return (
      <FlatList
        data={data?.countries}
        renderItem={renderItem}
        keyExtractor={el => el.code}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <Root>
      <InformationContainer>
        <Title>Infina</Title>
        <Subtitle>Doan Nguyen Hai Hoang</Subtitle>
      </InformationContainer>
      {renderContent()}
    </Root>
  );
};

const Root = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const InformationContainer = styled.View`
  margin-top: 64px;
  margin-bottom: 24px;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 24px;
`;

const Subtitle = styled.Text`
  font-size: 16px;
`;

HomeScreen.options = getScreenStyle();
//#endregion
