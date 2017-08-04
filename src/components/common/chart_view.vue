<template>
  <div class="chart-view">
    <div :id="chartContainerId">
    </div>
  </div>
</template>
<script>
  import Echarts from 'echarts'
  import Moment from 'moment'

  export default{
    data() {
      return {
        myChart: {},
        chartContainerId: `chart-view-container-${Moment().millisecond()}`,
      }
    },
    mounted() {
      const chartContainer = document.getElementById(this.chartContainerId)
      if (chartContainer) {
        chartContainer.style.height = this.height || '50vh'
        chartContainer.style.width = this.width || '100%'
        this.myChart = Echarts.init(chartContainer)
        this.myChart.setOption(this.dataOption)
      }
    },
    computed: {
      seriesData() {
        return this.dataOption.series[0].data
      },
    },
    watch: {
      seriesData() {
        this.myChart.setOption(this.dataOption)
      },
    },
    props: ['width', 'height', 'dataOption'],
  }
</script>
<style scoped>
  .chart-view {
    position: relative;
  }
</style>
