<template>
	<div class="home">
		<Header></Header>
		<Row>
			<Col span="3" class="slide_box">
				<Slide></Slide>
			</Col>
			<Col class="home_content" span="21">
				<router-view></router-view>
			</Col>
		</Row>
	</div>
</template>
<style>
.home_content {
	padding: 0 20px;
}
.slide_box {
	min-height: 100%;
}
</style>
<script>
	import Header from "@/components/common/header";
	import Slide from "@/components/common/slide";
	export default {
		name: "Home",
		data() {
			return {
				
			}
		},
		components:{
			Header,
			Slide
		},
		methods: {
			
		},
		mounted() {
			
		}
	}
</script>