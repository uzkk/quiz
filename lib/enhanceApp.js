import { authors } from './data'

export default ({ Vue }) => {
  Vue.prototype.$uzkk.quizContribs = Array
    .from(Object.entries(authors))
    .sort(([name1, { count: count1 }], [name2, { count: count2 }]) =>
      count1 < count2
        ? 1
        : count1 > count2
          ? -1
          : name1 < name2
            ? 1
            : -1
    )
}
