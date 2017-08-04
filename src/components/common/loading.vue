<template>
  <div>
    <div class="box-center loading-panel" :class="[isLoading ? 'loading-panel-show' : 'loading-panel-hide']">
      <div class="loader-inner ball-triangle-path">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">

  export default{
    components: {},
    data() {
      return {}
    },
    computed: {
      isLoading() {
        return this.$store.getters.getLoading
      },
    },
    methods: {},
    created() {
    },
  }
</script>
