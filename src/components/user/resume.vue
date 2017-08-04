<template>
  <div>
    <panel :list="list" :type="type"></panel>
      <div class="p-l-20 p-r-20">
        <x-button type="primary" class="m-t-20 ">退出登录</x-button>
      </div>
    </div>
</template>
<script type="text/babel">
  //  import _ from 'lodash'
  import { Search, Panel, XButton } from 'vux'
  import FnMixin from '../../assets/js/fn-mixins'
  import ApiMixin from '../../assets/js/apis-mixins'
  //  import windPowerData from '../../static/windPowerData.json'

  export default{
    data() {
      return {
        type: '1',
        list: [
          {
            src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
            title: '张三',
            desc: '完善简历',
            url: '/#',
          },
        ],
      }
    },
    methods: {
      resultClick(item) {
        console.log(item)
      },
      getResult(val) {
        console.log(val)
      },
      onFocus() {
        console.log('on focus')
      },
      onCancel() {
        console.log('on cancel')
      },
    },
    components: {
      Search,
      Panel,
      XButton,
    },
    mixins: [FnMixin, ApiMixin],
  }
</script>
<style scoped>
  .bm-view {
    width: 100vw;
    height: 80vh;
  }
</style>
