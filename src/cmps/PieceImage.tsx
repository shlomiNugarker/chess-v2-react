import b from '../assets/images-pieces/b-black.png'
import B from '../assets/images-pieces/B-white.png'
import k from '../assets/images-pieces/k-black.png'
import K from '../assets/images-pieces/K-white.png'
import n from '../assets/images-pieces/n-black.png'
import N from '../assets/images-pieces/N-white.png'
import p from '../assets/images-pieces/p-black.png'
import P from '../assets/images-pieces/P-white.png'
import q from '../assets/images-pieces/q-black.png'
import Q from '../assets/images-pieces/Q-white.png'
import r from '../assets/images-pieces/r-black.png'
import R from '../assets/images-pieces/R-white.png'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PieceImage = ({ piece }: any) => {
  if (piece === 'b') return <img src={b} alt="" />
  else if (piece === 'B') return <img src={B} alt="" />
  else if (piece === 'k') return <img src={k} alt="" />
  else if (piece === 'K') return <img src={K} alt="" />
  else if (piece === 'n') return <img src={n} alt="" />
  else if (piece === 'N') return <img src={N} alt="" />
  else if (piece === 'p') return <img src={p} alt="" />
  else if (piece === 'P') return <img src={P} alt="" />
  else if (piece === 'q') return <img src={q} alt="" />
  else if (piece === 'Q') return <img src={Q} alt="" />
  else if (piece === 'r') return <img src={r} alt="" />
  else if (piece === 'R') return <img src={R} alt="" />
  else if (piece === '') return ''
}
