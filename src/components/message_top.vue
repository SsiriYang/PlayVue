<template>
	<div>
		<div class="img-top">
			<div class="img-user col-md-1 column">
				<a href="" @click="toUpdate" data-toggle="tooltip" data-placement="top" title="修改个人信息"><img alt="140x140" :src="user.photourl" class="img-circle" />
				</a>
			</div>
			<div class="col-md-8 column ">
				<h3 class="user-name">{{user.name}}<span v-if="user.sex=='男'" id="boy">{{user.sex}}</span><span v-if="user.sex=='女'" id="girl">{{user.sex}}</span></h3>
				<h6 class="user-text">{{user.signature}}</h6>
			</div>
			
		</div>
	</div>
</template>

<script>
	export default {
		name: 'message_top',
		data() {
			return{
				user:{}
			}
		},
		created(){
			this.loadUser();
		},
		methods:{
			loadUser(){
				this.$http.get("http://localhost/Personal/getUser").then(
					function(result){					
						this.user=result.body;
						
				},function(error){
						
				})
			},
			toUpdate(){
					this.$router.push({
						path:"/updateUser"
					})
			}
		}
		
	}
</script>

<style scoped>
	.img-top {
		margin-top: -23px;
		/*width: 1267px;*/
		height: 200px;
		background-image: url(../../static/img/cb1c3ef50e22b6096fde67febe863494caefebad.png);
	}
	
	.img-circle {
		width: 60px;
		height: 60px;
		margin-top: 125px;
		margin-left: 20px;
	}
	
	.user-name {
		color: white;
		margin-left: -10px;
		margin-top: 130px;
	}
	
	.user-text {
		margin-left: -10px;
		color: white;
	}
	#boy{
	display: inline-block;
	font-size: 12px;
	color: #fff;
	margin-left: 4px;
    font-weight: 500;
	background-color: #75AFEF;
	border-radius: 4px;
	line-height: 12px;
	max-width: 30px;
	padding: 1px 3px;
	font-family: sans-serif,sans-serifsans-serif,Calibri,Arial,Helvetica;
	}
	#girl{
    display: inline-block;
    font-size: 12px;
    color: #fff;
    margin-left: 4px;
    font-weight: 500;
    background-color: #ffafc9;
    border-radius: 4px;
    line-height: 12px;
    max-width: 30px;
    padding: 1px 3px;
    font-family: sans-serif,sans-serifsans-serif,Calibri,Arial,Helvetica;
	}
</style>