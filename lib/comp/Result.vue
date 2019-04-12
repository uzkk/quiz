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
        <h2 class="tac">{{ question[0] }}</h2>
        <div class="choices">
          <div
            class="choice"
            v-for="(choice, cid) in question[1]"
            :key="cid"
          >
            <span class="choice-index">{{ String.fromCharCode(cid + 65) }}</span>&nbsp;&nbsp;{{ choice }}
          </div>
        </div>
        <div class="answer-compare">
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
        </div>
        <CollapseView
          class="explanation container tac"
          :initial="wrongIds.includes(qid) ? 'open' : 'close'"
        >
          <h3 class="opened-header" slot="header-open">收起解析</h3>
          <h3 class="closed-header" slot="header-closed">查看解析</h3>
          <p>{{ question[2] }}</p>
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
      <Button
        class="res-page-back-btn"
        @click="$router.push(UZKK_QUIZ_BASE + 'about.html')"
      >
        关于知识测试
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
  margin 2em 8em
  border-width 1px
  border-style dotted
  border-radius 2em

.answer-compare
  margin-top 1em

.choices
  margin 0.3em auto

  .choice
    margin 0.6em auto
    padding 0.3em 1.2em
    border-radius 0.7em
    background-color #eee
    width 30%

    .choice-index
      font-weight bold

  > :first-child
    margin-top 0

  > :last-child
    margin-bottom 0

.correct
  color #0c0

.incorrect
  color #e00

.container
  margin 0 auto
  padding 2em
  max-width 1080px

  .opened-header
    color #55c

  .closed-header
    color #000

    &:hover
      color #55c

  > :first-child
    margin-top 0

  > :last-child
    margin-bottom 0

  h3
    margin 0
    padding 0.2em
    background-color #eee
    border-radius 0.5em

</style>
