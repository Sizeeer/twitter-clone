import crypto from 'crypto'

export const createHashMd5 = (value: string): string => {
  return crypto.createHash('md5').update(value).digest('hex')
}