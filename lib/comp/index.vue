<template>
  <FadeSlideTransition>
    <component class="quiz" :is="phase" :key="phase" @next="updatePhase" v-bind="state"/>
  </FadeSlideTransition>
</template>

<script>

import Result from './Result'
import Select from './Select'
import Settings from './Settings'
import FadeSlideTransition from '@theme-uzkk/transitions/FadeSlide'

export default {
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

<style lang="stylus" src="../styles/index.styl"></style>
