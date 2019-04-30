<template>
	<div class="record">
		<p>注意: 改价记录只保留最近30天的</p>
		<Table border :columns="columns" :data="data"></Table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				columns:[
					{
						title: "商品名称",
						key: "name"
					},
					{
						title: "改价时间",
						key: ""
					},
					{
						title: "更改前价格",
						key: ""
					},
					{
						title: "更改后价格",
						key: ""
					},
					{
						title: "价格差值",
						key: ""
					},
					{
						title: "状态",
						key: ""
					},
					{
						title: "失败原因",
						key: ""
					}
				],
				data: []
			}
		},
		created() {
			this.$http.get("static/data.json").then((res) => {
				console.log(res)
				if(res.status == 200) {
					this.$data.data = res.data.data;
				}
			})
		}
	}
</script>

<style>
	.record {
		padding: 0 20px;;
	}
</style>
