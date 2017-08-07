<template>
  <div>
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
    <panel header="列表" :list="list" type="1"></panel>
  </div>
</template>
<script type="text/babel">
  import { Panel, XAddress, ChinaAddressData } from 'vux'
  import FnMixin from '../../assets/js/fn-mixins'
  import ApiMixin from '../../assets/js/apis-mixins'

  export default{
    components: {
      Panel,
      XAddress,
    },
    data() {
      return {
        addressData: ChinaAddressData,
        addressValue: ['广东省', '深圳市', '南山区'],
        list: [],
        allLoaded: false,
      }
    },
    methods: {
    },
    created() {
      this.$vux.loading.show({
        text: '加载中',
      })
      this.list = []
      const userId = AV.User.current().id
      const nickName = AV.User.current().attributes.username
      const query = new AV.Query('JobsTest')
      query.equalTo('createdBy', userId)
      query.equalTo('nickName', nickName)
      query.find().then((list) => {
        this.list = list
      }, (error) => {
        console.log(error)
      })
      setTimeout(() => {
        const arr = []
        console.log(this.list)
        _.forEach(this.list, (item) => {
          const obj = {}
          obj.title = item._serverData.title
//          obj.src = item._serverData.thumbnail
          obj.desc = item._serverData.desc
          obj.url = `/detail/${item.id}`
          arr.push(obj)
        })
        this.list = arr
        this.$vux.loading.hide()
      }, 2000)
    },
    mixins: [FnMixin, ApiMixin],
  }
</script>
