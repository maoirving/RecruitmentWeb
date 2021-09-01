<template>
  <div
    class="base-aspect"
    :class="[
      { 'rounded-full': isCircle },
      { 'overflow-hidden': isCircle || isRoundedRectangle },
      { 'rounded-lg': isRoundedRectangle },
      {
        shadow: withShadow
      }
    ]"
    :data-ratio="ratio"
  >
    <div class="base-aspect-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseAspect',

  props: {
    ratio: {
      type: String,
      default: '1:1'
    },
    isCircle: {
      type: Boolean,
      default: false
    },
    isRoundedRectangle: {
      type: Boolean,
      default: false
    },
    withShadow: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.base-aspect {
  position: relative;
  background-color: rgba(0, 0, 0, 0.15);

  &[data-ratio='1:1'] {
    padding-top: 100%;
  }
  &[data-ratio='3:4'] {
    padding-top: 75%;
  }
  &-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    overflow: hidden;
  }
}
</style>
