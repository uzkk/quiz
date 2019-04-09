<template>
  <div class="main-div">
    <h3 class="tac">
      第 {{ questionCount }}/{{ shuffledQuestions.length }} 题
    </h3>
    <h4 class="tac">
      分类：{{ level }} / {{ getCategory(currentQuestion[3]) }}
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
    <div class="back-btn-container tac">
      <Button
        class="back-btn"
        type="warning"
        @click="backToSettings"
      >
        返回主界面
      </Button>
    </div>
  </div>
</template>

<script>

import Button from '@theme-uzkk/components/Button'
import { levels, category } from '../data'

export default {
  components: { Button },

  props: ['level', 'typelist'],

  data () {
    return {
      shuffledQuestions: [],
      questionCount: 1,
      currentQuestion: undefined,
    }
  },

  created () {
    this.questions = levels[this.level].filter(q => {
      return this.typelist.includes(q[3])
    })
    this.shuffle(this.questions)
    for (let question of this.questions) {
      let _question = []
      for (let item of question) {
        let _item
        if (item instanceof Array) {
          _item = item.slice()
        } else {
          _item = item
        }
        _question.push(_item)
      }
      this.shuffledQuestions.push(_question)
    }
    this.setQuestion(0)
    this.answers = []
    this.correctNum = 0
    this.wrongIds = []
  },

  methods: {
    shuffle (list) {
      for (let i = 0; i < list.length; i++) {
        let j = Math.floor(Math.random() * list.length)
        let tmp = list[i]
        list[i] = list[j]
        list[j] = tmp
      }
    },
    setQuestion (index) {
      this.currentQuestion = this.shuffledQuestions[index]
      this.shuffle(this.currentQuestion[1])
    },
    getCategory (rawCategory) {
      return category[rawCategory.charAt(0)] + rawCategory.slice(1)
    },
    backToSettings () {
      this.$emit('next', 'Settings')
    },
    nextQuestion (index) {
      this.answers.push(index)
      let choice = this.currentQuestion[1][index]
      if (choice === this.questions[this.questionCount - 1][1][0]) {
        this.correctNum += 1
      } else {
        this.wrongIds.push(this.questionCount - 1)
      }
      this.questionCount += 1
      if (this.questionCount > this.questions.length) {
        this.$emit('next', 'Result', {
          level: this.level,
          questions: this.questions,
          shuffledQuestions: this.shuffledQuestions,
          correctNum: this.correctNum,
          wrongIds: this.wrongIds,
          answers: this.answers,
        })
      } else {
        this.setQuestion(this.questionCount - 1)
      }
    },
  },
}

</script>

<style lang="stylus" scoped>

.tac
  text-align center

.choice-btn-container
  margin 0.5em auto
  width 30%

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
