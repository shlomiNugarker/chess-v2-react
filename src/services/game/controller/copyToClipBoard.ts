export function copyToClipBoard(
  id: string,
  baseUrl: string = 'https://chess-v2-backend-production.up.railway.app/#/'
) {
  navigator.clipboard.writeText(`${baseUrl}${id}`)
}
