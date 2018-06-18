<template>
  <el-container>
    <el-aside width="150px">
      <panel-aside></panel-aside>
    </el-aside>
    <el-container>
      <el-header>
        <panel-header></panel-header>
      </el-header>
      <el-main>
        <panel-shop-info></panel-shop-info>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import PanelAside from "./Aside.vue";
import PanelHeader from "./Header.vue";
import PanelShopInfo from "./ShopInfo.vue";

export default {
  name: "Panel",
  components: {
    PanelAside,
    PanelHeader,
    PanelShopInfo
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
</style>
