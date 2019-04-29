<template>
   <div class="slide">
	   <Menu active-name="1-1" :open-names="['1']" theme="dark">
	       <Submenu name="1">
	           <template slot="title">
	               <Icon type="ios-paper" />
	               首页
	           </template>
	           <MenuItem name="1-1">店铺设置</MenuItem>
	           <MenuItem name="1-2">商品列表</MenuItem>
	           <MenuItem name="1-3">价格修改记录</MenuItem>
	       </Submenu>
	      <!-- <Submenu name="2">
	           <template slot="title">
	               <Icon type="ios-people" />
	               用户管理
	           </template>
	           <MenuItem name="2-1">新增用户</MenuItem>
	           <MenuItem name="2-2">活跃用户</MenuItem>
	       </Submenu> -->
	      <!-- <Submenu name="3">
	           <template slot="title">
	               <Icon type="ios-stats" />
	               统计分析
	           </template>
	           <MenuGroup title="使用">
	               <MenuItem name="3-1">新增和启动</MenuItem>
	               <MenuItem name="3-2">活跃分析</MenuItem>
	               <MenuItem name="3-3">时段分析</MenuItem>
	           </MenuGroup>
	           <MenuGroup title="留存">
	               <MenuItem name="3-4">用户留存</MenuItem>
	               <MenuItem name="3-5">流失用户</MenuItem>
	           </MenuGroup>
	       </Submenu> -->
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

</script>
