import { format, parse, parseISO } from 'date-fns'

export const parseDate = (date: string): Date => {
  return parse(date, 'dd/MM/yyyy', new Date())
}

export const parseISODate = (date: string): Date => {
  return parseISO(date)
}

export const formatDate = (date: Date): string => {
  return format(date, 'dd/MM/yyyy')
}

export const now = (): Date => {
  return new Date(Date.now())
}

export const resetHour = (date: Date): Date => {
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date
}
