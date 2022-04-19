import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Categories = {
  __typename?: 'Categories';
  data: Array<Scalars['String']>;
};

export type Chat = {
  __typename?: 'Chat';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  peersIds: Array<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type ChatMessage = {
  __typename?: 'ChatMessage';
  chatId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  viewedBy: Array<Scalars['String']>;
};

export type City = {
  __typename?: 'City';
  countryCode: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  translatedName: Scalars['String'];
};

export type Country = {
  __typename?: 'Country';
  countryCode: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  translatedName: Scalars['String'];
};

export type CreateProductInput = {
  categoryName: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  price?: InputMaybe<Scalars['Int']>;
};

export type CreateUserInput = {
  about?: InputMaybe<Scalars['String']>;
  cityId?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  access_token: Scalars['String'];
  refresh_token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProduct: Product;
  createSeller: User;
  deleteProduct: Product;
  updateProduct: Product;
  updateUser: User;
};


export type MutationCreateProductArgs = {
  createProductInput: CreateProductInput;
};


export type MutationCreateSellerArgs = {
  input: CreateUserInput;
};


export type MutationDeleteProductArgs = {
  id: Scalars['String'];
};


export type MutationUpdateProductArgs = {
  id: Scalars['String'];
  updateProductInput: UpdateProductInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
  userId: Scalars['String'];
};

export type PaginatedChatMessages = {
  __typename?: 'PaginatedChatMessages';
  data: Array<ChatMessage>;
  totalResultsCount: Scalars['Int'];
};

export type PaginatedChats = {
  __typename?: 'PaginatedChats';
  data: Array<Chat>;
  totalResultsCount: Scalars['Int'];
};

export type PaginatedCities = {
  __typename?: 'PaginatedCities';
  data: Array<City>;
  totalResultsCount: Scalars['Int'];
};

export type PaginatedCountries = {
  __typename?: 'PaginatedCountries';
  data: Array<Country>;
  totalResultsCount: Scalars['Int'];
};

export type PaginatedProducts = {
  __typename?: 'PaginatedProducts';
  data: Array<Product>;
  totalResultsCount: Scalars['Int'];
};

export type Pagination = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type Product = {
  __typename?: 'Product';
  categoryName: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  imagesIds: Array<Scalars['String']>;
  imagesUrls: Array<Scalars['String']>;
  name: Scalars['String'];
  price: Scalars['Int'];
  userId: Scalars['String'];
};

export type ProductFilters = {
  categoryName?: InputMaybe<Scalars['String']>;
  priceRange?: InputMaybe<Range>;
};

export type ProductInput = {
  categoryName: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  imagesIds: Array<Scalars['String']>;
  imagesUrls: Array<Scalars['String']>;
  name: Scalars['String'];
  price?: InputMaybe<Scalars['Int']>;
  userId: Scalars['String'];
};

export type ProductSorting = {
  createdAt?: InputMaybe<SortingOrder>;
  name?: InputMaybe<SortingOrder>;
  price?: InputMaybe<SortingOrder>;
};

export type Query = {
  __typename?: 'Query';
  categories: Categories;
  chat: Chat;
  chats: PaginatedChats;
  cities: PaginatedCities;
  city: City;
  countries: PaginatedCountries;
  country: Country;
  lastMessage?: Maybe<ChatMessage>;
  loginWithUsername: LoginResponse;
  messages: PaginatedChatMessages;
  notViewedMessagesPerChat: Scalars['Int'];
  notViewedMessagesTotal: Scalars['Int'];
  product: Product;
  products: PaginatedProducts;
  refreshAccessToken: LoginResponse;
  user: User;
};


export type QueryChatArgs = {
  chatId: Scalars['String'];
};


export type QueryChatsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryCitiesArgs = {
  query: SearchManyQuery;
};


export type QueryCityArgs = {
  query: SearchSingleQuery;
};


export type QueryCountriesArgs = {
  query: SearchManyQuery;
};


export type QueryCountryArgs = {
  query: SearchSingleQuery;
};


export type QueryLastMessageArgs = {
  chatId: Scalars['String'];
};


export type QueryLoginWithUsernameArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type QueryMessagesArgs = {
  chatId: Scalars['String'];
  pagination?: InputMaybe<Pagination>;
};


export type QueryNotViewedMessagesPerChatArgs = {
  chatId: Scalars['String'];
};


export type QueryProductArgs = {
  id: Scalars['String'];
};


export type QueryProductsArgs = {
  filtering?: InputMaybe<ProductFilters>;
  fuzzySearch?: InputMaybe<Scalars['String']>;
  pagination?: InputMaybe<Pagination>;
  sorting?: InputMaybe<ProductSorting>;
};


export type QueryRefreshAccessTokenArgs = {
  refreshToken: Scalars['String'];
};


export type QueryUserArgs = {
  userId: Scalars['String'];
};

export type Range = {
  max: Scalars['Int'];
  min?: InputMaybe<Scalars['Int']>;
};

export type SearchManyQuery = {
  countryCode?: InputMaybe<CountryCodes>;
  languageCode?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sorting?: InputMaybe<Scalars['String']>;
};

export type SearchSingleQuery = {
  id: Scalars['Int'];
  languageCode?: InputMaybe<Scalars['String']>;
};

export enum SortingOrder {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING'
}

export type UpdateProductInput = {
  categoryName?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Int']>;
};

export type UpdateUserInput = {
  about?: InputMaybe<Scalars['String']>;
  cityId?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  about?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  cityId?: Maybe<Scalars['Int']>;
  countryCode?: Maybe<CountryCodes>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  products: Array<Product>;
  roles: Array<UserRolesEnum>;
};

export enum UserRolesEnum {
  Admin = 'ADMIN',
  Seller = 'SELLER',
  SuperAdmin = 'SUPER_ADMIN'
}

export enum CountryCodes {
  Ad = 'AD',
  Ae = 'AE',
  Af = 'AF',
  Ag = 'AG',
  Ai = 'AI',
  Al = 'AL',
  Am = 'AM',
  Ao = 'AO',
  Aq = 'AQ',
  Ar = 'AR',
  As = 'AS',
  At = 'AT',
  Au = 'AU',
  Aw = 'AW',
  Ax = 'AX',
  Az = 'AZ',
  Ba = 'BA',
  Bb = 'BB',
  Bd = 'BD',
  Be = 'BE',
  Bf = 'BF',
  Bg = 'BG',
  Bh = 'BH',
  Bi = 'BI',
  Bj = 'BJ',
  Bl = 'BL',
  Bm = 'BM',
  Bn = 'BN',
  Bo = 'BO',
  Bq = 'BQ',
  Br = 'BR',
  Bs = 'BS',
  Bt = 'BT',
  Bv = 'BV',
  Bw = 'BW',
  By = 'BY',
  Bz = 'BZ',
  Ca = 'CA',
  Cc = 'CC',
  Cd = 'CD',
  Cf = 'CF',
  Cg = 'CG',
  Ch = 'CH',
  Ci = 'CI',
  Ck = 'CK',
  Cl = 'CL',
  Cm = 'CM',
  Cn = 'CN',
  Co = 'CO',
  Cr = 'CR',
  Cu = 'CU',
  Cv = 'CV',
  Cw = 'CW',
  Cx = 'CX',
  Cy = 'CY',
  Cz = 'CZ',
  De = 'DE',
  Dj = 'DJ',
  Dk = 'DK',
  Dm = 'DM',
  Do = 'DO',
  Dz = 'DZ',
  Ec = 'EC',
  Ee = 'EE',
  Eg = 'EG',
  Eh = 'EH',
  Er = 'ER',
  Es = 'ES',
  Et = 'ET',
  Fi = 'FI',
  Fj = 'FJ',
  Fk = 'FK',
  Fm = 'FM',
  Fo = 'FO',
  Fr = 'FR',
  Ga = 'GA',
  Gb = 'GB',
  Gd = 'GD',
  Ge = 'GE',
  Gf = 'GF',
  Gg = 'GG',
  Gh = 'GH',
  Gi = 'GI',
  Gl = 'GL',
  Gm = 'GM',
  Gn = 'GN',
  Gp = 'GP',
  Gq = 'GQ',
  Gr = 'GR',
  Gs = 'GS',
  Gt = 'GT',
  Gu = 'GU',
  Gw = 'GW',
  Gy = 'GY',
  Hk = 'HK',
  Hm = 'HM',
  Hn = 'HN',
  Hr = 'HR',
  Ht = 'HT',
  Hu = 'HU',
  Id = 'ID',
  Ie = 'IE',
  Il = 'IL',
  Im = 'IM',
  In = 'IN',
  Io = 'IO',
  Iq = 'IQ',
  Ir = 'IR',
  Is = 'IS',
  It = 'IT',
  Je = 'JE',
  Jm = 'JM',
  Jo = 'JO',
  Jp = 'JP',
  Ke = 'KE',
  Kg = 'KG',
  Kh = 'KH',
  Ki = 'KI',
  Km = 'KM',
  Kn = 'KN',
  Kp = 'KP',
  Kr = 'KR',
  Kw = 'KW',
  Ky = 'KY',
  Kz = 'KZ',
  La = 'LA',
  Lb = 'LB',
  Lc = 'LC',
  Li = 'LI',
  Lk = 'LK',
  Lr = 'LR',
  Ls = 'LS',
  Lt = 'LT',
  Lu = 'LU',
  Lv = 'LV',
  Ly = 'LY',
  Ma = 'MA',
  Mc = 'MC',
  Md = 'MD',
  Me = 'ME',
  Mf = 'MF',
  Mg = 'MG',
  Mh = 'MH',
  Mk = 'MK',
  Ml = 'ML',
  Mm = 'MM',
  Mn = 'MN',
  Mo = 'MO',
  Mp = 'MP',
  Mq = 'MQ',
  Mr = 'MR',
  Ms = 'MS',
  Mt = 'MT',
  Mu = 'MU',
  Mv = 'MV',
  Mw = 'MW',
  Mx = 'MX',
  My = 'MY',
  Mz = 'MZ',
  Na = 'NA',
  Nc = 'NC',
  Ne = 'NE',
  Nf = 'NF',
  Ng = 'NG',
  Ni = 'NI',
  Nl = 'NL',
  No = 'NO',
  Np = 'NP',
  Nr = 'NR',
  Nu = 'NU',
  Nz = 'NZ',
  Om = 'OM',
  Pa = 'PA',
  Pe = 'PE',
  Pf = 'PF',
  Pg = 'PG',
  Ph = 'PH',
  Pk = 'PK',
  Pl = 'PL',
  Pm = 'PM',
  Pn = 'PN',
  Pr = 'PR',
  Ps = 'PS',
  Pt = 'PT',
  Pw = 'PW',
  Py = 'PY',
  Qa = 'QA',
  Re = 'RE',
  Ro = 'RO',
  Rs = 'RS',
  Ru = 'RU',
  Rw = 'RW',
  Sa = 'SA',
  Sb = 'SB',
  Sc = 'SC',
  Sd = 'SD',
  Se = 'SE',
  Sg = 'SG',
  Sh = 'SH',
  Si = 'SI',
  Sj = 'SJ',
  Sk = 'SK',
  Sl = 'SL',
  Sm = 'SM',
  Sn = 'SN',
  So = 'SO',
  Sr = 'SR',
  Ss = 'SS',
  St = 'ST',
  Sv = 'SV',
  Sx = 'SX',
  Sy = 'SY',
  Sz = 'SZ',
  Tc = 'TC',
  Td = 'TD',
  Tf = 'TF',
  Tg = 'TG',
  Th = 'TH',
  Tj = 'TJ',
  Tk = 'TK',
  Tl = 'TL',
  Tm = 'TM',
  Tn = 'TN',
  To = 'TO',
  Tr = 'TR',
  Tt = 'TT',
  Tv = 'TV',
  Tw = 'TW',
  Tz = 'TZ',
  Ua = 'UA',
  Ug = 'UG',
  Um = 'UM',
  Us = 'US',
  Uy = 'UY',
  Uz = 'UZ',
  Va = 'VA',
  Vc = 'VC',
  Ve = 'VE',
  Vg = 'VG',
  Vi = 'VI',
  Vn = 'VN',
  Vu = 'VU',
  Wf = 'WF',
  Ws = 'WS',
  Ye = 'YE',
  Yt = 'YT',
  Za = 'ZA',
  Zm = 'ZM',
  Zw = 'ZW'
}

export type LoginWithUsernameQueryVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginWithUsernameQuery = { __typename?: 'Query', loginWithUsername: { __typename?: 'LoginResponse', access_token: string, refresh_token: string } };

export type GetConcreteChatQueryVariables = Exact<{
  chatId: Scalars['String'];
}>;


export type GetConcreteChatQuery = { __typename?: 'Query', chat: { __typename?: 'Chat', id: string, peersIds: Array<string>, createdAt: any, updatedAt: any } };

export type GetChatsPaginatedQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
}>;


