<template>
  <div class="job-card">
    <div class="job-card-content">
      <div class="title-holder">
        <h4 class="content-title">高级前端开发工程师</h4>
        <div class="content-tag">12-20k</div>
      </div>

      <p class="content-text">
        <span>厦门 ｜ 经验不限 ｜ 本科</span>
      </p>
    </div>
    <div class="job-card-footer">
      <div class="image-holder">
        <img
          src="https://img.bosszhipin.com/beijin/upload/com/workfeel/20210722/5a4f1e3b0ad261d54b110a73195759e0cc87ad5622462609c129bd8d4ad5c5ab.jpg"
          alt=""
        />
      </div>

      <div class="text-holder">
        <span class="footer-info">
          字节跳动科技有限公司
        </span>
        <span class="footer-info">已上市</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.job-card {
  padding: 18px 12px;
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
