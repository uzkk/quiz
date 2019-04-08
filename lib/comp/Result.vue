<template>
  <div>
    <h3 class="tac">恭喜您完成 {{ level }} 难度测试！</h3>
    <h2 class="tac">您的正确率：{{ correctNum }}/{{ questions.length }}</h2>
    <div class="back-btn-container tac">
      <Button
        class="res-page-back-btn"
        title="返回主界面"
        type="warning"
        @click="backToSettings"
      >
        返回主界面
      </Button>
    </div>
    <div class="answer-results">
      <div
        class="question-result"
        v-for="(question, qid) in shuffledQuestions"
        :key="qid"
      >
        <h3 class="tac">{{ question[0] }}</h3>
        <div class="choices">
          <ul>
            <li
              class="choice"
              v-for="(choice, cid) in question[1]"
              :key="cid"
            >
              {{ String.fromCharCode(cid + 65) }} {{ choice }}
            </li>
          </ul>
        </div>
        <div class="tac">
          正确答案：
          <span class="correct">
            {{ String.fromCharCode(question[1].indexOf(questions[qid][1][0]) + 65) }}
          </span>
        </div>
        <div class="tac">
          您的答案：
          <span :class="wrongIds.includes(qid) ? 'incorrect' : 'correct'">
            {{ String.fromCharCode(answers[qid] + 65) }}
          </span>
        </div>
        <CollapseView
          class="explanation container tac"
          :ref="`cv_${qid}`"
          :initial="wrongIds.includes(qid) ? 'open' : 'close'"
        >
          <h3 slot="header">{{ $refs[`cv_${qid}`].isOpen ? '解析' : '点击查看解析' }}</h3>
          {{ question[2] }}
        </CollapseView>
      </div>
    </div>
    <div class="back-btn-container tac">
      <Button
        class="res-page-back-btn"
        title="返回主界面"
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
import CollapseView from '@theme-uzkk/components/CollapseView'

export default {
  name: 'Result',

  components: {
    Button,
    CollapseView,
  },

  props: [
    'level',
    'questions',
    'shuffledQuestions',
    'correctNum',
    'wrongIds',
    'answers',
  ],

  methods: {
    backToSettings () {
      this.$emit('next', 'Settings')
    },
  },
}

</script>

<style lang="stylus" scoped>

.tac
  text-align center

.back-btn-container
  width 30%
  margin 1.8em auto

.res-page-back-btn
  width 100%
  display block
  margin 0.8em 0

.answer-results
  margin 2em auto
  padding 0.5em 1em
  border-radius 1em
  background-color #fff

.question-result
  margin-top 0.5em
  border 1px

.choices
  margin 0.3em auto

  choice
    margin 0.3em 0

  > :first-child
    margin-top 0

  > :last-child
    margin-bottom 0

.correct
  color #0c0

.incorrect
  color #c00

.container
  margin 1em auto
  padding 2em
  max-width 1080px

  > :first-child
    margin-top 0

  > :last-child
    margin-bottom 0

  h3
    margin 0

</style>
