<template>
	<div class="store_setting">
		<cardTitle :titlePath="titlePath"></cardTitle>
		<div class="store_setting_content">
			<Card>
				<p slot="title">返回</p>
				<Form :label-width="100" ref="formItem" :model="formItem" :rules='ruleValidate'>
					<div class="card_content">
						<FormItem label="店铺名称">
							<Input disabled  v-model="store_name"></Input>
						</FormItem>
						<FormItem label="卖家名称">
							<Input disabled  v-model="seller_name"></Input>
						</FormItem>
						<FormItem label="手机号" prop="mobile">
							<Input v-model="formItem.mobile"></Input>
						</FormItem>
					</div>
					<p class="line"></p>
					<div class="card_content">
						<FormItem label="原密码" prop="old_password">
							<Input type="password" v-model="formItem.old_password"></Input>
						</FormItem>
						<FormItem label="新密码" prop="new_password">
							<Input type="password" v-model="formItem.new_password"></Input>
						</FormItem>
						<FormItem label="密码二次确认" prop="confirm_password">
							<Input type="password" v-model="formItem.confirm_password"></Input>
						</FormItem>
						<FormItem>
							<Button type="primary" @click="submit('formItem')">提交</Button>
							<Button style="margin-left: 8px" @click="reset('formItem')">重置</Button>
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
			let validate_mobile = (rule, value, callback) => {
				if(!value){
					return callback(new Error("请输入手机号"));
				}else if(!/^1[5|3|8|7]\d{9}/.test(value)){
					return callback(new Error("请正确输入手机号"))
				}else{
					callback();
				}
			};
			let validate_old_pass = (rule, value, callback) => {
				if(!value){
					return callback(new Error("请输入原密码"));
				}else if(!/^[\w_-]{6,16}$/.test(value)){
					return callback(new Error("请正确密码"))
				}else{
					callback();
				}
			};
			let validate_new_pass = (rule, value, callback) => {
				if(!value){
					return callback(new Error("请输入新密码"));
				}else if(!/^[\w_-]{6,16}$/.test(value)){
					return callback(new Error("请正确密码"))
				}else if(value == this.$data.formItem.old_password) {
					return callback(new Error("新密码与旧密码相同,请重新输入"))
				}else{
					callback();
				}
			};
			let validate_confir_pass = (rule, value, callback) => {
				if(!value){
					return callback(new Error("再次输入新密码"));
				}else if(!/^[\w_-]{6,16}$/.test(value)){
					return callback(new Error("请正确密码"))
				}else if (value != this.$data.formItem.new_password) {
					return callback(new Error("新密码必须与确认密码一致"))
				}else{
					callback();
				}
			};
			return {
				userInfo: null,
				store_name: "",
				seller_name: "",
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
				],
				formItem: {
					mobile : "",
					old_password: "",
					new_password: "",
					confirm_password: "",
				},
				ruleValidate: {
					mobile: [{required: true, validator: validate_mobile, trigger: "blur"}, {min:11,message:'请输入最少11位'}],
					old_password:[{required: true, validator: validate_old_pass, trigger: "blur"}, {min:6,message:'请输入最少6位'}],
					new_password:[{required: true, validator: validate_new_pass, trigger: "blur"}, {min:6,message:'请输入最少6位'}],
					confirm_password:[{required: true, validator: validate_confir_pass, trigger: "blur"}, {min:6,message:'请输入最少6位'}]
				}
			}
		},
		components:{
			cardTitle
		},
		methods:{
			submit(name) {
				this.$refs[name].validate((valid) => {
                    if (valid) {
						this.$http.post("/api/update", {
							id:this.$data.userInfo.id,
							mobile:this.$data.formItem.mobile,
							password_old:this.$data.formItem.old_password,
							password:this.$data.formItem.new_password,
							password_confirmation:this.$data.formItem.confirm_password
						}).then(res => {
							console.log(res)
							if(res.data.status == 200) {
								this.$Message.success({
									content: res.data.message,
									onClose: () => {
										this.$router.push({
											path: '/goodsList'
										})
									}
								});
							}else {
								this.$Message.error({
									content: res.data.message,
									onClose: () => {
										this.$refs["formItem"].resetFields();
									}
								});
							}
						})
                    } else {
                        this.$Message.error('请输入正确表单!');
                    }
                })
			},
			reset(name) {
				this.$refs[name].resetFields();
			}
		},
		created() {
			let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
			this.$data.userInfo = userInfo;
			this.$data.store_name = userInfo.store_name;
			this.$data.seller_name = userInfo.name;
			this.$data.formItem.mobile = userInfo.mobile;
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
