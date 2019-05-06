<template>
	<div class="shopEdit">
		<cardTitle :titlePath="titlePath"></cardTitle>
		<div class="shopEdit-content">
			<Card>
				<p slot="title">返回</p>
				<div class="card-main">
					<p class="shop-name">淘宝宝贝名称：<span class="name">{{data.name}}</span></p>
					<div class="sku-num clearfix">
						<div class="fr">
							<span class="text">已绑定sku个数</span>
							<span class="num">{{data.sku_binded_num}}/{{data.sku_num}}</span>
						</div>
					</div>
					<div class="table-box">
						<Row class="table-title">
							<Col class="color" span="6">颜色:{{color}}</Col>
							<Col span="18">
								<Row>
									<Col class="shop-num" span="9" style="margin-right: 15px;">
										<Row>
											<Col span="5">对应货号:</Col>
											<Col span="19">
												<selectBox></selectBox>
											</Col>
										</Row>
									</Col>
									<Col class="ratio" style="margin-right: 10px;" span="4">
										<Row>
											<Col span="12">浮动比例:</Col>
											<Col span="8"><Input></Input></Col>
											<Col span="2">%</Col>
										</Row>
									</Col>
									<Col class="sellPrice" span="7">
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
									</Col>
									<Col class="allSetting" span="3"><Button style="width: 100%;" type="success">批量设置</Button></Col>
								</Row>
							</Col>
						</Row>
						<ul class="size-list">
							<li class="size-list-item" v-for="(item, index) in listData" :key="index">
								<Row>
									<Col span="2">
										<span>尺码: {{item.size}}</span>
									</Col>
									<Col span="4">
										<span>店铺价: {{item.price}}</span>
									</Col>
									<Col span="4">
										<Row>
											<Col span="8">对应尺码:</Col>
											<Col span="16"><selectBox :key="index" :text="item.name"></selectBox></Col>
										</Row>
									</Col>
									<Col span="4">
										<Button>取消</Button>
									</Col>
									<Col span="4">
										<Row>
											<Col span="20"><Input></Input></Col>
											<Col span="4">%</Col>
										</Row>
									</Col>
									<Col span="4">
										<Row>
											<Col span="20"><Input></Input></Col>
											<Col span="4">%</Col>
										</Row>
									</Col>
									<Col span="2">
										<Button>解绑</Button>
									</Col>
								</Row>
							</li>
						</ul>
					</div>
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
			
		},
		created() {
			this.$http.get("static/shopEdit.json").then((res)=> {
				this.$data.data = res.data.data;
				this.$data.listData = res.data.size;
				this.$data.color = res.data.size[0].color; 
				console.log(res)
			})
			// this.$http.get("static/data1.json").then((res)=> {
			// 	console.log(res)
			// 	
			// })
		}
	}
</script>

<style scoped lang="less">
	.shopEdit-content {
		width: 80%;
		margin: 0 auto;
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
	.table-title {
		height: 51px;
		background: #C8E4F7;
		line-height: 51px;
		padding: 0 8px;
	}
	.sellPrice {
		margin-right: 10px;
	}
	.select-dropdown {
		position: relative;
		z-index: 99;
	}
	.size-list-item {
		height: 50px;
		line-height: 50px;
		border-top: 1px solid #C8E4F7;
	}
</style>
