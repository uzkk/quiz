<template>
  <FadeSlideTransition>
    <component class="quiz" :is="phase" :key="phase"/>
  </FadeSlideTransition>
</template>

<script>

import Result from './Result'
import Select from './Select'
import Settings from './Settings'
import FadeSlideTransition from '@theme-uzkk/transitions/FadeSlide'
import { getSettings } from './storage'

export default {
  components: {
    Result,
    Select,
    Settings,
    FadeSlideTransition,
  },

  data: () => ({
    phase: 'Settings',
    ...getSettings(),
  }),

  provide () {
    return {
      $quiz: this,
    }
  },
}

</script>

<style lang="stylus" src="../styles/index.styl"></style>
