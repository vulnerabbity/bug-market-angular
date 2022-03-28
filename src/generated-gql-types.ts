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
  imagesUrls: Array<Scalars['String']>;
  name: Scalars['String'];
  price: Scalars['Int'];
  userId: Scalars['String'];
};

export type ProductFilters = {
  priceRange?: InputMaybe<Range>;
};

export type ProductInput = {
  categoryName: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
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
  cities: PaginatedCities;
  city: City;
  countries: PaginatedCountries;
  country: Country;
  loginWithUsername: LoginResponse;
  product: Product;
  products: PaginatedProducts;
  refreshAccessToken: LoginResponse;
  user: User;
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


export type QueryLoginWithUsernameArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
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


export type FullProductQuery = { __typename?: 'Query', product: { __typename?: 'Product', id: string, name: string, userId: string, categoryName: string, description?: string | null, imagesUrls: Array<string>, price: number, createdAt: any } };

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: string } };

export type UserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name?: string | null, avatarUrl?: string | null, about?: string | null, roles: Array<UserRolesEnum>, cityId?: number | null, countryCode?: CountryCodes | null } };

export type UserWithShortProductsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserWithShortProductsQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name?: string | null, avatarUrl?: string | null, about?: string | null, roles: Array<UserRolesEnum>, cityId?: number | null, countryCode?: CountryCodes | null, products: Array<{ __typename?: 'Product', id: string, name: string, imagesUrls: Array<string>, price: number }> } };

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