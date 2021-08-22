<template>
  <div class="company-tile">
    <div class="company-tile-header">
      <div class="image-holder">
        <img
          src="https://img.bosszhipin.com/beijin/upload/com/workfeel/20210722/5a4f1e3b0ad261d54b110a73195759e0cc87ad5622462609c129bd8d4ad5c5ab.jpg"
          alt=""
        />
      </div>
    </div>
    <div class="company-tile-body">
      <p>D轮 ｜ 游戏 ｜ 1000人以下</p>
    </div>
    <div class="company-tile-footer">
      <a class="link" href="#">了解更多</a>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.company-tile {
  padding: 18px 12px;
  border-radius: 8px;
  box-shadow: 1px 1px 5px rgba($color: #000000, $alpha: 0.3);
  transition: all 0.3s;
  &:hover {
    transform: translateY(-2px);
  }
  &-header {
    .image-holder {
      width: 100%;
      display: flex;
      justify-content: center;
      img {
        width: 80%;
      }
    }
  }
  &-body {
  }
  &-footer {
    text-align: right;
    .link {
      color: #0aa7a7;
    }
  }
}
</style>
