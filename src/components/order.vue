<template>

  <div class="col-sm-9  col-md-10 ">
    <div class="page-shopping-cart" id="shopping-cart">
      <h4 class="cart-title">购物清单</h4>

      <div class="cart-product clearfix">
        <table>
          <thead class="bg-info">
            <tr>
              <td><label><input type="checkbox" @click="check_all" :checked="check_goods.length == goodsList.length" />全选</label></td>
              <td>商品</td>
              <td>数量</td>
              <td>单价(元)</td>
              <td>金额(元)</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in goodsList" :key=index>

              <td class="td-check">
                <label>
                  <input type="checkbox" :value="item" v-model="check_goods" @click="select(item)" />
                </label>

              </td>

              <td class="td-product"><img :src="item.picture" width="98" height="98">
                <div class="product-info">
                  <h6>{{item.name}}</h6>
                  <p>编号：{{item.id}}&nbsp;&nbsp;</p>
                  <p style="width: 100px; display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;">简介：{{item.introduce}}</p>
                </div>
                <div class="clearfix"></div>
              </td>
              <td class="td-num">
                <div class="product-num">
                  <a href="javascript:;" class="num-reduce num-do fl" @click="sub(item)"><span></span></a>


                  <input type="text" class="num-input" v-model="item.num">


                  <a href="javascript:;" class="num-add num-do fr" @click="item.num++"><span></span></a>
                </div>
              </td>
              <td class="td-price">
                <p class="red-text">￥<span class="price-text">{{item.price}}</span></p>
              </td>
              <td class="td-total">
                <p class="red-text">￥<span class="total-text">{{item.price*item.num}}</span></p>
              </td>


              <td class="td-do"><a href="javascript:;" class="product-delect" @click="deleteOneProduct(item)">删除</a></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="cart-product-info">
        <!-- <a href="javascript:;" class="delete-product" @click='deleteProduct'><span></span>删除所选商品</a> -->




        <a href="/shop" class="keep-shopping"><span></span>继续购物</a>
        <a href="javascript:;" class="fr btn-buy" @click="addorder(selects)">去结算</a>
        <a href="javascript:;" class="fr product-total">￥<span>{{total_price}}</span></a>
        <a href="javascript:;" class="fr check-num"><span>{{total_num}}</span>件商品总计（不含运费）:</a>
      </div>


    </div>
  </div>

</template>

<script>
  export default {
    name: 'order',

    data() {

      return {
        goodsList: [{
          'id': '', //产品id
          'name': '', //产品名
          'introduce': '', //产品介绍
          'num': '', //数量
          'picture': '', //图片链接
          'price': '' //单价
        }, ],
        check_goods: [], //已选择的商品
        selects: []
      }
    },


    computed: {
      total_price() {
        let price = 0
        this.check_goods.forEach(item => {
          //                      总价 = 价格 * 数量
          price += Number(item.price) * Number(item.num)
        })
        return price
      },
      //              数量
      total_num() {
        let t_num = 0;
        this.check_goods.forEach(item => {
          t_num += Number(item.num);
        })
        return t_num
      }
    },
    //钩子函数
    created: function() {
      this.addcart();

    },
    methods: {
      select: function(item) {
        // if this.check_goods==true;
        this.selects.push(item);

        // console.log('select方法中的 selects'+this.selects);
      },

      check_all: function() {
        if (this.check_goods.length > 0) {
          this.check_goods = []
        } else {
          this.goodsList.forEach(item => {
            this.check_goods.push(item)
          })
        }
      },


      addcart: function() {
        var id = this.$route.query.id;
        //         console.log(id);

        this.$http.get("http://localhost:80/goods/addcart", {
          params: {
            id: id,
          }
        }).then(function(result) {

          this.goodsList = result.body;
          // console.log(this.goodsList);
        })
      },

      addorder: function(selects) {

        // alert('购物车传参'+this.selects);
        // console.log(12333);
        // console.log(this.selects);
        this.$router.push({
          path: '/list',

          query: {
            selects: selects
          },
        })
      },

      //数量改变函数
      sub: function(item) {
        if (item.num > 1) {
          item.num--
        } else {
          item.num = 1
        }
      },



      //删除单条产品
      deleteOneProduct: function(item) {
        //根据索引删除goodsList的记录
        this.check_goods.splice(this.check_goods.indexOf(item), 1);
        // console.log(this.check_goods.item.id);
        this.goodsList.splice(this.goodsList.indexOf(item), 1);

      }

    },



  }
