<template>
  <div>
    <div class="col-sm-9  col-md-10  ">
      <div class="page-shopping-cart" id="shopping-cart" >
        <div class="form-horizontal">
          <h4 class="cart-title">收货地址</h4>
          <div class="form-group">
            <label for="name" class="col-sm-1 control-label">姓名：</label>
            <div class="col-sm-6">
              <input class="form-control" name="name" v-model="order.name" placeholder="请输入姓名" type="text">
            </div>
          </div>
          <div class="form-group">
            <label for="name" class="col-sm-1 control-label">电话：</label>
            <div class="col-sm-6">
              <input class="form-control" name="phone" v-model="order.phone" placeholder="请输入电话" type="text">
            </div>
          </div>
          <div class="form-group">
            <label for="name" class="col-sm-1 control-label">地址：</label>
            <div class="col-sm-6">
              <input class="form-control" name="address" placeholder="请输入地址" type="text">
            </div>
          </div>
        </div>

      </div>

      <div class="page-shopping-cart" id="shopping-cart" style="border-top: 1px solid #e3e3e3;margin-top: 20px;">
        <h4 class="cart-title">购物清单</h4>
         
        <div class="cart-product clearfix">
          <table>
            <thead class="bg-info">
              <tr>
              	<td>商品</td>
                <td>数量</td>
                <td>单价(元)</td>
                <td>金额(元)</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in goodsList">

                <td class="td-product">
                  <img :src="item.picture" width="98" height="98">
                  <div class="product-info">
                    <h6>{{item.name}}</h6>
                    <p>编号：{{item.id}}&nbsp;&nbsp;</p>
                    <p style="width: 100px; display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;">简介：{{item.introduce}}</p>

                  </div>
                  <div class="clearfix"></div>
                </td>
                <td class="td-num">
                  <div class="product-num">


                    <input type="text" class="num-input" v-model="item.num" disabled="disabled">

                  </div>
                </td>
                <td class="td-price">
                  <p class="red-text">￥<span class="price-text">{{item.price}}</span></p>
                </td>
                <td class="td-total">
                  <p class="red-text">￥<span class="total-text">{{item.price * item.num}}</span>.00</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="cart-product-info">
          <a class="btn-buy fr" @click="create_oder()">立即支付</a>
          <p class="fr product-total">￥<span>{{total_price}}</span></p>
          <p class="fr check-num"><span>{{total_num}}</span>件商品总计（不含运费）：</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'list',

    data() {
      return {
        order: {
            'id':'',
            'total_price':'',
            'amount':'',
            'status':'',
            'time':'',
            'uid':'',
            'phone':'',
            'name':''
          },
        goodsList: [],


      }
    },
    //钩子函数
    created: function() {
      // console.log( this.$route.query.selects);
      this.goodsList = this.$route.query.selects;
    },

    methods: {
      create_oder: function() {
        // order:{
        //       "id":'123',
        //       "total_price":this.goodsList.total_price,
        //       "amount":this.total_num,
        // 			"status":'1',
        //       "time":new Date(),
        // 			"phone":this.order.phone,
        //       "uid":'123',
        //       "name":this.order.name,
        //       },
        // console.log(order);
        this.$http.get("http://localhost:80/order/add", {
          params: {

            "id":'',
            "totalPrice": this.total_price,
            "amount":this.total_num,
            "status": '1',
            "time": '',
            "uid": '123',
            "phone": this.order.phone,
            "name": this.order.name,
          }
        }).then(

          function() {
            // this.order = {
            //   'id': '',
            //   'total_price': '',
            //   'amount': '',
            //   'status': '',
            //   'time': '',
            //   'uid': '',
            //   'phone': '',
            //   'name': ''
            // }
            alert("支付成功");
            this.$router.push({
            	path:'/orderlist',
            	// query:{
            	// 	this.$http.get("http://localhost:80/order/selectAll")
            	// }
            })

          },
          function() {
            alert("支付失败");
          })
      }

    },

    computed: {

      total_price() {
        let price = 0
        this.goodsList.forEach(item => {
          // 总价 = 价格 * 数量
          price += Number(item.price) * Number(item.num)
        })
        return price
      },
      //              数量
      total_num() {
        let t_num = 0;
        this.goodsList.forEach(item => {
          t_num += Number(item.num);
        })
        return t_num
      }
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

  blockquote,
  body,
  dd,
  div,
  dl,
  dt,
  fieldset,
  form,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  img,
  input,
  li,
  ol,
  p,
  table,
  td,
  textarea,
  th,
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
