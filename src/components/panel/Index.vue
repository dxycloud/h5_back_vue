<template>
  <el-container>
    <el-aside width="150px">
      <panel-aside :shops="shops" @showInfoEvent="showInfo"></panel-aside>
    </el-aside>
    <el-container>
      <el-header>
        <panel-header :selectedShopName="selected_shop_name" @updateShopEvent="updateShop"></panel-header>
      </el-header>
      <el-main>
        <panel-shop-info :shop="shop_detail">
        </panel-shop-info>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from "axios";

import PanelAside from "./Aside.vue";
import PanelHeader from "./Header.vue";
import PanelShopInfo from "./ShopInfo.vue";
import config from "../../utils/config";

export default {
  name: "Panel",
  components: {
    PanelAside,
    PanelHeader,
    PanelShopInfo
  },
  data() {
    return {
      shops: [],
      default_shop: {
        name: "商户名",
        url: "商户注册网址",
        logo_url: config.upload_img_path + "shop.png",
        tags: [],
        feature: "商户特征",
        user_n: "商户数",
        describe: "商户描述",
        loan_range: [0, 1]
      },
      shop_detail: {
        name: "商户名",
        url: "商户注册网址",
        logo_url: config.upload_img_path + "shop.png",
        tags: [],
        feature: "商户特征",
        user_n: "商户数",
        describe: "商户描述",
        loan_range: [0, 1]
      },
      selected_shop_name: ""
    };
  },
  mounted: async function() {
    let res = await axios.get(config.api.shop.fetch);
    if (res.data.code == 0) {
      this.$data.shops = res.data.data.sort((shopa, shopb) => {
        return shopb.weight - shopa.weight;
      });
    } else {
      this.$message({
        message: "获取商家列表失败，请稍后再试",
        type: "fail"
      });
    }
  },
  methods: {
    showInfo: function(shop_name) {
      let founded = false;
      for (let i = 0; i < this.$data.shops.length; i++) {
        if (shop_name == this.$data.shops[i].name) {
          this.$data.shop_detail = this.$data.shops[i];
          founded = true;
          break;
        }
      }
      if (!founded) {
        this.$data.shop_detail = this.$data.default_shop;
        this.$message({
          message: "内部错误",
          type: "fail"
        });
      } else {
        this.$data.selected_shop_name = shop_name;
      }
    },
    updateShop: async function(is_delete) {
      if (is_delete) {
        this.$data.selected_shop_name = "";
        this.$data.shop_detail = this.$data.default_shop;
      }
      let res = await axios.get(config.api.shop.fetch);
      if (res.data.code == 0) {
        this.$data.shops = res.data.data.sort((shopa, shopb) => {
          return shopb.weight - shopa.weight;
        });
      } else {
        this.$message({
          message: "获取商家列表失败，请稍后再试",
          type: "fail"
        });
      }
    }
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
