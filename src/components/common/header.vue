<template>
	<div class="header clearfix">
		<div class="logo fl">
			<img class="logo_img" src="" alt="">
			<span>84交易</span>
		</div>
		<div class="user fr clearfix">
			<div class="portrait fl">
				<img src="" alt="">
			</div>
			<Dropdown class="name fl">
				<div class="name_text">
					<small>Welcome,</small><br>
					<span>好不容易凑够九个字</span>
				</div>
				<DropdownMenu slot="list">
					<DropdownItem>切换</DropdownItem>
					<DropdownItem>退出</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</div>
	</div>
</template>
<style lang="less">
	.header {
		padding: 0 10px;
		height: 45px;
		background: #404040;
		.logo {
			font-size: 13px;
			color: #fff;
			line-height: 45px;
		}
		.user {
			width: 190px;
			height: 45px;
			background: #2E6589;
			color: #fff;
			.portrait {
				width: 45px;
				height: 45px;
				display: inline-block;
				text-align: center;
				position: relative;
				img {
					height: 40px;
					width: 40px;
					display: inline-block;
					background: #999;
					position: absolute;
					top: 50%;
					left: 50%;
					margin-left: -20px;
					margin-top: -20px;
				}
			}
			.name {
				height: 100%;
				font-size: 15px;
				.name_text {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
	}
</style>