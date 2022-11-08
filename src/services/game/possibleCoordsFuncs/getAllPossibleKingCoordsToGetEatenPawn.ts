import { GameState } from '../../../models/GameState'

export function getAllPossibleKingCoordsToGetEatenPawn(
  state: GameState,
  kingCoord: {
    i: number
    j: number
  }
) {
  let res: { i: number; j: number }[] = []
  const { isBlackTurn } = state

  console.log({ kingCoord })

  const possibleSteps = [
    {
      i: isBlackTurn ? kingCoord.i + 1 : kingCoord.i - 1,
      j: isBlackTurn ? kingCoord.j - 1 : kingCoord.j - 1,
    },
    {
      i: isBlackTurn ? kingCoord.i + 1 : kingCoord.i - 1,
      j: isBlackTurn ? kingCoord.j + 1 : kingCoord.j + 1,
    },
  ]

  for (let k = 0; k < possibleSteps.length; k++) {
    if (
      possibleSteps[k].i >= 0 &&
      possibleSteps[k].i < 8 &&
      possibleSteps[k].j >= 0 &&
      possibleSteps[k].j < 8
    ) {
      res.push(possibleSteps[k])
    }
  }

  return res
}
