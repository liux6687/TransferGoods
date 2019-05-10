<template>
	<div class="record">
		<cardTitle :titlePath="titlePath"></cardTitle>
		<Row class="filter">
			<Col class="select" span="2">
				<Dropdown trigger="click" @on-click="filter1">
					<Button style="width:120px">
						{{filter1text}}
						<Icon type="ios-arrow-down"></Icon>
					</Button>
					<DropdownMenu slot="list">
						<DropdownItem :name="item" v-for="(item, index) in filterArr1" :value="item" :key="index">{{item}}</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</Col>
			<Col class="select" span="2">
				<Dropdown trigger="click" @on-click="filter2">
					<Button style="width:120px">
						{{filter2text}}
						<Icon type="ios-arrow-down"></Icon>
					</Button>
					<DropdownMenu slot="list">
						<DropdownItem :name="item" v-for="(item, index) in filterArr2" :value="item" :key="index">{{item}}</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</Col>
			<Col class="price_interval" span="6">
				<Form inline>
					<Row>
						<Col span="9">
							<FormItem >
								<Input v-model="price_min" placeholder="价格差值"></Input>
							</FormItem >
						</Col>
						<Col class="line" span="1">-
							<!-- <p >-</p> -->
						</Col>
						<Col span="9">
							<FormItem >
								<Input v-model="price_max" placeholder="价格差值"></Input>
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
		<Table border :loading="loading" :columns="columns" :data="data"></Table>
		<div class="pages fr">
			<Page :total="total" :current.sync="current_page" :page-size="20" show-elevator prev-text="上一页" next-text="下一页" @on-change="page_change"></Page>
		</div>
	</div>
</template>
<style scoped lang="less">
	.record {
		// padding: 0 20px;
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
		.pages {
			margin-top: 20px;
		}
	}
</style>
<script>
	import cardTitle from "@/components/common/Title.vue"
	export default {
		data() {
			return {
				loading: true,
				filter1text: "选择日志状态",
				filter2text: "选择涨跌状态",
				filterArr1: ["失败", "成功", "等待", "无需改价","无"],
				filterArr2: ["涨跌全有", "价格上涨", "价格下跌", "无"],
				total: 0,
				current_page: 5,
				page: 1,
				is_status: "",
				is_status_price: "",
				price_min: "",
				price_max: "",
				columns:[
					{
						title: "商品名称",
						key: "item",
						width: 500,
						render: (h, params) => {
							return h("div",{
								style: {
									lineHeight: "20px",
									fontSize: "14px",
								}
							},[
								h("p",{},[
									h("span", {}, "商品："),
									h("span", {
										style: {
											color: "red"
										}
									}, params.row.item.name)
								]),
								h("p",{},this.setName(params.index))
							])
							
						}
					},
					{
						title: "改价时间",
						key: "created_at"
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
				data: [],
				titlePath: [
					{
						menuName: "首页",
						name: ''
					},
					{
						name: "价格修改记录"
					}
				]
			}
		},
		components:{
			cardTitle
		},
		methods: {
			// 条件筛选提交按钮
			submit() {
				this.$data.loading = true;
				this.$data.page = 1;
				let {page, is_status, is_status_price, price_min, price_max} = this.$data;
				this.getData(page, "", is_status, is_status_price, price_min, price_max,"id","desc")
			},
			filter1(name) {
				if(name == "无"){
					this.$data.filter1text = "选择日志状态";
					this.$data.is_status = "";
				}else{
					this.$data.filter1text = name;
					switch(name) {
						case "失败":
						this.$data.is_status = -1;
						break;
						case "成功":
						this.$data.is_status = 1;
						break;
						case "等待":
						this.$data.is_status = 2;
						break;
						case "无需改价":
						this.$data.is_status = 3;
						break;
						default: 
						this.$data.is_status = "";
					}
				}
			},
			filter2(name) {
				if(name == "无"){
					this.$data.filter2text = "选择涨跌状态";
					this.$data.is_status_price = "";
				}else{
					this.$data.filter2text = name;
					switch(name) {
						case "涨跌全有":
						this.$data.is_status_price = 1;
						break;
						case "价格上涨":
						this.$data.is_status_price = 2;
						break;
						case "价格下跌":
						this.$data.is_status_price = 3;
						break;
						default: 
						this.$data.is_status_price = "";
					}
				}
			},
			// 表格渲染函数
			setName(index) {
				return this.$data.data[index].sku_name
			},
			// 设置列表状态
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
 			},
			// 分页
			page_change(e) {
				this.$data.loading = true;
				this.$data.page = e;
				let {page, is_status, is_status_price, price_min, price_max} = this.$data;
				this.getData(page, "", is_status, is_status_price, price_min, price_max,"id","desc")
			},
			getData(page="1", item_id="", is_status="", is_status_price="", price_min="", price_max="", order_by="id", order_sort="desc") {
				console.log(page, item_id, is_status, is_status_price, price_min, price_max)
				this.$http.get("/api/change-price-log",{
					params: {
						page,
						item_id,
						is_status: is_status,
						is_status_price,
						price_min,
						price_max,
						order_by,
						order_sort
					}
				}).then(res => {
					this.$data.data = res.data.data.data;
					this.$data.total = res.data.data.total;
					this.$data.current_page = res.data.data.current_page
					this.$data.loading = false;
				})
			}
		},
		created() {
			this.getData()
		}
	}
</script>


