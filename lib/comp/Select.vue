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
    <div class="question tac">
      <h3>{{ currentQuestion.stem }}</h3>
      <div class="choice-btn-container" v-for="(choice, index) in currentQuestion.options" :key="index">
        <Button
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

.choice-btn-container
  margin 0.5em auto
  width 30%
  max-width 20em
  min-width 14em
  text-align center

  button
    width 100%
    display block
    margin 0.6em 0

.choice-btn
  width 100%
  display block
  margin 0.5em auto

.judge
  width 45%
  border-width 1px
  border-color #444
  border-radius 1.6em
  background-color #fffff0
  padding 0.5em 1.2em
  margin 1em auto
  transition 0.25s ease

.correct-hint
  color #0b0

.incorrect-hint
  color #b00

.correct-answer
  font-weight bold

.next-btn-container
  margin 1.2em auto
  width 50%

.next-btn
  width 100%
  display block
  margin 0.7em auto

.back-btn-container
  margin 1.8em auto 0
  width 30%

.back-btn
  width 100%
  display block
  margin 0.8em auto

</style>
