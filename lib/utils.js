export function shuffle (list) {
  list = list.slice()
  for (let i = 0; i < list.length; i++) {
    const j = Math.floor(Math.random() * list.length)
    ;[list[i], list[j]] = [list[j], list[i]]
  }
  return list
}
