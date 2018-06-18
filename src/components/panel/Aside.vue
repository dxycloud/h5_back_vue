<template>
  <div style="margin-top: 10px;height: 450px;">
    <div style="margin-bottom: 10px;">
      <span class="textHeader">所有商家</span>
    </div>
    <div id="shop_list">
      <div class="single_shop" v-for="shop in shops" :key="shop.custom_pos">
        <el-button style="width: 130px;" size="small">
          {{ shop.name }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PanelAside",
  data() {
    return {
      shops: [
        {
          name: "shop1",
          custom_pos: 1
        },
        {
          name: "shop2",
          custom_pos: 2
        }
      ]
    };
  }
};
</script>

<style scoped>
.headerDiv {
  height: 50px;
}
.textHeader {
  font-size: 24px;
  height: 100px;
  
}
.single_shop {
  font-size: 20px;
  margin: 2px, 0, 0, 0;
  /* height: 40px; */
}
.shop_list {
  text-align: center;
  
}
</style>
