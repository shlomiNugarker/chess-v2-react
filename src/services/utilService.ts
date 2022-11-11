export const utilService = {
  makeId,
  loadFromStorage,
  saveToStorage,
}

function makeId(length = 5) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

function loadFromStorage(key: string) {
  var val = localStorage.getItem(key)
  return val ? JSON.parse(val) : null
}

function saveToStorage(key: string, val: any) {
  localStorage[key] = JSON.stringify(val)
}
