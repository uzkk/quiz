import Easy from './easy'
import Normal from './normal'
import Hard from './hard'
import Lunatic from './lunatic'
import types from './types'

export const levels = { Easy, Normal, Hard, Lunatic }
export const category = {}

export {
  types,
}

types.first.forEach(({ tag, name }) => category[tag] = name)
types.others.forEach(({ tag, name }) => category[tag] = name)
