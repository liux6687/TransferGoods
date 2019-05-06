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
							<Col class="color" span="7">颜色:{{color}}</Col>
							<Col span="17">
								<Row>
									<Col class="shop-num" span="5">
										<Row>
											<Col span="8">对应货号:</Col>
											<Col span="16">
												<selectBox></selectBox>
											</Col>
										</Row>
									</Col>
									<Col class="ratio" span="5">fudongbili</Col>
									<Col class="sellPrice" span="5">出售价格按:</Col>
									<Col class="allSetting" span="4">批量设置</Col>
								</Row>
							</Col>
							
						</Row>
						<ul class="size-list">
							<li v-for="(item, index) in listData" :key="index">
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
											<Col span="16"><Input></Input></Col>
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
				]
			}
		},
		components:{
			cardTitle,
			selectBox
		},
		created() {
			this.$http.get("static/shopEdit.json").then((res)=> {
				this.$data.data = res.data.data;
				this.$data.listData = res.data.size;
				this.$data.color = res.data.size[0].color; 
				console.log(res)
			})
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
</style>
