<template>
  <div class="table-view">
    <table  class="table table-bordered table-striped" cellspacing="0" cellpadding="0" border="0">
      <thead>
      <tr>
        <td v-for="item in tableHead" class="tc">
          {{item}}
        </td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in tableRows">
        <td v-for="item in gridColumns" width="25%" class="tc">
          {{row[item]}}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script type="text/babel">
  export default {
    props: ['tableHead', 'gridColumns', 'tableRows'],
  }
</script>
