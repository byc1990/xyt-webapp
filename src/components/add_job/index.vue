<template>
  <div>
    <x-input required title="标题" placeholder="请输入" v-model="title"></x-input>
    <x-input required title="公司名称" placeholder="请输入" v-model="company"></x-input>
    <!--<x-input required title="选择省份" placeholder="请输入" type="password" v-model="province"></x-input>-->
    <!--<x-input required title="选择城市" placeholder="请输入" type="tel" v-model="city"></x-input>-->
    <x-address required title="现居地" v-model="addressValue" raw-value :list="addressData" value-text-align="left"></x-address>
    <x-input required title="详细地址" placeholder="请输入" v-model="detailAddress"></x-input>
    <x-input required title="岗位要求" placeholder="请输入" v-model="requirement"></x-input>
    <x-input required title="福利待遇" placeholder="请输入" v-model="benefits"></x-input>
    <x-input required title="联系电话" placeholder="请输入" v-model="tel"></x-input>
    <x-input required title="年龄要求" placeholder="请输入" v-model="age"></x-input>
    <x-input required title="薪酬" placeholder="请输入" v-model="salary"></x-input>
    <x-input required title="人数" placeholder="请输入" v-model="num"></x-input>
    <!--<input class="mint-button" type="file" id="thumbnail" accept="image/png, image/jpeg, image/gif, image/jpg" placeholder="选择图片">-->
    <!--<span class="weui-btn weui-btn_primary">-->
            <!--<span>上传图片</span>-->
    <input
      class="weui-btn weui-btn_primary"
      type="file" id="thumbnail"
      placeholder="选择图片"
      accept="image/png, image/jpeg, image/gif, image/jpg">
        <!--</span>-->
    <checklist title="性别要求" :options="genders" v-model="gender"></checklist>
    <!--<mt-checklist-->
      <!--title="性别要求"-->
      <!--v-model="gender"-->
      <!--:options="genders">-->
    <!--</mt-checklist>-->
    <x-textarea title="介绍" placeholder="请输入" v-model="desc"></x-textarea>
    <div class="p-l-10 p-r-10 m-b-10">
      <XButton type="default" size="large" @click.native="save">提交</XButton>
    </div>
    
  </div>
</template>
<script type="text/babel">
  import { Group, Cell, XInput, Selector, XTextarea, PopupPicker, Datetime, XNumber, ChinaAddressData, XAddress, XSwitch, XButton, Checklist } from 'vux'
  
  export default{
    data() {
      return {
        addressData: ChinaAddressData,
        addressValue: ['广东省', '深圳市', '南山区'],
        title: '',
        company: '',
        detailAddress: '',
        requirement: '',
        benefits: '',
        tel: '',
        salary: '',
        age: 0,
        num: '',
        gender: [],
        latitude: 22.551371,
        longitude: 114.105284,
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
        desc: '',
        slots: [
          {
            flex: 1,
            values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
            className: 'slot1',
            textAlign: 'right',
          }, {
            divider: true,
            content: '-',
            className: 'slot2',
          }, {
            flex: 1,
            values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
            className: 'slot3',
            textAlign: 'left',
          },
        ],
      }
    },
    computed: {
      currentUser() {
        let obj
        if (AV.User.current()) {
          obj = AV.User.current()
        } else {
          this.$router.push('/login')
        }
        return obj
      },
    },
    methods: {
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
        console.log('on cancel')
      },
      onCityChange() {
      },
      save() {
        this.$vux.loading.show({
          text: '保存中...',
        })
        if (this.title === '' || this.company === '' || this.detailAddress === '' || this.tel === '' || this.salary === '' || this.num === '') {
          this.$vux.toast.show({
            text: '请填写完整信息',
            type: 'warn',
          })
          return
        }
        const Todo = AV.Object.extend('JobsTest')
        const JobObj = new Todo()
        const userId = this.currentUser.id
        const nickName = this.currentUser._serverData.username
        const file = document.querySelector('#thumbnail').files[0]
        const name = file ? file.name : null
        const avFile = new AV.File(name, file)
        if (name) {
          avFile.save().then((res) => {
            console.log(res)
            JobObj.set('title', this.title)
            JobObj.set('company', this.company)
            JobObj.set('detailAddress', this.detailAddress)
            JobObj.set('requirement', this.requirement)
            JobObj.set('benefits', this.benefits)
            JobObj.set('tel', this.tel)
            JobObj.set('salary', this.salary - 0)
            JobObj.set('num', this.num - 0)
            JobObj.set('age', this.age - 0)
            JobObj.set('thumbnail', res.attributes.url)
            JobObj.set('gender', this.gender)
            JobObj.set('desc', this.desc)
            JobObj.set('latitude', this.latitude)
            JobObj.set('longitude', this.longitude)
            JobObj.set('createdBy', userId)
            JobObj.set('nickName', nickName)
            JobObj.save().then((saveRes) => {
              console.log(saveRes)
              this.$router.push('/job_list')
            })
          })
        } else {
          JobObj.set('title', this.title)
          JobObj.set('company', this.company)
          JobObj.set('detailAddress', this.detailAddress)
          JobObj.set('requirement', this.requirement.split(';'))
          JobObj.set('benefits', this.benefits.split(';'))
          JobObj.set('tel', this.tel)
          JobObj.set('salary', this.salary - 0)
          JobObj.set('num', this.num - 0)
          JobObj.set('age', this.age - 0)
          JobObj.set('gender', this.gender)
          JobObj.set('desc', this.desc)
          JobObj.set('latitude', this.latitude)
          JobObj.set('longitude', this.longitude)
          JobObj.set('createdBy', userId)
          JobObj.set('nickName', nickName)
          JobObj.save().then((saveRes) => {
            console.log(saveRes)
            this.$vux.loading.hide()
            this.$router.push('/job_list')
          })
        }
      },
    },
    components: {
      Group,
      Cell,
      XInput,
      Selector,
      PopupPicker,
      XAddress,
      Datetime,
      XNumber,
      XTextarea,
      XSwitch,
      XButton,
      Checklist,
    },
    created() {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log(pos)
        this.latitude = pos.coords.latitude
        this.longitude = pos.coords.longitude
      }, (err) => {
        console.log(err)
      }, options)
    },
    mixins: [],
  }
</script>
