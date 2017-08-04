<template>
  <div class="bg-white">
    <div>
      <x-input title="姓名" v-model="nickName"></x-input>
      <x-input title="年龄" v-model="age"></x-input>
      <selector title="性别" :options="genders" v-model="gender"></selector>
      <datetime title="出生日期" v-model="birthday" value-text-align="left"></datetime>
      <x-address title="现居地" v-model="addressValue" raw-value :list="addressData" value-text-align="left"></x-address>
      <x-input title="联系电话" placeholder="请输入" v-model="mobilePhoneNumber"></x-input>
      <x-input title="期望薪资" v-model="salary"></x-input>
  </div>
    <XButton size="large" type="primary" @click="save">提交</XButton>
  </div>
</template>
<script type="text/babel">
  //  import _ from 'lodash'
  import { Group, Cell, XInput, Checklist, Selector, PopupPicker, Datetime, XNumber, ChinaAddressData, XAddress, XTextarea, XSwitch, XButton } from 'vux'
  import FnMixin from '../../assets/js/fn-mixins'
  import ApiMixin from '../../assets/js/apis-mixins'
  //  import windPowerData from '../../static/windPowerData.json'

  export default{
    components: {
      Group,
      Cell,
      Checklist,
      XInput,
      Selector,
      PopupPicker,
      XAddress,
      Datetime,
      XNumber,
      XTextarea,
      XSwitch,
      XButton,
    },
    data() {
      return {
        addressData: ChinaAddressData,
        addressValue: ['广东省', '深圳市', '南山区'],
        nickName: '张三',
        age: '',
        gender: '',
        mobilePhoneNumber: '',
        birthday: '',
        salary: '',
        numberValue: 0,
        genders: [
          {
            key: '0',
            value: '男',
          },
          {
            key: '1',
            value: '女',
          },
        ],
      }
    },
    methods: {
      save() {
        const user = new AV.User()
        user.setUsername(this.username)
        user.setPassword(this.password)
        user.set('nickName', this.nickName)
        user.set('age', this.age - 0)
        user.set('gender', this.gender - 0)
        user.set('mobilePhoneNumber', this.mobilePhoneNumber)
        user.set('birthday', this.birthday)
        user.set('salary', this.salary - 0)
        user.setMobilePhoneNumber(this.mobilePhoneNumber)
        user.save().then((saveRes) => {
          console.log(1111111, saveRes)
          if (!saveRes.error) {
            Toast('保存成功!')
            this.$router.push('/user')
          } else {
//            const instance = Toast(error)
//            setTimeout(() => {
//              instance.close()
//            }, 5000)
          }
        }, ((error) => {
          console.log(JSON.stringify(error))
        }))
      },
    },
    created() {
      const currentUser = AV.User.current()
      this.nickName = currentUser.attributes.nickName || null
      this.age = currentUser.attributes.age || null
      this.gender = currentUser.attributes.gender || null
      this.mobilePhoneNumber = currentUser.attributes.mobilePhoneNumber || null
      this.birthday = currentUser.attributes.birthday || null
      this.salary = currentUser.attributes.salary || null
    },
    mixins: [FnMixin, ApiMixin],
  }
</script>
