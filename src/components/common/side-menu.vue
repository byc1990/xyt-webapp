<template>
  <div>
    <div class="p-10 text-right"><i class="fa fa-remove c-g6" @click="toggleSideMenu"></i></div>
    <cell
      :title="item.title"
      :link="item.link"
      is-link v-for="item in menuList"
      :class="[item.active ? 'c-orange b' : '']">
        <span v-show="item.newMsg" style="margin-right: 20px"></span>
    </cell>
    <!--<div class="p-10">-->
      <!--{{currentPath}}-->
    <!---->
    <!--</div>-->
  </div>
</template>
<script type="text/babel">
//  import _ from 'lodash'
  import { Cell } from 'vux'

  export default{
    components: {
      Cell,
    },
    data() {
      return {
        currentPath: 'index',
        newMsg: '',
        menuList: [
//          {
//            title: '首页',
//            link: '/',
//            active: false,
//          },
          {
            title: '职位列表',
            link: '/job_list',
            active: false,
          },
          {
            title: '发布消息',
            link: '/add_job',
            active: false,
          },
          {
            title: '个人中心',
            link: '/user',
            active: false,
          },
        ],
      }
    },
    computed: {
//      currentPath() {
//        _(this.menuList).forEach((item) => {
//          item.active = false
//        })
//        const current = _.find(this.menuList, { link: this.$router.route.path })
//        if (current) {
//          current.active = true
//        }
//      },
    },
    methods: {
      toggleSideMenu() {
        this.$store.dispatch('toggleSideMenu')
        this.$store.dispatch('toggleOverlay')
      },
    },
  }
</script>
<style>
  .sidebar_menu{
    border-left: 1px solid #eee;
  }
</style>
