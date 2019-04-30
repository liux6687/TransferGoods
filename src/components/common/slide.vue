<template>
   <div class="slide">
	   <Menu active-name="home-setting" @on-select="menu" :open-names="['home']" theme="dark">
	       <Submenu name="home">
	           <template slot="title">
	               <Icon type="ios-paper" />
	               首页
	           </template>
	           <MenuItem to="/setting" name="home-setting">店铺设置</MenuItem>
	           <MenuItem to="/goodsList" name="home-goodsList">商品列表</MenuItem>
	           <MenuItem to="/record" name="home-record">价格修改记录</MenuItem>
	       </Submenu>
	   </Menu>
   </div>
</template>
<style>
	.slide {
		width: 100%;
		min-height: 800px;
		background:#EAEDF1;
	}
	.ivu-menu.ivu-menu-dark.ivu-menu-vertical {
		width: 100%;;
	}
</style>
<script>
	export default {
		data() {
			return {
				pageTitle: {
					home: "首页"
				},
				subPageTitle: {
					setting: "设置",
					goodsList: "商品列表",
					record: "价格修改记录"
				}
			}
		},
		methods: {
			menu(e) {
				let menu = e.split("-")[0];
				let submenu = e.split("-")[1];
				let pageTitle = this.$data.pageTitle[menu];
				let subPageTitle = this.$data.subPageTitle[submenu];
				let obj = {
					pageTitle,
					subPageTitle
				}
				// 向全局设置标题
				this.$store.dispatch("sendTitle", obj)
			}
		}
	}
</script>
