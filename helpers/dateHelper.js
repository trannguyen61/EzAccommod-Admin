export const dateFormat = {
  "dd/mm/yyyy": {
    splitter: "/",
    dayPos: 0,
    monthPos: 1,
    yearPos: 2
  },
  "yyyy-mm-dd": {
    splitter: "-",
    dayPos: 2,
    monthPos: 1,
    yearPos: 0
  }
}

export const getDay = (date, format = "dd/mm/yyyy") => {
  const inputDateFormat = dateFormat[format]
  return date.split(inputDateFormat.splitter)[inputDateFormat.dayPos]
}

export const getMonth = (date, format = "dd/mm/yyyy") => {
  const inputDateFormat = dateFormat[format]
  return date.split(inputDateFormat.splitter)[inputDateFormat.monthPos]
}

export const getYear = (date, format = "dd/mm/yyyy") => {
  const inputDateFormat = dateFormat[format]
  return date.split(inputDateFormat.splitter)[inputDateFormat.yearPos]
}

export const formatISOdate = (date, toFormat = "dd/mm/yyyy") => {
  if (!date) return null

  const [year, month, day] = date.split("-")
  if (toFormat == "dd/mm/yyyy") return `${day}/${month}/${year}`
}

export const getDaysLeftofMonth = (date, format = "dd/mm/yyyy") => {
  const dd = getDay(date, format)
  const mm = getMonth(date, format)
  const yyyy = getYear(date, format)
  return new Date(yyyy, mm + 1, 0).getDate() - dd
}

export const getDaysofMonth = (date, format = "dd/mm/yyyy") => {
  const mm = getMonth(date, format)
  const yyyy = getYear(date, format)
  return new Date(yyyy, mm + 1, 0).getDate()
}

export const getNMonthAhead = (date, n) => {
  date = new Date(date)
  return new Date(date.setMonth(date.getMonth() + n)).toLocaleDateString(
    "vi-VN"
  )
}

export const diffDays = date => {
  const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
  const date1 = new Date(date)
  const now = new Date()

  const diffDays = Math.round(Math.abs((date1 - now) / oneDay))

  return diffDays
}

export const addMinutesToDate = (date, minutes) => {
  return new Date(date.getTime() + minutes * 60000)
}

export const getTimeMiliseconds = (date) => {
  return date.getTime()
}

export const addDays = (date, days) => {
  let result = new Date(date)
  result.setDate(result.getDate() + days)
  return result 
}
