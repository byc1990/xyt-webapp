<template>
  <div class="p-b-80">
    <!--<img :src="detail.thumbnail" alt="">-->
    <div class='p-10'>
      <div class='display-flex'>
        <div class='flex1'>标题: </div>
        <div class='flex2'>{{detail.title}}</div>
      </div>
      <!--<div class='display-flex'>-->
        <!--<div class='flex1'>公司名称: </div>-->
        <!--<div class='flex2'>{{detail.company}}</div>-->
      <!--</div>-->
      <div class='display-flex'>
        <div class='flex1'>薪资待遇: </div>
        <div class='flex2'>{{detail.salary}}</div>
      </div>
      <div class='display-flex'>
        <div class='flex1'>区域: </div>
        <div class='flex2'>{{getAdderssText([detail.province, detail.city])}}</div>
      </div>
      <div class='display-flex'>
        <div class='flex1'>详细地址: </div>
        <div class='flex2'>{{detail.detailAddress}}</div>
      </div>
      <!--<div class='display-flex'>-->
        <!--<div class='flex1'>gps 位置: </div>-->
        <!--<div class='flex2'>lat: {{detail.latitude}}/lon:{{detail.longitude}}</div>-->
      <!--</div>-->
      <!--<div class='display-flex'>-->
        <!--<div class='flex1'>距离: </div>-->
        <!--<div class='flex2'>{{detail.distance}}KM</div>-->
      <!--</div>-->
      <!--<div class='display-flex'>-->
        <!--<div class='flex1'>性别要求: </div>-->
        <!--<div class='flex2'>{{detail.gender | transformGender}}</div>-->
      <!--</div>-->
      <div class='display-flex'>
        <div class='flex1'>联系电话: </div>
        <div class='flex2'>
          <a v-if="isLogined" :href="'tel:' + detail.tel">{{detail.tel}}</a>
          <router-link v-else to="/login">登陆后查看</router-link>
        </div>
      </div>
      <!--<div class='display-flex'>-->
        <!--<div class='flex1'>职位要求: </div>-->
        <!--<div class='flex2'>-->
          <!--<div v-for="(item, index) in detail.requirement">{{index + 1}}:{{item}}-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class='display-flex'>-->
        <!--<div class='flex1'>福利: </div>-->
        <!--<div class='flex2'>-->
          <!--<div v-for="(item, index) in detail.benefits">{{index + 1}}:{{item}}</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class='display-flex'>-->
        <!--<div class='flex1'>招聘人数: </div>-->
        <!--<div class='flex2'>{{detail.num}} 人</div>-->
      <!--</div>-->
      <div class='display-flex'>
        <div class='flex1'>创建人: </div>
        <div class='flex2'>{{detail.nickName}}</div>
      </div>
      <div class='display-flex'>
        <div class='flex1'>发布时间: </div>
        <div class='flex2'>{{detail.createdAt}}</div>
      </div>
      <!--<div class='display-flex'>-->
        <!--<div class='flex1'>年龄: </div>-->
        <!--<div class='flex2'>{{detail.age}}岁</div>-->
      <!--</div>-->
      <!--<div class='display-flex'>-->
        <!--<div class='flex1'>其他要求: </div>-->
        <!--<div class='flex2'>{{detail.other_req}}</div>-->
      <!--</div>-->
      <div class='display-flex'>
        <div class='flex1'>工作说明: </div>
        <div class='flex2'>{{detail.desc}}</div>
      </div>
    </div>
    <!--<div class="p-l-20 p-r-20" style="position: fixed; bottom: 10px; left: 10px; right: 10px;">-->
      <!--<x-button plain type="primary" style="border-radius:99px; background: #fff;" @click.native="apply(detail.id)" :disabled="haveApplied">{{buttonText}}</x-button>-->
    <!--</div>-->
  </div>
</template>
<script type='text/babel'>
  import { Group, Cell, Panel, Grid, GridItem, GroupTitle, Swiper, XButton, Value2nameFilter as value2name, ChinaAddressV3Data } from 'vux'
  import FnMixin from '../../assets/js/fn-mixins'
  import ApiMixin from '../../assets/js/apis-mixins'
  import FiltersMixin from '../../assets/js/filters-mixins'

  export default{
    data() {
      return {
        applyList: [],
        jobId: null,
        haveApplied: false,
        detail: {
          id: 1,
          titile: '',
          address: '',
          desc: '',
          imgs: [],
        },
      }
    },
    computed: {
      buttonText() {
        return this.haveApplied ? '已申请' : '申请职位'
      },
      isLogined() {
        return !!AV.User.current()
      },
    },
    methods: {
      /*eslint-disable*/
//      apply(jobId) {
//        const userId = AV.User.current().id
//        this.applyList.push(jobId)
//        const user = AV.Object.createWithoutData('_User', userId)
//        user.set('applyList', this.applyList)
//        user.save()
//        this.haveApplied = true
//        this.$vux.toast.show({
//          text: '申请成功',
//        })
//      },
      getAdderssText(value) {
        return value2name(value, ChinaAddressV3Data)
      },
    },
    created() {
      this.$vux.loading.show({
        text: '加载中...',
      })
//      const userId = AV.User.current().id
      this.jobId = this.$route.params.id
//      new AV.Query('_User').get(userId).then((res) => {
//        this.applyList = res.attributes.applyList || []
//        console.log(this.applyList)
//        this.haveApplied = _.includes(this.applyList, this.jobId)
//      })
      new AV.Query('JobsTest')
        .get(this.jobId)
        .then((res) => {
        /* eslint-disable */
          Object.assign(res, res._serverData)
          this.detail = res
          this.detail.createdAt = Moment(this.detail.createdAt).format('YYYY-MM-DD HH:mm')
          this.$vux.loading.hide()
        /* eslint-enable */
        })
        .catch((error) => {
          this.$vux.toast.show({
            text: error.message,
            type: 'warn',
          })
        })
      this.$vux.loading.hide()
    },
    components: {
      Group,
      Cell,
      Panel,
      Grid,
      GridItem,
      GroupTitle,
      Swiper,
      XButton,
    },
    mixins: [FnMixin, ApiMixin, FiltersMixin],
  }
</script>
<style scoped>
  .display-flex {
    display: flex;
  }
  
  .flex1{
    flex: 1;
  }
  
  .flex2{
    flex: 2;
  }
  
  img{
    width: 100%;
  }
</style>
