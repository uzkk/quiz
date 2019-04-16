<template>
  <div class="main-div">
    <h3 class="tac">
      第 {{ $quiz.currentIndex + 1 }} / {{ $quiz.questions.length }} 题
    </h3>
    <div class="question-attr tac">
      <h4>
        分类：{{ $quiz.level }} / {{ category[currentQuestion.category] }}
      </h4>
      <h4 v-if="currentQuestion.contrib">
        出题人：{{ getContrib(currentQuestion.contrib) }}
      </h4>
    </div>
    <div class="tac">
      <h3>{{ currentQuestion.stem }}</h3>
      <div class="options">
        <Button
          v-for="(choice, index) in currentQuestion.options" :key="index"
          :type="currentQuestion.choice === index ? 'success' : 'default'"
          class="choice-btn"
          @click="nextQuestion(index)"
        >
          {{ String.fromCharCode(index + 65) }}. {{ choice }}
        </Button>
      </div>
    </div>
    <div class="button-container">
      <div class="row">
        <Button @click="prevQuestion" :disabled="$quiz.currentIndex <= 0">
          上一题
        </Button>
        <Button @click="$quiz.currentIndex += 1" :disabled="$quiz.currentIndex === $quiz.questions.length - 1">
          下一题
        </Button>
      </div>
      <Button @click="$quiz.phase = 'Jump'">
        选择题号
      </Button>
      <Button @click="$quiz.submit">
        提交
      </Button>
    </div>
    <div class="button-container">
      <Button type="warning" @click="$quiz.phase = 'Settings'">
        返回主界面
      </Button>
    </div>
  </div>
</template>

<script>

import { Button } from '@uzkk/components'
import { levels, category } from '../data'
import { shuffle } from '../utils'

export default {
  components: { Button },

  inject: ['$quiz'],

  created () {
    this.category = category
  },

  computed: {
    currentQuestion () {
      return this.$quiz.questions[this.$quiz.currentIndex]
    },
  },

  methods: {
    nextQuestion (index) {
      if (index === this.currentQuestion.choice) {
        return
      }
      this.currentQuestion.choice = index
      if (this.$quiz.currentIndex < this.$quiz.questions.length - 1) {
        this.$quiz.currentIndex += 1
      }
    },
    prevQuestion () {
      this.$quiz.currentIndex -= 1
    },
    getContrib (contrib) {
      const author = this.$themeConfig.authors.find(a => a.name === contrib)
      if (author) {
        return author.nickname
      } else {
        return contrib
      }
    },
  },
}

</script>

<style lang="stylus" scoped>

.question-attr
  margin 1.5em auto

  h4
    margin 0.4em auto

.options
  margin 0.5em auto
  width fit-content
  max-width 1000px
  min-width 14em
  text-align center
  @media (min-width 800px)
    min-width 30%

  button
    width 100%
    display block
    margin 0.5em auto

</style>
