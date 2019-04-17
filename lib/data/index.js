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

export const authors = {}

;[
  ...Easy,
  ...Normal,
  ...Hard,
  ...Lunatic,
].forEach(q => {
  if (typeof q[4] !== 'string') return
  if (!authors[q[4]]) {
    authors[q[4]] = 1
  } else {
    authors[q[4]] += 1
  }
})
