<template>
  <div>
    <div class="section">
      <p class="title">
        <Checkbox v-model="allSelected">
          所有题目 ({{ $quiz.getQuestions(all).length }})
        </Checkbox>
      </p>
      <ul>
        <li>
          <p>
            <Checkbox v-model="allFirstSelected">
              一设 ({{ $quiz.getQuestions(first).length }})
            </Checkbox>
          </p>
          <ul>
            <li class="inline medium" v-for="(type, index) in types.first" :key="index">
              <Checkbox
                :value="$quiz.range.includes(type.tag)"
                :label="type.name"
                @update="toggleType(type.tag)"
              >
                {{ type.name }} ({{ $quiz.getQuestions(type.tag).length }})
              </Checkbox>
            </li>
          </ul>
        </li>
        <li>
          <p>
            <Checkbox v-model="allOthersSelected">
              二设 / 考据 ({{ $quiz.getQuestions(others).length }})
            </Checkbox>
          </p>
          <ul>
            <li class="inline medium" v-for="(type, index) in types.others" :key="index">
              <Checkbox
                :value="$quiz.range.includes(type.tag)"
                :label="type.name"
                @update="toggleType(type.tag)"
              >
                {{ type.name }} ({{ $quiz.getQuestions(type.tag).length }})
              </Checkbox>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="section">
      <p class="list">
        <span>选择难度：</span>
        <ul class="inline">
          <li class="inline medium" v-for="(lv, index) in levels" :key="index">
            <Radio :label="lv" v-model="$quiz.level">
              {{ lv }} ({{ $quiz.getQuestions(all, lv).length }})
            </Radio>
          </li>
        </ul>
      </p>
    </div>

    <div class="button-container">
      <Button @click="nextPart" :disabled="!questions.length">
        开始 ({{ questions.length }})
      </Button>
      <Button @click="useFallback">
        恢复默认设置
      </Button>
      <Button @click="toAboutPage">
        关于知识测试
      </Button>
    </div>
  </div>
</template>

<script>

import Radio from '@theme-uzkk/components/Radio'
import Button from '@theme-uzkk/components/Button'
import Checkbox from '@theme-uzkk/components/Checkbox'
import { types } from '../data'
import { setSettings, useFallback } from './storage'

export default {
  components: { Radio, Button, Checkbox },

  inject: ['$quiz'],

  created () {
    this.levels = ['Easy', 'Normal', 'Hard', 'Lunatic']
    this.types = types
    this.first = 'abcdefgz'
    this.others = 'ABCDEZ'
    this.all = this.others + this.first
  },

  computed: {
    allSelected: {
      get () {
        return this.$quiz.range.length === this.all.length
      },
      set (value) {
        this.$quiz.range = value ? this.all : ''
      },
    },
    allFirstSelected: {
      get () {
        for (let type of this.first) {
          if (!this.$quiz.range.includes(type)) {
            return false
          }
        }
        return true
      },
      set (value) {
        const others = this.$quiz.range.match(/^[A-Z]*/)[0]
        this.$quiz.range = others + (value ? this.first : '')
      },
    },
    allOthersSelected: {
      get () {
        for (let type of this.others) {
          if (!this.$quiz.range.includes(type)) {
            return false
          }
        }
        return true
      },
      set (value) {
        const first = this.$quiz.range.match(/[a-z]*$/)[0]
        this.$quiz.range = (value ? this.others : '') + first
      },
    },
    questions () {
      return this.$quiz.getQuestions()
    },
  },

  methods: {
    toggleType (tag) {
      const index = this.$quiz.range.indexOf(tag)
      const chars = this.$quiz.range.split('')
      if (index > -1) {
        chars.splice(index, 1)
        this.$quiz.range = chars.join('')
      } else {
        chars.push(tag)
        this.$quiz.range = chars.sort().join('')
      }
    },
    nextPart () {
      setSettings(this.$quiz)
      this.$quiz.initTest()
    },
    toAboutPage () {
      setSettings(this.$quiz)
      this.$router.push(this.UZKK_QUIZ_BASE + 'about.html')
    },
    useFallback () {
      useFallback(this.$quiz)
    },
  },
}

</script>
