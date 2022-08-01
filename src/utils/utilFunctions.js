const unixToDate = function (unixTimeStamp, timeConvertion = 1) {
  let date = new Date(unixTimeStamp * timeConvertion)
  return date.toLocaleDateString()
}

export const getXData = function (inputObj) {
  let outPut = []
  inputObj?.map(item => {
    outPut.push(unixToDate(item[0]))
  })
  return outPut
}

export const getYData = function (inputObj) {
  let outPut = []
  inputObj?.map(item => {
    outPut.push(item[1])
  })
  return outPut
}

// https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily
// https://www.coingecko.com/en/api/documentation
// get historical marked data include price market cap and 24h volume

//https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true

const currentCoinData = {
  bitcoin: {
    usd: 19237.51,
    usd_market_cap: 367353352825.3456,
    usd_24h_vol: 14786203996.016094,
    usd_24h_change: -0.15301677680724698,
    last_updated_at: 1656810379,
  },
}