export type GetChatsPaginatedQuery = { __typename?: 'Query', chats: { __typename?: 'PaginatedChats', totalResultsCount: number, data: Array<{ __typename?: 'Chat', id: string, peersIds: Array<string>, createdAt: any, updatedAt: any }> } };

export type GetMessagesQueryVariables = Exact<{
  chatId: Scalars['String'];
  pagination?: InputMaybe<Pagination>;
}>;


export type GetMessagesQuery = { __typename?: 'Query', messages: { __typename?: 'PaginatedChatMessages', totalResultsCount: number, data: Array<{ __typename?: 'ChatMessage', id: string, chatId: string, userId: string, text: string, viewedBy: Array<string>, createdAt: any, updatedAt: any }> } };

export type LastMessageQueryVariables = Exact<{
  chatId: Scalars['String'];
}>;


export type LastMessageQuery = { __typename?: 'Query', lastMessage?: { __typename?: 'ChatMessage', id: string, chatId: string, userId: string, text: string, viewedBy: Array<string>, createdAt: any, updatedAt: any } | null };

export type NotViewedMessagesNumberPerChatQueryVariables = Exact<{
  chatId: Scalars['String'];
}>;


export type NotViewedMessagesNumberPerChatQuery = { __typename?: 'Query', notViewedMessagesPerChat: number };

