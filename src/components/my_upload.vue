<template>
	<div>
		<!--<div class="container">-->
		<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
			<div style="margin-right: 0px;" class="row clearfix">
				<div class="page-header">
					<h1>
					Upload My Video <small>上传我的视频</small>
				</h1>
				</div>
				<div class="col-md-8 column">
					
						<div class="form-group">
							<label for="exampleInputEmail1">标题：</label>
							<input type="text" name="title" v-model="title" class="form-control" placeholder="标题" id="exampleInputEmail1" />
						</div>

						<div class="form-group">
							<label for="exampleInputEmail1">类别：</label>
							<select name="categoryid" class="form-control" v-model="categoryid">
								<option value="">--请选择--</option>
								<option :value="category.id" v-for="category in categorys"  >{{category.name}}</option>
							</select>
						</div>
						<div class="form-group">
							<label for="name" >视频描述:</label>
							<textarea class="form-control" v-model="vediodetail" placeholder="请描述一下视频" name="vediodetail" rows="3"></textarea>
						</div>
						<div class="form-group">
							<label for="lastname">上传视频和视频封面:      <span style="color: red;">(注：一个视频和一张图片)</span></label>

							<upload @func="synImg"></upload>

						</div>
						<button type="button" v-on:click="sub" class="btn btn-default">提交</button>
				
				</div>
			</div>
		</div>

		<!--</div>-->
	</div>
</template>

<script>
	import upload from '@/components/upload'
	export default {
		name: 'my_upload',
		data() {
			return{
				title:'',
				categoryid:'',
				categorys:[],
				vediodetail:'',
				imgList: []
			}
			
		},
		components: {
			upload //组件私有注册
		},
		created(){
				this.loadCategory();
		},
		methods: {
			synImg: function(data) {
				this.imgList = data; //把从子组件里得到的imgLis给父组件
			},
			sub: function() {
				var formdata = new FormData();
				for(var i = 0; i < this.imgList.length; i++) { //遍历传的文件
					formdata.append("file", this.imgList[i].file);
				}
					formdata.append("title",this.title);
					formdata.append("categoryid",this.categoryid);
					formdata.append("vediodetail",this.vediodetail);
				var header = { //设置请求头
					headers: {
						"Content-type": "multipart/form-data"
					}
				};
				this.$http.post("http://localhost/Video/uploadVideo", formdata, header).then(
					function(result) {
						alert("上传成功！！！");
						
						this.$router.go(0); //相当于刷新页面

					},
					function(error) {
						
						alert("上传失败！！！");
					})
			},
			//得到类型数组
			loadCategory:function(){
				this.$http.get("http://localhost/Video/selectAllCategory").then(
					function(result){
						this.categorys=result.body;
				},function(error){
					alert("查找失败！！！")
				})
			}
		}
	}
</script>

<style scoped>
	.clearfix {
		margin-left: 50px;
		font-size: 13px;
	}
</style>