import { getCellCoord } from '../getCellCoord'

describe('getCellCoord', () => {
  test('returns correct cell coordinates', () => {
    const strCellId = 'cell-2-3'
    const expectedCoord = { i: 2, j: 3 }

    const result = getCellCoord(strCellId)

    expect(result).toEqual(expectedCoord)
  })
})
