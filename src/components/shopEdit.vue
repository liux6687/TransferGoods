<template>
	<div class="shopEdit">
		<cardTitle :titlePath="titlePath"></cardTitle>
		<div class="shopEdit-content">
			<Card>
				<p slot="title" @click="isReturn"><Icon style="margin: 0 3px;" type="ios-arrow-dropleft-circle" /><span>返回</span></p>
				<div class="card-main">
					<p class="shop-name">淘宝宝贝名称：<span class="name">{{name}}</span></p>
					<div class="sku-num clearfix">
						<div class="fr">
							<span class="text">已绑定sku个数</span>
							<span class="num">{{sku_binded_num}}/{{sku_num}}</span>
						</div>
					</div>
					<!-- 渲染列表数据 -->
					<div class="color_list" v-for="(item, index) in list" :key="index">
						<div class="tables">
							<table style="width: 100%;">
								<tr class="table-title" style="width: 100%;">
									<td class="table-title-td" style="width: 100%;">
										<div style="width: 250px;">
											<span>颜色:</span>
											<span>{{item.list[0].color}}</span>
										</div>
										<div style="width: 330px;">
											<Col span="5">对应货号:</Col>
											<Col span="19">
												<selectBox :top="1" :top-index="index" :key="index"></selectBox>
											</Col>
										</div>
										<div style="width: 150px;">
											<Col span="12">浮动比例:</Col>
											<Col span="8"><Input v-model="item.top_float_percent"></Input></Col>
											<Col span="2">%</Col>
										</div>
										<div style="width: 250px;">
											<span class="fl">出售价格按:</span>
											<Dropdown class="fl" trigger="click" @on-click="sellPriceSelect(index,$event)">
												 <Button v-if="item.top_select == 1" class="select-dropdown" type="info">
												   百分比
												   <Icon type="ios-arrow-down"></Icon>
												 </Button>
												 <Button v-if="item.top_select == 2" class="select-dropdown" type="info">
												   固定差额
												   <Icon type="ios-arrow-down"></Icon>
												 </Button>
												<DropdownMenu slot="list">
													<DropdownItem name="百分比">百分比</DropdownItem>
													<DropdownItem name="固定差额">固定差额</DropdownItem>
												</DropdownMenu>
											</Dropdown>
											<Input class="fl" v-if="item.top_select == 1" v-model="item.top_price_percent" style="width: 80px; line-height: 51px;"></Input>
											<Input class="fl" v-if="item.top_select == 2" v-model="item.top_diff_amount" style="width: 80px; line-height: 51px;"></Input>
										</div>
										<div class="table-btn-box" style="width: 180px; display: block;">
											<Button style="width: 80px;" @click="all_unbundling(index)" type="success">一键解绑</Button>
											<Button style="width: 80px;" @click="all_setting(index)" type="success">批量设置</Button>
										</div>
									</td>
								</tr>
							</table>
							<!-- 表格主体 -->
							<table style="width: 100%;">
								<tr class="table-main" v-for="(itm, idx) in item.list" :key="idx" style="width: 100%;">
									<td style="width: 20%;">
										<Col span="8">
											<span>尺码: {{itm.size}}</span>
										</Col>
										<Col span="12">
											<span>店铺价: {{itm.price}}</span>
										</Col>
									</td>
									<td style="width: 40%;">
										<Col span="4">对应尺码:</Col>
										<Col span="18">
											<selectBox :top="0" :du_data="itm.du_data"></selectBox>
										</Col>
										<Col span="2"><Button @click="item_cancel" type="info">取消</Button></Col>
									</td>
									<td class="float-ratio" style="width: 10%;">
										<Col span="8">
											<Input v-if="itm.du_data" @on-change="item_change_float_percent(index, idx, $event)"  :value="itm.du_data.float_percent?itm.du_data.float_percent:''"></Input>
											<Input v-else @on-change="item_change_float_percent(index, idx)"></Input>
										</Col>
										<Col span="2">%</Col>
									</td>
									<td class="sell-pirce" style="width: 20%;">
										<Col span="8">
											<!-- 按百分比 -->
											<Input v-if="item.top_select == 1 && itm.du_data" @on-change="item_change_price_percent(index, idx, $event)" v-model="itm.du_data.price_percent"></Input>
											<!-- <Input v-if="item.top_select == 1 && !itm.du_data"></Input> -->
											<!-- 按固定差额 -->
											<Input v-if="item.top_select == 2 && itm.du_data" @on-change="item_change_diff_amount(index, idx, $event)" v-model="itm.du_data.diff_amount"></Input>
											<!-- <Input v-if="item.top_select == 2 && !itm.du_data"></Input> -->
										</Col>
										<Col span="4">
											<span v-if="item.top_select == 1">%</span>
											<span v-if="item.top_select == 2">￥</span>
										</Col>
									</td>
									<td style="width: 5%;">
										<Button type="info" v-if="itm.du_data && itm.du_data.name" @click="item_unbundling(index, idx)">解绑</Button>
									</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<div class="card-footer">
					<div class="btn-box">
						<Button size="large" @click="is_submit" type="info">确认无误后, 点击, 进行批量绑定</Button>
					</div>
					<p class="notes"><Icon class="icon" color="red" type="md-medical" />请仔细检查是否绑定正确，若因绑定失误造成数据混乱则我方不承担责任</p>
				</div>
			</Card>
		</div>
	</div>
