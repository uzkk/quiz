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

const tags = []
;[...types.first, ...types.others].forEach(({ tag, name }) => {
  tags.push(tag)
  category[tag] = name
})

export const authors = {}

for (const level in levels) {
  levels[level].forEach(q => {
    if (!q[4]) return
    if (!authors[q[4]]) {
      authors[q[4]] = {
        Easy: 0,
        Normal: 0,
        Hard: 0,
        Lunatic: 0,
      }
      tags.forEach(tag => authors[q[4]][tag] = 0)
    }
    authors[q[4]][level] += 1
    authors[q[4]][q[3]] += 1
  })
}

for (const name in authors) {
  const author = authors[name]
  author.count = author.Easy + author.Normal + author.Hard + author.Lunatic
  author.master = tags
    .filter(tag => author[tag] > 5)
    .sort((tag1, tag2) => author[tag1] < author[tag2] ? 1 : -1)
    .map(tag => category[tag])
    .slice(0, 3)
}
