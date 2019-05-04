<template>
	<!-- 结构部分 -->
	<div class="login">
		这个是登陆页
		<router-link to="/home">去首页</router-link>
	</div>
</template>
<style scoped lang="less">
	// 样式部分
</style>
<script type="text/javascript">
	// 脚本部分
	export default {
		name: "login",
		data() {
			// 静态数据部分
			return {
				name: "",
				password: ""
			}
		},
		props:[],
		// 组件
		components:{
			
		},
		// 计算属性
		computed: {
			
		},
		// 自定义方法部分
		methods: {
			
		},
		// 生命周期
		beforeCreate() {
			// 创建之前
		},
		created() {
			// 创建完成
		},
		beforeMount() {
			// 加载之前
		},
		mounted() {
			// 加载已完成
		},
		beforeUpdate() {
			// 更新前
		},
		updated() {
			// 更新完成
		},
		beforeDestroy() {
			// 销毁前
		},
		destroyed() {
			// 销毁后
		}
	}
</script>