<template>
  <div>
    <div style="text-align: right; font-size: 12px;">
      <el-button plain size="mini" v-on:click="dialogVisible = true">添加</el-button>
      <!-- <el-button plain size="mini">修改</el-button> -->
      <el-button type="danger" plain size="mini" @click="deleteShop">删除</el-button>
    </div>
    <el-dialog title="添加商户" :visible.sync="dialogVisible" width="70%" :before-close="handleDialogClose">
      <div>
        <!-- 商户名 和 商户logo -->
        <el-row :gutter="20">
          <!-- 商户名 -->
          <el-col :span="4">
            <div style="height: 60px; line-height: 60px; white-space: nowrap; ">
              商户名：
            </div>
          </el-col>
          <el-col :span="8">
            <el-input v-model="shop.name"></el-input>
          </el-col>
          <!-- 头像 -->
          <el-col :span="4">
            <div style="height: 60px; line-height: 60px; white-space: nowrap; ">
              上传商户头像：
            </div>
          </el-col>
          <el-col :span="8" style="text-align: left">
            <el-upload class="upload_div" action="" :http-request="uploadAvatar" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="shop.logo_url" :src="shop.logo_url" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
        </el-row>
        <!-- 网站地址 -->
        <el-row :gutter="20">
          <el-col :span="4 ">
            <div style="height: 60px; line-height: 60px; white-space: nowrap; ">
              商家网站地址：
            </div>
          </el-col>
          <el-col :span="20 ">
            <el-input v-model="shop.url"></el-input>
          </el-col>
        </el-row>
        <!-- 商户描述 -->
        <el-row :gutter="20">
          <el-col :span="4 ">
            <div style="height: 60px; line-height: 60px; white-space: nowrap; ">
              商户描述：
            </div>
          </el-col>
          <el-col :span="20 ">
            <el-input v-model="shop.describe"></el-input>
          </el-col>
        </el-row>
        <!-- 标签 -->
        <el-row :gutter="20">
          <el-col :span="4 ">
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
        <!-- 用户数和feature -->
        <el-row :gutter="20">
          <!-- 用户数 -->
          <el-col :span="4 ">
            <div style="height: 60px; line-height: 60px; white-space: nowrap; ">
              用户数：
            </div>
          </el-col>
          <el-col :span="8" style="text-align: left">
            <el-input-number v-model="shop.user_n"></el-input-number>
          </el-col>
          <el-col :span="4">
            <div style="height: 60px; line-height: 60px; white-space: nowrap; ">
              商户推广特点：
            </div>
          </el-col>
          <el-col :span="8">
            <el-input v-model="shop.feature"></el-input>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addShop">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import axios from "axios";
import config from "../../utils/config.js";

export default {
  name: "PanelHeader",
  props: ["selectedShopName"],
  data() {
    return {
      dialogVisible: false,
      tagInputVisible: false,
      tagInputValue: "",
      // shop: {
      //   name: "test",
      //   url: "test.com",
      //   logo_url: "test",
      //   tags: ["test"],
      //   user_n: 2,
      //   describe: "test",
      //   feature: "test"
      // }
      shop: {
        name: "",
        url: "",
        logo_url: "",
        tags: [],
        user_n: 0,
        describe: "",
        feature: ""
      }
    };
  },
  methods: {
    // avatar
    uploadAvatar: async function(param) {
      let file = param.file;
      let form = new FormData(); //创建form对象
      form.append("file", file, file.name); //通过append向form对象添加数据
      form.append("chunk", "0"); //添加form表单中其他数据

      let post_config = {
        headers: { "Content-Type": "multipart/form-data" }
      }; //添加请求头
      try {
        let response = await axios.post(config.api.upload, form, post_config);
        if (response.data.code == 0) {
          this.$message({
            message: "上传成功",
            type: "success"
          });
        } else {
          this.$message({
            message: "上传失败",
            type: "fail"
          });
        }
      } catch (err) {
        this.$message({
          message: "网络错误!",
          type: "fail"
        });
      }
    },
    handleAvatarSuccess(res, file) {
      this.$data.shop.logo_url = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    // tag
    handleTagClose(tag) {
      this.$data.shop.tags.splice(this.$data.shop.tags.indexOf(tag), 1);
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
        this.$data.shop.tags.push(tagInputValue);
      }
      this.tagInputVisible = false;
      this.tagInputValue = "";
    },

    // dialog
    handleDialogClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    addShop: async function(event) {
      try {
        let n_shop = this.$data.shop;
        if (n_shop.name && n_shop.url && n_shop.logo_url) {
          let response = await axios({
            method: "post",
            url: config.api.shop.add,
            headers: {
              authorization: config.token
            },
            data: this.$data.shop
          });
          if (response.data.code == 0) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.$emit("updateShopEvent", false);
            this.$data.dialogVisible = false;
          } else {
            this.$message({
              message: "失败 " + response.data.message,
              type: "fail"
            });
          }
        } else {
          this.$message({
            message: "请补全信息",
            type: "fail"
          });
        }
      } catch (err) {
        this.$message({
          message: "网络错误 " + err.message,
          type: "fail"
        });
      }
    },
    deleteShop: async function(event) {
      try {
        let shop_name = this.$props.selectedShopName;
        if (shop_name) {
          let response = await axios({
            method: "post",
            url: config.api.shop.delete,
            headers: {
              authorization: config.token
            },
            data: {
              name: shop_name
            }
          });
          if (response.data.code == 0) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.$emit("updateShopEvent", true);
          } else {
            this.$message({
              message: "失败 " + response.data.message,
              type: "fail"
            });
          }
        } else {
          this.$message({
            message: "失败 内部错误",
            type: "fail"
          });
        }
      } catch (err) {
        this.$message({
          message: "网络错误 " + err.message,
          type: "fail"
        });
      }
    }
  }
};
</script>

<style scoped>
.avatar {
  width: 50px;
  height: 50px;
  display: block;
}
.upload_div {
  height: 60px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
</style>
