<template>
  <div>
    <div style="text-align: right; font-size: 12px;">
      <el-button plain size="mini" v-on:click="addShop">添加</el-button>
      <!-- <el-button plain size="mini">修改</el-button> -->
      <el-button type="danger" plain size="mini">删除</el-button>
    </div>
    <el-dialog title="添加商户" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
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
            <el-input v-model="shop.name "></el-input>
          </el-col>
          <!-- 头像 -->
          <el-col :span="4">
            <div style="height: 60px; line-height: 60px; white-space: nowrap; ">
              上传商户头像：
            </div>
          </el-col>
          <el-col :span="8" style="text-align: left">
            <el-upload class="upload_div" action="https://localhost:3000/api/3.0/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
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
            <el-input v-model="shop.name"></el-input>
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
            <el-input v-model="shop.name"></el-input>
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
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
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
          <el-col :span="4 ">
            <div style="height: 60px; line-height: 60px; white-space: nowrap; ">
              商户推广特点：
            </div>
          </el-col>
          <el-col :span="8">
            <el-input v-model="shop.name"></el-input>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
export default {
  name: "PanelHeader",
  data() {
    return {
      imageUrl: "",
      dialogVisible: false,
      inputVisible: false,
      inputValue: "",
      fileList2: [],
      shop: {
        name: "name",
        logo_url: "https://img3.doubanio.com/icon/u155724326-11.jpg",
        tags: ["标签一", "标签二", "标签三"],
        user_n: 100
      }
    };
  },
  methods: {
    handleTagClose(tag) {
      this.$data.shop.tags.splice(this.$data.shop.tags.indexOf(tag), 1);
    },
    showTagInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.$data.shop.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
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
    addShop: function(event) {
      this.$data.dialogVisible = true;
    },
    deleteShop: function(event) {
      // 删除某一个商品
    }
  }
};
</script>

<style scoped>
.avatar {
  width: 60px;
  height: 60px;
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
