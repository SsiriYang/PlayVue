<template>
	<div >
	<div  class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main cfcf">	
	<div class="main-notice" >
		<div class="container containers" >
			<div class="row clearfix rows">
				<div class="col-md-12 column notice">
					<blockquote class="system-notice">
						<p style="color:#21DEEF ;font-size: 24px; margin-top: -10px;">
							 系统通知
						</p> 
					</blockquote>
					<div style="height: 42px;margin-bottom: 23px;">
					</div>
					<div v-for="notic in notices">
						<blockquote >
							<p >
								<strong>{{notic.title}}  </strong><span class="timen">{{notic.createTime}}</span>
							</p>
							<p class="content">{{notic.content}}</p>
						</blockquote>
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
		name: 'notice',
		data() {
			return{
				notices:[]
			}
			
		},
		created:function(){
			this.getnotices();
		},
		methods:{
		getnotices:function(){
			this.$http.get("http://localhost/message/getNotice").then(
				function(result){
					this.notices = result.body;
				},
				function(error){
				}
			)
		}
	}
	}
	
</script>
 
<style scoped>
.timen{
	font-size: 15px;
    margin-left: 20px;
    color: #ca9393;
}

</style>