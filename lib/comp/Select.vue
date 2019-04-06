<template>
  <div>
    <h4 class="tac">
      第 {{ questionCount }}/{{ questions.length }} 题
    </h4>
    <div class="question tac">
      <h3>{{ currentQuestion[0] }}</h3>
      <div class="choice-btn-container" v-for="(choice, index) in shuffledOptions" :key="index">
        <Button
          class="choice-btn"
          @click="choose(choice)"
          :disabled="answered"
        >
          {{ String.fromCharCode(index + 65) }} {{ choice }}
        </Button>
      </div>
    </div>
    <div class="judge tac" v-if="answered">
      <h3 class="correct-hint" v-if="correct">回答正确</h3>
      <h3 class="incorrect-hint" v-else>回答错误</h3>
      本题的正确答案为：<span class="correct-answer">{{ String.fromCharCode(shuffledOptions.indexOf(currentQuestion[1][0]) + 65) }} {{ currentQuestion[1][0] }}</span>
      <div class="next-btn-container">
        <Button
          class="next-btn"
          @click="nextQuestion"
        >
          下一题
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

import Button from './Button'
import Easy from '../data/easy'
import Normal from '../data/normal'
import Hard from '../data/hard'
import Lunatic from '../data/lunatic'

export default {
  name: 'Select',

  components: { Button },

  props: ['level'],

  data () {
    return {
      questions: [],
      questionCount: 1,
      currentQuestion: undefined,
      shuffledOptions: undefined,
      answered: false,
      correct: false,
      correctNum: 0
    }
  },

  created () {
    const all_levels = { Easy, Normal, Hard, Lunatic }
    this.questions = this.shuffle(all_levels[this.level])
    this.setQuestion(0)
  },

  methods: {
    shuffle (list) {
      for (let i = 0; i < list.length; i++) {
        let j = Math.floor(Math.random() * list.length)
        let tmp = list[i]
        list[i] = list[j]
        list[j] = tmp
      }
      return list
    },
    setQuestion (index) {
      this.currentQuestion = this.questions[index].slice()
      this.shuffledOptions = this.currentQuestion[1].slice()
      this.shuffle(this.shuffledOptions)
    },
    backToSettings () {
      this.$emit('next', 'Settings')
    },
    choose (choice) {
      this.answered = true
      if (choice === this.currentQuestion[1][0]) {
        this.correct = true
        this.correctNum += 1
      } else {
        this.correct = false
      }
    },
    nextQuestion () {
      this.questionCount += 1
      this.answered = false
      if (this.questionCount > this.questions.length) {
        this.$emit('next', 'Result', {
          level: this.level,
          correctNum: this.correctNum,
          totalNum: this.questionCount - 1
        })
      } else {
        this.setQuestion(this.questionCount - 1)
      }
    }
  }
}

</script>

<style lang="stylus" scoped>

.tac
  text-align center

.choice-btn-container
  margin 0.5em auto
  width 20%

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
  margin 1.8em auto
  width 30%

.back-btn
  width 100%
  display block
  margin 0.8em auto

</style>
