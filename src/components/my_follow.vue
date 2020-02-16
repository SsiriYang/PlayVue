<template>
	<div>
		<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
			<message_top></message_top>
			<div class="page-header">
				<h1>
					People of concern <small>关注的人</small>
				</h1>
			</div>
			<div class="media" v-for="Myfollow in Myfollows">
				<h5>昵称：{{Myfollow.name}}</h5>
				<div class="img-user col-md-1 column">
					<a href="" @click="selectAuthor(Myfollow.id)"><img alt="140x140" :src="Myfollow.photourl" class="img-circle" /></a>
				</div>
				<div class="media-body">
					<p>个性签名：{{Myfollow.signature}}</p>
					<span><a href="#" @click="delFollow(Myfollow.id)"> 取消关注 </a></span>
				</div>
			</div>

		</div>

	</div>
</template>

<script>
	import message_top from '@/components/message_top'
	export default {
		name: 'my_follow',
		data() {
			return{
				Myfollows:[]
			}
		},
		components: {
			message_top //组件私有注册
		},
		created(){
			this.loadFollow();
		},
		methods:{
			loadFollow(){
				this.$http.get("http://localhost/Personal/selectMyFollow").then(
					function(result){
						this.Myfollows=result.body;
				},function(error){
					
				})
			},
			delFollow(id){
				var flag=confirm("确定要删除该关注？");
				if(flag){
					this.$http.get("http://localhost/Personal/deleterMyFollow",{
					params:{
						"toUid":id    //把关注的userid传过去
					}
				}).then(
					function(result){
						this.loadFollow();
				},function(error){
					
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
			
			}
		}
	}
</script>

<style scoped>
	.media{
		border-bottom: 1px solid gainsboro;
		margin-left: 30px;
	}
.img-circle {
		width: 60px;
		height: 60px;
		/*margin-top: 125px;
		margin-left: 20px;*/
	}
	.page-header{
		margin-top: 20px;
		margin-left: 30px;
	}
	.media-body p{
		display: -webkit-box;
	    -webkit-box-orient: vertical;
	    -webkit-box-pack: center;
	   /* -webkit-box-align: center;*/
	    -webkit-line-clamp:1;
	    overflow: hidden;
	}
</style>