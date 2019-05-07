<template>
  <div class="goods">
    <card-title :title-path="titlePath"></card-title>
    <div class="filter">
      <div class="filter-left">
        <span>过滤：</span>
        <Dropdown trigger="click" style="margin-left: 20px" @on-click="getBindData">
          <a href="javascript:void(0)">
            是否已绑定
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem name="1">已绑定</DropdownItem>
            <DropdownItem name="0">未绑定</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown trigger="click" style="margin-left: 20px" @on-click="getStart">
          <a href="javascript:void(0)">
            是否已启动
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem name="1">已启动</DropdownItem>
            <DropdownItem name="0">未启动</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Tag style="margin-left: 20px" color="primary" v-for="item in count" :key="item" :name="item" closable
             @on-close="handleClose2">{{ item }}
        </Tag>
        <Button size="small" type="text" style="margin-left: 20px" @click="clearStore">
          <a>
            清除条件
          </a>
        </Button>
      </div>
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline
            :style="{display: 'inline-block',float: 'right'}">
        <FormItem prop="key">
          <Input ref="searchInput" type="text" v-model="formInline.key" placeholder="请输入货号">
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit">
            <Icon class="md-search" type="md-search"/>
            搜索
          </Button>
        </FormItem>
      </Form>
      <div style="clear: both;"></div>
    </div>
    <div class="info-text">注意：您的绑定上限数量为 9999，现在您已绑定了 58 个（货号/颜色）【到期时间：2019-07-11 15:59:59】</div>
    <div class="filter filter-class">
      <Dropdown trigger="click" style="margin-left: 20px" @on-click="changePrice">
        <Button href="javascript:void(0)">
          改价设置
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="check">一键改价</DropdownItem>
          <DropdownItem name="all">一键全部改价</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown trigger="click" style="margin-left: 20px">
        <Button href="javascript:void(0)">
          启动改价
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem>停止改价</DropdownItem>
          <DropdownItem>一键启动所有已绑商品的价格监控</DropdownItem>
          <DropdownItem>一键停止所有已绑商品的价格监控</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown trigger="click" style="margin-left: 20px">
        <Button href="javascript:void(0)">
          只改涨不改跌
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem>既该涨又改跌</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown trigger="click" style="margin-left: 20px" @on-click="changeNine">
        <Button href="javascript:void(0)">
          价尾改9
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="0">价尾取消改9</DropdownItem>
          <DropdownItem name="1">价尾自动改9</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown trigger="click" style="margin-left: 20px" @on-click="syncShop">
        <Button href="javascript:void(0)">
          同步淘宝店商品
        </Button>
      </Dropdown>
      <Dropdown trigger="click" style="margin-left: 20px" @on-click="addNew">
        <Button href="javascript:void(0)">
          手动上新
        </Button>
      </Dropdown>
    </div>
    <Table :loading="loading" no-data-text="暂无数据" :row-class-name="rowClassName" stripe border :columns="columns1"
           :data="data1"
           @on-select="oneSelect"
           @on-select-all="selectALL"
           @on-selection-change="changeSelect"
           @on-filter-change="filterChange"
    ></Table>
    <div class="page">
      <Page id="page" :current.sync="current"
            :show-total="true"
            :page-size="5"
            :show-sizer="true"
            :page-size-opts="[10, 20, 30, 40]"
            placement="bottom"
            :show-elevator="true"
            :transfer="true"
            @on-change="pageChange"
            @on-page-size-change="sizeChange"
            :total="totalCount"/>
      <Button type="primary" @click="goElevatorPage">跳转</Button>
    </div>
  </div>
</template>
<style scoped lang="less">
  .goods {
    // padding: 15px;
    .filter {
      background-color: #e7e7e7;
      padding: 12px;
      color: #333;

      .filter-left {
        float: left;
      }

      .ivu-btn-small {
        padding: 0 7px 0;
        font-size: 12px;
        border-radius: 3px;
      }

      a {
        color: #333;
        display: inline-block;
        height: 30px;
        line-height: 30px;
      }

      .ivu-form-inline .ivu-form-item {
        margin-bottom: 0;
      }

      .md-search {
        font-size: 18px;
      }
    }

    .info-text {
      color: #DD5A43;
      margin-top: 20px;
      margin-bottom: 5px;
    }

    .filter-class {
      background-color: #e1f1fd;

      a {
        color: #999999;
      }
    }

    .page {
      text-align: right;
      margin-top: 20px;

      .ivu-page {
        display: inline-block;
      }

      .ivu-btn-primary {
        vertical-align: top;
        margin-left: 10px;
      }

      .ivu-page-options-elevator {
        input {
          text-align: center;
        }
      }
    }
  }
