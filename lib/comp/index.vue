<template>
  <FadeSlideTransition>
    <component class="quiz" :is="phase" :key="phase"/>
  </FadeSlideTransition>
</template>

<script>

import Result from './Result'
import Select from './Select'
import Settings from './Settings'
import Jump from './Jump'
import FadeSlideTransition from '@theme-uzkk/transitions/FadeSlide'
import { levels } from '../data'
import { getSettings } from './storage'
import { shuffle } from '../utils'

export default {
  components: {
    Result,
    Select,
    Settings,
    Jump,
    FadeSlideTransition,
  },

  data: () => ({
    phase: 'Settings',
    currentIndex: 0,
    questions: [],
    ...getSettings(),
  }),

  created () {
    const { level, range = 'abcdefz', max } = this.$route.query
    if (!(level in levels)) return
    this.level = level
    this.range = range
    this.initTest(max)
  },

  methods: {
    submit () {
      const incomplete = this.questions.filter(q => q.choice < 0).length
      if (!incomplete || confirm(`您还有 ${incomplete} 道题目尚未完成，确认现在提交吗？`)) {
        this.phase = 'Result'
      }
    },
    getQuestions (range = this.range, level = this.level) {
      return levels[level].filter(t => range.includes(t[3]))
    },
    initTest (max = this.max || Infinity) {
      this.currentIndex = 0
      this.questions = shuffle(this.getQuestions().slice(0, max))
        .map(([stem, options, explanation, category, contrib]) => {
          const [_answer] = options
          options = shuffle(options)
          const answer = options.indexOf(_answer)
          const choice = -1
          return { stem, options, explanation, category, contrib, answer, choice }
        })
      this.phase = 'Select'
    },
  },

  provide () {
    return {
      $quiz: this,
    }
  },
}

</script>

<style lang="stylus" src="../styles/index.styl"></style>
