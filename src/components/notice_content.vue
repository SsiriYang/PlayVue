<template>
	<div  class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
	<div class="container containers">
	<div class="row clearfix">
		<div class="col-md-12 column" >
			<a href="/inbox" class="goback">back:收件箱 </a>
			<div class="jumbotron" style="margin-top: 10px;">
				<p class="contenti contentis">
					To: {{message.toname}}
				 
				</p>
				<p class="contenti-in">
					{{message.content}}
				 
				</p>
				<p class="contenti contentis" style="float: right; margin-right: 200px;">
					—— {{message.fromname}} 
					
				</p>
			</div>
		</div>
	</div>
</div>
			
	</div>
</template>

<script>
	export default {
		name: 'notice_content',
		data() {
			return{
				message:{
					fromname:'',
					toname:'',
					content:''
					
				}
			}
		},
		created:function(){
			this.getinfo();
		},
		methods:{
			getinfo:function(){
				var id = this.$route.query.id;
				console.log(id);
				this.$http.get("http://localhost/message/getMessageById",{//传参
					params:{
						id:id
					}
				}).then(
					function(result){
						this.message.fromname = result.body.fromname;
						this.message.toname = result.body.toname;
						this.message.content = result.body.content;
					},
					function(error){
						alert("数据加载失败.")
					}
				)
			}
		}
	}
</script>
 
<style scoped>
.contentis{
	font-weight: 400;
}
.goback{
	text-decoration:none;
	color: #21deef;
	font-size: 18px;
	margin: 15px;
}
</style>