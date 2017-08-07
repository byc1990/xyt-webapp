<template>
  <div>
    <x-input title="用户名" placeholder="请输入用户名" required v-model="username"></x-input>
    <!--<x-input title="真实姓名" placeholder="请输入真实姓名" require v-model="nickName"></x-input>-->
    <x-input title="联系电话" placeholder="请输入联系电话" required type="tel" v-model="mobilePhoneNumber"></x-input>
    <!--<x-input title="年龄" placeholder="请输入年龄" type="number"  v-model="age"></x-input>-->
    <x-input title="密码" placeholder="请输入密码" required type="password" v-model="password"></x-input>
    <x-input title="确认密码" placeholder="再次确认密码" required type="password" v-model="checkPassword"></x-input>
    <!--<radio-->
      <!--title="性别"-->
      <!--v-model="gender"-->
      <!--:options=genders>-->
    <!--</radio>-->
    <XButton size="large" type="primary" @click.native="save">提交</XButton>
  </div>
</template>
<script type="text/babel">
  import { XInput, XButton, Radio } from 'vux'
  import FnMixin from '../../assets/js/fn-mixins'
  import ApiMixin from '../../assets/js/apis-mixins'

  export default{
    data() {
      return {
        username: '',
        nickName: '',
        mobilePhoneNumber: '',
        age: 30,
        password: '',
        checkPassword: '',
        gender: '0',
        genders: [
          {
            value: '男',
            key: '0',
          },
          {
            value: '女',
            key: '1',
          },
        ],
      }
    },
    methods: {
      save() {
        if (this.username === '' || this.mobilePhoneNumber === '' || this.password === '') {
          this.$vux.toast.show({
            text: '请填写完整信息',
            type: 'warn',
          })
          return
        }
        const user = new AV.User()
        user.setUsername(this.username)
        user.setPassword(this.password)
        user.set('age', this.age - 0)
        user.set('nickName', this.nickName)
        user.set('gender', this.gender - 0)
        user.setMobilePhoneNumber(this.mobilePhoneNumber)
        user.signUp().then((loginedUser) => {
          console.log(1111111, loginedUser)
          if (!loginedUser.error) {
            Toast('登陆成功!')
            this.$router.push('/job_list')
          } else {
//            const instance = Toast(error)
//            setTimeout(() => {
//              instance.close()
//            }, 5000)
          }
        }, ((error) => {
          console.log(JSON.stringify(error))
          this.$vux.toast.show({
            text: error.message,
            type: 'warn',
          })
        }))
      },
    },
    created() {
    },
    components: {
      XInput,
      XButton,
      Radio,
    },
    mixins: [FnMixin, ApiMixin],
  }
</script>
<style scoped>
  .bm-view {
    width: 100vw;
    height: 80vh;
  }
  .weui-label {
    width: 5em !important;
  }
</style>
