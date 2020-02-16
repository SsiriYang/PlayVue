<template>
	<div>
		<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
			<message_top></message_top>
			<div class="page-header">
				<h1>
					Details of My Tidings <small>我的动态详情</small>
				</h1>
			</div>
			<div class="recommended">
				<div   style="width: 880px; margin-left:25px;margin-top: 20px;">
				<div class="panel panel-info" style="margin-bottom: 30px;">
					<div class="panel-heading">
						<div class="col-md-1 column">
							<a href=""><img style="width: 40px;height: 40px;margin-top: -8px;margin-left: -17px;" alt="140x140" :src="user.photourl" class="img-circle" /></a>
						</div>
						<b style="font-size:medium;margin-left: -14px;">昵称:{{user.name}} </b>

					</div>
					<div  class="panel-body ">
						<div v-html="dynamic.content"></div>
		
						<p class="time-p" >{{dynamic.createtime}}</p>
					</div>
				</div>
				
			</div>		
			</div>
			<div  class="page-header" style=" margin-bottom: 20px; width: 860PX;">
						<h2>
							 <small>我的评论</small>
						</h2>
					</div>
					
				<div class="media"v-for="DynamicComment in DynamicComments">
					<h5>昵称：{{DynamicComment.name}}</h5>
					<div class="img-user col-md-1 column">
						<a href=""><img alt="140x140" :src="DynamicComment.photourl" class="img-circle" /></a>
					</div>
					<div class="media-body">
						<div v-html="DynamicComment.content"></div>
						
						<span><a href="#" @click="deleteDynamicComment(DynamicComment.id)"> 删除评论 </a></span>
					</div>
				</div>
			

		</div>
		

	</div>
</template>

<script>
	import message_top from '@/components/message_top'
	export default {
		name: 'ueditor_detail',
		data() {
			return {
				user:{
					name:'',
					photourl:''
				},
				dynamic:{
					title:'',
					createtime:'',
					content:''
				},
				DynamicComments:[]
			}
		},
		components: {
			message_top //组件私有注册
		},
		created() {
			this.loadUeditor();
			this.loadUser();
			this.loadMyDynamicComment();
		},
		methods: {
			loadUeditor(){
				var did=this.$route.query.id;
				this.$http.get("http://localhost/Personal/selectDynamic",{
					params:{
						"did":did
					}
				}).then(
					function(result){
						this.dynamic=result.body;
				},function(error){
					
				})
			},
			loadUser(){
				this.$http.get("http://localhost/Personal/getUser").then(
					function(result){
						this.user=result.body;
				},function(error){
					
				})
			},
			loadMyDynamicComment(){
				var did=this.$route.query.id;
				this.$http.get("http://localhost/Personal/selectMyDynamicComment",{
					params:{
						"did":did
					}
				}).then(
					function(result){
						this.DynamicComments=result.body;
				},function(error){
					
				})
			},
			deleteDynamicComment(id){
				var flag=confirm("确定要删除该条评论？");
				if(flag){
					this.$http.delete("http://localhost/Personal/deleteDynamicComment",{
					params:{
						"id":id
					}
				}).then(
					function(result){
						this.loadMyDynamicComment();
				},function(error){
					
				})
				}
				
			}
			
		}

	}
</script>

<style scoped>
	.img-big {
		margin-top: -10px;
	}
	
	.img-coll {
		margin-left: 30px;
		margin-top: 30px;
	}
	
	
	.img-circle {
		width: 40px;
		height: 40px;
		margin-top: -8px;
		margin-left: -17px;
	}
	
	.page-header {
		margin-left: 30px;
		margin-top: 20px;
	}
	
	.time-p {
		font-size: 12px;
		margin-left: 750px;
		margin-top: 10px;
		line-height: 20px;
		color: #9E9E9E;
	}
	
		.media{
		border-bottom: 0.2px solid gainsboro;
		
		width: 910PX;
	}
.img-circle {
		width: 60px;
		height: 60px;
		/*margin-top: 125px;
		margin-left: 20px;*/
	}
	
</style>