import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type CreateCryptoInput = {
  /** ティッカーシンボル */
  code: Scalars['String']['input'];
  /** 取得価格 */
  getPrice: Scalars['Float']['input'];
  /** 保有株数 */
  quantity: Scalars['Float']['input'];
};

export type CreateFixedIncomeAssetInput = {
  /** 資産名称 */
  code: Scalars['String']['input'];
  /** １年当たり配当利回り */
  dividendRate: Scalars['Float']['input'];
  /** 取得価格合計 */
  getPriceTotal: Scalars['Float']['input'];
  /** 配当支払い月 */
  paymentMonth: Array<Scalars['Int']['input']>;
  /** 購入時為替 */
  usdJpy?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateJapanFundInput = {
  /** ティッカーシンボル */
  code: Scalars['String']['input'];
  /** 取得価格 */
  getPrice: Scalars['Float']['input'];
  /** 取得価格総額 */
  getPriceTotal: Scalars['Float']['input'];
  /** 銘柄名 */
  name: Scalars['String']['input'];
};

export type CreateUsStockInput = {
  /** ティッカーシンボル */
  code: Scalars['String']['input'];
  /** 取得価格 */
  getPrice: Scalars['Float']['input'];
  /** 保有株数 */
  quantity: Scalars['Float']['input'];
  /** セクター */
  sector: Scalars['String']['input'];
  /** 購入時為替 */
  usdJpy: Scalars['Float']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Crypto = {
  __typename?: 'Crypto';
  /** ティッカーシンボル */
  code: Scalars['String']['output'];
  /** 現在価格 */
  currentPrice: Scalars['Float']['output'];
  /** 取得価格 */
  getPrice: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  /** 保有株数 */
  quantity: Scalars['Float']['output'];
};

export type FixedIncomeAsset = {
  __typename?: 'FixedIncomeAsset';
  /** 資産名称 */
  code: Scalars['String']['output'];
  /** １年当たり配当利回り */
  dividendRate: Scalars['Float']['output'];
  /** 取得価格合計 */
  getPriceTotal: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  /** 配当支払い月 */
  paymentMonth: Array<Scalars['Int']['output']>;
  /** 購入時為替 */
  usdJpy?: Maybe<Scalars['Float']['output']>;
};

export type JapanFund = {
  __typename?: 'JapanFund';
  /** ティッカーシンボル */
  code: Scalars['String']['output'];
  /** 現在価格 */
  currentPrice: Scalars['Float']['output'];
  /** 取得価格 */
  getPrice: Scalars['Float']['output'];
  /** 取得価格総額 */
  getPriceTotal: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  /** 銘柄名 */
  name: Scalars['String']['output'];
};

export type MarketPrice = {
  __typename?: 'MarketPrice';
  /** 現在価格 */
  currentPrice: Scalars['Float']['output'];
  /** 変化率 */
  currentRate: Scalars['Float']['output'];
  /** 変化額 */
  priceGets: Scalars['Float']['output'];
  /** ティッカーシンボル */
  ticker: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCrypto: Crypto;
  createFixedIncomeAsset: FixedIncomeAsset;
  createJapanFund: JapanFund;
  createUsStock: UsStock;
  createUser?: Maybe<User>;
};


export type MutationCreateCryptoArgs = {
  input: CreateCryptoInput;
};


export type MutationCreateFixedIncomeAssetArgs = {
  input: CreateFixedIncomeAssetInput;
};


export type MutationCreateJapanFundArgs = {
  input: CreateJapanFundInput;
};


export type MutationCreateUsStockArgs = {
  input: CreateUsStockInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type Query = {
  __typename?: 'Query';
  cryptos?: Maybe<Array<Crypto>>;
  currentUsdJpy: Scalars['Float']['output'];
  fixedIncomeAssets?: Maybe<Array<FixedIncomeAsset>>;
  japanFunds?: Maybe<Array<JapanFund>>;
  marketPrices: Array<MarketPrice>;
  totalAssets?: Maybe<Array<TotalAsset>>;
  usStocks?: Maybe<Array<UsStock>>;
  user?: Maybe<User>;
};


export type QueryMarketPricesArgs = {
  tickerList: Array<InputMaybe<Scalars['String']['input']>>;
};


export type QueryTotalAssetsArgs = {
  day: Scalars['Int']['input'];
};

export type TotalAsset = {
  __typename?: 'TotalAsset';
  /** 保有円 */
  cashJpy: Scalars['Float']['output'];
  /** 保有ドル */
  cashUsd: Scalars['Float']['output'];
  /** 登録日時 */
  createdAt: Scalars['Date']['output'];
  /** 保有仮想通貨 */
  crypto: Scalars['Float']['output'];
  /** 保有固定利回り資産 */
  fixedIncomeAsset: Scalars['Float']['output'];
  /** 保有投資信託 */
  fund: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  /** 保有株式 */
  stock: Scalars['Float']['output'];
};

export type UpdateUsStockInput = {
  /** 現在価格 */
  currentPrice: Scalars['Float']['input'];
  /** 変化率 */
  currentRate: Scalars['Float']['input'];
  /** 取得価格 */
  getPrice: Scalars['Float']['input'];
  /** id */
  id: Scalars['ID']['input'];
  /** 変化額 */
  priceGets: Scalars['Float']['input'];
  /** 保有株数 */
  quantity: Scalars['Float']['input'];
  /** 購入時為替 */
  usdJpy: Scalars['Float']['input'];
};

export type UsStock = {
  __typename?: 'UsStock';
  /** ティッカーシンボル */
  code: Scalars['String']['output'];
  /** 現在価格 */
  currentPrice: Scalars['Float']['output'];
  /** 変化率 */
  currentRate: Scalars['Float']['output'];
  /** １年当たり配当 */
  dividend: Scalars['Float']['output'];
  /** 取得価格 */
  getPrice: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  /** 変化額 */
  priceGets: Scalars['Float']['output'];
  /** 保有株数 */
  quantity: Scalars['Float']['output'];
  /** セクター */
  sector: Scalars['String']['output'];
  /** 購入時為替 */
  usdJpy: Scalars['Float']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
};

export type UsStocksQueryVariables = Exact<{ [key: string]: never; }>;


export type UsStocksQuery = { __typename?: 'Query', usStocks?: Array<{ __typename?: 'UsStock', id: string, code: string, dividend: number, getPrice: number, quantity: number, sector: string, usdJpy: number, currentPrice: number, priceGets: number, currentRate: number }> | null };

export type CurrentUsdJpyQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUsdJpyQuery = { __typename?: 'Query', currentUsdJpy: number };

export type CryptosQueryVariables = Exact<{ [key: string]: never; }>;


export type CryptosQuery = { __typename?: 'Query', cryptos?: Array<{ __typename?: 'Crypto', id: string, code: string, quantity: number, getPrice: number, currentPrice: number }> | null };

export type FixedIncomeAssetsQueryVariables = Exact<{ [key: string]: never; }>;


export type FixedIncomeAssetsQuery = { __typename?: 'Query', fixedIncomeAssets?: Array<{ __typename?: 'FixedIncomeAsset', id: string, code: string, getPriceTotal: number, dividendRate: number, usdJpy?: number | null, paymentMonth: Array<number> }> | null };

export type JapanFundsQueryVariables = Exact<{ [key: string]: never; }>;


export type JapanFundsQuery = { __typename?: 'Query', japanFunds?: Array<{ __typename?: 'JapanFund', id: string, code: string, name: string, getPrice: number, getPriceTotal: number, currentPrice: number }> | null };

export type CreateUsStockMutationVariables = Exact<{
  input: CreateUsStockInput;
}>;


export type CreateUsStockMutation = { __typename?: 'Mutation', createUsStock: { __typename?: 'UsStock', id: string, code: string, getPrice: number, dividend: number, quantity: number, sector: string, usdJpy: number, currentPrice: number, priceGets: number, currentRate: number } };

export type CreateCryptoMutationVariables = Exact<{
  input: CreateCryptoInput;
}>;


export type CreateCryptoMutation = { __typename?: 'Mutation', createCrypto: { __typename?: 'Crypto', id: string, code: string, getPrice: number, quantity: number, currentPrice: number } };

export type CreateFixedIncomeAssetMutationVariables = Exact<{
  input: CreateFixedIncomeAssetInput;
}>;


export type CreateFixedIncomeAssetMutation = { __typename?: 'Mutation', createFixedIncomeAsset: { __typename?: 'FixedIncomeAsset', id: string, code: string, getPriceTotal: number, dividendRate: number, usdJpy?: number | null, paymentMonth: Array<number> } };

export type CreateJapanFundMutationVariables = Exact<{
  input: CreateJapanFundInput;
}>;


export type CreateJapanFundMutation = { __typename?: 'Mutation', createJapanFund: { __typename?: 'JapanFund', id: string, code: string, name: string, getPrice: number, getPriceTotal: number, currentPrice: number } };

export type MarketPricesQueryVariables = Exact<{ [key: string]: never; }>;


export type MarketPricesQuery = { __typename?: 'Query', marketPrices: Array<{ __typename?: 'MarketPrice', ticker: string, currentPrice: number, currentRate: number, priceGets: number }> };

export type TotalAssetsQueryVariables = Exact<{
  day: Scalars['Int']['input'];
}>;


export type TotalAssetsQuery = { __typename?: 'Query', totalAssets?: Array<{ __typename?: 'TotalAsset', id: string, cashJpy: number, cashUsd: number, stock: number, fund: number, crypto: number, fixedIncomeAsset: number, createdAt: any }> | null };


export const UsStocksDocument = gql`
    query usStocks {
  usStocks {
    id
    code
    dividend
    getPrice
    quantity
    sector
    usdJpy
    currentPrice
    priceGets
    currentRate
  }
}
    `;

/**
 * __useUsStocksQuery__
 *
 * To run a query within a React component, call `useUsStocksQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsStocksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsStocksQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsStocksQuery(baseOptions?: Apollo.QueryHookOptions<UsStocksQuery, UsStocksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsStocksQuery, UsStocksQueryVariables>(UsStocksDocument, options);
      }
export function useUsStocksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsStocksQuery, UsStocksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsStocksQuery, UsStocksQueryVariables>(UsStocksDocument, options);
        }
export function useUsStocksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UsStocksQuery, UsStocksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UsStocksQuery, UsStocksQueryVariables>(UsStocksDocument, options);
        }
export type UsStocksQueryHookResult = ReturnType<typeof useUsStocksQuery>;
export type UsStocksLazyQueryHookResult = ReturnType<typeof useUsStocksLazyQuery>;
export type UsStocksSuspenseQueryHookResult = ReturnType<typeof useUsStocksSuspenseQuery>;
export type UsStocksQueryResult = Apollo.QueryResult<UsStocksQuery, UsStocksQueryVariables>;
export const CurrentUsdJpyDocument = gql`
    query CurrentUsdJpy {
  currentUsdJpy
}
    `;

/**
 * __useCurrentUsdJpyQuery__
 *
 * To run a query within a React component, call `useCurrentUsdJpyQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUsdJpyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUsdJpyQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUsdJpyQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUsdJpyQuery, CurrentUsdJpyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUsdJpyQuery, CurrentUsdJpyQueryVariables>(CurrentUsdJpyDocument, options);
      }
export function useCurrentUsdJpyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUsdJpyQuery, CurrentUsdJpyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUsdJpyQuery, CurrentUsdJpyQueryVariables>(CurrentUsdJpyDocument, options);
        }
export function useCurrentUsdJpySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CurrentUsdJpyQuery, CurrentUsdJpyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CurrentUsdJpyQuery, CurrentUsdJpyQueryVariables>(CurrentUsdJpyDocument, options);
        }
export type CurrentUsdJpyQueryHookResult = ReturnType<typeof useCurrentUsdJpyQuery>;
export type CurrentUsdJpyLazyQueryHookResult = ReturnType<typeof useCurrentUsdJpyLazyQuery>;
export type CurrentUsdJpySuspenseQueryHookResult = ReturnType<typeof useCurrentUsdJpySuspenseQuery>;
export type CurrentUsdJpyQueryResult = Apollo.QueryResult<CurrentUsdJpyQuery, CurrentUsdJpyQueryVariables>;
export const CryptosDocument = gql`
    query Cryptos {
  cryptos {
    id
    code
    quantity
    getPrice
    currentPrice
  }
}
    `;

/**
 * __useCryptosQuery__
 *
 * To run a query within a React component, call `useCryptosQuery` and pass it any options that fit your needs.
 * When your component renders, `useCryptosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCryptosQuery({
 *   variables: {
 *   },
 * });
 */
export function useCryptosQuery(baseOptions?: Apollo.QueryHookOptions<CryptosQuery, CryptosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CryptosQuery, CryptosQueryVariables>(CryptosDocument, options);
      }
export function useCryptosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CryptosQuery, CryptosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CryptosQuery, CryptosQueryVariables>(CryptosDocument, options);
        }
export function useCryptosSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CryptosQuery, CryptosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CryptosQuery, CryptosQueryVariables>(CryptosDocument, options);
        }
export type CryptosQueryHookResult = ReturnType<typeof useCryptosQuery>;
export type CryptosLazyQueryHookResult = ReturnType<typeof useCryptosLazyQuery>;
export type CryptosSuspenseQueryHookResult = ReturnType<typeof useCryptosSuspenseQuery>;
export type CryptosQueryResult = Apollo.QueryResult<CryptosQuery, CryptosQueryVariables>;
export const FixedIncomeAssetsDocument = gql`
    query FixedIncomeAssets {
  fixedIncomeAssets {
    id
    code
    getPriceTotal
    dividendRate
    usdJpy
    paymentMonth
  }
}
    `;

/**
 * __useFixedIncomeAssetsQuery__
 *
 * To run a query within a React component, call `useFixedIncomeAssetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFixedIncomeAssetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFixedIncomeAssetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFixedIncomeAssetsQuery(baseOptions?: Apollo.QueryHookOptions<FixedIncomeAssetsQuery, FixedIncomeAssetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FixedIncomeAssetsQuery, FixedIncomeAssetsQueryVariables>(FixedIncomeAssetsDocument, options);
      }
export function useFixedIncomeAssetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FixedIncomeAssetsQuery, FixedIncomeAssetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FixedIncomeAssetsQuery, FixedIncomeAssetsQueryVariables>(FixedIncomeAssetsDocument, options);
        }
export function useFixedIncomeAssetsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FixedIncomeAssetsQuery, FixedIncomeAssetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FixedIncomeAssetsQuery, FixedIncomeAssetsQueryVariables>(FixedIncomeAssetsDocument, options);
        }
export type FixedIncomeAssetsQueryHookResult = ReturnType<typeof useFixedIncomeAssetsQuery>;
export type FixedIncomeAssetsLazyQueryHookResult = ReturnType<typeof useFixedIncomeAssetsLazyQuery>;
export type FixedIncomeAssetsSuspenseQueryHookResult = ReturnType<typeof useFixedIncomeAssetsSuspenseQuery>;
export type FixedIncomeAssetsQueryResult = Apollo.QueryResult<FixedIncomeAssetsQuery, FixedIncomeAssetsQueryVariables>;
export const JapanFundsDocument = gql`
    query JapanFunds {
  japanFunds {
    id
    code
    name
    getPrice
    getPriceTotal
    currentPrice
  }
}
    `;

/**
 * __useJapanFundsQuery__
 *
 * To run a query within a React component, call `useJapanFundsQuery` and pass it any options that fit your needs.
 * When your component renders, `useJapanFundsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJapanFundsQuery({
 *   variables: {
 *   },
 * });
 */
export function useJapanFundsQuery(baseOptions?: Apollo.QueryHookOptions<JapanFundsQuery, JapanFundsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<JapanFundsQuery, JapanFundsQueryVariables>(JapanFundsDocument, options);
      }
export function useJapanFundsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<JapanFundsQuery, JapanFundsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<JapanFundsQuery, JapanFundsQueryVariables>(JapanFundsDocument, options);
        }
