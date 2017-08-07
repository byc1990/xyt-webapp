<template>
  <div>
    <div v-if="isLogined">
      <flexbox class="p-t-20 p-b-20">
        <flexbox-item :span="2"></flexbox-item>
        <flexbox-item :span="10">
          <div>
            <div>姓名: {{currentUser.name}}</div>
            <div>电话: {{currentUser.mobilePhoneNumber}}</div>
            <router-link to="/edit_resume">完善个人信息</router-link>
          </div>
        </flexbox-item>
      </flexbox>
      <group>
        <!--<cell :title="'发布信息'" link="/add_job"></cell>-->
        <cell :title="'我的发布'" link="/release_list"></cell>
        <!--<cell :title="'我的申请'" link="/apply_list"></cell>-->
        <!--<cell :title="'分享'" @click.native="showActionsheet" link="/user"></cell>-->
      </group>
      <div class="p-l-20 p-r-20">
        <x-button type="primary" class="m-t-20 " @click.native="logout">退出登录</x-button>
      </div>
      <actionsheet v-model="show4" :menus="menus1" :close-on-clicking-mask="false" show-cancel></actionsheet>
    </div>
    <router-link v-else to="/login">登陆后查看</router-link>
  </div>
</template>
<script type="text/babel">
  import { XButton, Group, Cell, Actionsheet, Flexbox, FlexboxItem } from 'vux'
  import FnMixin from '../../assets/js/fn-mixins'
  import ApiMixin from '../../assets/js/apis-mixins'

  export default{
    data() {
      return {
        show4: false,
        currentUser: {
          name: '',
          mobilePhoneNumber: '',
        },
        menus1: {
          menu1: '微信分享',
          menu2: ' QQ 分享',
        },
        type: '1',
        list: [
          {
            src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
            title: '张三',
            desc: '完善个人信息',
            url: '/edit_resume',
          },
        ],
      }
    },
    computed: {
      isLogined() {
        return !!AV.User.current()
      },
    },
    methods: {
      logout() {
        AV.User.logOut()
        console.log(1111111, AV.User.current())
        this.$router.push('/login')
      },
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
        console.log(1223)
        console.log('on cancel')
      },
      showActionsheet() {
        this.show4 = true
      },
    },
    created() {
      const that = this
      const currentUser = AV.User.current()
      if (currentUser) {
        console.log(currentUser)
        this.currentUser.name = currentUser.attributes.nickName
        this.currentUser.mobilePhoneNumber = currentUser.attributes.mobilePhoneNumber
      } else {
        this.$vux.alert.show({
          title: '提示',
          content: '登陆后继续操作',
          onShow() {
          },
          onHide() {
            that.$router.push('/login')
          },
        })
      }
    },
    components: {
      XButton,
      Group,
      Cell,
      Actionsheet,
      Flexbox,
      FlexboxItem,
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
