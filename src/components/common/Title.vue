<template>
  <div class="title">
   <span v-for="(item, index) in titlePath" :key="index">
		 <span>{{item.menuName}}</span>
		 <span v-if="item.name != ''">&gt;&gt;</span>
		 <span v-if="titlePath.length > 1">{{item.name}}</span>
	 </span>
  </div>
</template>

<script>
  export default {
    name: "Title",
		data() {
			return {

			}
		},
		props:["titlePath"],
		methods: {
			
		},
		mounted() {
		}
  }
</script>

<style scoped lang="less">
  .title {
    margin: 0 0 12px;
    border-bottom: 1px dotted #E2E2E2;
    padding:16px 0;
    span {
      font-size: 16px;
      color: #2679B5;
    }
  }
</style>
