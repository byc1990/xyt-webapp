<template>
  <div>
    <flexbox>
      <flexbox-item :span="10" v-if="!showSearchInput">
        <x-address
          title="选择地区"
          v-model="addressValue"
          raw-value
          :list="addressData"
          value-text-align="left"
        ></x-address>
      </flexbox-item>
      <flexbox-item :span="2" v-if="!showSearchInput">
        <icon type="search" @click.native="showSearchInput = true"></icon>
      </flexbox-item>
      <flexbox-item :span="12">
        <transition name="fade-fast">
          <search
            v-if="showSearchInput"
            v-model="keyText"
            position="absolute"
            auto-scroll-to-top top="46px"
            @on-cancel="showSearchInput = false"
            @on-submit="doSearch"
            ref="search"></search>
        </transition>
      </flexbox-item>
    </flexbox>
    
    <!--<scroller lock-x height="200px" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">-->
      <!--<div class="box2">-->
        <!--<flexbox v-for="(item, index) in list">-->
          <!--<flexbox-item :span="3">-->
            <!--<img :src="item.src" alt="图片">-->
          <!--</flexbox-item>-->
          <!--<flexbox-item :span="9">-->
            <!--<div class="title">{{item.title}}</div>-->
            <!--<div class="desc">{{item.desc}}</div>-->
          <!--</flexbox-item>-->
        <!--</flexbox>-->
        <!--<load-more tip="loading"></load-more>-->
      <!--</div>-->
    <!--</scroller>-->
    <panel v-if="list && list.length" header="列表" :list="list" type="1"></panel>
    <div v-if="list.length < 1" class="m-t-20 p-l-20">
      所选区域暂无数据
    </div>
  </div>
</template>
<script type="text/babel">
  import Jsonp from 'jsonp'
  import { Panel, XAddress, ChinaAddressData, Flexbox, FlexboxItem, Divider, Icon, Search } from 'vux'
  import FnMixin from '../../assets/js/fn-mixins'
  import ApiMixin from '../../assets/js/apis-mixins'

  export default{
    data() {
      return {
        addressData: ChinaAddressData,
        addressValue: [],
        list: [],
        allLoaded: false,
        onFetching: false,
        scrollTop: 0,
        keyText: '',
        showSearchInput: false,
      }
    },
    methods: {
      loadTop() {
        this.$refs.loadmore.onTopLoaded()
      },
      loadBottom() {
        this.allLoaded = true
        this.$refs.loadmore.onBottomLoaded()
      },
      onScrollBottom() {
        if (this.onFetching) {
          // do nothing
        } else {
          this.onFetching = true
          setTimeout(() => {
            this.$nextTick(() => {
              this.$refs.scrollerBottom.reset()
            })
            this.onFetching = false
          }, 2000)
        }
      },
      onCellClick() {
      },
      onClickButton() {
      },
      onShadowChange() {
      },
      doSearch() {
        this.$refs.search.setBlur()
        if (this.keyText) {
          this.$vux.loading.show({
            text: '加载中',
          })
          const query = new AV.Query('JobsTest')
          query.contains('title', this.keyText)
          query.find().then((list) => {
            const arr = []
            _.forEach(list, (item) => {
              const obj = {}
              obj.title = item._serverData.title
//            obj.src = item._serverData.thumbnail
              obj.desc = item._serverData.desc
              obj.url = `/detail/${item.id}`
              arr.push(obj)
            })
            this.list = arr
            this.$vux.loading.hide()
          }, (error) => {
            this.$vux.toast.show({
              text: error.message,
              type: 'warn',
            })
          })
        }
      },
    },
    created() {
      const that = this
      this.$vux.loading.show({
        text: '加载中',
      })
      if (sessionStorage.getItem('province') && sessionStorage.getItem('city')) {
        that.addressValue = [sessionStorage.getItem('province'), sessionStorage.getItem('city')]
      } else {
        navigator.geolocation.getCurrentPosition((pos) => {
          const lat = pos.coords.latitude.toFixed(6)
          const lon = pos.coords.longitude.toFixed(6)
          Jsonp(`http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${lat},${lon}39.983424,116.322987&output=json&pois=1&ak=KMVMX2ByWjGDolZ1M8SYTmHQ`, null, (err, data) => {
            if (err) {
              console.log(err.message)
            } else {
              console.log('地区编号', data.result.addressComponent.adcode)
              const address = data.result.formatted_address
              const provinceIdx = address.indexOf('省')
              const cityIdx = address.indexOf('市')
              const province = address.substring(0, provinceIdx + 1)
              const city = address.substring(provinceIdx + 1, cityIdx + 1)
//              if (data.result.addressComponent && data.result.addressComponent.adcode) {
//                const province = `${data.result.addressComponent.adcode.substring(0, 1)}00000`
//                const city = `${data.result.addressComponent.adcode.substring(0, 4)}00`
              console.log(province, city)
              sessionStorage.setItem('province', province)
              sessionStorage.setItem('city', city)
              that.addressValue = [province, city]
              this.$vux.loading.hide()
//              }
            }
          })
        }, () => {
          this.$vux.toast.show({
            text: '获取位置信息失败',
            type: 'warn',
          })
          const query = new AV.Query('JobsTest')
          query.find().then((list) => {
            const arr = []
            _.forEach(list, (item) => {
              const obj = {}
              obj.title = item._serverData.title
              obj.desc = item._serverData.desc
              obj.url = `/detail/${item.id}`
              arr.push(obj)
            })
            this.list = arr
            this.$vux.loading.hide()
          }, (error) => {
            this.$vux.toast.show({
              text: error.message,
              type: 'warn',
            })
          })
        })
      }
//      this.ApiGetJobs().then((list) => {
//        const arr = []
//        _.forEach(list, (item) => {
//          const obj = {}
//          obj.title = item._serverData.title
//          obj.desc = item._serverData.desc
//          obj.url = `/detail/${item.id}`
//          arr.push(obj)
//        })
//        this.list = arr
//        this.$vux.loading.hide()
//      })
    },
    watch: {
      addressValue(newV) {
        console.log(newV)
        if (newV) {
          if (!parseInt(newV[0], 10) || !parseInt(newV[1], 10)) {
            return
          }
          this.$vux.loading.show({
            text: '加载中',
          })
          const province = newV[0]
          const city = newV[1]
          const query = new AV.Query('JobsTest')
          query.equalTo('province', province)
          query.equalTo('city', city)
          query.find().then((list) => {
            const arr = []
            _.forEach(list, (item) => {
              const obj = {}
              obj.title = item._serverData.title
              obj.desc = item._serverData.desc
              obj.url = `/detail/${item.id}`
              arr.push(obj)
            })
            this.list = arr
            this.$vux.loading.hide()
          }, (error) => {
            this.$vux.toast.show({
              text: error.message,
              type: 'warn',
            })
          })
        }
      },
    },
    components: {
      Panel,
      XAddress,
      Flexbox,
      FlexboxItem,
      Divider,
      Icon,
      Search,
    },
    mixins: [FnMixin, ApiMixin],
  }
</script>
<style>
  img{
    max-width: 100%;
  }
  .vux-popup-picker-select-box {
    padding-left: 20px;
  }
</style>
