const SYMBOLS_API_BASE_URL = 'https://api.frontendexpert.io/api/fe/stock-symbols';
const MARKET_CAPS_API_BASE_URL = 'https://api.frontendexpert.io/api/fe/stock-market-caps';
const PRICES_API_BASE_URL = 'https://api.frontendexpert.io/api/fe/stock-prices';

async function trendingStocks(n) {
  if(n==0)
    return []
  const stockData=new Map()
  const [marketCaps] = await Promise.all([
    fetch(MARKET_CAPS_API_BASE_URL).then(response =>response.json()),
    fetch(SYMBOLS_API_BASE_URL).then(response => response.json().then(stocks =>
      stocks.forEach(stock=>{
        stockData[stock.symbol] = {name: stock.name}
      })))
      
  ])
  const trending = marketCaps.sort((a,b)=> b['market-cap'] - a['market-cap']).slice(0,n)
  const prices = await fetch(`${PRICES_API_BASE_URL}?symbols=${JSON.stringify(trending.map(stock => stock.symbol))}`).then(response =>
    response.json().then(stocks=>stocks.forEach(stock=>{
      stockData[stock.symbol] = {...stockData[stock.symbol], ...stock}
    })))
  return trending.map(stock => ({...stock, ...stockData[stock.symbol]}))
}

// Do not edit the line below.
exports.trendingStocks = trendingStocks;
