<template>
  <div>
    <h3 class="tac">恭喜您完成 {{ level }} 难度测试！</h3>
    <h2 class="tac">您的正确率：{{ correctNum }}/{{ questions.length }}</h2>
    <div class="button-container tac">
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
      <div class="hint tac">点击题目查看选项及解析。</div>
      <div class="table-header">
        <div class="header-item qid">题号</div>
        <div class="header-item header-question">题目</div>
        <div class="header-item answer">您的答案</div>
        <div class="header-item answer">正确答案</div>
      </div>
      <CollapseView
        class="container"
        v-for="(question, qid) in shuffledQuestions"
        :key="qid"
        :initial="wrongIds.includes(qid) ? 'open' : 'close'"
      >
        <div class="cv-header" slot="header">
          <div class="header-item qid">{{ qid + 1 }}</div>
          <div class="header-item header-question">{{ question[0] }}</div>
          <div class="header-item answer answer-cont" :class="wrongIds.includes(qid) ? 'incorrect' : 'correct'">
            {{ String.fromCharCode(answers[qid] + 65) }}
          </div>
          <div class="header-item answer answer-cont correct">
            {{ String.fromCharCode(question[1].indexOf(questions[qid][1][0]) + 65) }}
          </div>
        </div>
        <div class="cv-body">
          <div class="body-question">
            <div class="cv-body-item">题目</div>
            <div class="cv-body-content">{{ question[0] }}</div>
          </div>
          <div
            class="choice-container"
            v-for="(choice, cid) in question[1]"
            :key="cid"
          >
            <div class="cv-body-item">选项{{ String.fromCharCode(cid + 65) }}</div>
            <div class="cv-body-content">{{ choice }}</div>
          </div>
          <div class="explanation-container">
            <div class="cv-body-item">解析</div>
            <div class="cv-body-content explanation">{{ question[2] }}</div>
          </div>
        </div>
      </CollapseView>
    </div>
    <div class="button-container tac">
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

.res-page-back-btn
  width 100%
  display block
  margin 0.8em 0

.answer-results
  margin 2em auto
  padding 0.5em 1em 1.5em
  border-radius 1em
  background-color #fff

.hint
  margin 1em auto
  color #aaa
  font-style italic

.table-header
  @media (min-width 639px)
    padding 0.5em 2em
  @media (min-width 399px) and (max-width 639px)
    padding 0.5em 1em
  margin 0 auto
  max-width 1080px
  color #888
  font-size 1.1em
  font-weight bold

.cv-header
  @media (max-width 399px)
    padding 0.1em 0
  @media (min-width 399px) and (max-width 639px)
    padding 0.2em 0
  @media (min-width 639px) and (max-width 899px)
    padding 0.35em 0
  @media (min-width 899px)
    padding 0.5em 0
  border-top 1px solid #ddd
  border-bottom 1px solid #ddd
  background-color #f7f7f7

.header-item
  display inline-block
  vertical-align middle
  text-align center

.qid
  @media (max-width 299px)
    width 20%
  @media (min-width 299px) and (max-width 639px)
    width 26%
  @media (min-width 639px)
    width 15%

.header-question
  @media (max-width 639px)
    display none
  @media (min-width 639px)
    width 50%

.answer
  @media (max-width 299px)
    width 35.5%
  @media (min-width 299px) and (max-width 639px)
    width 34%
  @media (min-width 639px)
    width 15%

.answer-cont
  @media (min-width 639px)
    font-size 1.2em
  @media (min-width 399px) and (max-width 639px)
    font-size 1.08em

.cv-body
  @media (max-width 399px)
    padding 0.5em 0.75em
  @media (min-width 399px) and (max-width 639px)
    padding 0.5em 1.5em
  @media (min-width 639px) and (max-width 899px)
    padding 0.5em 2.5em
  @media (min-width 899px)
    padding 0.5em 5em

.body-question
  @media (min-width 639px)
    display none
  font-weight bold

.cv-body-item
  font-weight bold
  color #bbb
  @media (min-width 299px)
    display inline-block
    width 8%
    min-width 55px
    vertical-align top
  @media (max-width 299px)
    text-align center
    margin-bottom 0.1em

.cv-body-content
  display inline-block
  vertical-align top
  margin-bottom 0.5em
  @media (min-width 853px)
    width 90%
  @media (min-width 484px) and (max-width 853px)
    width 80%
  @media (min-width 361px) and (max-width 484px)
    width 75%
  @media (min-width 299px) and (max-width 361px)
    width 70%
  @media (max-width 299px)
    display block
    text-align center
    margin-bottom 0.75em

.explanation
  font-style italic

.correct
  color #0c0

.incorrect
  color #e00

.container
  margin 0 auto
  @media (min-width 639px)
    padding 0.3em 2em
  @media (min-width 399px) and (max-width 639px)
    padding 0.3em 1em
  @media (max-width 399px)
    padding 0.3em 0
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