</template>

<script>
	import cardTitle from "@/components/common/Title.vue";
	import selectBox from "@/components/common/select.vue";
	export default {
		data() {
			return {
				item_id:'',
				name: "",
				taobao_list: [], // 淘宝数据列表
				du_list:[], //毒的数据列表
				list: [], // 最终的渲染数据
				sku_num: '', //绑定总数
				sku_binded_num: '',// 已绑定数量
				sku_id_list: [], 
				sellPriceSelectText: "百分比",
				
				
				titlePath: [
					{
						menuName: "首页",
						name: ""
					},
					{
						name: "商品列表"
					},
					{
						name: "店铺编辑"
					}
				],
				sellPrice: ''
			}
		},
		components:{
			cardTitle,
			selectBox
		},
		methods:{
			// 返回上一页
			isReturn() {
				this.$router.go(-1);
			},
			// 出售价格切换
			sellPriceSelect(index, name) {
				console.log(index, name)
				if(name == "百分比") {
					this.$data.list[index].top_select = 1;
				}else if(name == "固定差额") {
					this.$data.list[index].top_select = 2;
				}
			},
			// 一键解绑
			all_unbundling(index) {
				console.log(index,"一键解绑")
				let color = this.$data.list[index].list[0].color;
				this.$http.get("/api/batch-remove-binding", {
					params: {
						color
					}
				}).then(res => {
					console.log(res)
				})
			},
			// 批量设置
			all_setting(index) {
				console.log("批量设置")
				let list_ = JSON.parse(JSON.stringify(this.$data.list));
				let top_float_percent = list_[index].top_float_percent;
				let top_price_percent = list_[index].top_price_percent;
				let top_diff_amount = list_[index].top_diff_amount;
				list_[index].list.forEach(item => {
					if(list_[index].top_select = 1) {
						item.du_data.mode = "price_percent"
					}else if(list_[index].top_select = 2) {
						item.du_data.mode = "diff_amount"
					}
					item.du_data.float_percent = top_float_percent;
					item.du_data.price_percent = top_price_percent;
					item.du_data.diff_amount = top_diff_amount;
				})
				this.$data.list = list_
			},
			// 当前项取消
			item_cancel() {
				console.log("当前项取消")
			},
			// 当前项解绑
			item_unbundling(index, idx) {
				console.log(index , idx ,"当前项解绑")
				let id = this.$data.list[index].list[idx].du_data.taobao_sku_id;
				let sku_id = this.$data.list[index].list[idx].du_data.sku_id;
				console.log(id, sku_id)
				this.$http.post("/api/sku-binding/" + id, {
					sku_id
				}).then(res => {
					console.log(res)
				})
			},
			// 批量绑定
			is_submit() {
				console.log(this.$data.list)
				let obj = {};
				this.$data.list.forEach(item => {
					item.list.forEach(itm => {
						obj[itm.id] = {};
						if(JSON.stringify(itm.du_data) != "{}" && itm.du_data) {
							// 如果有name 属性  说明有对应的毒sku_id
							if(itm.du_data.name) {
								let num = itm.du_data.name.lastIndexOf(" ");
								let du_size = itm.du_data.name.substring(num);
								if(Number(itm.size) == Number(du_size)) {
									if(itm.id == itm.du_data.taobao_sku_id) {
										obj[itm.id]["sku_id"] = itm.du_data.id;
									}
								}
							}
							if(itm.du_data.mode) {
								obj[itm.id]["mode"] = itm.du_data.mode;
								obj[itm.id][itm.du_data.mode] = itm.du_data[itm.du_data.mode];
							}else {
								obj[itm.id]["mode"] = "price_percent";
								obj[itm.id]["price_percent"] = "";
							}
							obj[itm.id]["float_percent"] = itm.du_data.float_percent;
						}else {
							obj[itm.id]["float_percent"] = "";
							obj[itm.id]["mode"] = "price_percent";
							obj[itm.id]["price_percent"] = "";
						}
					})
				})
				console.log(obj)
				this.$http.post("/api/post-sku-batch", {
					is_start: 0,
					bindings: obj
				}).then(res => {
					console.log(res)
				})
			},
			item_change_float_percent(index, idx, e) {
				// 修改浮动百分比
				this.$data.list[index].list[idx].du_data.float_percent = e.target.value;
			},
			item_change_price_percent(index, idx, e) {
				// 修改价格百分比
				this.$data.list[index].list[idx].du_data.price_percent = e.target.value;
			},
			item_change_diff_amount(index, idx, e) {
				// 修改固定差额
				this.$data.list[index].list[idx].du_data.diff_amount = e.target.value;
			}
		},
		created() {
			this.$data.item_id = this.$route.query.id;
			// 获取淘宝数据
			this.$http.get("/api/goods-binding-edit/" + this.$route.query.id).then(res => {
				this.$data.name = res.data.data.data.name;
				this.$data.taobao_list = res.data.data.data.skus;
				let skus = res.data.data.data.skus;
				let sku_id_arr = [];
				skus.forEach((item, index) => {
					// 将所有的淘宝skuid组成数组
					sku_id_arr.push(item.id)
				})
				this.$data.sku_id_list = sku_id_arr;
			}).then(() => {
				// 请求绑定数量
				// this.$http.get("/api/skus-bind-status", {
				// 					params: {
				// 						"sku_ids": this.$data.sku_id_list
				// 					}
				// 				}).then(res => {
				// 					console.log(res)
				// 				})
				// 请求毒的数据列表
				this.$http.get("/api/skus-bind-status", {
					params: {
						"sku_ids": this.$data.sku_id_list
					}
				}).then(res => {
					if(res.data.status == 200) {
						this.$data.du_list = res.data.data;
					}
				}).then(() => {
					let color_arr = [];
					let new_color_arr = [];
					let list = [];
					let taobao_list_ = this.$data.taobao_list; //备份淘宝数据
					taobao_list_.forEach((tb_item, tb_index) => {
						// 将淘宝数据的颜色属性组成数组
						color_arr.push(tb_item.color)
						// tb_item["sell_status"] = ["百分比", "固定差额"]
						// 将毒数据中与淘宝数据中鞋码相同的放到一起
						if(this.$data.du_list.length == 0) {
							tb_item["du_data"] = {}
						}
						this.$data.du_list.forEach((du_item, du_index) => {
							let num = du_item.name.lastIndexOf(" ");
							let du_size = du_item.name.substring(num);
							if(Number(tb_item.size)==Number(du_size)) {
								tb_item["du_data"] = du_item
								if(tb_item.id == du_item.taobao_sku_id) {
									tb_item["du_data"] = du_item
								}else {
									tb_item["du_data"] = {}
								}
							}
						})
					})
					this.$data.taobao_list = taobao_list_ //更新淘宝数据
					// 颜色数组去重
					color_arr.forEach((item, index) => {
						if(new_color_arr.indexOf(item) == -1) {
							new_color_arr.push(item)
						}else {
							new_color_arr[item] = item
						}
					})
					//淘宝数据根据颜色不同  分组
					new_color_arr.forEach((item, index) => {
						item = item.replace(/\s*/g,"");
						let obj = {};
						obj.top_select = 1;
						obj.top_float_percent = '';
						obj.top_price_percent = '';
						obj.top_diff_amount = '';
						let arr = [];
						this.$data.taobao_list.forEach((itm, idx) => {
							let color = itm.color.replace(/\s*/g,"");
							if(!itm.du_data) {
								itm.du_data = {}
							}
							if(item == color) {
								arr.push(itm)
							}
						})
						obj.list = arr;
						list.push(obj)
					})
					this.$data.list = list;
					console.log(this.$data.list)
				})
			})
		},
	}
