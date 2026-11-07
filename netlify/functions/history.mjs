import { getHistoricalRates } from 'dukascopy-node';

const allowedInstruments = new Set(['xauusd', 'eurusd', 'btcusd']);
const allowedTimeframes = new Set(['m1', 'm5', 'm15', 'h1', 'd1']);
const dateRE = /^\d{4}-\d{2}-\d{2}$/;

export const handler = async (event) => {
  const q = event.queryStringParameters || {};
  const from = q.from || '';
  const to = q.to || '';
  const instrument = (q.instrument || 'xauusd').toLowerCase();
  const timeframe = (q.timeframe || 'm1').toLowerCase();
  const headers = {
    'content-type': 'application/json; charset=utf-8',
    'access-control-allow-origin': '*',
    'cache-control': 'public, max-age=3600, s-maxage=86400'
  };
  const reply = (statusCode, payload) => ({ statusCode, headers, body: JSON.stringify(payload) });

  if (!dateRE.test(from) || !dateRE.test(to) || new Date(`${to}T00:00:00Z`) < new Date(`${from}T00:00:00Z`)) {
    return reply(400, { error: 'Tanggal tidak valid.' });
  }
  if ((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) > 32 * 86400000) {
    return reply(400, { error: 'Minta histori maksimal 32 hari per bagian.' });
  }
  if (!allowedInstruments.has(instrument) || !allowedTimeframes.has(timeframe)) {
    return reply(400, { error: 'Instrumen atau timeframe tidak didukung.' });
  }

  try {
    const dates = { from: new Date(`${from}T00:00:00Z`), to: new Date(`${to}T00:00:00Z`) };
    const [ask, bid] = await Promise.all(['ask', 'bid'].map(priceType =>
      getHistoricalRates({ instrument, dates, timeframe, format: 'json', priceType })
    ));
    const bidByTime = new Map(bid.map(bar => [bar.timestamp, bar]));
    const bars = ask.filter(bar => bidByTime.has(bar.timestamp)).map(a => {
      const b = bidByTime.get(a.timestamp);
      return {
        timestamp: a.timestamp,
        open: a.open, high: a.high, low: a.low, close: a.close,
        bidOpen: b.open, bidHigh: b.high, bidLow: b.low, bidClose: b.close,
        volume: a.volume ?? b.volume ?? 0
      };
    });
    return reply(200, { instrument, timeframe, from, to, priceType: 'bid+ask', timezone: 'UTC', count: bars.length, bars });
  } catch (error) {
    console.error('Dukascopy history error:', error);
    return reply(502, { error: 'Gagal mengambil histori dari Dukascopy. Coba lagi beberapa saat.', detail: String(error?.message || error) });
  }
};
