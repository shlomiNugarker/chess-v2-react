import { User } from '../../../models/User'

export const onShareGameUrl = async (loggedInUser: User, gameId: string) => {
  const shareData = {
    title: 'Chess game',
    text: `${loggedInUser.fullname} invited you to play chess !`,
    url: `https://chess-v2-backend-production.up.railway.app/#/${gameId}`,
  }
  try {
    // console.log('onShareGameUrl()')
    await navigator.share(shareData)
  } catch (err) {
    console.log(`Error: ${err}`)
  }
}
