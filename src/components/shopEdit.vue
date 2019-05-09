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
							<span class="num">{{data.sku_binded_num}}/{{data.sku_num}}</span>
						</div>
					</div>
					<div class="color_list" v-for="(item, index) in colorList" :key="index">
						<div class="tables">
							<table style="width: 100%;">
								<tr class="table-title" style="width: 100%;">
									<td class="table-title-td" style="width: 100%;">
										<div style="width: 250px;">
											<span>颜色:</span>
											<span>{{item[0].color}}</span>
										</div>
										<div style="width: 330px;">
											<Col span="5">对应货号:</Col>
											<Col span="19">
												<selectBox></selectBox>
											</Col>
										</div>
										<div style="width: 150px;">
											<Col span="12">浮动比例:</Col>
											<Col span="8"><Input></Input></Col>
											<Col span="2">%</Col>
										</div>
										<div style="width: 250px;">
											<span class="fl">出售价格按:</span>
											<Dropdown class="fl" trigger="click">
												 <Button class="select-dropdown" type="info">
												   百分比
												   <Icon type="ios-arrow-down"></Icon>
												 </Button>
												<DropdownMenu slot="list">
													<DropdownItem>百分比</DropdownItem>
													<DropdownItem>固定差额</DropdownItem>
												</DropdownMenu>
											</Dropdown>
											<Input class="fl" style="width: 80px; line-height: 51px;"></Input>
										</div>
										<div class="table-btn-box" style="width: 180px; display: block;">
											<Button style="width: 80px;" type="success">一键解绑</Button>
											<Button style="width: 80px;" type="success">批量设置</Button>
										</div>
									</td>
								</tr>
							</table>
							<table style="width: 100%;">
								<tr class="table-main" v-for="(itm, idx) in item" :key="idx" style="width: 100%;">
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
											<selectBox></selectBox>
										</Col>
										<Col span="2"><Button type="info">取消</Button></Col>
									</td>
									<td class="float-ratio" style="width: 10%;">
										<Col span="8"><Input></Input></Col>
										<Col span="2">%</Col>
									</td>
									<td class="sell-pirce" style="width: 20%;">
										<Col span="8"><Input></Input></Col>
										<Col span="4">%</Col>
									</td>
									<td style="width: 5%;">
										<Button type="info">解绑</Button>
									</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<div class="card-footer">
					<div class="btn-box">
						<Button size="large" type="info">确认无误后, 点击, 进行批量绑定</Button>
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
				name: "",
				colorList: [],
				sku_id_list: [],
				data: '',
				listData: [],
				color: "",
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
				sellPriceList: ["百分比", "固定差额"],
				sellPrice: ''
			}
		},
		components:{
			cardTitle,
			selectBox
		},
		methods:{
			isReturn() {
				this.$router.go(-1);
			}
		},
		created() {
			this.$http.get("/api/goods-binding-edit/" + 4).then((res)=> {
				this.$data.name = res.data.data.data.name;
				let skus = res.data.data.data.skus;
				let arr = []
				let arr_ = []
				let arr__ = []
				let sku_id_list = []
				skus.forEach((item, index) => {
					arr.push(item.color)
					sku_id_list.push(item.id)
				})
				this.$data.sku_id_list = sku_id_list;
				arr.forEach((item, index) => {
					if(arr_.indexOf(item) == -1) {
						arr_.push(item)
					}else {
						arr_[item] = item
					}
				})
				arr_.forEach((item, index) => {
					item = item.replace(/\s*/g,"");
					let arr = [];
					skus.forEach((itm, idx) => {
						let color = itm.color.replace(/\s*/g,"");
						if(item == color) {
							arr.push(itm)
						}
					})
					arr__.push(arr)
				})
				this.$data.colorList = arr__;
			}).then(() => {
				console.log(JSON.stringify(this.$data.sku_id_list))
				this.$http.get("/cr/skus_bind_status").then(res => {
					console.log(res)
				}) 
			})

		}
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
