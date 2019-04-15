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
      const incomplete = this.questions.filter(q => q.choice < 0).length
      if (!incomplete || confirm(`您还有 ${incomplete} 道题目尚未完成，确认现在提交吗？`)) {
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
