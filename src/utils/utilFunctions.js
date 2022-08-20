const unixToDate = function (unixTimeStamp, timeConvertion = 1) {
  let todaysDate = new Date()
  let date = new Date(unixTimeStamp * timeConvertion)
  if (todaysDate.valueOf() - unixTimeStamp <= 86400000) {
    return date.toLocaleTimeString()
  }

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

export const replaceNullWithAString = function (value) {
  if (value == null) {
    return "is null"
  }
}

export const mapObjectToArray = function (inputObj) {
  let outPut = []
  for (let key in inputObj) {
    outPut.push([key, inputObj[key]])
  }
  return outPut
}
