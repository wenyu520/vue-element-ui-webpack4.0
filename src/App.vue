<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        message: 'BASIC模块的内容'
      }
    }
  }
</script>
<style>
    @import './assets/css/base.css';
    @import './assets/css/common.css';
    @import "./assets/font-awesome-4.7.0/css/font-awesome.min.css";
    /*@import '//at.alicdn.com/t/font_561828_tymp33g1b1.css';*/
    @import "./assets/iconFont/iconfont.css";
    @import "./assets/css/selectTable.css";
    @import "./assets/css/tooltip.css";
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*text-align: center;*/
        color: #2c3e50;
        height: 100%;
    }
</style>
