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
        <el-input v-model="shop.url"></el-input>
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
        <el-input v-model="shop.describe"></el-input>
      </el-col>
    </el-row>
    <!-- 标签 -->

    <el-row :gutter="20">
      <el-col :span="4">
        <div style="height: 60px; line-height: 60px; white-space: nowrap; ">
          标签(用于筛选)：
        </div>
      </el-col>
      <el-col :span="20" style="text-align: left;">
        <el-tag :key="tag" v-for="tag in shop.tags" closable :disable-transitions="false" @close="handleTagClose(tag)">
          {{tag}}
        </el-tag>
        <el-input class="input-new-tag" v-if="tagInputVisible" v-model="tagInputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleTagInputConfirm" @blur="handleTagInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showTagInput">+ New Tag</el-button>
      </el-col>
    </el-row>
    <!-- 商户推广特点： -->
    <el-row :gutter="20">
      <el-col :span="4">
        <div style="height: 50px; line-height: 50px; white-space: nowrap; ">
          商户推广特点：
        </div>
      </el-col>
      <el-col :span="4">
        <el-select v-model="shop.feature" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <div style="height: 50px; line-height: 50px; white-space: nowrap; ">
          额度：
        </div>
      </el-col>
      <el-col :span="4">
        <el-input-number v-model="shop.loan_range[0]"></el-input-number>
      </el-col>
      <el-col :span="1">
        <div style="height: 40px; line-height: 40px; white-space: nowrap; ">
          到
        </div>
      </el-col>
      <el-col :span="4">
        <el-input-number v-model="shop.loan_range[1]"></el-input-number>
      </el-col>
    </el-row>

    <!-- 用户数和权重 -->
    <el-row :gutter="20 ">
      <!-- 用户数 -->
      <el-col :span="4">
        <div style="height: 50px; line-height: 50px; white-space: nowrap; ">
          用户数：
        </div>
      </el-col>
      <el-col :span="4" style="text-align: left">
        <el-input-number v-model="shop.user_n"></el-input-number>
      </el-col>
      <!-- 权重 -->
      <el-col :span="4">
        <div style="height: 50px; line-height: 50px; white-space: nowrap; ">
          权重：
        </div>
      </el-col>
      <el-col :span="4" style="text-align: left">
        <el-input-number v-model="shop.weight"></el-input-number>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "PanelShopInfo",
  data() {
    return {
      tagInputVisible: false,
      tagInputValue: "",
      options: [
        {
          value: "人气必选",
          label: "人气必选"
        },
        {
          value: "不查征信",
          label: "不查征信"
        },
        {
          value: "",
          label: "无"
        }
      ]
    };
  },
  props: ["shop"],
  methods: {
    // tag
    handleTagClose(tag) {
      this.$props.shop.tags.splice(this.$props.shop.tags.indexOf(tag), 1);
    },
    showTagInput() {
      this.tagInputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleTagInputConfirm() {
      let tagInputValue = this.tagInputValue;
      if (tagInputValue) {
        this.$props.shop.tags.push(tagInputValue);
      }
      this.tagInputVisible = false;
      this.tagInputValue = "";
    }
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
