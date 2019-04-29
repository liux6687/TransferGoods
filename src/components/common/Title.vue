<template>
  <div class="title">
    <h1>{{title}}</h1>&gt;&gt;<span>{{subtitle}}</span>
  </div>
</template>

<script>
  export default {
    name: "Title",
    props: ['title', 'subtitle']
  }
</script>

<style scoped lang="less">
  .title {
    margin: 0 0 12px;
    border-bottom: 1px dotted #E2E2E2;
    padding-bottom: 16px;
    padding-top: 7px;
    h1 {
      margin: 0 8px;
      font-size: 24px;
      font-weight: lighter;
      color: #2679B5;
      display: inline-block;
    }
    span {
      margin: 0 6px;
      font-size: 14px;
      font-weight: 400;
      color: #8089A0;
    }
  }
</style>
