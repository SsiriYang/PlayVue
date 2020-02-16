<template>
	<div>
		<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
			<message_top></message_top>
			<div class="page-header">
				<h1>
					My Tidings <small>我的动态</small>
				</h1>
			</div>
			<div class="recommended">
				<div v-for="ueditor in ueditors" class="col-sm-7" style="width: 880px; margin-left:25px;margin-top: 20px;">
					
				<div class="panel panel-info">
					<div class="panel-heading" style="height: 1px;border-bottom: none;">
					<img  style="margin-left: 810px;width:18px;height:18px;" src="../../static/img/del.png" class="upload_warp_img_div_del" @click="deleter(ueditor.id)">
					</div>
					<div class="panel-heading">
						<div class="col-md-1 column" style="margin-top: -21px;">
							<a href=""><img alt="140x140" :src="user.photourl" class="img-circle" /></a>
						</div>
						<div class="col-md-1 column" style="margin-top: -21px;">
						<b  style="font-size:medium;margin-left: -21px;">{{user.name}} </b>
						</div>
					</div>
					<div  class="panel-body ">
				
						<a href="" @click="detail(ueditor.id)"><span style="font-size: 12px;margin-left: 750px; color: #31708F;cursor:pointer">查看详情</span></a>
						<p class="p-ueditor" style="line-height: 20px; font-size: 12px;text-indent:2em;"><div v-html="ueditor.content"></div></p>
						<p class="time-p" >{{ueditor.createtime}}</p>
					</div>
				</div>
				
			</div>		
			</div>

		</div>

	</div>
</template>

<script>
	import message_top from '@/components/message_top'
	export default {
		name: 'my_ueditor',
		data() {
			return{
				ueditors:[],
				user:{
					name:'',
					photourl:''
				}
			}
		},
		components: {
			message_top //组件私有注册
		},
		mounted(){
			this.loadUeditor();
			this.loadUser();
		},
		methods:{
			loadUeditor(){
				this.$http.get("http://localhost/Personal/selectDynamicByUserId").then(
					function(result){
							this.ueditors=result.body;				
				},function(error){
					alert("请先登录！！！")
				})
			},
			loadUser(){
				this.$http.get("http://localhost/Personal/getUser").then(
					function(result){
						this.user=result.body;
				},function(error){
					alert("请先登录！！！")
				})
			},
			deleter(id){
				var flag=confirm("确定删除该条动态？");
						if(flag){
							this.$http.delete("http://localhost/Personal/deleteDynamicById",{
								params:{
									"id":id
								}
							}).then(
						function(result){
								this.loadUeditor();
								this.loadUser();
						},function(error){
							alert("删除失败！！！")
						})
					}
			
			},
			detail(id){
				this.$router.push({
					path:"/ueditor_detail",
					query:{
						"id":id
					}
				})
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
		width: 40px;
		height: 40px;
		margin-top: -8px;
		margin-left: -17px;
	}
	.page-header{
		margin-left: 30px;
		margin-top: 20px;
	}
	.p-ueditor{
		display: -webkit-box;
	    -webkit-box-orient: vertical;
	   -webkit-box-pack: center;
	    -webkit-box-align: center;
	    -webkit-line-clamp:2;
	    overflow: hidden;
	    margin-top: 10px;
	    letter-spacing:1.4px
	    
	}
	.time-p{
		font-size: 12px;
		margin-left: 750px;
		margin-top: 10px;
		line-height: 20px;
		color: #9E9E9E;
	}
</style>