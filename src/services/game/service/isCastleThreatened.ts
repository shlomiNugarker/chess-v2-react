import { GameState } from '../../../models/GameState'
import { checkIfKingThreatened } from './checkIfKingThreatened'

export function isCastleThreatened(
  state: GameState,
  fromCoord: { i: number; j: number },
  toCoord: { i: number; j: number }
) {
  // console.log('isCastleThreatened()')

  let isCastleLegal: boolean = true

  let coordsToCheck: {
    i: number
    j: number
  }[] = []

  if (
    (fromCoord.j === 0 && toCoord.j === 4) ||
    (fromCoord.j === 4 && toCoord.j === 0)
  ) {
    if (state.isBlackTurn) {
      coordsToCheck = [
        { i: 0, j: 0 },
        { i: 0, j: 1 },
        { i: 0, j: 2 },
        { i: 0, j: 3 },
      ]
    } else if (!state.isBlackTurn) {
      coordsToCheck = [
        { i: 7, j: 0 },
        { i: 7, j: 1 },
        { i: 7, j: 2 },
        { i: 7, j: 3 },
      ]
    }
  } else if (
    (fromCoord.j === 7 && toCoord.j === 4) ||
    (fromCoord.j === 4 && toCoord.j === 7)
  ) {
    if (state.isBlackTurn) {
      coordsToCheck = [
        { i: 0, j: 5 },
        { i: 0, j: 6 },
        { i: 0, j: 7 },
      ]
    } else if (!state.isBlackTurn) {
      coordsToCheck = [
        { i: 7, j: 5 },
        { i: 7, j: 6 },
        { i: 7, j: 7 },
      ]
    }
  }

  coordsToCheck.forEach((coord) => {
    const { isThreatened } = checkIfKingThreatened(state, true, coord)
    if (isThreatened) {
      isCastleLegal = !isThreatened
    }
  })

  return isCastleLegal
}
