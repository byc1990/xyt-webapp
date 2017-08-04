<template>
  <div>
    <div id="allmap" v-bind:style="mapStyle"></div>
  </div>
</template>
<script type="text/babel">
  const newBMap = window.newBMap
  
  export default{
    data() {
      return {
        location: '北京',
        keyword: '公司',
        results: [],
        value: '职位、公司',
        mapStyle: {
          width: '100%',
          height: `${this.mapHeight}px`,
        },
      }
    },
    props: {
      mapHeight: {
        type: Number,
        default: 500,
      },
      longitude: {
        type: Number,
        default: 116.404,
      },
      latitude: {
        type: Number,
        default: 39.915,
      },
      description: {
        type: String,
        default: '天安门',
      },
    },
    methods: {},
    created() {
    
    },
    mixins: [],
  }
</script>
<style scoped>
  .bm-view {
    width: 100vw;
    height: 80vh;
  }
</style>
