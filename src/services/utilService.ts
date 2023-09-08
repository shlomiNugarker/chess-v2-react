export const utilService = {
  makeId,
  loadFromStorage,
  saveToStorage,
  millisToMinutesAndSeconds,
  timeToPercents,
}

function makeId(length = 5) {
  let txt = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

function loadFromStorage(key: string) {
  const val = localStorage.getItem(key)
  return val ? JSON.parse(val) : null
}

function saveToStorage<T>(key: string, val: T) {
  localStorage[key] = JSON.stringify(val)
}

function millisToMinutesAndSeconds(millis: number) {
  if (millis < 0) return '00:00'
  const minutes = Math.floor(millis / 60000)
    .toFixed(0)
    .padStart(2, '0')
  const seconds = ((millis % 60000) / 1000).toFixed(0)
  return minutes + ':' + (+seconds < 10 ? '0' : '') + seconds
}

function timeToPercents(remainigTime: number) {
  const fiveMinutes = 1000 * 60 * 5
  const num = (remainigTime / fiveMinutes) * 100
  return num + '%'
}
