<template>
  <div id="app">
    <!--<tab>-->
      <!--<tab-item @on-item-click="goToLink('/index')" selected>首页</tab-item>-->
      <!--<tab-item @on-item-click="goToLink('/job_list')">列表</tab-item>-->
      <!--<tab-item @on-item-click="goToLink('/user')">个人中心</tab-item>-->
    <!--</tab>-->
    <Loading></Loading>
    <div class="overlay" v-show="isOverlay" @click="hideAllPanel"></div>
    <div class="sidebar_menu" :class="{ active: isSideActive }">
      <SideMenu></SideMenu>
    </div>
    <PageHeader></PageHeader>
    <div class="wraper">
      <transition name="fade-fast">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script type="text/babel">
  import { Tab, TabItem } from 'vux'
  import ApiMixin from './assets/js/apis-mixins'
  import FnMixin from './assets/js/fn-mixins'
  import SideMenu from './components/common/side-menu.vue'
  import Loading from './components/common/loading.vue'
  import PageHeader from './components/common/header.vue'

  export default {
    name: 'app',
    components: {
      Tab,
      TabItem,
      SideMenu,
      Loading,
      PageHeader,
    },
    data() {
      return {
        data: null,
        hideAllPanel: true,
      }
    },
    computed: {
      isOverlay() {
        return this.$store.getters.getOverlay
      },
      isSideActive() {
        return this.$store.getters.getSideMenu
      },
    },
    methods: {
      handler() {
        console.log(123)
      },
    },
    mixins: [
      ApiMixin,
      FnMixin,
      Loading,
      PageHeader,
    ],
  }
</script>
<!--suppress CssUnknownTarget -->
<style lang="less">
  @import '~vux/src/styles/reset';
</style>
<style>
  .vux-tab{
    position: fixed !important;
    top: 0;
    width: 100%;
    display: flex;
    background-color: #fff;
    height: 44px;
    z-index: 999;
  }
</style>
