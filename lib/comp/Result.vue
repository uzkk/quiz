<template>
  <div>
    <h3 class="tac">恭喜您完成 {{ level }} 难度测试！</h3>
    <h2 class="tac">您的正确率：{{ correctNum }}/{{ totalNum }}</h2>
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

import Button from './Button'

export default {
  name: 'Result',

  components: {
    Button,
  },

  props: ['level', 'correctNum', 'totalNum'],

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

.row
  margin 1rem 0

.back-btn-container
  width 30%
  margin 1.8em auto

.res-page-back-btn
  width 100%
  display block
  margin 0.8em 0

.container
  margin 1em auto
  padding 2em
  border-radius .5em
  background-color #fff
  max-width 1080px

  > :first-child
    margin-top 0

  > :last-child
    margin-bottom 0

  h3
    margin 0

  table
    max-width 100%
    border-collapse collapse
    margin 1.5rem auto 0
    text-align center

  tr
    border-top 1px solid #dfe2e5
    &:nth-child(2n)
      background-color #f6f8fa

  th, td
    border 1px solid #dfe2e5
    padding .6em 1em

</style>
