<template>
	<div >
	<div  class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main cfcf">
	<div class="main-notice" >
		<div class="container containers" >
			<div class="row clearfix rows">
				<div class="col-md-12 column notice">
					<blockquote class=" system-notice1">
						<p style="color:#21DEEF ;font-size: 24px; margin-top: -10px;">
							 收件箱
						</p> 
					</blockquote>
					<div style="height: 42px;margin-bottom: 23px;">
					</div>
					
					<div v-for="inbox in inboxs">
						<div class="media well " >
							<div class="look" ><span v-if="inbox.status=='0'">未读</span><span v-if="inbox.status==1">已读</span></div>
							<div class="boxclose" @click="close(inbox.id)">×</div>
							<a href="#" class="pull-left  "><img   :src="inbox.photourl" class="media-object head-sculpture" alt='' /></a>
							<div class="media-body">
								<h3 class="media-heading">
									<a href="#">{{inbox.fromname}}</a><span>&nbsp;|&nbsp;<a href="#" @click="reply(inbox.fromUid,inbox.id)">回复</a></span>&nbsp;&nbsp;&nbsp;<span>{{inbox.createdate}}</span>
								</h3>
								<div class="medias"  @click="getcontent(inbox.id)">
									<div class="media-body qwqw">
										{{inbox.content}}
									</div>
								</div>
								
								
							</div>
						</div>
					</div>
					
					
				</div>
			</div>
		</div>
		
		
		
		</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'inbox',
		data() {
			return{
				inboxs:[]
			}
		},
		created:function(){
			this.getinbox();
		},
		methods:{
			reply:function(id,mid){
				var _this=this;
				layer.prompt({
				  formType: 2,
				  value: '请输入您想对up主的话',
				  title: '私信',
				  area: ['350px', '120px'] //自定义文本域宽高
				}, function(value, index, elem){
				  _this.$http.get("http://localhost/privateLetter", {
								params: {
									content:value,
									'toUid':id
								}
							}).then(
								function(result) {
									alert(result.bodyText);
									 _this.$http.put("http://localhost/message/look",{//传参
											"id":mid
										}).then(
											function(result){
												this.getinbox();
												this.$router.go(0)
											},
											function(error){
											}
										)
								},
								function(error) {
									console.log(error);
								});
				  layer.close(index);
				});
			},
			close:function(id){//修改
				this.$http.put("http://localhost/message/inboxclose",{//传参
					"id":id
				}).then(
					function(){
					this.getinbox();	
					},
					function(){}
				)
			},
			getinbox:function(){
				this.$http.get("http://localhost/message/inbox").then(
					function(result){
						this.inboxs = result.body;
						if (this.inboxs.status==0) {
							
						} else if(this.inboxs.status==1){
							
						}
						
					},
					function(error){
						alert("数据加载失败.")
					}
				)
			},
			getcontent:function(id){
				this.$http.put("http://localhost/message/look",{//传参
					"id":id
				}).then(
					function(result){
						this.$router.push({
							path:"/notice_content",
							query:{
								id:id
							}
						})
					},
					function(error){
						
					}
				)
			}
		}
	}
</script>
 
<style scoped>
.look{
	display: inline-block;
	font-size: 12px;
	transform: scale(.85);
	color: #fff;
	background-color: #ffafc9;
	border-radius: 3px;
	line-height: 13px;
	max-width: 30px;
	padding: 1px 3px;
	font-family: sans-serif,sans-serifsans-serif,Calibri,Arial,Helvetica;
	
	}
</style>