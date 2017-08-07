export default [
  {
    path: '/',
    component(resolve) {
      require(['./components/list/job_list.vue'], resolve)
    },
    name: '',
  },
  // {
  //   path: '/index',
  //   component(resolve) {
  //     require(['./components/index.vue'], resolve)
  //   },
  //   name: 'Index',
  // },
  {
    path: '/job_list',
    component(resolve) {
      require(['./components/list/job_list.vue'], resolve)
    },
    name: 'Job_list',
  },
  {
    path: '/detail/:id',
    component(resolve) {
      require(['./components/detail/detail.vue'], resolve)
    },
    name: 'Detail',
  },
  {
    path: '/user',
    component(resolve) {
      require(['./components/user/user.vue'], resolve)
    },
    name: 'User',
  },
  {
    path: '/edit_resume',
    component(resolve) {
      require(['./components/user/edit_resume.vue'], resolve)
    },
    name: 'Edit_resume',
  },
  {
    path: '/add_job',
    component(resolve) {
      require(['./components/add_job/index.vue'], resolve)
    },
    name: 'Add_job',
  },
  {
    path: '/release_list',
    component(resolve) {
      require(['./components/list/release_list.vue'], resolve)
    },
    name: 'Release_list',
  },
  {
    path: '/apply_list',
    component(resolve) {
      require(['./components/list/apply_list.vue'], resolve)
    },
    name: 'Apply_list',
  },
  {
    path: '/signup',
    component(resolve) {
      require(['./components/login/signup.vue'], resolve)
    },
    name: 'signup',
  },
  {
    path: '/login',
    component(resolve) {
      require(['./components/login/index.vue'], resolve)
    },
    name: 'login',
  },
  {
    path: '*',
    component(resolve) {
      require(['./components/common/page_error.vue'], resolve)
    },
    name: 'PageError',
  },
]
