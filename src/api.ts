const BASE_URL = "https://api.coinpaprika.com/v1/";

export interface ICoinData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
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

export function fetchEvents(coinId: string) {
  return fetch(`${BASE_URL}coins/${coinId}/events`).then((response) =>
    response.json()
  );
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
