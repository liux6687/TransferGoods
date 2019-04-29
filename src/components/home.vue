<template>
	<div class="home">
		<Header></Header>
		<Row>
			<Col span="3" class="slide_box">
				<Slide></Slide>
			</Col>
			<Col span="21">
				<Title title="首页" subtitle="店铺设置"></Title>
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
		}
	}
</script>