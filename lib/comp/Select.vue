<template>
  <div class="main-div">
    <h3 class="tac">
      第 {{ questionCount + 1 }}/{{ questions.length }} 题
    </h3>
    <h4 class="tac">
      分类：{{ level }} / {{ category[currentQuestion[3]] }}
    </h4>
    <div class="question tac">
      <h3>{{ currentQuestion[0] }}</h3>
      <div class="choice-btn-container" v-for="(choice, index) in currentQuestion[1]" :key="index">
        <Button
          class="choice-btn"
          @click="nextQuestion(index)"
        >
          {{ String.fromCharCode(index + 65) }}. {{ choice }}
        </Button>
      </div>
    </div>
    <div class="button-container">
      <Button type="warning" @click="$emit('next', 'Settings')">
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

  props: ['level', 'typelist'],

  data: () => ({
    questionCount: 0,
  }),

  created () {
    this.category = category
    this.questions = shuffle(
      levels[this.level].filter(q => this.typelist.includes(q[3]))
    ).map(q => q.slice())
    this.questions.forEach(q => {
      const [answer] = q[1]
      q[1] = shuffle(q[1])
      q._answerIndex = q[1].indexOf(answer)
    })
    this.answers = []
    this.correctNum = 0
    this.wrongIds = []
  },

  computed: {
    currentQuestion () {
      return this.questions[this.questionCount]
    },
  },

  methods: {
    nextQuestion (index) {
      this.answers.push(index)
      if (index === this.currentQuestion._answerIndex) {
        this.correctNum += 1
      } else {
        this.wrongIds.push(this.questionCount)
      }
      this.questionCount += 1
      if (this.questionCount > this.questions.length - 1) {
        this.$emit('next', 'Result', {
          level: this.level,
          questions: this.questions,
          correctNum: this.correctNum,
          wrongIds: this.wrongIds,
          answers: this.answers,
        })
      }
    },
  },
}

</script>

<style lang="stylus" scoped>

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
