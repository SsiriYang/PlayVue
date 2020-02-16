<template>
	<div>
		<div class="img-top">
			<div class="img-user col-md-1 column">
				<a href=""><img alt="140x140" :src="author.photourl" class="img-circle" /></a>
			</div>
			<div class="col-md-8 column ">
				<h3 class="user-name">{{author.name}}<span v-if="author.sex=='男'" id="boy">{{author.sex}}</span><span v-if="author.sex=='女'" id="girl">{{author.sex}}</span></h3>
				<h6 class="user-text">{{author.signature}}</h6>
			</div>
			<button class="btn btn-default  button-g" @click="insertfollow">
				<span class="glyphicon glyphicon-plus"></span>{{follow}}
			</button>
			<button class="btn btn-default btn-info button-g" @click="privateLetter(author.id)">
					<span class="glyphicon glyphicon-envelope"></span>私信
			</button>

			
		</div>
	</div>
</template>

<script>
	export default {
		name: 'solo_top',
		data() {
			return{
				follow:'关注',
				author:{}
				
			}
		},
		created(){
			this.loadAuthor();
		},
		methods:{
			loadAuthor(){
				var aid=this.$route.query.aid;//得到从my_collection跳转传来的参数
				this.$http.get("http://localhost/Personal/selectAuthorById",{
					params:{
						"aid":aid
					}
				}).then(
					function(result){
						this.author=result.body;
						this.loadFollow();
				},function(error){
					alert("失败");
				})
			},
			privateLetter(id){
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
								},
								function(error) {
									console.log(error);
								});
				  layer.close(index);
				});
			},
			insertfollow() {
				if(this.follow == '已关注') {
					this.$http.delete("http://localhost/follow", {
						params: {
							toUid: this.author.id
						}
					}).then(
						function(result) {
							alert(result.bodyText);
							this.follow = '关注';
						},
						function(error) {
							console.log(error);
						});
				} else {
					this.$http.get("http://localhost/follow", {
						params: {
							toUid: this.author.id
						}
					}).then(
						function(result) {
							alert(result.bodyText);
							this.follow = '已关注';
						},
						function(error) {
							console.log(error);
						});
				}
			},
			loadFollow(){
				this.$http.get("http://localhost/loadFollow", {
						params: {
							toUid: this.author.id
						}
					}).then(
						function(result) {
							this.follow = '已关注';
						},
						function(error) {
							console.log(error);
						});
			}
		}
	}
</script>

<style scoped>
	.img-top {
		margin-top: -19px;
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
	.button-g{
		margin-top: 140px;
		margin-left: 20px;
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