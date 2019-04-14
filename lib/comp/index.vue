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
import { getSettings } from './storage'

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

  methods: {
    submit () {
      if (this.questions.filter(q => q.choice < 0).length > 0) {
        confirm('您有未完成的题目，请在“选择题号”界面查看并完成它们。')
      } else {
        this.phase = 'Result'
      }
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
