<template>
	<div>
		<!--<div class="container">-->
		<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
			<div class="row clearfix">
				<div class="page-header">
				<h1>
					Update Personal Information <small>修改个人信息</small>
				</h1>
			</div>
				<div class="col-md-8 column">
					
						<div class="form-group">
							<label for="exampleInputEmail1">昵称：</label><input type="text" v-model="user.name" name="name" class="form-control" id="exampleInputEmail1" />
						</div>
						<div class="form-group">
							<label for="exampleInputEmail1">手机号：</label><input type="text" v-model="user.phone" readonly="readonly" name="phone" class="form-control" id="exampleInputEmail1" />
						</div>
						<div class="form-group">
							<label for="exampleInputPassword1">密码：</label><input type="password" v-model="user.password" name="password" class="form-control" id="exampleInputPassword1" />
						</div>
						<div class="form-group">
							<label for="exampleInputPassword1">性别：</label>
							<label>
							<input type="radio" v-model="user.sex" id="optionsRadios1" value="男" checked> 男
						</label> &nbsp;&nbsp;&nbsp;&nbsp;
							<label>
							<input type="radio" v-model="user.sex" id="optionsRadios2" value="女">女
						</label>

						</div>
						<div class="form-group">
							<label for="name">个性签名:</label>
							<textarea class="form-control" v-model="user.signature" name="signature" rows="3"></textarea>
						</div>
						<div class="form-group">
							<label for="exampleInputFile">上传头像:</label>
							<user_upload  @func="synImg"></user_upload>
						</div>
						<button type="button" @click="sub" class="btn btn-default">提交</button>
					
				</div>
			</div>
		</div>

		<!--</div>-->
	</div>
</template>

<script>
	import user_upload from '@/components/user_upload'
	export default {
		name: 'updateUser',
		data() {
			return{
				user:{
					name:'',
					phone:'',
					sex:'',
					password:'',
					signature:'',
					imgList:[]
				}
			}
		},
		components: {
			user_upload //组件私有注册
		},
		created(){
			this.loadUser();
		},
		methods:{
			/*回显个人信息在修改页面*/
			loadUser(){
				this.$http.get("http://localhost/Personal/getUser").then(
					function(result){					
						this.user.name=result.body.name;
						this.user.phone=result.body.phone;
						this.user.sex=result.body.sex;
						this.user.password=result.body.password;
						this.user.signature=result.body.signature;
						this.user.photourl=result.body.photourl;
				},function(error){
					
				})
			},
			synImg: function(data) {
				this.imgList = data; //把从子组件里得到的imgLis给父组件
			},
			
			sub:function(){
				var formdata = new FormData();
				for(var i = 0; i < this.imgList.length; i++) { //遍历传的文件
					formdata.append("file", this.imgList[i].file);
				}
					formdata.append("name",this.user.name);
					formdata.append("phone",this.user.phone);
					formdata.append("sex",this.user.sex);
					formdata.append("password",this.user.password);
					formdata.append("signature",this.user.signature);
					formdata.append("photourl",this.user.photourl);
					
				var header = { //设置请求头
					headers: {
						"Content-type": "multipart/form-data"
					}
				};
				this.$http.post("http://localhost/Personal/updateUser", formdata, header).then(
					function(result) {
						alert("上传成功！！！");
						this.$router.go(0); //相当于刷新页面
					},
					function(error) {
						alert("上传失败！！！");
					})
			},
			
		}
	}
</script>

<style scoped>
	.page-header{
		margin-left: 10PX;
	}
	.clearfix {
		margin-left: 40px;
		font-size: 13px;
	}
	
	
</style>