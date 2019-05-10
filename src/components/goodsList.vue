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
          <DropdownItem name="1" title="注：选中的商品，绑定了的sku才会被改价">一键改价</DropdownItem>
          <DropdownItem name="2" title="注：无视选中，全店绑定过的sku都会被改价">一键全部改价</DropdownItem>
          <DropdownItem name="3" title="注：选中的商品，将启动监听改价（绑定了的sku才会被改价）">启动改价</DropdownItem>
          <DropdownItem name="4" title="注：选中的商品，将停止监听改价">停止改价</DropdownItem>
          <DropdownItem name="5" title="一键启动所有已绑商品的价格监控">一键启动所有已绑商品的价格监控</DropdownItem>
          <DropdownItem name="6" title="一键停止所有已绑商品的价格监控">一键停止所有已绑商品的价格监控</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown trigger="click" style="margin-left: 20px;display: none;">
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
      <Dropdown trigger="click" style="margin-left: 20px" @on-click="changeUp">
        <Button href="javascript:void(0)">
          改涨改跌
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="1">只改涨不改跌</DropdownItem>
          <DropdownItem name="2">既改涨又改跌</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown trigger="click" style="margin-left: 20px" @on-click="changeNine">
        <Button href="javascript:void(0)">
          价尾改9
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="1">价尾取消改9</DropdownItem>
          <DropdownItem name="2">价尾自动改9</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Button href="javascript:void(0)" style="margin-left: 20px" @click="syncShop">
        同步淘宝店商品
      </Button>
      <Button href="javascript:void(0)" style="margin-left: 20px" @click="addNew">
        手动上新
      </Button>
    </div>
    <Table :loading="loading"
           no-data-text="暂无数据"
           :row-class-name="rowClassName"
           stripe
           border
           :columns="columns1"
           :data="data1"
           @on-select="oneSelect"
           @on-select-all="selectALL"
           @on-selection-change="changeSelect"
           @on-filter-change="filterChange"
    ></Table>
    <div class="page">
      <Page id="page" :current.sync="current"
            :show-total="true"
            :page-size="10"
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
                }, this.getData(params.index, 'name')),
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
			// this.$store.dispatch("changeSlider", this.$router)
			// this.$store.dispatch('changeSlider',this.$route);
      if (loadFromLocal('store', 'start', '') !== '') {
        this.count.push(loadFromLocal('store', 'start', ''));
      }
      if (loadFromLocal('store', 'bind', '') !== '') {
        this.count.push(loadFromLocal('store', 'bind', ''));
      }
      if (loadFromLocal('store', 'search', '') !== '') {
        this.count.push(loadFromLocal('store', 'search', ''));
      }
      this.screenAjax(1);
    },
    watch: {
      store(val) {
        console.log(val);
        this.count = val;
      }
    },
    methods: {
      success(str) {
        this.$Message.success(str);
      },
      error(str) {
        this.$Message.error(str);
      },
      checkLength() {
        if (this.checkOption.length <= 0) {
          this.error('您没有选择商品！');
          return false;
        }
        return true;
      },
      bindShop(id) {
        this.$router.push({
          path: "/shopEdit",
          query: {
            id: id
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
        const arr = [];
        e.forEach(item => {
          arr.push(item.id);
        });
        this.checkOption = arr;
        console.log(this.checkOption)
      },
      selectALL(e) {
        const arr = [];
        e.forEach(item => {
          arr.push(item.id);
        });
        this.checkOption = arr;
        console.log(this.checkOption)
      },
      changeSelect(e) {
        const arr = [];
        e.forEach(item => {
          arr.push(item.id);
        });
        this.checkOption = arr;
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
        this.goTop();
        this.screenAjax(e);
      },
      goTop() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      },
      goElevatorPage() {
        this.goTop();
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
        this.loading = true;
        const bind = loadFromLocal('store', 'bind', '');
        const start = loadFromLocal('store', 'start', '');
        const search = loadFromLocal('store', 'search', '');
        console.log(bind, start);
        if (loadFromLocal('store', 'bind', '') === '' && loadFromLocal('store', 'start', '') === '' && loadFromLocal('store', 'search', '') === '') {
          this.getGoods(e, '', '', null);
        }
        if (bind === '已绑定') {
          this.getGoods(e, 1, '', null);
        }
        if (bind === '未绑定') {
          this.getGoods(e, 0, '', null);
        }
        if (start === '已启动') {
          this.getGoods(e, '', 1, null);
        }
        if (start === '未启动') {
          this.getGoods(e, '', 0, null);
        }
        if (search !== '') {
          this.getGoods(e, '', '', search);
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
        console.log(name);
        this.current = 1;
        const status = ['未绑定', '已绑定'];
        const str = status[name];
        window.localStorage.clear();
        saveToLocal('store', 'bind', str);
        const bind = loadFromLocal('store', 'bind', '');
        this.store = [];
        this.store.push(bind);
        this.screenAjax(1);
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
        this.screenAjax(1);
      },
      getGoods(page = 1, is_bind = '', is_start = '', wd = null) {
        this.$http.get('/api/goods', {
          params: {
            headers: {
              'Authorization': 'Bearer access_token'
            },
            page,
            is_bind,
            is_start,
            wd
          }
        }).then(res => {
          this.loading = false;
          this.data1 = res.data.data.data;
          this.totalCount = res.data.data.total;
          console.log(res.data.data.data, res.data.data.total);
        });
      },
      handleClose2(event, name) {
        const index = this.count.indexOf(name);
        this.count.splice(index, 1);
        window.localStorage.clear();
        this.screenAjax(1);
        // this.getGoods(1);
      },
      handleSubmit() {
        const search = this.$refs.searchInput.value;
        this.current = 1;
        window.localStorage.clear();
        saveToLocal('store', 'search', search);
        const search_str = loadFromLocal('store', 'search', '');
        this.store = [];
        this.store.push(search_str);
        this.screenAjax(1);
        console.log(search);
      },
      clearStore() {
        window.localStorage.clear();
        this.current = 1;
        this.store = [];
        this.screenAjax(1);
      },
      changePrice(name) {
        if (name === '1') {
          if (!this.checkLength()) {
            return;
            ;
          }
          this.$http({
            method: 'post',
            url: '/apis/goods/sync-price',
            data: {
              '_method': 'POST',
              '_token': "{{csrf_token()}}",
              item_id: this.checkOption
            }
          }).then(res => {
            console.log(res);
          });
          // this.$http.post('/apis/goods/sync-price', {
          //   '_method': 'POST',
          //   '_token': "{{csrf_token()}}",
          //   item_id: this.checkOption
          // }).then(res => {
          //   console.log(res);
          // })
        }
        if (name === '2') {
          this.$http.post('/apis/goods/sync-all-price', {
            '_token': "{{csrf_token()}}"
          }).then(res => {
            console.log(res);
          })
        }
        if (name === '3') {
          if (!this.checkLength()) {
            return;
            ;
          }
          this.$http.post('/apis/goods/start-change-price', {
            '_token': "{{csrf_token()}}",
            item_id: this.checkOption
          }).then(res => {
            console.log(res);
          })
        }
        if (name === '4') {
          if (!this.checkLength()) {
            return;
            ;
          }
          this.$http.post('/apis/goods/stop-change-price', {
            '_token': "{{csrf_token()}}",
            item_id: this.checkOption
          }).then(res => {
            console.log(res);
          })
        }
        if (name === '5') {
          this.$http.post('/apis/goods/start-all-change-price', {
            '_token': "{{csrf_token()}}"
          }).then(res => {
            console.log(res);
          })
        }
        if (name === '6') {
          this.$http.post('/apis/stop-all-change-price', {
            '_token': "{{csrf_token()}}"
          }).then(res => {
            console.log(res);
          })
        }
      },
      changeUp(name) {
        console.log(name);
        if (!this.checkLength()) {
          return;
        }
        if (name === '1') {
          this.$http.post('/apis/goods/onlyup-change-price', {
            '_token': "{{csrf_token()}}",
            is_only_up: 1,
            item_id: this.checkOption
          }).then(res => {
            console.log(res);
          })
        }
        if (name === '2') {
          this.$http.post('/apis/goods/onlyup-change-price', {
            '_token': "{{csrf_token()}}",
            is_only_up: 0,
            item_id: this.checkOption
          }).then(res => {
            console.log(res);
          })
        }
      },
      changeNine(name) {
        if (!this.checkLength()) {
          return;
        }
        if (name === '1') {
          this.$http.post('/apis/goods/cancle-mod-nine', {
            '_token': "{{csrf_token()}}",
            is_mod_nine: 1,
            item_id: this.checkOption
          }).then(res => {
            console.log(res);
          })
        }
        if (name === '2') {
          this.$http.post('/apis/goods/cancle-mod-nine', {
            '_token': "{{csrf_token()}}",
            is_mod_nine: 0,
            item_id: this.checkOption
          }).then(res => {
            console.log(res);
          })
        }
      },
      syncShop() {
        this.$http.post('/apis/goods/sync', {
          '_token': "{{csrf_token()}}"
        }).then(res => {
          console.log(res);
        })
      },
      addNew() {
        window.location.href = 'https://cwa.tosneaker.com/store/goods/create'
      }
    },
    components: {
      cardTitle
    }
  }
</script>
