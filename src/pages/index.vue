<template>
  <!--首页-->
  <div class="index-wrap">
    <!--首页左边-->
    <div class="index-left">
      <div class="index-left-block">
        <h2>全部产品</h2>
        <!--产品列表模块-->
        <template v-for="product in productList">
          <h3>{{ product.title}}</h3>
          <ul>
            <li v-for="item in product.list">
              <a :href="item.url">{{ item.name }}</a>
              <span v-if="item.hot" class="hot-tag">HOT</span>
            </li>
          </ul>
          <div v-if="!product.last" class="hr"></div>
        </template>
        <!--产品列表模块结束-->
      </div>
      <div class="index-left-block lastest-news">
        <h2>最新消息</h2>
        <ul>
          <!--最新消息内容-->
          <li v-for="item in newsList">
            <a :href="item.url" class="new-item">{{ item.title }}</a>
          </li>
        </ul>
      </div>
    </div>
    <!--首页左边结束-->
    <!--首页右边-->
    <div class="index-right">
      <!--轮播组件-->
      <slide-show :slides="slides" :inv="invTime"></slide-show>
      <!--轮播下面的产品列表-->
      <div class="index-board-list">
        <!--产品内容模块-->
        <div
          class="index-board-item"
          v-for="(item, index) in boardList"
          :class="[{'line-last' : index % 2 !== 0}, 'index-board-' + item.id]">
          <div class="index-board-item-inner" >
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
            <div class="index-board-button">
              <router-link class="button" :to="{path: 'detail/' + item.toKey}">立即购买</router-link>
            </div>
          </div>
        </div>
        <!--内容模块结束-->
      </div>
    </div>
    <!--首页右边结束-->
  </div>
  <!--首页结束-->
</template>

<script>
  import slideShow from '../components/slideShow'
  export default {
    components: {
      slideShow
    },
    // 在实例创建完成后被立即调用
    created () {
      // vue-resource提供的方法
      this.$http.get('https://easy-mock.com/mock/5a5dce8524f2fc35a9bf568b/example_1516097157361/getNewsList')// promise对象
        .then((res) => {
          this.newsList = res.data['getNewsList']
        }, (err) => {
          console.log(err)
        })
    },
    data () {
      return {
        invTime: 2000,
        slides: [
          {
            src: require('../assets/slideShow/pic1.jpg'),
            title: 'xxx1',
            href: 'detail/analysis'
          },
          {
            src: require('../assets/slideShow/pic2.jpg'),
            title: 'xxx2',
            href: 'detail/count'
          },
          {
            src: require('../assets/slideShow/pic3.jpg'), // js引入图片路径必须用require
            title: 'xxx3',
            href: 'detail/publish'
          },
          {
            src: require('../assets/slideShow/pic4.jpg'),
            title: 'xxx4',
            href: 'detail/forecast'
          }
        ],
        // 轮播下方的商品列表
        boardList: [
          {
            title: '开放产品',
            description: '开放产品是一款开放产品',
            id: 'car',
            toKey: 'count',
            saleout: false
          },
          {
            title: '品牌营销',
            description: '品牌营销帮助你的产品更好地找到定位',
            id: 'earth',
            toKey: 'analysis',
            saleout: false
          },
          {
            title: '使命必达',
            description: '使命必达快速迭代永远保持最前端的速度',
            id: 'loud',
            toKey: 'forecast',
            saleout: true
          },
          {
            title: '勇攀高峰',
            description: '帮你勇闯高峰，到达事业的顶峰',
            id: 'hill',
            toKey: 'publish',
            saleout: false
          }
        ],
        // 轮播下方列表结束
        newsList: [],
        // 产品列表的内容
        productList: {
          pc: {
            title: 'PC产品',
            list: [
              {
                name: '数据统计',
                url: 'http://starcraft.com'
              },
              {
                name: '数据预测',
                url: 'http://warcraft.com'
              },
              {
                name: '流量分析',
                url: 'http://overwatch.com',
                hot: true
              },
              {
                name: '广告发布',
                url: 'http://hearstone.com'
              }
            ]
          },
          app: {
            title: '手机应用类',
            last: true,
            list: [
              {
                name: '91助手',
                url: 'http://weixin.com'
              },
              {
                name: '产品助手',
                url: 'http://twitter.com',
                hot: true
              },
              {
                name: '智能地图',
                url: 'http://maps.com'
              },
              {
                name: '团队语音',
                url: 'http://phone.com'
              }
            ]
          }
        }
        // 产品列表结束
      }
    }
  }
</script>

<style scoped>
  .index-wrap {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }
  .index-left {
    float: left;
    width: 300px;
    text-align: left;
  }
  .index-right {
    float: left;
    width: 900px;
  }
  .index-left-block {
    margin: 15px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
  }
  .index-left-block .hr {
    margin-bottom: 20px;
  }
  .index-left-block h2 {
    background: #4fc08d;
    color: #fff;
    padding: 10px 15px;
    margin-bottom: 20px;
  }
  .index-left-block h3 {
    padding: 0 15px 5px 15px;
    font-weight: bold;
    color: #222;
  }
  .index-left-block ul {
    padding: 10px 15px;
  }
  .index-left-block li {
    padding: 5px;
  }
  .index-board-list {
    overflow: hidden;
  }
  .index-board-item {
    float: left;
    width: 400px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
    padding: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
  }
  .index-board-item-inner {
    min-height: 125px;
    padding-left: 120px;
  }
  .index-board-car .index-board-item-inner{
    background: url(../assets/images/1.png) no-repeat;
  }
  .index-board-loud .index-board-item-inner{
    background: url(../assets/images/2.png) no-repeat;
  }
  .index-board-earth .index-board-item-inner{
    background: url(../assets/images/3.png) no-repeat;
  }
  .index-board-hill .index-board-item-inner{
    background: url(../assets/images/4.png) no-repeat;
  }
  .index-board-item h2 {
    font-size: 18px;
    font-weight: bold;
    color: #000;
    margin-bottom: 15px;
  }
  .line-last {
    margin-right: 0;
  }
  .index-board-button {
    margin-top: 20px;
  }
  .lastest-news {
    min-height: 512px;
  }
  .hot-tag {
    background: red;
    color: #fff;
  }
  .new-item {
    display: inline-block;
    width: 230px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