</script>

<style scoped lang="less">
	.shopEdit-content {
		width: 80%;
		margin: 0 auto 100px;
		
	}
	.card-main {
		padding: 20px 0px 0px 50px;
	}
	.shop-name {
		font-size: 26px;
		margin: 10px 0;
		color: #000;
		.name {
			font-weight: bold;
		}
	}
	.sku-num {
		height: 45px;
		line-height: 45px;
		.text {
			color: #000;
			font-weight: bold;
		}
		.num {
			font-weight: bold;
			color: #1E90FF!important;
			padding-left: 5px;
		}
	}
	.table-main {
		display: flex;
		align-items: center;
		width: 100%;
		padding: 0 10px;
	}
	.table-title {
		background: #C8E4F7;
	}
	.table-title .table-title-td>div{
		margin-right: 10px;
		float: left;
		line-height: 51px;
	}
	.table-main td {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-right: 10px;
	}
	.table-main td.sell-pirce {
		justify-content: center;
	}
	.table-main td.float-ratio {
		justify-content: flex-end;
	}
	.table-main {
		height: 51px;
		border-top: 1px solid #C8E4F7;
	}
	.size-list-item {
		height: 50px;
		line-height: 50px;
		border-top: 1px solid #C8E4F7;
	}
	.card-footer {
		text-align: center;
		.btn-box {
			padding: 30px 0 20px;
		}
		.notes {
			font-weight: bold;
			line-height: 1;
			font-size: 14px;
			color: #000;
			.icon {
				margin: 0 5px;
			}
		}
	}
</style>
