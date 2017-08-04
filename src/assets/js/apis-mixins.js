const ApiMixin = {
  handleReqError(req) {
    if (req.data.error) {
      this.$vux.toast.show({
        type: 'text',
        text: req.data && req.data.error ? req.data.error : '未知错误',
      })
    }
    return req.data.error
  },
  handleCatchError(err) {
    this.$vux.toast.show({
      type: 'text',
      text: err.response && err.response.statusText ? err.response.statusText : '未知错误',
    })
    return false
  },
  async usersList() {
    try {
      const req = await axios.get('users')
      this.handleReqError(req)
      return req.data
    } catch (err) {
      this.handleCatchError(err)
      return err
    }
  },
  async user(username) {
    try {
      const req = await axios.get(`users/${username}`)
      this.handleReqError(req)
      return req.data
    } catch (err) {
      this.handleCatchError(err)
      return err
    }
  },
  async ApiGetJobs() {
    const jobList = []
    await new AV.Query('JobsTest')
      .descending('createdAt')
      .find()
      .then((list) => {
        if (list) {
          list.forEach((item) => {
            jobList.push(item)
          })
        }
      })
      .catch(console.error)
    return jobList
  },
  async ApiGetJobDetail(id) {
    let obj
    new AV.Query('JobsTest')
      .get(id)
      .then((res) => {
        console.log(res)
        obj = res
      })
      .catch(console.error)
    return obj
  },
}

export default {
  created() {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  },
  methods: ApiMixin,
}
