import {gql} from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  {[SubKey in K]?: Maybe<T[SubKey]>};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  {[SubKey in K]: Maybe<T[SubKey]>};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _Any: any;
};

export type Continent = {
  __typename?: 'Continent';
  code: Scalars['ID'];
  countries: Array<Country>;
  name: Scalars['String'];
};

export type ContinentFilterInput = {
  code?: InputMaybe<StringQueryOperatorInput>;
};

export type Country = {
  __typename?: 'Country';
  capital?: Maybe<Scalars['String']>;
  code: Scalars['ID'];
  continent: Continent;
  currency?: Maybe<Scalars['String']>;
  emoji: Scalars['String'];
  emojiU: Scalars['String'];
  languages: Array<Language>;
  name: Scalars['String'];
  native: Scalars['String'];
  phone: Scalars['String'];
  states: Array<State>;
};

export type CountryFilterInput = {
  code?: InputMaybe<StringQueryOperatorInput>;
  continent?: InputMaybe<StringQueryOperatorInput>;
  currency?: InputMaybe<StringQueryOperatorInput>;
};

export type Language = {
  __typename?: 'Language';
  code: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  native?: Maybe<Scalars['String']>;
  rtl: Scalars['Boolean'];
};

export type LanguageFilterInput = {
  code?: InputMaybe<StringQueryOperatorInput>;
};

export type Query = {
  __typename?: 'Query';
  _entities: Array<Maybe<_Entity>>;
  _service: _Service;
  continent?: Maybe<Continent>;
  continents: Array<Continent>;
  countries: Array<Country>;
  country?: Maybe<Country>;
  language?: Maybe<Language>;
  languages: Array<Language>;
};

export type Query_EntitiesArgs = {
  representations: Array<Scalars['_Any']>;
};

export type QueryContinentArgs = {
  code: Scalars['ID'];
};

export type QueryContinentsArgs = {
  filter?: InputMaybe<ContinentFilterInput>;
};

export type QueryCountriesArgs = {
  filter?: InputMaybe<CountryFilterInput>;
};

export type QueryCountryArgs = {
  code: Scalars['ID'];
};

export type QueryLanguageArgs = {
  code: Scalars['ID'];
};

export type QueryLanguagesArgs = {
  filter?: InputMaybe<LanguageFilterInput>;
};

export type State = {
  __typename?: 'State';
  code?: Maybe<Scalars['String']>;
  country: Country;
  name: Scalars['String'];
};

export type StringQueryOperatorInput = {
  eq?: InputMaybe<Scalars['String']>;
  glob?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ne?: InputMaybe<Scalars['String']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  regex?: InputMaybe<Scalars['String']>;
};

export type _Entity = Continent | Country | Language;

export type _Service = {
  __typename?: '_Service';
  /** The sdl representing the federated service capabilities. Includes federation directives, removes federation types, and includes rest of full schema after schema directives have been applied */
  sdl?: Maybe<Scalars['String']>;
};

export type MobileCountriesQueryVariables = Exact<{
  filter?: Maybe<CountryFilterInput>;
}>;

export type MobileCountriesQuery = {
  __typename?: 'Query';
  countries: Array<{
    __typename?: 'Country';
    name: string;
    native: string;
    capital?: Maybe<string>;
    emoji: string;
    currency?: Maybe<string>;
    languages: Array<{
      __typename?: 'Language';
      code: string;
      name?: Maybe<string>;
    }>;
  }>;
};

export const MobileCountriesDocument = gql`
  query MobileCountries($filter: CountryFilterInput) {
    countries(filter: $filter) {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;

/**
 * __useMobileCountriesQuery__
 *
 * To run a query within a React component, call `useMobileCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMobileCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMobileCountriesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useMobileCountriesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MobileCountriesQuery,
    MobileCountriesQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<MobileCountriesQuery, MobileCountriesQueryVariables>(
    MobileCountriesDocument,
    options,
  );
}
export function useMobileCountriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MobileCountriesQuery,
    MobileCountriesQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<
    MobileCountriesQuery,
    MobileCountriesQueryVariables
  >(MobileCountriesDocument, options);
}
export type MobileCountriesQueryHookResult = ReturnType<
  typeof useMobileCountriesQuery
>;
export type MobileCountriesLazyQueryHookResult = ReturnType<
  typeof useMobileCountriesLazyQuery
>;
export type MobileCountriesQueryResult = Apollo.QueryResult<
  MobileCountriesQuery,
  MobileCountriesQueryVariables
>;
