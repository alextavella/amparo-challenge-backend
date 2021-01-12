import { parse, format } from 'date-fns'

export const parseDate = (date: string): Date => {
  return parse(date, 'dd/MM/yyyy', new Date())
}

export const formatDate = (date: Date): string => {
  return format(date, 'dd/MM/yyyy')
}
