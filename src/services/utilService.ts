export const utilService = {
  makeId,
  loadFromStorage,
  saveToStorage,
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