</style>
<script>
  import {saveToLocal, loadFromLocal} from '../common/js/store'

	import cardTitle from "@/components/common/Title.vue"
  export default {
    name: "goodsList",
    data() {
      return {
				titlePath: [
					{
						menuName: "首页",
						name: ""
					},
					{
						name: "商品列表"
					}
				],
        goods: [],
        totalCount: 0,
        loading: true,
        checkOption: [],
        count: [],
        store: [],
        current: 1,
        columns1: [
          {
            type: 'selection',
            width: 50,
            align: 'center'
          },
          {
            title: '主图',
            key: 'img',
            align: 'center',
            className: 'table-title',
            width: '110',
            render: (h, params) => {
              return h('img', {
                style: {
                  'width': '100px',
                  'height': '100px',
                  'vertical-align': 'middle',
                  'padding': '5px',
                  'border-radius': '10px'
                },
                attrs: {
                  'src': this.getData(params.index, 'cover_image')
                }
              })
            }
          },
          {
            title: '商品全称',
            key: 'name',
            className: 'table-title',
            align: 'center',
            width: '300',
            render: (h, params) => {
              return h('div', [
                h('p', {
                  style: {
                    color: '#333',
                    fontSize: '14px',
                    textAlign: 'left'
                  }
                }, this.getData(params.index, 'name')),
                h('div', [
                  h('p', [
                    h('span', {
                      style: {
                        float: 'left',
                        marginTop: '3px'
                      }
                    }, '淘宝：'),
                    h('a', {
                      attrs: {
                        href: `https://item.taobao.com/item.htm?id=${this.getData(params.index, 'raw_num_iid')}`
                      },
                      style: {
                        float: 'left',
                        marginTop: '3px'
                      }
                    }, '宝贝详情'),
                    h('a', {
                      attrs: {
                        href: `https://item.publish.taobao.com/sell/publish.htm?itemId=${this.getData(params.index, 'raw_num_iid')}`
                      },
                      style: {
                        float: 'left',
                        marginTop: '3px',
                        marginLeft: '5px'
                      }
                    }, '宝贝编辑'),
                    h('a', {
                      attrs: {
                        href: '###'
                      },
                      style: {
                        float: 'right',
                        marginTop: '3px'
                      },
                      on: {
                        click: function (e) {
                          console.log(e);
                        }
                      }
                    }, '同步单个商品')
                  ])
                ])
              ])
            }
          },
          {
            title: '价格区间',
            key: 'section',
            className: 'table-title',
            align: 'center',
            render: (h, params) => {
              return h('p', {
                style: {
                  textAlign: 'center'
                }
              }, this.getData(params.index, 'price_range'))
            }
          },
          {
            title: '颜色',
            key: 'color',
            className: 'table-title',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('p', {
                  style: {
                    textAlign: 'left'
                  }
                }, '颜色：'),
                h('p', {
                  style: {
                    textAlign: 'center',
                    marginTop: '5px'
                  }
                }, '624041-303#南海岸泡'),
              ])
            }
          },
          {
            title: '是否完成绑定',
            key: 'isBind',
            className: 'table-title',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('div', [
                  h('span', {
                    style: {
                      float: 'left'
                    }
                  }, `${this.getData(params.index, 'is_bind') === 1 ? '已绑定' : '未绑定'}`),
                  h('a', {
                    style: {
                      float: 'right',
                      marginTop: '5px'
                    },
                    attrs: {
                      href: "javascript: void(0)"
                    },
										on: {
							click: () => {
												this.bindShop(this.getData(params.index, 'id'))
											}
										},
                    class: ['ivu-icon', 'ivu-icon-md-create']
                  }),
                  h('div', {
                    style: {
                      clear: 'both'
                    }
                  })
                ]),
                h('p', {
                  style: {
                    textAlign: 'left',
                    marginTop: '5px'
                  }
                }, [
                  h('span', {}, `${this.getData(params.index, 'sku_binded_num')}`),
                  h('span', {}, '/'),
                  h('span', {}, `${this.getData(params.index, 'sku_num')}`)
                ])
              ])
            }
          },
          {
            title: '是否启动改价',
            key: 'changePrice',
            className: 'table-title',
            align: 'center',
            render: (h, params) => {
              return h('p', {}, `${this.getData(params.index, 'is_start') === 1 ? '已启动' : '未启动'}`)
            }
          },
          {
            title: '改价记录',
            key: 'priceHistory',
            className: 'table-title',
            align: 'center',
            render: (h, params) => {
              return h('a', {
                attrs: {
                  // href: `/#/record?item_id=${this.getData(params.index, 'id')}`
									href: "javascript: void(0)"
                },
								on: {
									click: () => {
										this.lookInfo(params.index)
									}
								}
              }, '查看详细')
            }
          },
          {
            title: '改涨不改跌',
            key: 'upgrade',
            className: 'table-title',
            align: 'center',
            render: (h, params) => {
              return h('p', {}, `${this.getData(params.index, 'is_only_up') === 1 ? '只改涨' : '只该跌'}`)
            }
          },
          {
            title: '价尾改9',
            key: 'changeNine',
            className: 'table-title',
            align: 'center',
            render: (h, params) => {
              return h('p', {}, `${this.getData(params.index, 'is_mod_nine') === 1 ? '改9' : '不改9'}`)
            }
          }
        ],
        data1: [],
        formInline: {
          key: ''
        },
        ruleInline: {
          key: [
            {required: true, message: '请输入搜索内容', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (loadFromLocal('store', 'start', '') !== '') {
        this.count.push(loadFromLocal('store', 'start', ''));
      }
      if (loadFromLocal('store', 'bind', '') !== '') {
        this.count.push(loadFromLocal('store', 'bind', ''));
      }
      if (loadFromLocal('store', 'search', '') !== '') {
        this.count.push(loadFromLocal('store', 'search', ''));
      }
      this.$http.get('/api/shop/1').then(res => {
        this.loading = false;
        this.data1 = res.data.arr;
        this.totalCount = res.data.totalPage;
      });
      this.screenAjax(1);
    },
    watch: {
      store(val) {
        console.log(val);
        this.count = val;
      }
    },
    methods: {
			bindShop(id) {
				this.$router.push({
					path: "/shopEdit",
					params: {
						id
					}
				})
			},
			lookInfo(index) {
				console.log(index)
				this.$router.push({
					path: '/record'
				})
			},
      oneSelect(e) {
        this.checkOption = e;
        console.log(this.checkOption)
      },
      selectALL(e) {
        this.checkOption = e;
        console.log(this.checkOption)
      },
      changeSelect(e) {
        this.checkOption = e;
        console.log(this.checkOption)
      },
      rowClassName(row, index) {
        if (index === 0) {
          return 'demo-table-info-row';
        }
        return '';
      },
      pageChange(e) {
        this.current = e;
        this.$http.get(`/api/shop/${e}`).then(res => {
          this.loading = false;
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          this.data1 = res.data.arr;
          this.totalCount = res.data.totalPage;
        });
        this.screenAjax(e);
      },
      goElevatorPage() {
        let evtObj;
        let thisPage = document.getElementById('page');
        let elevatorDiv = thisPage.getElementsByClassName("ivu-page-options-elevator");
        if (elevatorDiv && elevatorDiv.length > 0) {
          let pageInput = elevatorDiv[0].getElementsByTagName("input")[0];
          if (window.KeyEvent) {//firefox 浏览器下模拟事件
            evtObj = document.createEvent('KeyEvents');
            evtObj.initKeyEvent("keyup", true, true, window, true, false, false, false, 13, 0);
          } else {//chrome 浏览器下模拟事件
            evtObj = document.createEvent('UIEvents');
            evtObj.initUIEvent("keyup", true, true, window, 1);
            delete evtObj.keyCode;
            if (typeof evtObj.keyCode === "undefined") {//为了模拟keycode
              Object.defineProperty(evtObj, "keyCode", {value: 13});
            } else {
              evtObj.key = String.fromCharCode(13);
            }
          }
          pageInput.dispatchEvent(evtObj);
        }
      },
      screenAjax(e) {
        const bind = loadFromLocal('store', 'bind', '');
        const start = loadFromLocal('store', 'start', '');
        const search = loadFromLocal('store', 'search', '');
        console.log(bind, start);
        if (bind === '已绑定') {
          this.$http.get(`/api/bind/1/${e}`).then(res => {
            this.loading = false;
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            this.data1 = res.data.arr;
            this.totalCount = res.data.totalPage;
          });
        }
        if (bind === '未绑定') {
          this.$http.get(`/api/bind/0/${e}`).then(res => {
            this.loading = false;
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            this.data1 = res.data.arr;
            this.totalCount = res.data.totalPage;
          });
        }
        if (start === '已启动') {
          this.$http.get(`/api/start/1/${e}`).then(res => {
            this.loading = false;
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            this.data1 = res.data.arr;
            this.totalCount = res.data.totalPage;
          });
        }
        if (start === '未启动') {
          this.$http.get(`/api/start/0/${e}`).then(res => {
            this.loading = false;
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            this.data1 = res.data.arr;
            this.totalCount = res.data.totalPage;
          });
        }
        if (search !== '') {
          this.$http.get(`/api/search/${search}/${e}`).then(res => {
            this.loading = false;
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            this.data1 = res.data.arr;
            this.totalCount = res.data.totalPage;
          });
        }
      },
      sizeChange(e) {
        console.log(e)
      },
      getData(index, attr) {
        return this.data1[index][attr];
      },
      filterChange(data) {
        console.log(data);
      },
      getBindData(name) {
        this.current = 1;
        const status = ['未绑定', '已绑定'];
        const str = status[name];
        window.localStorage.clear();
        saveToLocal('store', 'bind', str);
        const bind = loadFromLocal('store', 'bind', '');
        this.store = [];
        this.store.push(bind);
        this.$http.get(`/api/bind/${name}/1`).then(res => {
          this.loading = false;
          this.data1 = res.data.arr;
          console.log(this.data1);
          this.totalCount = res.data.totalPage
        });
      },
      getStart(name) {
        this.current = 1;
        const status = ['未启动', '已启动'];
        const str = status[name];
        window.localStorage.clear();
        saveToLocal('store', 'start', str);
        const start = loadFromLocal('store', 'start', '');
        this.store = [];
        this.store.push(start);
        this.$http.get(`/api/start/${name}/1`).then(res => {
          this.loading = false;
          this.data1 = res.data.arr;
          console.log(this.data1);
          this.totalCount = res.data.totalPage
        });
      },
      handleClose2(event, name) {
        const index = this.count.indexOf(name);
        this.count.splice(index, 1);
        window.localStorage.clear();
        this.$http.get('/api/shop/1').then(res => {
          this.loading = false;
          this.data1 = res.data.arr;
          this.totalCount = res.data.totalPage;
        });
      },
      handleSubmit() {
        const search = this.$refs.searchInput.value;
        this.current = 1;
        window.localStorage.clear();
        saveToLocal('store', 'search', search);
        const search_str = loadFromLocal('store', 'search', '');
        this.store = [];
        this.store.push(search_str);
        this.$http.get(`/api/search/${search}/1`).then((res) => {
          this.loading = false;
          this.data1 = res.data.arr;
          this.totalCount = res.data.totalPage;
          console.log(this.data1);
        });
        console.log(search);
      },
      clearStore() {
        window.localStorage.clear();
        this.current = 1;
        this.store = [];
        this.$http.get('/api/shop/1').then(res => {
          this.loading = false;
          this.data1 = res.data.arr;
          this.totalCount = res.data.totalPage;
        });
      },
      changePrice(name) {
        if (name === 'check') {
        }
        if (name === 'all') {
        }
      },
      changeNine(name) {
      },
      syncShop(name) {
      },
      addNew(name) {
      }
    },
    components: {
			cardTitle
		}
  }
</script>
