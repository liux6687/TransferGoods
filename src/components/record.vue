<template>
	<div class="record">
		<Row class="filter">
			<Col class="select" span="2">
				<Select v-model="filter" style="width:100%">
						<Option v-for="(item, index) in filterArr" :value="item" :key="index">{{item}}</Option>
				</Select>
			</Col>
			<Col class="price_interval" span="6">
				<Form inline>
					<Row>
						<Col span="9">
							<FormItem >
								<Input  placeholder="改价前价格"></Input>
							</FormItem >
						</Col>
						<Col class="line" span="1">-
							<!-- <p >-</p> -->
						</Col>
						<Col span="9">
							<FormItem >
								<Input placeholder="改价后价格"></Input>
							</FormItem >
						</Col>
						<Col span="4">
							<FormItem >
								<Button type="primary" @click="submit">搜索</Button>
							</FormItem >
						</Col>
					</Row>
				</Form>
			</Col>
		</Row>
		<p class="text">注意: 改价记录只保留最近30天的</p>
		<Table border :columns="columns" :data="data"></Table>
	</div>
</template>
<style scoped lang="less">
	.record {
		padding: 0 20px;
		.text {
			color: red;
		}
		.filter {
			background: #F6F6F6;
			padding: 8px 0;
			margin-bottom: 20px;
			.select {
				margin-left: 50px;
			}
			.ivu-form-item {
				margin-bottom: 0!important;
			}
		}
		.line {
			height: 100%;
			line-height: 32px;
		}
		.price_interval {
			margin-left: 30px;
		}
		
	}
</style>
<script>
	export default {
		data() {
			return {
				filter: "",
				filterArr: ["选择日志状态", "失败", "成功", "等待", "无需改价"],
				old_price: "",
				new_price: "",
				columns:[
					{
						title: "商品名称",
						key: "item",
						width: 400,
						render: (h, params) => {
							return h("div",{
								style: {
									lineHeight: "20px",
									fontSize: "14px"
								}
							},[
								h("p",{},"商品：" + params.row.item.name),
								h("p",{},this.setName(params.index))
							])
							
						}
					},
					{
						title: "改价时间",
						key: "updated_at"
					},
					{
						title: "更改前价格",
						key: "price_from"
					},
					{
						title: "更改后价格",
						key: "price_to"
					},
					{
						title: "价格差值",
						key: "diff_amount",
						render: (h, params) => {
							return h("span", {
								style: {
									color: params.row.diff_amount > 0 ? "green" : "red"
								}
							},params.row.diff_amount)
						}
					},
					{
						title: "状态",
						key: "status",
						render: (h, params) => {
							return h("span",{},this.setStatus(params.index))
						}
					},
					{
						title: "失败原因",
						key: "error_message",
					}
				],
				data: []
			}
		},
		methods: {
			submit() {
				console.log(1111)
			},
			setName(index) {
				return this.$data.data[index].sku_name
			},
			setStatus(index) {
				let str = "";
				switch(this.$data.data[index].status){
					case 0: 
					str = "失败";
					break
					case 1: 
					str = "成功";
					break
					case 10:
					str = "等待";
					break
					case 21:
					str = "无需改价"
					break
				}
				return str
 			}
		},
		created() {
			this.$http.get("static/record.json").then((res) => {
				console.log(res)
				if(res.status == 200) {
					this.$data.data = res.data.data;
				}
			})
		}
	}
</script>


