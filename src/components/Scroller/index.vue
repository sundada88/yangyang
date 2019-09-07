<template>
  <div
    class="wrapper"
    ref="wrapper"
  >
    <slot></slot>
  </div>
</template>

<script>
import Scroll from 'better-scroll'
export default {
  name: 'Scroller',
  mounted () {
    this.scroll = new Scroll(this.$refs.wrapper, {
      tap: true,
      probeType: 1
    })
    this.scroll.on('scroll', (pos) => {
      this.$emit('handleToScroll', pos)
    })
    this.scroll.on('touchEnd', (pos) => {
      this.$emit('handleToScrollEnd', pos)
    })
  },
  methods: {
    toScrollTop (y) {
      this.scroll.scrollTo(0, y)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
}
</style>
