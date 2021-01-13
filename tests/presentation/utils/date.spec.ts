import {
  formatDate,
  now,
  parseDate,
  parseISODate,
  resetHour,
} from '@/presentation/utils'

describe('DateUtils', () => {
  describe('parseDate', () => {
    it('should be valid', () => {
      const date = '01/01/2021'
      const result = parseDate(date)
      const expected = new Date(2021, 0, 1)
      expect(result).toStrictEqual(expected)
    })
  })

  describe('parseISODate', () => {
    it('should be valid', () => {
      const date = new Date(2021, 0, 1).toISOString()
      const result = parseISODate(date)
      const expected = new Date(2021, 0, 1)
      expect(result).toStrictEqual(expected)
    })
  })

  describe('resetHour', () => {
    it('should be valid', () => {
      const date = new Date(2021, 0, 1, 10, 30, 45)
      const result = resetHour(date)
      const expected = new Date(2021, 0, 1, 0, 0, 0)
      expect(result).toStrictEqual(expected)
    })
  })

  describe('now', () => {
    it('should be valid', () => {
      const result = now()
      const expected = new Date(Date.now())
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