export type NotViewedMessagesNumberTotalQueryVariables = Exact<{ [key: string]: never; }>;


export type NotViewedMessagesNumberTotalQuery = { __typename?: 'Query', notViewedMessagesTotal: number };

export type ShortProductsQueryVariables = Exact<{
  fuzzy?: InputMaybe<Scalars['String']>;
  pagination?: InputMaybe<Pagination>;
  filtering?: InputMaybe<ProductFilters>;
  sorting?: InputMaybe<ProductSorting>;
}>;


export type ShortProductsQuery = { __typename?: 'Query', products: { __typename?: 'PaginatedProducts', totalResultsCount: number, data: Array<{ __typename?: 'Product', id: string, name: string, imagesUrls: Array<string>, price: number }> } };

export type FullProductQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type FullProductQuery = { __typename?: 'Query', product: { __typename?: 'Product', id: string, name: string, userId: string, categoryName: string, description?: string | null, imagesUrls: Array<string>, imagesIds: Array<string>, price: number, createdAt: any } };

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: string } };

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct: { __typename?: 'Product', id: string } };

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['String'];
  update: UpdateProductInput;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct: { __typename?: 'Product', id: string } };

export type RefreshAccessTokenQueryVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RefreshAccessTokenQuery = { __typename?: 'Query', refreshAccessToken: { __typename?: 'LoginResponse', access_token: string, refresh_token: string } };

