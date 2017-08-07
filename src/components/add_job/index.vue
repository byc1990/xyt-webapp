<template>
  <div>
    <x-input required title="标题" placeholder="请输入" v-model="title"></x-input>
    <!--<x-input required title="公司名称" placeholder="请输入" v-model="company"></x-input>-->
    <!--<x-input required title="选择省份" placeholder="请输入" type="password" v-model="province"></x-input>-->
    <!--<x-input required title="选择城市" placeholder="请输入" type="tel" v-model="city"></x-input>-->
    <x-input required title="薪酬" placeholder="请输入" v-model="salary"></x-input>
    <x-input required title="联系电话" placeholder="请输入" v-model="tel"></x-input>
    <x-address
      required
      title="所属地区"
      v-model="addressValue"
      :raw-value=true
      :list="addressData"
      value-text-align="left"
    ></x-address>
    
    <x-input required title="详细地址" placeholder="请输入" v-model="detailAddress"></x-input>
    <!--<x-input required title="岗位要求" placeholder="请输入" v-model="requirement"></x-input>-->
    <!--<x-input required title="福利待遇" placeholder="请输入" v-model="benefits"></x-input>-->
    <!--<x-input required title="年龄要求" placeholder="请输入" v-model="age"></x-input>-->
    <!--<x-input required title="人数" placeholder="请输入" v-model="num"></x-input>-->
    <!--<input class="mint-button" type="file" id="thumbnail" accept="image/png, image/jpeg, image/gif, image/jpg" placeholder="选择图片">-->
    <!--<span class="weui-btn weui-btn_primary">-->
            <!--<span>上传图片</span>-->
    <!--<input-->
      <!--class="weui-btn weui-btn_primary"-->
      <!--type="file" id="thumbnail"-->
      <!--placeholder="选择图片"-->
      <!--accept="image/png, image/jpeg, image/gif, image/jpg">-->
        <!--</span>-->
    <!--<checklist title="性别要求" :options="genders" v-model="gender"></checklist>-->
    <!--<mt-checklist-->
      <!--title="性别要求"-->
      <!--v-model="gender"-->
      <!--:options="genders">-->
    <!--</mt-checklist>-->
    <x-textarea
      required
      title="工作说明"
      placeholder="岗位说明; 岗位要求; 年龄要求; 性别要求"
      v-model="desc"
      autosize
    ></x-textarea>
    <div class="p-l-10 p-r-10 p-b-20">
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
        addressValue: ['广东省', '深圳市', '罗湖区'],
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
        const monbilePhoneRex = /^1\d{10}$/
        const telPhoneRex = /\d{3}-\d{8}|\d{4}-\{7,8}/
        if (!monbilePhoneRex.test(this.tel) && !telPhoneRex.test(this.tel)) {
          this.$vux.toast.show({
            text: '请填写正确的联系电话',
            type: 'warn',
          })
          return
        }
        if (this.title === '' || this.detailAddress === '' || this.tel === '' || this.salary === '') {
          this.$vux.toast.show({
            text: '请填写完整信息',
            type: 'warn',
          })
          return
        }
        this.$vux.loading.show({
          text: '保存中...',
        })
        const Todo = AV.Object.extend('JobsTest')
        const JobObj = new Todo()
        const userId = this.currentUser.id
        const nickName = this.currentUser._serverData.username
//        const file = document.querySelector('#thumbnail').files[0]
//        const name = file ? file.name : null
//        const avFile = new AV.File(name, file)
//        if (name) {
//          avFile.save().then((res) => {
//            console.log(res)
//            JobObj.set('title', this.title)
//            JobObj.set('company', this.company)
//            JobObj.set('detailAddress', this.detailAddress)
//            JobObj.set('requirement', this.requirement.split(';'))
//            JobObj.set('benefits', this.benefits.split(';'))
//            JobObj.set('tel', this.tel)
//            JobObj.set('salary', this.salary - 0)
//            JobObj.set('num', this.num - 0)
//            JobObj.set('age', this.age - 0)
//            JobObj.set('thumbnail', res.attributes.url)
//            JobObj.set('gender', this.gender)
//            JobObj.set('desc', this.desc)
//            JobObj.set('latitude', this.latitude)
//            JobObj.set('longitude', this.longitude)
//            JobObj.set('city', this.addressValue[1])
//            JobObj.set('province', this.addressValue[0])
//            JobObj.set('createdBy', userId)
//            JobObj.set('nickName', nickName)
//            JobObj.save().then((saveRes) => {
//              console.log(saveRes)
//              this.$router.push('/job_list')
//            })
//          })
//        } else {
        JobObj.set('title', this.title)
//        JobObj.set('company', this.company)
        JobObj.set('detailAddress', this.detailAddress)
//        JobObj.set('requirement', this.requirement.split(';'))
//        JobObj.set('benefits', this.benefits.split(';'))
        JobObj.set('tel', this.tel)
        JobObj.set('salary', this.salary)
//        JobObj.set('num', this.num)
//        JobObj.set('age', this.age)
//        JobObj.set('gender', this.gender)
        JobObj.set('city', this.addressValue[1])
        JobObj.set('province', this.addressValue[0])
        JobObj.set('desc', this.desc)
        JobObj.set('latitude', this.latitude)
        JobObj.set('longitude', this.longitude)
        JobObj.set('createdBy', userId)
        JobObj.set('nickName', nickName)
        JobObj.save().then((saveRes) => {
          console.log(saveRes)
          this.$vux.loading.hide()
          this.$router.push('/job_list')
        }, (error) => {
          this.$vux.toast.show({
            text: error.message,
            type: 'warn',
          })
        })
//        }
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
      const that = this
      const currentUser = AV.User.current()
      if (currentUser) {
        if (sessionStorage.getItem('province') && sessionStorage.getItem('city')) {
          that.addressValue = [sessionStorage.getItem('province'), sessionStorage.getItem('city')]
        } else {
          navigator.geolocation.getCurrentPosition((pos) => {
            const lat = pos.coords.latitude.toFixed(6)
            const lon = pos.coords.longitude.toFixed(6)
            Jsonp(`http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${lat},${lon}39.983424,116.322987&output=json&pois=1&ak=KMVMX2ByWjGDolZ1M8SYTmHQ`, null, (err, data) => {
              if (err) {
                console.log(err.message)
              } else {
                console.log('地区编号', data.result.addressComponent.adcode)
                const address = data.result.formatted_address
                const provinceIdx = address.indexOf('省')
                const cityIdx = address.indexOf('市')
                const province = address.substring(0, provinceIdx + 1)
                const city = address.substring(provinceIdx + 1, cityIdx + 1)
                console.log(province, city)
                sessionStorage.setItem('province', province)
                sessionStorage.setItem('city', city)
                that.addressValue = [province, city]
                this.$vux.loading.hide()
              }
            })
          }, () => {
            this.$vux.toast.show({
              text: '获取位置信息失败, 请手动选择',
              type: 'warn',
            })
          })
        }
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
    mixins: [],
  }
</script>
<style>
  .vux-popup-picker-select-box {
    padding-left: 20px;
  }
</style>
