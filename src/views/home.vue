<template>
	<div class="home">
		<Header></Header>
		<Row>
			<Col span="3" class="slide_box">
				<Slide></Slide>
			</Col>
			<Col span="21">
				<Title :title="this.$store.state.title" :subtitle="this.$store.state.subtitle"></Title>
				<router-view></router-view>
			</Col>
		</Row>
	</div>
</template>
<style>

</style>
<script>
	import Header from "@/components/common/header";
	import Slide from "@/components/common/slide";
	import Title from "@/components/common/title";
	export default {
		name: "Home",
		data() {
			return {
				
			}
		},
		components:{
			Header,
			Slide,
			Title
		},
		methods: {
			unDateTitle() {
				let path = this.$route.matched[1].path.substr(1).split("/")[0];
				let pageTitle = "首页";
				let subPageTitle = "";
				switch(path) {
					case "goodsList":
					subPageTitle = "商品列表";
					break;
					case "setting": 
					subPageTitle = "设置";
					break;
					case "record":
					subPageTitle = "价格修改记录";
					break;
					default : 
					subPageTitle = "";
				}
				let obj = {
					pageTitle,
					subPageTitle
				}
				// 向全局设置标题
				this.$store.dispatch("sendTitle", obj)
			}
		},
		mounted() {
			this.unDateTitle()
		}
	}
</script>