<template>
  <div>
    <h3 class="tac">恭喜您完成 {{ $quiz.level }} 难度测试！</h3>
    <h2 class="tac">您的正确率：{{ correctCount }}/{{ $quiz.questions.length }}</h2>
    <div class="button-container tac">
      <Button type="warning" @click="$quiz.phase = 'Settings'">
        返回主界面
      </Button>
    </div>
    <div class="section">
      <div class="table-header">
        <span class="th qid">题号</span>
        <span class="th question">题目</span>
        <span class="th answer">您的答案</span>
        <span class="th answer">正确答案</span>
      </div>
      <CollapseView
        v-for="(question, qid) in $quiz.questions"
        :key="qid"
        :initial="question.isCorrect ? 'close' : 'open'"
      >
        <div class="cv-header" slot="header">
          <span class="td qid">{{ qid + 1 }}</span>
          <span class="td question">{{ question.stem }}</span>
          <span class="td answer" :class="question.isCorrect ? 'correct' : 'incorrect'">
            {{ question.choice >= 0 ? String.fromCharCode(question.choice + 65) : '—' }}
          </span>
          <span class="td answer correct">
            {{ String.fromCharCode(question.answer + 65) }}
          </span>
        </div>
        <div class="tr question">
          <div class="item">题目</div>
          <div class="detail">{{ question.stem }}</div>
        </div>
        <div
          class="tr"
          v-for="(choice, cid) in question.options"
          :key="cid"
        >
          <div class="item">选项{{ String.fromCharCode(cid + 65) }}</div>
          <div class="detail">{{ choice }}</div>
        </div>
        <div class="tr">
          <div class="item">解析</div>
          <Explanation class="detail" :data="question.explanation"/>
        </div>
      </CollapseView>
    </div>
    <div class="button-container">
      <Button type="warning" @click="$quiz.phase = 'Settings'">
        返回主界面
      </Button>
      <Button @click="$router.push(UZKK_QUIZ_BASE + 'about.html')">
        关于知识测试
      </Button>
    </div>
  </div>
</template>

<script>

import { Button, CollapseView } from '@uzkk/components'
import Explanation from './Explanation'

export default {
  components: { Button, CollapseView, Explanation },

  inject: ['$quiz'],

  created () {
    this.correctCount = this.$quiz.questions.reduce((sum, question) => {
      question.isCorrect = question.answer === question.choice
      return sum + Boolean(question.isCorrect)
    }, 0)
  },
}

</script>

<style lang="stylus" scoped>

.table-header
  margin 0 auto
  color #888
  font-size 1.1em
  font-weight bold
  @media (max-width $MQMobileNarrow)
    padding 0.5em 0
  @media (min-width $MQMobileNarrow) and (max-width $MQMobile)
    padding 0.5em 1em
  @media (min-width $MQMobile)
    padding 0.5em 2em

.collapse-view
  margin 0 auto 0.5em
  &:last-child
    margin-bottom 0
  @media (max-width $MQMobileNarrow)
    padding 0 0
  @media (min-width $MQMobileNarrow) and (max-width $MQMobile)
    padding 0 1em
  @media (min-width $MQMobile)
    padding 0 2em

.th, .td
  display inline-block
  text-align center
  vertical-align middle

  &.qid
    @media (max-width $MQMobile)
      width 26%
    @media (min-width $MQMobile)
      width 15%

  &.question
    width 50%
    @media (max-width $MQMobile)
      display none

  &.answer
    @media (max-width $MQMobile)
      width 34%
    @media (min-width $MQMobile)
      width 15%

.td
  line-height 1.6

  @media (max-width $MQMobile)
    &.qid::before
      content '第'
      padding-right 2px
    &.qid::after
      content '题'
      padding-left 2px

  &.question
    text-align left
    margin-left -6px

  &.answer
    @media (min-width $MQMobile)
      font-size 1.2em

.cv-header
  border-top 1px solid #ddd
  border-bottom 1px solid #ddd
  background-color #f7f7f7
  @media (max-width $MQMobileNarrow)
    padding 0.1em 0
  @media (min-width $MQMobileNarrow) and (max-width $MQMobile)
    padding 0.2em 0
  @media (min-width $MQMobile)
    padding 0.35em 0

.tr
  width 100%
  display inline-flex
  margin-top 0.5em
  line-height 1.5
  padding-right 1em

  @media (max-width $MQMobile)
    padding-right 0.5em

  @media (min-width $MQMobile)
    &:first-child
      padding-top 0.5em
    &:last-child
      padding-bottom 0.5em

  &.question
    font-weight bold
    @media (min-width $MQMobile)
      display none

  .item
    display inline-block
    font-weight bold
    color #bbb
    text-align center
    vertical-align middle
    @media (max-width $MQMobile)
      width 6em
    @media (min-width $MQMobile)
      width 15%

  .detail
    display inline-block
    vertical-align middle
    @media (max-width $MQMobile)
      width inherit
    @media (min-width $MQMobile)
      width 85%

.correct
  color #0c0

.incorrect
  color #e00

</style>
