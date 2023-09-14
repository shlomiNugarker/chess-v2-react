type Props = {
  piece: string
}

export type OnChoosePieceToAdd = ({ piece }: Props) => Promise<void>