export function useJapanFundsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<JapanFundsQuery, JapanFundsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<JapanFundsQuery, JapanFundsQueryVariables>(JapanFundsDocument, options);
        }
export type JapanFundsQueryHookResult = ReturnType<typeof useJapanFundsQuery>;
export type JapanFundsLazyQueryHookResult = ReturnType<typeof useJapanFundsLazyQuery>;
export type JapanFundsSuspenseQueryHookResult = ReturnType<typeof useJapanFundsSuspenseQuery>;
export type JapanFundsQueryResult = Apollo.QueryResult<JapanFundsQuery, JapanFundsQueryVariables>;
export const CreateUsStockDocument = gql`
    mutation CreateUsStock($input: CreateUsStockInput!) {
  createUsStock(input: $input) {
    id
    code
    getPrice
    dividend
    quantity
    sector
    usdJpy
    currentPrice
    priceGets
    currentRate
  }
}
    `;
export type CreateUsStockMutationFn = Apollo.MutationFunction<CreateUsStockMutation, CreateUsStockMutationVariables>;

/**
 * __useCreateUsStockMutation__
 *
 * To run a mutation, you first call `useCreateUsStockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUsStockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUsStockMutation, { data, loading, error }] = useCreateUsStockMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUsStockMutation(baseOptions?: Apollo.MutationHookOptions<CreateUsStockMutation, CreateUsStockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUsStockMutation, CreateUsStockMutationVariables>(CreateUsStockDocument, options);
      }
export type CreateUsStockMutationHookResult = ReturnType<typeof useCreateUsStockMutation>;
export type CreateUsStockMutationResult = Apollo.MutationResult<CreateUsStockMutation>;
export type CreateUsStockMutationOptions = Apollo.BaseMutationOptions<CreateUsStockMutation, CreateUsStockMutationVariables>;
export const CreateCryptoDocument = gql`
    mutation CreateCrypto($input: CreateCryptoInput!) {
  createCrypto(input: $input) {
    id
    code
    getPrice
    quantity
    currentPrice
  }
}
    `;
export type CreateCryptoMutationFn = Apollo.MutationFunction<CreateCryptoMutation, CreateCryptoMutationVariables>;

/**
 * __useCreateCryptoMutation__
 *
 * To run a mutation, you first call `useCreateCryptoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCryptoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCryptoMutation, { data, loading, error }] = useCreateCryptoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCryptoMutation(baseOptions?: Apollo.MutationHookOptions<CreateCryptoMutation, CreateCryptoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCryptoMutation, CreateCryptoMutationVariables>(CreateCryptoDocument, options);
      }
export type CreateCryptoMutationHookResult = ReturnType<typeof useCreateCryptoMutation>;
export type CreateCryptoMutationResult = Apollo.MutationResult<CreateCryptoMutation>;
export type CreateCryptoMutationOptions = Apollo.BaseMutationOptions<CreateCryptoMutation, CreateCryptoMutationVariables>;
export const CreateFixedIncomeAssetDocument = gql`
    mutation CreateFixedIncomeAsset($input: CreateFixedIncomeAssetInput!) {
  createFixedIncomeAsset(input: $input) {
    id
    code
    getPriceTotal
    dividendRate
    usdJpy
    paymentMonth
  }
}
    `;
export type CreateFixedIncomeAssetMutationFn = Apollo.MutationFunction<CreateFixedIncomeAssetMutation, CreateFixedIncomeAssetMutationVariables>;

/**
 * __useCreateFixedIncomeAssetMutation__
 *
 * To run a mutation, you first call `useCreateFixedIncomeAssetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFixedIncomeAssetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFixedIncomeAssetMutation, { data, loading, error }] = useCreateFixedIncomeAssetMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFixedIncomeAssetMutation(baseOptions?: Apollo.MutationHookOptions<CreateFixedIncomeAssetMutation, CreateFixedIncomeAssetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFixedIncomeAssetMutation, CreateFixedIncomeAssetMutationVariables>(CreateFixedIncomeAssetDocument, options);
      }
export type CreateFixedIncomeAssetMutationHookResult = ReturnType<typeof useCreateFixedIncomeAssetMutation>;
export type CreateFixedIncomeAssetMutationResult = Apollo.MutationResult<CreateFixedIncomeAssetMutation>;
export type CreateFixedIncomeAssetMutationOptions = Apollo.BaseMutationOptions<CreateFixedIncomeAssetMutation, CreateFixedIncomeAssetMutationVariables>;
export const CreateJapanFundDocument = gql`
    mutation CreateJapanFund($input: CreateJapanFundInput!) {
  createJapanFund(input: $input) {
    id
    code
    name
    getPrice
    getPriceTotal
    currentPrice
  }
}
    `;
export type CreateJapanFundMutationFn = Apollo.MutationFunction<CreateJapanFundMutation, CreateJapanFundMutationVariables>;

/**
 * __useCreateJapanFundMutation__
 *
 * To run a mutation, you first call `useCreateJapanFundMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateJapanFundMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createJapanFundMutation, { data, loading, error }] = useCreateJapanFundMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateJapanFundMutation(baseOptions?: Apollo.MutationHookOptions<CreateJapanFundMutation, CreateJapanFundMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateJapanFundMutation, CreateJapanFundMutationVariables>(CreateJapanFundDocument, options);
      }
export type CreateJapanFundMutationHookResult = ReturnType<typeof useCreateJapanFundMutation>;
export type CreateJapanFundMutationResult = Apollo.MutationResult<CreateJapanFundMutation>;
export type CreateJapanFundMutationOptions = Apollo.BaseMutationOptions<CreateJapanFundMutation, CreateJapanFundMutationVariables>;
export const MarketPricesDocument = gql`
    query marketPrices {
  marketPrices(
    tickerList: ["SPY", "XLE", "XLK", "SMH", "IBB", "XLV", "XLP", "XLU", "XLB", "XLY", "XLF", "XLI", "XLRE", "XME", "XRT", "ITA", "ICLN", "AGG", "GLD", "DBA"]
  ) {
    ticker
    currentPrice
    currentRate
    priceGets
  }
}
    `;

/**
 * __useMarketPricesQuery__
 *
 * To run a query within a React component, call `useMarketPricesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMarketPricesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMarketPricesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMarketPricesQuery(baseOptions?: Apollo.QueryHookOptions<MarketPricesQuery, MarketPricesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MarketPricesQuery, MarketPricesQueryVariables>(MarketPricesDocument, options);
      }
export function useMarketPricesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MarketPricesQuery, MarketPricesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MarketPricesQuery, MarketPricesQueryVariables>(MarketPricesDocument, options);
        }
export function useMarketPricesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MarketPricesQuery, MarketPricesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MarketPricesQuery, MarketPricesQueryVariables>(MarketPricesDocument, options);
        }
export type MarketPricesQueryHookResult = ReturnType<typeof useMarketPricesQuery>;
export type MarketPricesLazyQueryHookResult = ReturnType<typeof useMarketPricesLazyQuery>;
export type MarketPricesSuspenseQueryHookResult = ReturnType<typeof useMarketPricesSuspenseQuery>;
export type MarketPricesQueryResult = Apollo.QueryResult<MarketPricesQuery, MarketPricesQueryVariables>;
export const TotalAssetsDocument = gql`
    query TotalAssets($day: Int!) {
  totalAssets(day: $day) {
    id
    cashJpy
    cashUsd
    stock
    fund
    crypto
    fixedIncomeAsset
    createdAt
  }
}
    `;

/**
 * __useTotalAssetsQuery__
 *
 * To run a query within a React component, call `useTotalAssetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTotalAssetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTotalAssetsQuery({
 *   variables: {
 *      day: // value for 'day'
 *   },
 * });
 */
export function useTotalAssetsQuery(baseOptions: Apollo.QueryHookOptions<TotalAssetsQuery, TotalAssetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TotalAssetsQuery, TotalAssetsQueryVariables>(TotalAssetsDocument, options);
      }
export function useTotalAssetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TotalAssetsQuery, TotalAssetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TotalAssetsQuery, TotalAssetsQueryVariables>(TotalAssetsDocument, options);
        }
export function useTotalAssetsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TotalAssetsQuery, TotalAssetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TotalAssetsQuery, TotalAssetsQueryVariables>(TotalAssetsDocument, options);
        }
export type TotalAssetsQueryHookResult = ReturnType<typeof useTotalAssetsQuery>;
export type TotalAssetsLazyQueryHookResult = ReturnType<typeof useTotalAssetsLazyQuery>;
export type TotalAssetsSuspenseQueryHookResult = ReturnType<typeof useTotalAssetsSuspenseQuery>;
export type TotalAssetsQueryResult = Apollo.QueryResult<TotalAssetsQuery, TotalAssetsQueryVariables>;