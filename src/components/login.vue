<template>
	<!-- 结构部分 -->
	<div class="login">
		<div class="login_box">
			<label>用户名：<input type="text" v-model="name" placeholder="请输入用户名..."></label>
			<label>密码：<input type="text" v-model="password" placeholder="请输入密码..."></label>
		</div>
		<div class="submit_box">
			<button @click="login">登录</button>
		</div>
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
		// 父组件传值
		props:[],
		// 组件
		components:{
			
		},
		// 计算属性
		computed: {
			
		},
		// 自定义方法部分
		methods: {
			login() {
				// this.$router.push({path: "/home"})
				// console.log(this.$data.name, this.$data.password)
				// let data = {
				// 	_token: "goGO6E3Djw4Bj9n75iqd0tr5yvB1OIrFPwgTGTGt",
				// 	name: "18202933771",
				// 	password: "123456"
				// }
				this.$http.get("/api/store/login").then(res => {
					console.log(res)
					if(res.status == 200) {
						let html = res.data;
						
					}
				})
			}
		},
		// 生命周期
		beforeCreate() {
			// 创建之前  在此时即无视图也无数据 还不能访问data中的数据
		},
		created() {
			// 创建完成 在此时无视图 数据加载完成 可以对数据进行处理
		},
		beforeMount() {
			// 加载之前  数据还未插入到视图中  还是虚拟DOM的形式
		},
		mounted() {
			// 加载已完成 数据插入完成
		},
		beforeUpdate() {
			// 更新前  vue在data中的数据发生变化时会触发 该事件
		},
		updated() {
			// 更新完成 数据更新完成--> mounted
		},
		beforeDestroy() {
			// 销毁前 在此时还可以对vue 实例做一些处理 比如移除某些事件等。。。。
		},
		destroyed() {
			// 销毁后 Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁
		}
	}
</script>