<template>
  <div class="container">
    <el-row>
      <el-col :span="6" :offset="9">
        <el-input placeholder="用户名" v-model="name"></el-input>
      </el-col>
    </el-row>
    <placeholder></placeholder>
    <el-row>
      <el-col :span="6" :offset="9">
        <el-input placeholder="密码" type="password" v-model="passwd"></el-input>
      </el-col>
    </el-row>
    <placeholder></placeholder>
    <el-row>
      <div class="divCenter">
        <el-button type="primary" v-on:click="login">登录</el-button>
      </div>
    </el-row>
  </div>
</template>

<script>
import placeholder from "./EmptyLine.vue";
import cryto from "../utils/cryto.js";
import router from "../router/index.js";
import config from "../utils/config.js";
import axios from "axios";

export default {
  name: "login",
  components: {
    placeholder: placeholder
  },
  data() {
    return {
      name: "",
      passwd: ""
    };
  },
  methods: {
    login: async function(event) {
      let data = this.$data;
      let passwd_hash = cryto(this.$data.passwd);
      let response = await axios({
        method: 'post',
        url: config.api.user.login, 
        data: {
          name: data.name,
          passwd_hash: passwd_hash
        }
      });
      console.log(response);
      if (response.data.code == 0) {
        config.token = response.data.data.token;
        // 跳转到panel界面
        router.replace("/panel", event => {
          console.log(config.token);
        });
      } else {
        this.$message({
          message: "登录失败，请检查用户名和密码",
          type: "fail"
        });
      }
    }
  }
};
</script>

<style scoped>
.container {
  padding-top: 130px;
  height: 400px;
  background-image: url("../assets/img/background.jpg");
  background-size: 700px;
}
.divCenter {
  text-align: center;
  margin: auto;
}
</style>
