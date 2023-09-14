import { GameState } from './GameState'

export type SetSelectedCellCoordType = ({ cellCoord }: Props) => void

type Props = {
  cellCoord: GameState['selectedCellCoord']
}
