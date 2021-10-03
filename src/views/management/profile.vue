<template>
  <div class="profile-wrapper">
    <user-profile profile-type="worker" />
  </div>
</template>

<script>
import UserProfile from '@/components/user/user-profile'

export default {
  components: {
    UserProfile
  },

  data() {
    return {}
  }
}
</script>
