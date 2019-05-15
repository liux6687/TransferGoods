<template>
	<div class="select">
		<div class="select-main">
			<div class="searchBtn">
				<Button class="btn" @click="isShow">
					{{text_}}
				</Button>
				<Icon :type="show==true?'ios-arrow-up':'ios-arrow-down'" />
			</div>
			<div class="showBox">
				<div class="search-input-box">
					<!-- <input class="search-input" type="text" @input="isSearch" v-model="isSearchData"> -->
					<Input class="search-input" v-model="isSearchData" icon="ios-clock-outline" @on-change="isSearch"/>
				</div>
				<p class="prompt" v-if="data.length <= 0">{{isSearchData != ''? "暂无数据":"请输入搜索关键字"}}</p>
				<ul v-else class="goodsList">
					<li @click="li_select(index,$event)" class="list-item" v-for="(item, index) in data" :key="index">{{item.name}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				text_: "",
				show: false,
				isSearchData: "",
				data: []
			}
		},
		props:["du_data", "top", "top_index"],
		created() {
			// console.log(this.du_data)
			if(this.top == 0) {
				if(this.du_data) {
					this.$data.text_ = this.du_data.name
				}
			}
		},
		methods: {
			isShow(e) {
				let dom = e.target;
				if($(dom).parents(".select").find(".showBox").hasClass("active")) {
					$(dom).parents(".select").find(".showBox").removeClass("active");
				}else {
					$(".showBox").removeClass("active")
					$(dom).parents(".select").find(".showBox").addClass("active");
					this.$data.isSearchData = "";
					this.$data.data = [];
				}
				let this_ = this;
				document.addEventListener("click", function(e) {
					if (!(event.target).closest('.select')) {
						$(".showBox").removeClass("active")
					}
				})
			},
			isSearch() {
				if(this.$data.isSearchData != "") {
					if(this.top == 1) {
						this.$http.get("/api/item/select2",{
							params: {
								wd: this.$data.isSearchData
							}
						}).then((res) => {
							this.$data.data = res.data.data;
						})
					}else if(this.top == 0) {
						this.$http.get("/api/sku/select2", {
							params: {
								wd: this.$data.isSearchData
							}
						}).then((res) => {
							this.$data.data = res.data.data;
						})
					}
					
				}else {
					this.$data.data = []
				}
				
			},
			li_select(index, e) {
				let dom = e.target;
				$(dom).parents(".select").find(".showBox").removeClass("active")
				this.$data.text_ = this.$data.data[index].name;
				
				if(this.top == 1) {
					// 说明是头部的下拉框
					let item_id = this.$data.data[index].id;
					this.$http.get("/api/sku/by-item-id", {
						params: {
							item_id
						}
					}).then(res => {
						this.$emit("send_top_data", res.data, this.top_index)
					})
				}else {
					
				}
			}
		},
		mounted() {
			console.log(this.$props.text)
			if(this.$props.text) {
				this.$data.text_ = this.$props.text
			}
		},
		watch: {
			du_data: {
				handler: function(newval, oldval) {
					this.du_data = newval
					this.$data.text_ = newval.name
				},
				deep:true
 			}
		} 
	}
</script>

<style scoped lang="less">
	.select {
		position: relative;
		width: 100%;
	}
	.select-main {
		width: 100%;
	}
	.showBox {
		line-height: 1;
		border: 1px solid #000;
		background: #fff;
		position: absolute;
		z-index: 999;
		display: none;
		width: 100%;
		border-radius: 2px;
		border-top: 0;
	}
	.search-input-box {
		padding: 5px;
		.search-input {
			width: 100%;
			height: 100%;
			height: 34px;
		}
	}
	
	.searchBtn {
		width: 100%;
		.btn {
			width: 100%;
			height: 34px;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
	}
	.list-item:hover {
		background: #C0C0C0;
		cursor: pointer;
	}
	.goodsList {
		max-height: 200px;
		overflow-y: scroll;
	}
	.list-item {
		line-height: 1;
		margin-bottom: 8px;
		padding: 0px 8px 0px 5px;
	}
	.prompt {
		height: 34px;
		line-height: 24px;
		font-size: 12px;
		padding: 5px;
		box-sizing: border-box;
	}
	.active {
		display: block;
	}
	.searchBtn  {
		position: relative;
	}
	.searchBtn i {
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
	}
</style>
