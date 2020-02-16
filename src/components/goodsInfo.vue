<template>
	<div class="showall">
		<div class="showbot">
            <div id="showbox">
            	<div id="img">
            		<img :src="good.picture" width="400" height="400" />
            	</div>
                <div id="showsum">
	                	<div class="tr-nobdr">
	                		<h3 style="">{{good.name}}</h3>
	                	</div>
	            		<div class="txt">
	            			<span class="nowprice">￥{{good.price}}.00</a></span>

	            		</div>
	                	<div class="txt-h">
	                		<span class="tex-o" style="font-size: 25px;">分类</span>
	                		<ul class="glist" id="glist">
	                			<li><a title="type1" href="">{{type.typeName}}</a></li>
	                			<li><a title="type2" href="">{{type.typeName}}</a></li>
	                		</ul>
	                	</div>
	                	<div class="gcIpt">
	                		<span class="guT" style="margin-left:5px;font-size: 25px;">数量</span>
	                		<input id="sub"  type="button" value="-" @click="sub" />
	                		<input id="text" type="text" readonly="readonly" v-model="num" style="width:50px; text-align: center; color: #0F0F0F;"/>
	                		<input id="add"  type="button" value="+" @click="num++"/>
	                	</div>
	                	<div class="nobdr-btns">
	                		<button class="addcart yh" @click="addcart(good.id)">立即购买</button>
	                	</div>
            	</div>
            </div>
        </div>
	</div>
</template>

<script>
	export default {
		name: 'goodsInfo',
		data() {
			return {
				good:{
					id: '', //商品id
					name: '', //商品名
					picture: '', //图片链接
					price: '', //单价
					introduce: '',
					typeId:''
				},
				type:{
					id:'' ,
					typeName: ''
				},
				num:'1'
			}
		},
		created(){
			var id = this.$route.query.id;
			this.getGood(id);

		},
		methods:{
			getGood:function(id){

				this.$http.get("http://localhost/goods/selectById",{
					params:{
						id:id
					}
				}).then(
					function(result){
						console.log(result.body);
						this.good = result.body;
						this.getType();
					},function(){

					})
			},
			getType:function(){
				this.$http.get("http://localhost/goodsType/selectTypeById",{
					params:{
						id:this.good.typeId
					}
				}).then(
					function(result){
						console.log(result.body);
						this.type=result.body;
					},function(){

					})
			},
			sub:function(){
				if(this.num>1){
					this.num--;
				}
				this.num=1;
			},
      addcart:function(id){
      				this.$router.push({
      					path:'/order',
      					query:{
                  id:id,

      					}
      				})
      			}
		}
	}
</script>


<style>
	#app{margin-left:340px; margin-top:100px;width:1000px;}

	.showbot #img{float: left;}
	.showall #showsum{padding-left:20px; width:400px;height: 400px;float: left;}
	.showall
	.tr-nobdr{margin-top: 20px;padding-bottom: 10px;}
	.tr-nobdr h3{color: #171717;font-size: 28px;font-weight:400;}
	.txt{width: 400px;height: 70px; overflow: hidden;background: #f8f8f8;font-size: 36px;color: #f73a3a;}
	.nowprice a{font-size: 36px;color: #f73a3a;}
	.nowprice a:hover{text-decoration: none;}
	.cumulative{float: right;}
	.number{
		float: left;
		margin-top: 30px;
		padding: 0px 10px;
		border-right: #e7e7e7 solid 1px;
		font-size: 14px;
		text-align: center;
		color: #bfbfbf;
	}
	.number em{
		color: #5885c6;
		font-style:normal
	}
	.tyu{
		border: none;
	}

	.tex-o{
		float: left;
		font-size: 14px;
		line-height: 80px;
		padding-right: 20px;
		color: #848484;
	}
	#glist{padding-top:25px;}
	#glist li{
		float: left;
		padding-right: 10px;
	}
	#glist li a{
		padding: 5px 8px;
		color: #222222;
		font-size: 16px;
		border: #e3e3e3 solid 1px;
		display: block;
	}
	#glist li a:hover{
		border: #f73a3a solid 1px;
		text-decoration: none;
		color: #f73a3a;
	}
	.gcIpt{
		height: 60px;
	}
	.guT{
		color: #848484;
		font-size: 14px;
		padding-right:18px;
		line-height: 40px;
	}
	.gcIpt input{
		float: left;
		border: #e3e3e3 solid 1px;
		padding: 5px 8px;
		color: #848484;
		font-size: 16px;}
	.nobdr-btns{
		padding-top: 5px;
	}
	.addcart{
	background: #fd532d;
	padding: 0px 50px;
	border-radius: 4px;
	color: #FFFFFF;
	margin-right: 10px;
	font-size:16px;
	line-height: 50px;
	}
	.yh{ background: #e60013;}
	.addcart img{vertical-align:middle;margin-bottom:3px;padding-right: 5px;}
	.guarantee{
	height: 50px;
	}
	.guarantee span{
		color: #666666;
		font-size: 14px;
		line-height: 50px;}
	.guarantee span a img{vertical-align:middle;margin-bottom:3px;}
</style>
