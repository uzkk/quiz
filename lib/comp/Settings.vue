<template>
  <div>
    <div class="section">
      <p class="title">
        <Checkbox v-model="allSelected">
          所有题目 ({{ getQuestionCount('abcdefgABCDEZ') }})
        </Checkbox>
      </p>
      <ul>
        <li>
          <p>
            <Checkbox v-model="allFirstSelected">
              一设 ({{ getQuestionCount('abcdefg') }})
            </Checkbox>
          </p>
          <ul>
            <li class="inline medium" v-for="(type, index) in types.first" :key="index">
              <Checkbox
                :value="typelist.includes(type.tag)"
                :label="type.name"
                @update="toggleType(type.tag)"
              >
                {{ type.name }} ({{ getQuestionCount(type.tag) }})
              </Checkbox>
            </li>
          </ul>
        </li>
        <li>
          <p>
            <Checkbox v-model="allOthersSelected">
              二设 / 考据 ({{ getQuestionCount('ABCDEZ') }})
            </Checkbox>
          </p>
          <ul>
            <li class="inline medium" v-for="(type, index) in types.others" :key="index">
              <Checkbox
                :value="typelist.includes(type.tag)"
                :label="type.name"
                @update="toggleType(type.tag)"
              >
                {{ type.name }} ({{ getQuestionCount(type.tag) }})
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
            <Radio :label="lv" v-model="level">
              {{ lv }} ({{ getQuestionCount('abcdefgABCDEZ', lv) }})
            </Radio>
          </li>
        </ul>
      </p>
    </div>

    <div class="button-container">
      <Button @click="nextPart" :disabled="!currentQuestionCount">
        开始 ({{ currentQuestionCount }})
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
import { levels, types } from '../data'
import { getSettings, setSettings, useFallback } from './storage'

export default {
  components: { Radio, Button, Checkbox },

  data: () => getSettings(),

  created () {
    this.levels = ['Easy', 'Normal', 'Hard', 'Lunatic']
    this.types = types
    this.first = 'abcdefg'
    this.others = 'ABCDEZ'
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
    currentQuestionCount () {
      return this.getQuestionCount(this.typelist)
    },
  },

  methods: {
    toggleType (tag) {
      const index = this.typelist.indexOf(tag)
      const chars = this.typelist.split('')
      if (index > -1) {
        chars.splice(index, 1)
        this.typelist = chars.join('')
      } else {
        chars.push(tag)
        this.typelist = chars.sort().join('')
      }
    },
    getQuestionCount (typelist, level = this.level) {
      return levels[level].filter(t => typelist.includes(t[3])).length
    },
    nextPart () {
      this.$emit('next', 'Select', setSettings(this))
    },
    toAboutPage () {
      setSettings(this)
      this.$router.push(this.UZKK_QUIZ_BASE + 'about.html')
    },
    useFallback () {
      useFallback(this)
    },
  },
}

</script>
