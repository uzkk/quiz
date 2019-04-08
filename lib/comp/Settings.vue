<template>
  <div>
    <div class="option-container">
      <p class="title">
        <Checkbox v-model="allSelected" label="所有题目全选"/>
      </p>
      <ul>
        <li>
          <p>
            <Checkbox v-model="allFirstSelected" label="一设题目全选"/>
          </p>
          <ul>
            <li class="type-item" v-for="(type, index) in types.first" :key="index">
              <Checkbox
                :value="typelist.includes(type.tag)"
                :label="type.name"
                @update="toggleType(type.tag)"
              />
            </li>
          </ul>
        </li>
        <li>
          <p>
            <Checkbox v-model="allOthersSelected" label="二设·考据题目全选"/>
          </p>
          <ul>
            <li class="type-item" v-for="(type, index) in types.others" :key="index">
              <Checkbox
                :value="typelist.includes(type.tag)"
                :label="type.name"
                @update="toggleType(type.tag)"
              />
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="option-container">
      <div class="tac">
        选择难度：
        <span class="choice-item opt-item" v-for="(lv, index) in levels" :key="index">
          <input type="radio" :value="lv" v-model="level">
          <label>{{ lv }}</label>
        </span>
      </div>
    </div>
    <div class="start-btn-container tac">
      <Button
        class="start-btn"
        @click="$emit('next', 'Select', { level, typelist })"
      >
        开始
      </Button>
    </div>
  </div>
</template>

<script>

import Button from '@theme-uzkk/components/Button'
import Checkbox from '@theme-uzkk/components/Checkbox'
import types from '../data/types'

export default {
  components: { Button, Checkbox },

  data: () => ({
    level: 'Easy',
    typelist: 'abcdef',
  }),

  created () {
    this.levels = ['Easy', 'Normal', 'Hard', 'Lunatic']
    this.types = types
    this.first = 'abcdef'
    this.others = 'ABCDE'
    this.all = this.others + this.first
  },

  computed: {
    allSelected: {
      get () {
        return this.typelist.length === this.all.length
      },
      set (value) {
        this.typelist = value ? this.all : ''
      },
    },
    allFirstSelected: {
      get () {
        for (let type of this.first) {
          if (!this.typelist.includes(type)) {
            return false
          }
        }
        return true
      },
      set (value) {
        const others = this.typelist.match(/^[A-Z]*/)[0]
        this.typelist = others + (value ? this.first : '')
      },
    },
    allOthersSelected: {
      get () {
        for (let type of this.others) {
          if (!this.typelist.includes(type)) {
            return false
          }
        }
        return true
      },
      set (value) {
        const first = this.typelist.match(/[a-z]*$/)[0]
        this.typelist = (value ? this.others : '') + first
      },
    },
  },
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
