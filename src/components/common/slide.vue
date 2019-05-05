<template>
   <div class="slide">
	   <Menu ref="side_menu" :active-name="active_name" :open-names="['home']" theme="dark">
	       <Submenu name="home">
	           <template slot="title">
	               <Icon type="ios-paper" />
	               首页
	           </template>
	           <MenuItem to="/setting" name="home-setting">店铺设置</MenuItem>
	           <MenuItem to="/goods" name="home-goods">商品列表</MenuItem>
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
		width: 100%!important;
	}
</style>
<script>
	export default {
		data() {
			return {
				active_name: ""
			}
		},
		methods: {
			updateMenu() {
				let path = this.$route.matched[1].path;
				let parentPath = this.$route.matched[1].parent.name.toLowerCase();
				if(parentPath != "") {
					this.active_name = parentPath + "-" + path.substr(1);
				}
				this.$nextTick(() => {
					this.$refs.side_menu.updateOpened();
					this.$refs.side_menu.updateActiveName();
				});
			}
		},
		mounted() {
			this.updateMenu();
		}
	}
</script>
