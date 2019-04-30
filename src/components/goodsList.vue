<template>
  <div class="goods" v-if="goods.length">
    <div class="filter">
      <div class="filter-left">
        <span>过滤：</span>
        <Dropdown trigger="click" style="margin-left: 20px">
          <a href="javascript:void(0)">
            是否已绑定
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem>已绑定</DropdownItem>
            <DropdownItem>未绑定</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown trigger="click" style="margin-left: 20px">
          <a href="javascript:void(0)">
            是否已启动
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem>已启动</DropdownItem>
            <DropdownItem>未启动</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown trigger="click" style="margin-left: 20px">
          <a>
            清除条件
          </a>
        </Dropdown>
      </div>
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline
            :style="{display: 'inline-block',float: 'right'}">
        <FormItem prop="key">
          <Input type="text" v-model="formInline.key" placeholder="模糊搜索">
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')">
            <Icon class="md-search" type="md-search"/>
            搜索
          </Button>
        </FormItem>
      </Form>
      <div style="clear: both;"></div>
    </div>
    <div class="info-text">注意：您的绑定上限数量为 9999，现在您已绑定了 58 个（货号/颜色）【到期时间：2019-07-11 15:59:59】</div>
    <div class="filter filter-class">
      <Dropdown trigger="click" style="margin-left: 20px">
        <Button href="javascript:void(0)">
          一键改价
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem>驴打滚</DropdownItem>
          <DropdownItem>炸酱面</DropdownItem>
          <DropdownItem>豆汁儿</DropdownItem>
          <DropdownItem>冰糖葫芦</DropdownItem>
          <DropdownItem>北京烤鸭</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown trigger="click" style="margin-left: 20px">
        <Button href="javascript:void(0)">
          启动改价
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem>驴打滚</DropdownItem>
          <DropdownItem>炸酱面</DropdownItem>
          <DropdownItem>豆汁儿</DropdownItem>
          <DropdownItem>冰糖葫芦</DropdownItem>
          <DropdownItem>北京烤鸭</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown trigger="click" style="margin-left: 20px">
        <Button href="javascript:void(0)">
          只改涨不改跌
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem>驴打滚</DropdownItem>
          <DropdownItem>炸酱面</DropdownItem>
          <DropdownItem>豆汁儿</DropdownItem>
          <DropdownItem>冰糖葫芦</DropdownItem>
          <DropdownItem>北京烤鸭</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown trigger="click" style="margin-left: 20px">
        <Button href="javascript:void(0)">
          价尾取消改9
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem>驴打滚</DropdownItem>
          <DropdownItem>炸酱面</DropdownItem>
          <DropdownItem>豆汁儿</DropdownItem>
          <DropdownItem>冰糖葫芦</DropdownItem>
          <DropdownItem>北京烤鸭</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown trigger="click" style="margin-left: 20px">
        <Button href="javascript:void(0)">
          同步淘宝店商品
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem>驴打滚</DropdownItem>
          <DropdownItem>炸酱面</DropdownItem>
          <DropdownItem>豆汁儿</DropdownItem>
          <DropdownItem>冰糖葫芦</DropdownItem>
          <DropdownItem>北京烤鸭</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown trigger="click" style="margin-left: 20px">
        <Button href="javascript:void(0)">
          手动上新
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem>驴打滚</DropdownItem>
          <DropdownItem>炸酱面</DropdownItem>
          <DropdownItem>豆汁儿</DropdownItem>
          <DropdownItem>冰糖葫芦</DropdownItem>
          <DropdownItem>北京烤鸭</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <Table :row-class-name="rowClassName" stripe border :columns="columns1" :data="data1"
           @on-select="oneSelect"
           @on-select-all="selectALL" @on-selection-change="changeSelect"></Table>
    <div class="page">
      <Page :current="9" :show-total="true" :show-sizer="true" :page-size-opts="[10, 20, 30, 40]" placement="bottom"
            :show-elevator="true"
            @on-change="pageChange" @on-page-size-change="sizeChange" :total="totalCount"/>
    </div>
  </div>
</template>
<style scoped lang="less">
  .goods {
    padding: 15px;
    .filter {
      background-color: #e7e7e7;
      padding: 12px;
      color: #333;
      .filter-left {
        float: left;
        margin-top: 10px;
      }
      a {
        color: #333;
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
    }
  }
</style>
<script>
  export default {
    name: "goodsList",
    data() {
      return {
        goods: [],
        totalCount: 0,
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
            width: '400',
            render: (h, params) => {
              // console.log(params.index);
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
                    attr: {
                      href: `https://cw.tosneaker.com/store/goods-binding-edit/${this.getData(params.index, 'id')}`
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
            },
            filterMultiple: false,
            filters: [
              {
                label: '已绑定',
                value: 1
              },
              {
                label: '未绑定',
                value: 2
              }
            ],
            filterMethod(value, row) {
              console.log(row.isBind);
              if (value === 1) {
                return row.is_bind === 1;
              } else if (value === 2) {
                return row.is_bind === 0;
              }
            }
          },
          {
            title: '是否启动改价',
            key: 'changePrice',
            className: 'table-title',
            align: 'center',
            render: (h, params) => {
              return h('p', {}, `${this.getData(params.index, 'is_start') === 1 ? '启动' : '未启动'}`)
            },
            filters: [
              {
                label: '已启动',
                value: 1
              },
              {
                label: '未启动',
                value: 2
              }
            ],
            filterMultiple: false,
            filterMethod(value, row) {
              console.log(row.changePrice);
              if (value === 1) {
                return row.is_start === 1;
              } else if (value === 2) {
                return row.is_start === 0;
              }
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
                  href: `https://cw.tosneaker.com/store/change-price-log?item_id=${this.getData(params.index, 'id')}`
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
              return h('p', {}, `${this.getData(params.index, 'is_mod_nine') === 1 ? '改9' : '不该9'}`)
            }
          }
        ],
        data1: [
          {}, {}, {}, {}, {}, {}
        ],
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
      this.$http.get('static/data.json').then(res => {
        this.goods = res.data.data;
        this.totalCount = this.goods.length;
      });
    },
    methods: {
      oneSelect(e) {
        console.log(e)
      },
      selectALL(e) {
        console.log(e)
      },
      changeSelect(e) {
        console.log(e)
      },
      show(index) {
        this.$Modal.info({
          title: 'User Info',
          content: `Name：${this.data1[index].name}<br>Age：${this.data1[index].age}<br>Address：${this.data1[index].address}`
        })
      },
      rowClassName(row, index) {
        if (index === 0) {
          return 'demo-table-info-row';
        }
        return '';
      },
      pageChange(e) {
        console.log(e)
      },
      sizeChange(e) {
        console.log(e)
      },
      getData(index, attr) {
        return this.goods[index][attr];
      }
    },
    components: {}
  }
</script>
