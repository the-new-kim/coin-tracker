const BASE_URL = "https://api.coinpaprika.com/v1/";

//Data Interfaces
//HOME
export interface ICoinData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
//DETAIL
export interface ICoinDetailData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  tags: object;
  team: {
    id: string;
    name: string;
    position: string;
  }[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: object;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: {
    link: string;
    thumbnail: string;
  };
  first_data_at: string;
  last_data_at: string;
}

export interface IOhlcData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

export interface ITickersData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

//SEARCH
export interface ISearchCoinsData {
  currencies: ICoinData[];
}

export function fetchCoins() {
  return fetch(`${BASE_URL}coins`).then((response) => response.json());
}

export function fetchCoinDetail(coinId: string) {
  return fetch(`${BASE_URL}coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchTickers(coinId: string) {
  return fetch(`${BASE_URL}tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchOHLC(coinId: string) {
  return fetch(`${BASE_URL}coins/${coinId}/ohlcv/today`).then((response) =>
    response.json()
  );
}

export enum HistoricalTickersRange {
  WEEK = "1w",
  MONTH = "1m",
  THREE_M = "3m",
  SIX_M = "6m",
}

export function fetchHistoricalTickers(
  coinId: string,
  range: HistoricalTickersRange
) {
  const endDate = Math.floor(Date.now() / 1000);
  const day = 60 * 60 * 24;
  const week = day * 7;
  const month = week * 4;
  const threeMonthes = month * 3;
  const sixMonthes = day * 182;
  const defaultRange = sixMonthes;

  return fetch(
    `${BASE_URL}tickers/${coinId}/historical?start=${
      range === HistoricalTickersRange.WEEK
        ? endDate - week
        : range === HistoricalTickersRange.MONTH
        ? endDate - month
        : range === HistoricalTickersRange.THREE_M
        ? endDate - threeMonthes
        : range === HistoricalTickersRange.SIX_M
        ? endDate - sixMonthes
        : endDate - defaultRange
    }&end=${endDate}&interval=1d`
  ).then((response) => response.json());
}

//Events

export interface IEventsData {
  id: string;
  date: string;
  date_to: string;
  name: string;
  description: string;
  is_conference: boolean;
  link: string;
  proof_image_link: string;
}

export function fetchEvents(coinId: string) {
  return fetch(`${BASE_URL}coins/${coinId}/events`).then((response) =>
    response.json()
  );
}

export interface ITwitterData {
  date: string;
  user_name: string;
  user_image_link: string;
  status: string;
  is_retweet: boolean;
  retweet_count: number;
  like_count: number;
  status_link: string;
  status_id: string;
  media_link: string;
  youtube_link: string;
}

export function fetchTwitter(coinId: string) {
  return fetch(`${BASE_URL}coins/${coinId}/twitter`).then((response) =>
    response.json()
  );
}

export function searchCoins(keyword: string) {
  return fetch(`${BASE_URL}search?q=${keyword}`).then((response) =>
    response.json()
  );
}
