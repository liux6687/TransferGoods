<template>
  <div class="page">
    <Page :total="total"/>
  </div>
</template>

<script>
  export default {
    name: "Page",
    props: ['total']
  }
</script>

<style scoped>

</style>
