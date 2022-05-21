import React from 'react';
import {Navigation} from 'react-native-navigation';
import styled from 'styled-components/native';
import {Country} from '~/graphql/types-generated';

interface Props {
  item: Country;
  componentId: string;
}

export const CountryItem = (props: Props) => {
  const {item, componentId} = props;
  const {name, capital, emoji, code} = item;

  const onPress = () => {
    Navigation.push(componentId, {
      component: {
        name: 'CountryScreen',
        passProps: {
          code,
        },
        options: {
          topBar: {
            visible: true,
          },
        },
      },
    });
  };

  return (
    <ItemContainer activeOpacity={0.8} onPress={onPress}>
      <Flag>{emoji}</Flag>
      <CountryInformation>
        <Name>{name}</Name>
        <Capital>{capital}</Capital>
      </CountryInformation>
    </ItemContainer>
  );
};

const ItemContainer = styled.TouchableOpacity`
  margin: 0px 16px 8px;
  padding: 8px 16px;
  border-bottom-color: #dddddd;
  border-bottom-width: 1px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Flag = styled.Text`
  font-size: 48px;
`;

const CountryInformation = styled.View`
  margin-left: 16px;
`;

const Name = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const Capital = styled.Text`
  font-size: 14px;
  color: #888888;
`;
