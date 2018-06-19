<template>
  <div>
    <el-row style="margin-bottom: 10px;">
      <el-col :span="8" :offset="8">
        <img :src="shop.logo_url" alt="" style="width:50px; margin: 0 auto;">
        <div style="margin: auto;">
          <span> {{shop.name}} </span>
        </div>
      </el-col>
    </el-row>
    <!-- 网站地址 -->
    <el-row :gutter="20 ">
      <el-col :span="4 ">
        <div style="height: 50px; line-height: 50px; white-space: nowrap; ">
          商家网站地址：
        </div>
      </el-col>
      <el-col :span="20 ">
        <el-input v-model="shop.url " :disabled="true "></el-input>
      </el-col>
    </el-row>
    <!-- 商户描述 -->
    <el-row :gutter="20 ">
      <el-col :span="4 ">
        <div style="height: 50px; line-height: 50px; white-space: nowrap; ">
          商户描述：
        </div>
      </el-col>
      <el-col :span="20 ">
        <el-input v-model="shop.describe " :disabled="true "></el-input>
      </el-col>
    </el-row>
    <!-- 标签 -->
    <el-row :gutter="20 ">
      <el-col :span="4 ">
        <div style="height: 50px; line-height: 50px; white-space: nowrap; ">
          标签(用于筛选)：
        </div>
      </el-col>
      <el-col :span="20" style="text-align: left;">
        <el-tag :key="tag" v-for="tag in shop.tags" :disable-transitions="false">
          {{ tag }}
        </el-tag>
      </el-col>
    </el-row>
    <!-- 商户推广特点： -->
    <el-row :gutter="20 ">
      <el-col :span="4 ">
        <div style="height: 50px; line-height: 50px; white-space: nowrap; ">
          商户推广特点：
        </div>
      </el-col>
      <el-col :span="20">
        <el-input v-model="shop.feature " :disabled="true "></el-input>
      </el-col>
    </el-row>
    <!-- 用户数 -->
    <el-row :gutter="20 ">
      <el-col :span="4 ">
        <div style="height: 50px; line-height: 50px; white-space: nowrap; ">
          用户数：
        </div>
      </el-col>
      <el-col :span="20" style="text-align: left">
        <el-input-number v-model="shop.user_n" :disabled="true"></el-input-number>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "PanelShopInfo",
  data() {
    return {
    };
  },
  props:['shop'],
  methods: {
  }
};
</script>

<style scoped>
.el-main {
  /* background-color: #e9eef3; */
  /* color: #333; */
  text-align: center;
  line-height: 150px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
