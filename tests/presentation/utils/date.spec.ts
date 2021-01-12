import { formatDate, parseDate } from '@/presentation/utils'

describe('DateUtils', () => {
  describe('parseDate', () => {
    it('should be valid', () => {
      const date = '01/02/2021'
      const result = parseDate(date)
      const expected = new Date(2021, 1, 1)
      expect(result).toStrictEqual(expected)
    })
  })

  describe('formatDate', () => {
    it('should be valid', () => {
      const date = new Date(2021, 1, 1)
      const result = formatDate(date)
      const expected = '01/02/2021'
      expect(result).toBe(expected)
    })
  })
})
