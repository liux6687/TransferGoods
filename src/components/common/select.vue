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
					<input class="search-input" type="text" @input="isSearch" v-model="isSearchData">
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
		props:["text"],
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
					this.$http.get("static/data1.json").then((res) => {
						console.log(res)
						this.$data.data = res.data.data;
					})
				}else {
					this.$data.data = []
				}
				
			},
			li_select(index, e) {
				let dom = e.target;
				$(dom).parents(".select").find(".showBox").removeClass("active")
				this.$data.text_ = this.$data.data[index].name;
			}
		},
		mounted() {
			console.log(this.$props.text)
			if(this.$props.text) {
				this.$data.text_ = this.$props.text
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
		border: 1px solid #0000FF;
		background: #fff;
		position: absolute;
		z-index: 999;
		display: none;
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
