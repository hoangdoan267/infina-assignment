import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {
  Navigation,
  NavigationComponentProps,
  NavigationFunctionComponent,
} from 'react-native-navigation';
import styled from 'styled-components/native';
import {CountryItem} from '../components/CountryItem/CountryItem';
import {Country, useMobileContinentLazyQuery} from '../graphql/types-generated';
import {getScreenStyle} from '../misc/getScreenStyle';

type ContinentScreennProps = NavigationComponentProps & {
  code: string;
};

export const ContinentScreen: NavigationFunctionComponent<ContinentScreennProps> = (
  props: ContinentScreennProps,
) => {
  const {code} = props;

  useEffect(() => {
    getData();

    return () => {};
  }, []);

  const [getContinent, {data}] = useMobileContinentLazyQuery({
    variables: {
      code,
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      Navigation.mergeOptions(props.componentId, {
        topBar: {
          title: {
            text: data?.continent?.name,
          },
        },
      });
    },
  });

  const getData = async () => {
    await getContinent();
  };

  const renderItem = ({item}: {item: Country}) => {
    return <CountryItem item={item} componentId={props.componentId} />;
  };

  return (
    <Root>
      <InformationContainer>
        <InformationItem>
          <InformationName>Name</InformationName>
          <InformationData>{data?.continent?.name}</InformationData>
        </InformationItem>
        <InformationItem>
          <InformationName>Code</InformationName>
          <InformationData>{data?.continent?.code}</InformationData>
        </InformationItem>
        <InformationItem>
          <InformationName>Countries</InformationName>
        </InformationItem>
      </InformationContainer>

      <FlatList
        data={data?.continent?.countries}
        renderItem={renderItem}
        keyExtractor={el => el.code}
        showsVerticalScrollIndicator={false}
      />
    </Root>
  );
};

const Root = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const InformationContainer = styled.View`
  margin-top: 24px;
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

ContinentScreen.options = getScreenStyle();
//#endregion
