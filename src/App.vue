<template>
  <el-container>
    <el-header>
      <el-row type="flex" justify="center">
          <div class="panel">
            <span class="header">
              商家管理系统
            </span>
          </div>
      </el-row>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "App"
};
</script>

<style scoped>
.header {
  font-size: 36px;
  font-weight: bold;
  color: #333366;
}
.panel {
  width: 100%;
  background: #ececec54;
  border-radius: 5px;
  padding: 10px 0px;
  text-align: center;
  box-shadow: inset 0 0 0 1px #ababab;
  /* box-shadow: 0 0 2px black; */
}
</style>
