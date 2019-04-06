<template>
  <div class="favorite">
    <header>
      <h1>东方知识水平测试</h1>
    </header>
    <FadeSlideTransition>
      <component :is="phase" :key="phase" @next="updatePhase" v-bind="state"/>
    </FadeSlideTransition>
  </div>
</template>

<script>

import Result from './Result'
import Select from './Select'
import Settings from './Settings'
import FadeSlideTransition from '@theme-uzkk/transitions/FadeSlide'

export default {
  name: 'Quiz',

  components: {
    Result,
    Select,
    Settings,
    FadeSlideTransition,
  },

  data: () => ({
    phase: 'Settings',
    state: {},
  }),

  methods: {
    updatePhase (nextPhase, state) {
      Object.assign(this.state, state)
      this.phase = nextPhase
    },
  },
}

</script>

<style lang="stylus" scoped>

header
  text-align center

  h1
    margin 3rem 0

</style>