</script>



<style scoped>
  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .clearfix {
    zoom: 1;
  }

  .clearfix:after {
    clear: both;
  }

  .clearfix:after {
    content: '.';
    display: block;
    overflow: hidden;
    visibility: hidden;
    font-size: 0;
    line-height: 0;
    width: 0;
    height: 0;
  }

  a {
    text-decoration: none;
    color: #333;
  }

  img {
    vertical-align: middle;
  }

  .page-shopping-cart {
    width: 70vw;
    /* margin: 50px 0 auto 20vw; */
    font-size: 14px;
    border: 1px solid #e3e3e3;
    border-top: 2px solid #317ee7;
  }

  .page-shopping-cart .cart-title {
    color: #317ee7;
    font-size: 16px;
    text-align: left;
    padding-left: 20px;
    line-height: 68px;
  }

  .page-shopping-cart .red-text {
    color: #e94826;
  }

  .page-shopping-cart .check-span {
    display: block;
    width: 24px;
    height: 20px;
    margin-top: 9px;
    background: url("../../static/images/cartBg.png") no-repeat 0 0;
  }

  /* 点击时改变勾选 */
  .page-shopping-cart .check-span.check-true {
    background: url('../../static/images/cartBg.png') no-repeat 0 -22px;
  }

  .page-shopping-cart .td-check {
    width: 70px;
  }

  .page-shopping-cart .td-product {
    width: 460px;
  }

  .page-shopping-cart .td-num,
  .page-shopping-cart .td-price,
  .page-shopping-cart .td-total {
    width: 160px;
  }

  .page-shopping-cart .td-do {
    width: 150px;
  }

  .cart-product-title {
    text-align: center;
    height: 38px;
    line-height: 38px;
    padding: 0 20px;
    background-color: #f7f7f7;
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
  }

  .cart-product-title .td-product {
    text-align: center;
    font-size: 14px;
  }

  .cart-product-title .td-check {
    text-align: left;
  }

  .cart-product-title .td-check .check-span .check-span {
    margin: 9px 6px 0 0;
  }

  /* 内容开始 */
  .cart-product {
    padding: 0 20px;
    text-align: center;
  }

  .cart-product table {
    width: 100%;
    text-align: center;
    font-size: 14px;
  }

  .cart-product table td {
    padding: 20px 0;
  }

  .cart-product table tr {
    border-bottom: 1px dashed #e3e3e3;
  }

  .cart-product table tr:last-child {
    border-bottom: none;
  }

  .cart-product table .product-num {
    border: 1px solid #e3e3e3;
    display: inline-block;
    text-align: center;
  }

  .cart-product table .product-num .num-do {
    width: 24px;
    height: 28px;
    background: #f7f7f7;
    display: block;
  }

  .cart-product table .product-num .num-reduce span {
    display: block;
    width: 6px;
    height: 2px;
    margin: 13px auto 0 auto;
    background: url("../../static/images/cartBg.png") no-repeat -40px -22px;
  }

  .cart-product table .product-num .num-add span {
    display: block;
    width: 8px;
    height: 8px;
    margin: 10px auto 0 auto;
    background: url("../../static/images/cartBg.png") no-repeat -60px -22px;
  }

  .cart-product table .product-num .num-input {
    width: 42px;
    height: 28px;
    line-height: 28px;
    border: none;
    text-align: center;
  }

  .cart-product table .td-product {
    text-align: center;
    font-size: 12px;
    line-height: 20px;
  }

  .cart-product table .td-product img {
    border: 1px solid #e3e3e3;
    margin-right: 10px;
  }

  .cart-product table .td-product .product-info {
    display: inline-block;
    vertical-align: middle;
    text-align: left;
  }

  .cart-product table .td-do {
    font-size: 12px;
  }

  /* 最后一行统计 */

  .cart-product-info {
    height: 50px;
    line-height: 50px;
    background: #f7f7f7;
    padding-left: 20px;
  }

  .cart-product-info .delete-product {
    color: #666;
  }

  .cart-product-info .delete-product span {
    display: inline-block;
    vertical-align: top;
    margin: 18px 8px 0 0;
    width: 13px;
    height: 15px;
    background: url("../../static/images/cartBg.png") no-repeat -60px 0;
  }

  .cart-product-info .product-total {
    font-size: 14px;
    color: #e94826;
  }

  .cart-product-info .product-total span {
    font-size: 20px;
  }

  .cart-product-info .check-num {
    color: #333;
  }

  .cart-product-info .check-num span {
    color: #e94826;
  }

  .cart-product-info .keep-shopping {
    color: #666;
    margin-left: 40px;
  }

  .cart-product-info .keep-shopping span {
    display: inline-block;
    vertical-align: top;
    margin: 18px 8px 0 0;
    width: 15px;
    height: 15px;
    background: url("../../static/images/cartBg.png") no-repeat -40px 0;
  }

  .cart-product-info .btn-buy {
    height: 50px;
    color: #fff;
    font-size: 20px;
    display: block;
    width: 110px;
    background: #ff7700;
    text-align: center;
    margin-left: 30px;
  }



  /* cart-worder */

  .page-shopping-cart .cart-worder {
    padding: 20px;
  }

  .page-shopping-cart .cart-worder .choose-worder {
    color: #fff;
    display: block;
    background: #39e;
    width: 140px;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    text-align: center;
    margin-right: 20px;
  }

  .page-shopping-cart .cart-worder .choose-worder span {
    display: inline-block;
    vertical-align: top;
    margin: 9px 10px 0 0;
    width: 22px;
    height: 22px;
    background: url("../../static/images/cartBg.png") no-repeat -92px 0;
  }

  .page-shopping-cart .cart-worder .worker-info {
    color: #666;
  }

  .page-shopping-cart .cart-worder .worker-info img {
    border-radius: 100%;
    margin-right: 10px;
  }

  .page-shopping-cart .cart-worder .worker-info span {
    color: #000;
  }

  .choose-worker-box {
    width: 620px;
    background: #fff;
  }

  .choose-worker-box .box-title {
    height: 40px;
    line-height: 40px;
    background: #F7F7F7;
    text-align: center;
    position: relative;
    font-size: 14px;
  }

  .choose-worker-box .box-title a {
    display: block;
    position: absolute;
    top: 15px;
    right: 16px;
    width: 10px;
    height: 10px;
    background: url("../../static/images/shopping_cart.png") no-repeat -80px 0;
  }

  .choose-worker-box .box-title a:hover {
    background: url("../../static/images/shopping_cart.png") no-repeat -80px -22px;
  }

  .choose-worker-box .worker-list {
    padding-top: 30px;
    height: 134px;
    overflow-y: auto;
  }

  .choose-worker-box .worker-list li {
    float: left;
    width: 25%;
    text-align: center;
    margin-bottom: 30px;
  }

  .choose-worker-box .worker-list li p {
    margin-top: 8px;
  }

  .choose-worker-box .worker-list li.cur a {
    color: #f70;
  }

  .choose-worker-box .worker-list li.cur a img {
    border: 1px solid #f70;
  }

  .choose-worker-box .worker-list li a:hover {
    color: #f70;
  }

  .choose-worker-box .worker-list li a:hover img {
    border: 1px solid #f70;
  }

  .choose-worker-box .worker-list li img {
    border: 1px solid #fff;
    border-radius: 100%;
  }
</style>
