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
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			active_name() {
				return this.$store.state.active_name
			}
		},
		created() {
			this.$nextTick(() => {
				this.$refs.side_menu.updateOpened();
				this.$refs.side_menu.updateActiveName();
			});
		},
		updated() {
			this.$nextTick(() => {
				this.$refs.side_menu.updateOpened();
				this.$refs.side_menu.updateActiveName();
			});
		},
	}
</script>
