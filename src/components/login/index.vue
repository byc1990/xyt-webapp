<template>
  <div class="p-t-50 p-l-10 p-r-10">
    <div class="login-wrap">
      <x-input title="用户名" placeholder="请输入用户名" v-model="username"></x-input>
      <x-input title="密码" placeholder="请输入密码" type="password" v-model="password"></x-input>
      <XButton size="large" @click="doLogin">登陆</XButton>
    </div>
    <router-link to="/signup">注册</router-link>
  </div>
</template>
<script type="text/babel">
  import { XInput, XButton } from 'vux'
  import FnMixin from '../../assets/js/fn-mixins'
  import ApiMixin from '../../assets/js/apis-mixins'

  export default{
    data() {
      return {
        username: '',
        password: '',
      }
    },
    methods: {
      /* eslint-disable */
      doLogin() {
        this.$vux.alert.show({
          title: '警告',
          content: '账号或密码不能为空',
          onShow () {
            console.log('Plugin: I\'m showing')
          },
          onHide () {
            console.log('Plugin: I\'m hiding')
          }
        })
        if (this.username === '' || this.password === '') {
          this.$vux.alert.show({
            title: '警告',
            content: '账号或密码不能为空',
            onShow () {
              console.log('Plugin: I\'m showing')
            },
            onHide () {
              console.log('Plugin: I\'m hiding')
            }
          })
        }
        console.log('login')
        AV.User.logIn(this.username, this.password).then((res) => {
          console.log(res._sessionToken)
          this.$router.push('/job_list')
        }, (error) => {
          console.log(JSON.stringify(error))
        })
      },
    },
    components: {
      XInput,
      XButton,
    },
    created() {
    },
    mixins: [FnMixin, ApiMixin],
  }
</script>
<style scoped>
  .p-t-200 {
    padding-top: 200px;
  }
  .login-wrap{
    border: 1px solid #ddd;
  }
</style>
