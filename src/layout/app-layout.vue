<template>
  <div>
    <app-header />
    <main class="container main-wrapper">
      <slot />
    </main>
    <app-footer />
  </div>
</template>

<script>
import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'

export default {
  name: 'AppLayout',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>
<style lang="scss" scoped>
.main-wrapper {
  // height: 88vh;
  min-height: 700px;
}
</style>
