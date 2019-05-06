<template>
	<div class="store_setting">
		<cardTitle :titlePath="titlePath"></cardTitle>
		<div class="store_setting_content">
			<Card>
				<p slot="title">返回</p>
				<Form :label-width="100">
					<div class="card_content">
						<FormItem label="店铺名称">
							<Input disabled  v-model="store_name"></Input>
						</FormItem>
						<FormItem label="卖家名称">
							<Input disabled  v-model="seller_name"></Input>
						</FormItem>
						<FormItem label="手机号">
							<Input v-model="mobile"></Input>
						</FormItem>
					</div>
					<p class="line"></p>
					<div class="card_content">
						<FormItem label="原密码">
							<Input v-model="old_password"></Input>
						</FormItem>
						<FormItem label="密码修改">
							<Input v-model="new_password"></Input>
						</FormItem>
						<FormItem label="密码二次确认">
							<Input v-model="confirm_password"></Input>
						</FormItem>
						<FormItem>
							<Button type="primary" @click="submit($event)">提交</Button>
							<Button style="margin-left: 8px" @click="reset">重置</Button>
						</FormItem>
					</div>
				</Form>
			</Card>
		</div>
	</div>
</template>

<script>
	import cardTitle from "@/components/common/Title.vue"
	export default {
		name: "store_setting",
		data() {
			return {
				store_name: "格物体育",
				seller_name: "好不容易凑够九个字",
				mobile : "18202933771",
				old_password: "",
				new_password: "",
				confirm_password: "",
				titlePath: [
					{
						to: "",
						menuName: "首页",
						name: ''
					},
					{
						to: "",
						name: "店铺设置"
					}
				]
			}
		},
		components:{
			cardTitle
		},
		methods:{
			submit(e) {
				console.log(e)
			},
			reset() {
				this.$data.mobile = "";
				this.$data.old_password = "";
				this.$data.new_password = "";
				this.$data.confirm_password = "";
			}
		}
	}
</script>

<style scoped lang="less">
	.store_setting_content {
		width: 60%;
		margin: 0 auto;
	}
	.card_content {
		width: 60%;
		margin: 0 auto;
	}
	.line {
		border-bottom: 1px solid #F7F7F7;
		margin-bottom: 24px;
	}
</style>
