<template>
  <div class="tac">
    <h3>请选择要跳转的题号</h3>
    <p>绿色为已选的题目，白色为未选的题目</p>
    <Button
      class="qid-btn"
      v-for="(q, qid) in $quiz.questions"
      :key="qid"
      :type="q.choice >= 0 ? 'success' : 'light'"
      @click="jumpToQuestion(qid)"
    >
      {{ qid + 1 }}
    </Button>
  </div>
</template>

<script>

import { Button } from '@uzkk/components'

export default {
  components: { Button },

  inject: ['$quiz'],

  methods: {
    jumpToQuestion (index) {
      this.$quiz.currentIndex = index
      this.$quiz.phase = 'Select'
    }
  },
}

</script>

<style lang="stylus" scoped>

.qid-btn
  display inline-block
  @media (min-width 899px)
    margin 1em 1.5em
  @media (min-width 639px) and (max-width 899px)
    margin 1em 1em
  @media (min-width 399px) and (max-width 639px)
    margin 1em 0.5em
  @media (max-width 399px)
    margin 1em 0.35em
  width 5%
  min-width 40px

</style>
