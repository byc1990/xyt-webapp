<template>
  <div>
    <XHeader class="page-header" :right-options="{showMore: true}" @on-click-more="toggleSideMenu">闲活</XHeader>
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
<style>
  .page-header {
    position: fixed;
    width: 100%;
  }
</style>
