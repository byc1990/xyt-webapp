<template>
  <div>
    <!--<search @result-click="resultClick"-->
            <!--@on-change="getResult"-->
            <!--:results="results"-->
            <!--v-model="value"-->
            <!--position="fixed"-->
            <!--auto-scroll-to-top-->
            <!--top="46px"-->
            <!--@on-focus="onFocus"-->
            <!--@on-cancel="onCancel"></search>-->
    <!--<baidu-map class="map-container">-->
      <!--<bm-view class="bm-view">-->
      <!--</bm-view>-->
      <!--&lt;!&ndash;<bm-local-search :keyword="keyword" :auto-viewport="true" :location="location"></bm-local-search>&ndash;&gt;-->
      <!--<bm-geolocation :showAddressBar="true" :autoLocation="true"/>-->
    <!--</baidu-map>-->
    <div style="height: 100vh">
      <iframe src="./map.html"
              width="100%"
              height="100%"
              frameborder="0"
      ></iframe>
    </div>
  </div>
</template>
<script type="text/babel">
//  import _ from 'lodash'
  import { Search } from 'vux'
  import FnMixin from '../assets/js/fn-mixins'
  import ApiMixin from '../assets/js/apis-mixins'
//  import BMap from './common/b-map.vue'

  export default{
    data() {
      return {
        location: '北京',
        keyword: '公司',
        results: [],
        value: '职位、公司',
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
//      BMap,
    },
    created() {
      const TestObject = AV.Object.extend('TestObject')
      const testObject = new TestObject()
      testObject.save({
        words: 'Hello World!',
      }).then((object) => {
        console.log('LeanCloud Rocks!', object)
      })
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
