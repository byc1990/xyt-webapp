<template>
  <div>
    <x-address title="" v-model="addressValue" raw-value :list="addressData" value-text-align="left"></x-address>
    <panel header="列表" :list="list" type="1"></panel>
    <!--<cell title="title" value="value"></cell>-->
    <!--<mt-cell :title="item._serverData.title"-->
             <!--v-for="item in list"-->
             <!--class="item"-->
             <!--@click.native="linkTo('/detail/' + item.id)"-->
             <!--:label="item.desc"-->
             <!--is-link>-->
      <!--<img slot="icon"-->
           <!--:src="item._serverData.thumbnail"-->
           <!--width="60"-->
           <!--height="60">-->
    <!--</mt-cell>-->
  </div>
</template>
<script type="text/babel">
  import { Panel, XAddress, ChinaAddressData } from 'vux'
  import FnMixin from '../../assets/js/fn-mixins'
  import ApiMixin from '../../assets/js/apis-mixins'

  export default{
    data() {
      return {
        addressData: ChinaAddressData,
        addressValue: ['广东省', '深圳市', '南山区'],
        list: [],
        allLoaded: false,
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
    components: {
      Panel,
      XAddress,
    },
    mixins: [FnMixin, ApiMixin],
  }
</script>
<style>
  /*.mint-cell-title {*/
    /*padding: 20px 10px;*/
  /*}*/
  /*.desc {*/
    /*overflow:hidden;*/
    /*text-overflow:ellipsis;*/
    /*display:-webkit-box;*/
    /*-webkit-box-orient:vertical;*/
    /*-webkit-line-clamp:2;*/
  /*}*/
</style>
