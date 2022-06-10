const BASE_URL = "https://api.coinpaprika.com/v1/";

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

export function fetchHistoricalTickers(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const day = 60 * 60 * 24;

  return fetch(
    `${BASE_URL}tickers/${coinId}/historical?start=${
      endDate - day * 30
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
