<template>
  <div>
    <x-address
      title="选择地区"
      v-model="addressValue"
      raw-value
      :list="addressData"
      value-text-align="left"
      :hide-district=true
    ></x-address>
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
  import { Panel, XAddress, ChinaAddressData, Flexbox, FlexboxItem, Divider } from 'vux'
  import FnMixin from '../../assets/js/fn-mixins'
  import ApiMixin from '../../assets/js/apis-mixins'

  export default{
    data() {
      return {
        addressData: ChinaAddressData,
        addressValue: ['湖南省', '长沙市'],
        list: [],
        allLoaded: false,
        onFetching: false,
        scrollTop: 0,
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
      onShadowChange(ids, names) {
        console.log(ids, names)
      },
    },
    created() {
      this.$vux.loading.show({
        text: '加载中',
      })
      this.ApiGetJobs().then((list) => {
        const arr = []
        _.forEach(list, (item) => {
          const obj = {}
          obj.title = item._serverData.title
          obj.src = item._serverData.thumbnail
          obj.desc = item._serverData.desc
          obj.url = `/detail/${item.id}`
          arr.push(obj)
        })
        this.list = arr
        this.$vux.loading.hide()
      })
    },
    watch: {
      addressValue(newV) {
        this.$vux.loading.show({
          text: '加载中',
        })
        console.log(111111, newV)
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
            obj.src = item._serverData.thumbnail
            obj.desc = item._serverData.desc
            obj.url = `/detail/${item.id}`
            arr.push(obj)
          })
          this.list = arr
          this.$vux.loading.hide()
        }, (error) => {
          console.log(error)
        })
      },
    },
    components: {
      Panel,
      XAddress,
      Flexbox,
      FlexboxItem,
      Divider,
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
