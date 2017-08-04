<template>
  <div>
    <!--<XHeader fixed :title="title">-->
      <!--<span slot="left">-->
        <!--<span v-show="pathName !== 'AddNew-2'">-->
          <!--<XButton icon="back" @click.native="handleBack" v-show="currentPath !== '/'">返回</XButton>-->
        <!--</span>-->
        <!--&lt;!&ndash;<span class="p-l-10" @click="closeApp" v-show="currentPath == '/'">&ndash;&gt;-->
          <!--&lt;!&ndash;关闭&ndash;&gt;-->
        <!--&lt;!&ndash;</span>&ndash;&gt;-->
      <!--</span>-->
      <!--<span slot="right">-->
        <!--<XIcon type="ios-arrow-up" class="icon-red" @click.native="toggleSideMenu"></XIcon>-->
      <!--</span>-->
    <!--</XHeader>-->
    <x-header :right-options="{showMore: true}" @on-click-more="toggleSideMenu">xyt</x-header>
  </div>
</template>
<script type="text/babel">
  import { XHeader } from 'vux'
  
  export default{
    components: {
      XHeader,
    },
    data() {
      return {
        msg: 'data',
        pathName: '',
      }
    },
    computed: {
      currentPath() {
        return '/'
      },
      title() {
        return 'xyt'
      },
    },
    methods: {
      closeApp() {
      },
      handleBack() {
        if (history.length) {
          if (this.pathName === 'AddNew') {
            this.$route.router.push('/')
          } else {
            history.back()
          }
        } else {
          this.closeApp()
        }
      },
      toggleSideMenu() {
        this.$store.dispatch('toggleSideMenu')
        this.$store.dispatch('toggleOverlay')
      },
    },
  }
</script>
