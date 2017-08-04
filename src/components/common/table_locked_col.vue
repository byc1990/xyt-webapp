<template>
  <div class="table-view m-t-10" :id="tableViewId">
    <table class="table table-bordered table-striped table-left" cellspacing="0" cellpadding="0" border="0">
      <thead>
      <tr>
        <td class="tc">
          {{tableHead[0]}}
        </td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in tableRows">
        <td>
          {{row[gridColumns[0]]}}
        </td>
      </tr>
      </tbody>
    </table>
    <table class="table table-bordered table-striped table-content" cellspacing="0" cellpadding="0" border="0">
      <thead>
      <tr>
        <td v-for="item in tableHead" class="tc">
          {{item}}
        </td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in tableRows">
        <td v-for="(item, index) in gridColumns" :class="{tc: index === 0}">
          {{row[item]}}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script type="text/babel">
  import Moment from 'moment'
  
  export default {
    computed: {
      tableViewId() {
        return `table-view-${Moment().millisecond()}`
      },
    },
    props: ['tableHead', 'gridColumns', 'tableRows', 'tableContentWidth'],
  }
</script>
<style scoped>
  .table-view{
    width: 100%;
    overflow-x: auto;
  }
  
  td{
    padding: 4px !important;
    width: 27vw;
    height: 20px;
  }

  .table-left{
    width: 27vw;
    position: absolute;
    background: #fff;
  }

  .table-content{
    table-layout: fixed;
  }

  .table-content tr td:nth-child(1){
    border-right: none !important;
  }

  .table-content tr td:nth-child(2){
    border-left: none !important;
  }
</style>

