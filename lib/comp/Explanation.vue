<template>
  <div class="explanation">
    <template v-for="(node, index) in nodes">
      <div v-if="typeof node === 'string'" :key="index">
        {{ node }}
      </div>
      <div v-else-if="node.type === 'quote'" :key="index" class="quote">
        <div class="quote-text">{{ node.text }}</div>
        <div class="quote-source">——{{ node.source }}</div>
      </div>
      <figure v-else-if="node.type === 'figure'" :key="index" class="figure">
        <image :src="node.src"/>
        <figcaption v-if="node.caption">{{ node.caption }}</figcaption>
      </figure>
    </template>
  </div>
</template>

<script>

export default {
  props: ['data'],

  created () {
    this.nodes = Array.isArray(this.data)
      ? this.data
      : this.data ? [this.data] : []
  },
}

</script>

<style lang="stylus">

.explanation
  > *
    margin 0.5em 0
    &:first-child
      margin-top 0
    &:last-child
      margin-bottom 0

  .quote-source
    margin-top 0.2em
    font-size 0.9em
    text-align right
    color lighten($textColor, 40%)

</style>
