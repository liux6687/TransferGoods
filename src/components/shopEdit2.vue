<template>
	<div class="shopEdit">
		<cardTitle :titlePath="titlePath"></cardTitle>
    <h1>淘宝宝贝名称：{{name}}</h1>
		<div class="shopEdit-content">
      <Table
        :loading="loading"
        no-data-text="暂无数据"
        :show-header="false"
        stripe
        border
        :columns="columns1"
        :data="data1"
        ></Table>
		</div>
	</div>
</template>

<script>
	import cardTitle from "@/components/common/Title.vue";
	export default {
		data() {
			return {
			  loading: true,
				titlePath: [
					{
						menuName: "首页",
						name: ""
					},
					{
						name: "商品列表"
					},
					{
						name: "店铺编辑"
					}
				],
        columns1: [
          {
            title: '',
            key: 'size',
            align: 'center',
            className: 'table-title',
            render: (h, params) => {
              return h('p', [
                h('span', {}, '尺码：'),
                h('span', {
                  style: {
                    display: 'inline-block',
                    width: '24px',
                    textAlign: 'center'
                  }
                }, this.getData(params.index, 'size')),
                h('span', {
                  style: {
                    marginLeft: '5px'
                  }
                }, '店铺价：'),
                h('span', {
                  style: {
                    display: 'inline-block',
                    width: '50px',
                    textAlign: 'center'
                  }
                }, this.getData(params.index, 'price'))
              ])
            }
          },
          {
            title: '',
            key: 'color',
            align: 'center',
            width: '700',
            className: 'table-title',
            render: (h, params) => {
              return h('p', [
                h('span', {}, '对应尺码：'),
                h('input', {
                  class: ['ivu-input ivu-input-default'],
                  style: {
                    display: 'inline-block',
                    width: '500px'
                  },
                  attrs: {
                    autocomplete:"off",
                    spellcheck:"false",
                    type:"text",
                    placeholder:"Enter something...",
                    value: `${this.getData(params.index, 'raw_properties_name')}`
                  }
                }),
                h('span', {
                  style: {
                    display: 'inline-block',
                    marginLeft: '5px'
                  }
                }, '取消')
              ])
            }
          },
          {
            title: '',
            key: 'float',
            align: 'center',
            className: 'table-title',
            render: (h, params) => {
              return h('p', [
                h('input', {
                  class: ['ivu-input ivu-input-default'],
                  style: {
                    display: 'inline-block',
                    width: '50px'
                  },
                  attrs: {
                    autocomplete:"off",
                    spellcheck:"false",
                    type:"text",
                    placeholder:"Enter something...",
                    value: `${this.getData(params.index, 'raw_properties_name')}`
                  }
                }),
                h('span', {
                  style: {
                    marginLeft: '5px',
                    marginRight: '5px'
                  }
                }, '%'),
                h('input', {
                  class: ['ivu-input ivu-input-default'],
                  style: {
                    display: 'inline-block',
                    width: '50px'
                  },
                  attrs: {
                    autocomplete:"off",
                    spellcheck:"false",
                    type:"text",
                    placeholder:"Enter something...",
                    value: `${this.getData(params.index, 'raw_properties_name')}`
                  }
                }),
                h('span', {
                  style: {
                    marginLeft: '5px',
                    marginRight: '5px'
                  }
                }, '%'),
                h('span', {
                  style: {
                    marginLeft: '5px'
                  }
                }, '解绑')
              ])
            }
          }
        ],
        data1: [],
        name: ''
			}
		},
		components:{
			cardTitle
		},
		methods:{
      getData(index, attr) {
        return this.data1[index][attr];
      }
		},
		created() {
      this.$http.get('/api/shopEdit').then(res => {
        this.loading = false;
        this.data1 = res.data.size;
        this.name = res.data['data']['name'];
        this.data1.forEach(item => {
          let obj = {};
          obj.size = item.size;
          obj.price = item.price;
          obj.color = item.color;
          obj.raw_properties_name = item.raw_properties_name;
          obj.parent_id = item.parent_id;
          obj.store_id = item.store_id;
          obj.stock = item.stock;
          this.data1.push(obj);
        })
      })
		}
	}
</script>

<style scoped lang="less">

</style>
