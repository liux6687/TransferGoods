<template>
  <div class="goods">
    <Title title="商品" subtitle="列表"></Title>
    <div class="filter">
      <span>过滤：</span>
      <Dropdown trigger="click" style="margin-left: 20px">
        <a href="javascript:void(0)">
          是否已绑定
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem>驴打滚</DropdownItem>
          <DropdownItem>炸酱面</DropdownItem>
          <DropdownItem>豆汁儿</DropdownItem>
          <DropdownItem>冰糖葫芦</DropdownItem>
          <DropdownItem>北京烤鸭</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown trigger="click" style="margin-left: 20px">
        <a href="javascript:void(0)">
          是否已启动
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem>驴打滚</DropdownItem>
          <DropdownItem>炸酱面</DropdownItem>
          <DropdownItem>豆汁儿</DropdownItem>
          <DropdownItem>冰糖葫芦</DropdownItem>
          <DropdownItem>北京烤鸭</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown trigger="click" style="margin-left: 20px">
        <a href="javascript:void(0)">
          清除条件
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem>驴打滚</DropdownItem>
          <DropdownItem>炸酱面</DropdownItem>
          <DropdownItem>豆汁儿</DropdownItem>
          <DropdownItem>冰糖葫芦</DropdownItem>
          <DropdownItem>北京烤鸭</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div class="info-text">注意：您的绑定上限数量为 9999，现在您已绑定了 58 个（货号/颜色）【到期时间：2019-07-11 15:59:59】</div>
    <Table stripe border :columns="columns1" :data="data1" @on-select="oneSelect"
           @on-select-all="selectALL" @on-selection-change="changeSelect"></Table>
    <div class="page">
      <Page :current="9" :show-total="true" :show-sizer="true" :page-size-opts="[10, 20, 30, 40]" placement="bottom" :show-elevator="true"
            @on-change="pageChange" @on-page-size-change="sizeChange" :total="100"/>
    </div>
  </div>
</template>

<script>
  import Title from '@/components/Title'

  export default {
    name: "goodsList",
    data() {
      return {
        columns1: [
          {
            title: '主图',
            key: 'img',
            align: 'center',
            render(h, params) {
              return h('img', {
                style: {
                  'width': '100px',
                  'height': '100px',
                  'vertical-align': 'middle',
                  'padding': '5px',
                  'border-radius': '10px'
                },
                attrs: {
                  'src': 'https://img.alicdn.com/bao/uploaded/i1/2266423121/O1CN011YvSa5U0XfAuJGK_!!2266423121.jpg'
                }
              })
            }
            
          },
          {
            title: '商品全称',
            key: 'name'
          },
          {
            title: '价格区间',
            key: 'section'
          },
          {
            title: '颜色',
            key: 'color'
          },
          {
            title: '是否完成绑定',
            key: 'isBind'
          },
          {
            title: '是否启动改价',
            key: 'changePrice'
          },
          {
            title: '改价记录',
            key: 'priceHistory'
          },
          {
            title: '改涨不改跌',
            key: 'upgrade'
          },
          {
            title: '价尾改9',
            key: 'changeNine'
          }
        ],
        data1: [
          {
            name: 18,
            section: 'New York No. 1 Lake Park',
            color: '2016-10-03',
            isBind: '1',
            changePrice: '1',
            priceHistory: '1',
            upgrade: '1',
            changeNine: '1'
          }
        ]
      }
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
      pageChange(e) {
        console.log(e)
      },
      sizeChange(e) {
        console.log(e)
      }
    },
    components: {
      Title
    }
  }
</script>

<style scoped lang="less">
  .goods {
    padding: 15px;

    .filter {
      border-color: #e7e7e7;
      padding: 12px;
    }

    .info-text {
      color: #DD5A43;
      margin-top: 20px;
    }

    .page {
      text-align: right;
      margin-top: 20px;
    }
  }
</style>
