<template>
  <div class="job-card">
    <router-link class="card-link" :to="`/job/detail?jobId=${job.id}`">
      <div class="job-card-content">
        <div class="title-holder">
          <h4 class="content-title">{{ job.name }}</h4>
          <div class="content-tag">{{ job.salary }}</div>
        </div>

        <p v-if="!isSimpleType" class="content-text">
          <span>{{ description }}</span>
        </p>
      </div>
      <div class="job-card-footer">
        <div class="image-holder">
          <img :src="job.imageUrl" alt="" />
        </div>

        <div class="text-holder">
          <span class="footer-info">
            {{ job.company.name }}
          </span>
          <span v-if="!isSimpleType" class="footer-info">
            {{ job.company.financingStage }}
          </span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    isSimpleType: {
      type: Boolean,
      default: false
    },

    job: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    description() {
      return `${this.job.city} ｜ ${this.job.experience} ｜ ${this.job.education}`
    }
  }
}
</script>

<style lang="scss" scoped>
.job-card {
  padding: 18px 12px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 1px 1px 5px rgba($color: #000000, $alpha: 0.3);
  transition: all 0.3s;
  &:hover {
    transform: translateY(-2px);
  }
  &-content {
    .title-holder {
      display: flex;

      justify-content: space-between;
      align-items: center;
      .content-title {
      }
      .content-tag {
        color: rgb(240, 54, 54);
      }
    }
  }
  &-footer {
    display: flex;
    align-items: center;
    .image-holder {
      width: 30px;
      border-radius: 50%;
      box-shadow: 1px 1px 5px rgba($color: #000000, $alpha: 0.3);
      overflow: hidden;
      img {
        width: 100%;
      }
    }
  }
}
</style>