export type UserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name?: string | null, avatarUrl?: string | null, about?: string | null, roles: Array<UserRolesEnum>, cityId?: number | null, countryCode?: CountryCodes | null } };

export type UserWithShortProductsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserWithShortProductsQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name?: string | null, avatarUrl?: string | null, about?: string | null, roles: Array<UserRolesEnum>, cityId?: number | null, countryCode?: CountryCodes | null, products: Array<{ __typename?: 'Product', id: string, name: string, imagesUrls: Array<string>, price: number }> } };

export type CreateSellerMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateSellerMutation = { __typename?: 'Mutation', createSeller: { __typename?: 'User', id: string } };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['String'];
  update: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string } };

export const LoginWithUsernameDocument = gql`
    query LoginWithUsername($username: String!, $password: String!) {
  loginWithUsername(username: $username, password: $password) {
    access_token
    refresh_token
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginWithUsernameGQL extends Apollo.Query<LoginWithUsernameQuery, LoginWithUsernameQueryVariables> {
    document = LoginWithUsernameDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetConcreteChatDocument = gql`
    query GetConcreteChat($chatId: String!) {
  chat(chatId: $chatId) {
    id
    peersIds
    createdAt
    updatedAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetConcreteChatGQL extends Apollo.Query<GetConcreteChatQuery, GetConcreteChatQueryVariables> {
    document = GetConcreteChatDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetChatsPaginatedDocument = gql`
    query GetChatsPaginated($pagination: Pagination) {
  chats(pagination: $pagination) {
    totalResultsCount
    data {
      id
      peersIds
      createdAt
      updatedAt
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetChatsPaginatedGQL extends Apollo.Query<GetChatsPaginatedQuery, GetChatsPaginatedQueryVariables> {
    document = GetChatsPaginatedDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetMessagesDocument = gql`
    query GetMessages($chatId: String!, $pagination: Pagination) {
  messages(chatId: $chatId, pagination: $pagination) {
    totalResultsCount
    data {
      id
      chatId
      userId
      text
      viewedBy
      createdAt
      updatedAt
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetMessagesGQL extends Apollo.Query<GetMessagesQuery, GetMessagesQueryVariables> {
    document = GetMessagesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LastMessageDocument = gql`
    query LastMessage($chatId: String!) {
  lastMessage(chatId: $chatId) {
    id
    chatId
    userId
    text
    viewedBy
    createdAt
    updatedAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LastMessageGQL extends Apollo.Query<LastMessageQuery, LastMessageQueryVariables> {
    document = LastMessageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const NotViewedMessagesNumberPerChatDocument = gql`
    query NotViewedMessagesNumberPerChat($chatId: String!) {
  notViewedMessagesPerChat(chatId: $chatId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class NotViewedMessagesNumberPerChatGQL extends Apollo.Query<NotViewedMessagesNumberPerChatQuery, NotViewedMessagesNumberPerChatQueryVariables> {
    document = NotViewedMessagesNumberPerChatDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const NotViewedMessagesNumberTotalDocument = gql`
    query NotViewedMessagesNumberTotal {
  notViewedMessagesTotal
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class NotViewedMessagesNumberTotalGQL extends Apollo.Query<NotViewedMessagesNumberTotalQuery, NotViewedMessagesNumberTotalQueryVariables> {
    document = NotViewedMessagesNumberTotalDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ShortProductsDocument = gql`
    query ShortProducts($fuzzy: String, $pagination: Pagination, $filtering: ProductFilters, $sorting: ProductSorting) {
  products(
    fuzzySearch: $fuzzy
    pagination: $pagination
    filtering: $filtering
    sorting: $sorting
  ) {
    data {
      id
      name
      imagesUrls
      price
    }
    totalResultsCount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ShortProductsGQL extends Apollo.Query<ShortProductsQuery, ShortProductsQueryVariables> {
    document = ShortProductsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FullProductDocument = gql`
    query FullProduct($id: String!) {
  product(id: $id) {
    id
    name
    userId
    categoryName
    description
    imagesUrls
    imagesIds
    price
    createdAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FullProductGQL extends Apollo.Query<FullProductQuery, FullProductQueryVariables> {
    document = FullProductDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateProductDocument = gql`
    mutation CreateProduct($input: CreateProductInput!) {
  createProduct(createProductInput: $input) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateProductGQL extends Apollo.Mutation<CreateProductMutation, CreateProductMutationVariables> {
    document = CreateProductDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteProductDocument = gql`
    mutation DeleteProduct($id: String!) {
  deleteProduct(id: $id) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteProductGQL extends Apollo.Mutation<DeleteProductMutation, DeleteProductMutationVariables> {
    document = DeleteProductDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateProductDocument = gql`
    mutation UpdateProduct($id: String!, $update: UpdateProductInput!) {
  updateProduct(id: $id, updateProductInput: $update) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateProductGQL extends Apollo.Mutation<UpdateProductMutation, UpdateProductMutationVariables> {
    document = UpdateProductDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RefreshAccessTokenDocument = gql`
    query RefreshAccessToken($refreshToken: String!) {
  refreshAccessToken(refreshToken: $refreshToken) {
    access_token
    refresh_token
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RefreshAccessTokenGQL extends Apollo.Query<RefreshAccessTokenQuery, RefreshAccessTokenQueryVariables> {
    document = RefreshAccessTokenDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UserDocument = gql`
    query User($id: String!) {
  user(userId: $id) {
    id
    name
    avatarUrl
    about
    roles
    cityId
    countryCode
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserGQL extends Apollo.Query<UserQuery, UserQueryVariables> {
    document = UserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UserWithShortProductsDocument = gql`
    query UserWithShortProducts($id: String!) {
  user(userId: $id) {
    id
    name
    avatarUrl
    about
    roles
    cityId
    countryCode
    products {
      id
      name
      imagesUrls
      price
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserWithShortProductsGQL extends Apollo.Query<UserWithShortProductsQuery, UserWithShortProductsQueryVariables> {
    document = UserWithShortProductsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateSellerDocument = gql`
    mutation CreateSeller($username: String!, $password: String!) {
  createSeller(input: {username: $username, password: $password}) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateSellerGQL extends Apollo.Mutation<CreateSellerMutation, CreateSellerMutationVariables> {
    document = CreateSellerDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: String!, $update: UpdateUserInput!) {
  updateUser(userId: $id, input: $update) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateUserGQL extends Apollo.Mutation<UpdateUserMutation, UpdateUserMutationVariables> {
    document = UpdateUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }