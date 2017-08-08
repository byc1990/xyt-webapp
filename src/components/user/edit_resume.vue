<template>
  <div class="bg-white">
    <div>
      <x-input placeholder="请输入" title="姓名" v-model="nickName"></x-input>
      <x-input placeholder="请输入" title="年龄" v-model="age"></x-input>
      <selector placeholder="请输入" title="性别" :options="genders" v-model="gender"></selector>
      <datetime
        placeholder="请输入"
        title="出生日期"
        v-model="birthday"
        :min-year=1950
        :max-year=2000
        value-text-align="left"
      ></datetime>
      <x-address
        placeholder="请选择"
        title="现居地"
        v-model="addressValue"
        raw-value
        :list="addressData"
        value-text-align="left"
      ></x-address>
      <x-input title="联系电话" placeholder="请输入" v-model="mobilePhoneNumber"></x-input>
      <!--<x-input placeholder="请输入" title="期望薪资" v-model="salary"></x-input>-->
  </div>
    <div class="p-l-10 p-r-10">
      <XButton size="large" type="primary" @click.native="save">提交</XButton>
    </div>
  </div>
</template>
<script type="text/babel">
  //  import _ from 'lodash'
  import Moment from 'moment'
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
        const monbilePhoneRex = /^1\d{10}$/
        if (!monbilePhoneRex.test(this.mobilePhoneNumber)) {
          this.$vux.toast.show({
            text: '请填写正确的联系电话',
            type: 'warn',
          })
          return
        }
        const currentUserId = AV.User.current().id
        const userObj = AV.Object.createWithoutData('_User', currentUserId)
        userObj.set('nickName', this.nickName)
        userObj.set('province', this.addressValue[0])
        userObj.set('city', this.addressValue[1])
        userObj.set('area', this.addressValue[2])
        userObj.set('gender', this.gender - 0)
        userObj.set('mobilePhoneNumber', this.mobilePhoneNumber)
        userObj.set('birthday', new Date(this.birthday))
        userObj.set('salary', this.salary - 0)
        userObj.setMobilePhoneNumber(this.mobilePhoneNumber)
        userObj.save().then((saveRes) => {
          if (!saveRes.error) {
            this.$vux.toast.show({
              text: '保存成功!',
              type: 'text',
            })
            this.$router.push('/user')
          } else {
            console.log('其他错误')
//            const instance = Toast(error)
//            setTimeout(() => {
//              instance.close()
//            }, 5000)
          }
        }, ((errRes) => {
          this.$vux.toast.show({
            type: 'warn',
            text: errRes.message,
          })
        }))
      },
    },
    created() {
      const currentUserId = AV.User.current().id
      const query = new AV.Query('_User')
      query.get(currentUserId).then((userObj) => {
        console.log('userObj', userObj)
        this.nickName = userObj.attributes.nickName || null
        this.age = userObj.attributes.age || null
        this.gender = userObj.attributes.gender
        this.mobilePhoneNumber = userObj.attributes.mobilePhoneNumber || null
        this.birthday = Moment(userObj.attributes.birthday).format('YYYY-MM-DD') || null
        this.salary = userObj.attributes.salary || null
        this.addressValue = [
          userObj.attributes.province,
          userObj.attributes.city,
          userObj.attributes.area,
        ]
        console.log(this.addressValue)
      })
    },
    mixins: [FnMixin, ApiMixin],
  }
</script>
<style>
  .vux-popup-picker-select-box {
    padding-left: 20px;
  }
  .weui-cell__ft {
    padding-left: 20px;
  }
</style>
