<template>
  <div>
    <div class="option-container">
      <div class="tac">
        选择难度：
        <span class="choice-item opt-item" v-for="(lv, index) in levels" :key="index">
          <input type="radio" :value="lv" v-model="level">
          <label>{{ lv }}</label>
        </span>
      </div>
      <div class="tac">
        <Checkbox v-model="doujin" label="包括二设题" />
      </div>
    </div>
    <div class="start-btn-container tac">
      <Button
        class="start-btn"
        @click="$emit('next', 'Select', { level, doujin })"
      >
        开始
      </Button>
    </div>
  </div>
</template>

<script>

import Button from './Button'
import Checkbox from './Checkbox'

export default {
  components: { Button, Checkbox },

  data: () => ({
    level: 'Easy',
    doujin: true
  }),

  created () {
    this.levels = ['Easy', 'Normal', 'Hard', 'Lunatic']
  }
}

</script>

<style lang="stylus" scoped>

.tac
  text-align center

.option-container
  margin 1em auto
  padding 2em
  border-radius .5em
  background-color #fff
  max-width 1080px

  > :first-child
    margin-top 0

  > :last-child
    margin-bottom 0

.opt-item
  display inline-block
  width 6em

.start-btn-container
  margin 1.8em auto
  width 30%

.start-btn
  width 100%
  display block
  margin 0.8em 0

</style>
