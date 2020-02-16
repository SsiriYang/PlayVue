<template>
	<div>
		<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
			<message_top></message_top>
			<div class="page-header">
				<h1>
					My Collection <small>我的收藏</small>
				</h1>
			</div>
			<div class="recommended">
				<div class="recommended-grids img-big">
					<div v-for="collection in collections" class="col-md-2 resent-grid recommended-grid show-video-grid img-coll">				
						<div class="resent-grid-img recommended-grid-img">
							<img src="../../static/img/del.png" class="upload_warp_img_div_del" @click="deleter(collection.cid)">
							<a style="cursor: pointer;" @click="toVideo(collection.vid)" ><img style="width: 200px;height: 150px;" :src="collection.vphoto" alt="" /></a>
						</div>
						<div style="width: 200px;height: 123px;" class="resent-grid-info recommended-grid-info">
							<div class="col-title">
								<h5 style=" height: 25px;"><a style="cursor: pointer;" @click="toVideo(collection.vid)" class="title">{{collection.title}}</a></h5>
								<p class="solo-p">
										{{collection.vediodetail}}
									</p>
							</div>
							<div class="div-col">	
							<div class="img-user col-md-1 column">
								<a href="" @click="selectAuthor(collection.aid)"><img alt="140x140" :src="collection.photourl" class="img-circle" /></a>
							</div>
							<p class="author">
								<a href="#" class="author">{{collection.name}}</a>
							</p>
							<p class="views" style=" margin-left: 55px;letter-spacing:1px">{{collection.signature}}</p>
							</div><!--<button class=" butt" style="width: 50px;height: 20px;background-image: linear-gradient(#D7E3F1, #EEE0E8);">删除</button>-->
						</div>
					</div>
					
					

					<div class="clearfix"> </div>
				</div>
			</div>

		</div>

	</div>
</template>

<script>
	import message_top from '@/components/message_top'
	export default {
		name: 'my_collection',
		data() {
			return{
				
				collections:[]
			}
		},
		components: {
			message_top //组件私有注册
		},
		created(){
			this.loadMyCollection();
		},
		methods:{
			loadMyCollection(){
				this.$http.get("http://localhost/Personal/selectMyCollection").then(
					function(result){
						this.collections=result.body;
				},function(error){
					/*alert("！！！")*/
				})
			},
			deleter:function(cid){
				var flag=confirm("确定要删除该收藏？");
				if(flag){
					this.$http.delete("http://localhost/Personal/deleterCollection",{
					params:{
						"cid":cid
					}
				}).then(
					function(result){
						this.loadMyCollection();
				},function(error){
					alert("查找收藏失败！")
				})
				}
				
			},
			selectAuthor:function(aid){//点击头像，跳转到这个页面，并携带着参数
				this.$router.push({
					path:"/solo_message",
					query:{
						"aid":aid
					}
				})
			
			},
			toVideo(vid){
				this.$router.push({
	  				path:'/videoShow',
	  				query:{
	  					vid:vid
	  				}
	  			});
	  			 this.$router.go(0);   
			}
		}
	}
</script>

<style scoped>
	.img-big{
		margin-top: -10px;
	}
	.img-coll{
		margin-left: 30px;
		margin-top: 30px;
	}
.img-circle {
		width: 30px;
		height: 30px;
		margin-top: 7px;
		margin-left: -3px;
	}
	.page-header{
		margin-left: 30px;
		margin-top: 20px;
	}

	.solo-p{
		display: -webkit-box;
	    -webkit-box-orient: vertical;
	   -webkit-box-pack: center;
	    -webkit-box-align: center;
	    -webkit-line-clamp:2;
	    overflow: hidden;
	        font-size: 12px;
	      
	        letter-spacing:1.6px
	       
    
	}
	.title{
		display: -webkit-box;
	    -webkit-box-orient: vertical;
	   -webkit-box-pack: center;
	    -webkit-box-align: center;
	    -webkit-line-clamp:1;
	    overflow: hidden;
	    width: 170px;
	    letter-spacing:1.6px
	   
	   
	}
	.views{
		display: -webkit-box;
	    -webkit-box-orient: vertical;
	   -webkit-box-pack: center;
	    /*-webkit-box-align: center;*/
	    -webkit-line-clamp:1;
	    overflow: hidden;
	     width: 100px;
	    
	}
	.butt{
    display: inline-block;
    padding: .3em .5em;
    background-image: linear-gradient(#ddd, #bbb);
    border: 1px solid rgba(0,0,0,.2);
    border-radius: .3em;
    box-shadow: 0 1px white inset;
    text-align: center;
    text-shadow: 0 1px 1px black;
    color:white;
    font-weight: bold;
}
.butt:active{
    box-shadow: .05em .1em .2em rgba(0,0,0,.6) inset;
    border-color: rgba(0,0,0,.3);
    background: #bbb;
}

.upload_warp_img_div_del,.btn {
		position: absolute;
		top: 3px;
		left: 180px;
		background-color: red;
		width: 16px;
		right: 4px;
	}
	.div-col{
		margin-top:-10px;
		width: 180px;
		height:40px;
	}
	.col-title{
		width: 180px;
		height: 60px;
	}
 
</style>