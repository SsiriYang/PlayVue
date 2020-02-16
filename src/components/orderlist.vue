<template>


  <div class="col-sm-9 col-md-10 ">
    <div class="page-shopping-cart " id="shopping-cart" >
      <h4 class="cart-title">我的订单</h4>
      <table class="table table-striped table-bordered">
        <thead class="bg-info">
          <tr>
            <th>订单号</th>
            <th>商品数量</th>
            <th>价格</th>
            <th>下单时间</th>
            <!-- <th>用户id</th> -->
            <th>收件人</th>
            <th>电话</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in order_list">
            <td>{{item.id}}</td>
            <td>{{item.amount}}</td>
            <td>{{item.totalPrice}}</td>
            <td>{{item.time}}</td>
            <!-- <td>{{item.uid}}</td> -->
            <td>{{item.name}}</td>
            <td>{{item.phone}}</td>
            <td v-if="item.status == 1">待发货
            </td>
            <td v-else="item.status == 2">已发货
            </td>

          </tr>
        </tbody>
      </table>
    </div>



 </div>

</template>

<script>
  export default {
    name: 'orderlist',

    data() {
      return {
        order_list: [{
          'id': '',
          'totalPrice': '',
          'amount': '',
          'status': '',
          'time': '',
          'uid': '',
          'phone': '',
          'name': ''
        }, ],



      }
    },
    //钩子函数
    created: function() {
      this.loadlist();
    },

    methods: {
      loadlist: function() {
        this.$http.get("http://localhost:80/order/selectAll").then(
          function(result) {
            this.order_list = result.body;
            console.log(result.body);

          },
          function(error) {

          })
      }

    },

    computed: {


    },

    mounted: function() {

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

  ul {
    margin: 0;
    padding: 0;
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
    width: 420px;
  }

  .page-shopping-cart .td-num,
  .page-shopping-cart .td-price,
  .page-shopping-cart .td-total {
    width: 260px;
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
    background: #ff0000;
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
    background: url("../../static/images/../../static/images/shopping_cart.png") no-repeat -80px 0;
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

  .form-horizontal .form-group {
    margin: 10px 0px 10px 0px;
  }
</style>
