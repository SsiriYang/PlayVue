<template>
	<div>
		<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
			<solo_top></solo_top>
			<div class="page-header">
				<h1>
					Details of Her/His Tidings <small>她/他的动态详情</small>
				</h1>
			</div>
			<div class="recommended">
				<div style="width: 880px; margin-left:25px;margin-top: 20px;">
					<div class="panel panel-info">
						<div class="panel-heading">
							<div class="col-md-1 column">
								<a href="" style="cursor: pointer;" @click="selectAuthor(dynamic.uid)"><img style="width: 40px;height: 40px;margin-top: -8px;margin-left: -17px;" alt="140x140" :src="user.photourl" class="img-circle" /></a>
							</div>
							<b style="font-size:medium;margin-left: -14px;">昵称:{{user.name}} </b>

						</div>
						<div class="panel-body ">
							<!--<b style="font-size:medium;margin-left: 340px;">标题：{{dynamic.title}}</b>-->
							<p class="p-ueditor" style="line-height: 20px; font-size: 12px;text-indent:2em;">
								<div v-html="dynamic.content"></div>
							</p>
							<p class="time-p">{{dynamic.createtime}}</p>
						</div>
					</div>
					<div id="edi">

						<script id="editor" type="text/plain" style=" width:870px;height:120px;margin-top: 20px;">

						</script>
					</div>

				</div>
				<div class="form-group" id="but">
					<div class="col-sm-offset-2 col-sm-10">
						<button type="button" class="btn btn-default" v-on:click="sub(dynamic.id)">发布</button>
					</div>
				</div>
			</div>

			<div class="page-header" style=" width: 860PX;">
				<h2>
							 <small style="margin-top: 50px;">评论</small>
						</h2>
			</div>
			<div v-for="comm in comms">
				<div class="media">
					<h5>昵称:{{comm.name}}</h5>
					<div class="img-user col-md-1 column">
						<a href="" style="cursor: pointer;" @click="selectAuthor(comm.uid)" ><img alt="140x140" :src="comm.photourl" class="img-circle" /></a>
					</div>
					<div class="media-body">
						<div v-html="comm.content"></div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import solo_top from '@/components/solo_top'
	var ue = UE.getEditor('editor', {
		toolbars: [
			[ //工具条
				'anchor', //锚点
				'undo', //撤销
				'bold', //加粗
				'snapscreen', //截图
				'selectall', //全选
				'time', //时间
				'date', //日期	
				'simpleupload', //单图上传
				'insertimage', //多图上传
				'emotion', //表情
				'imagecenter', //居中
				'removeformat', //清除格式
				'cleardoc', //清空文档
				'backcolor', //背景色
				'autotypeset', //自动排版 
			]
		]
	});

	export default {
		name: 'He_ueditor_detail',
		data() {
			return {
				user: {
					name: '',
					photourl: ''
				},
				dynamic: {
					//				title:'',
					id:0,
					createtime: '',
					content: ''
				},
				comms: []
			}
		},
		components: {
			solo_top //组件私有注册
		},
		created() {
			this.loadUeditor();
			this.loadUser();
			this.loadComment();
		},
		methods: {
			loadUeditor() {
				var did = this.$route.query.did;
				this.$http.get("http://localhost/Personal/selectDynamic", {
					params: {
						"did": did
					}
				}).then(
					function(result) {
						this.dynamic = result.body;
					},
					function(error) {

					})
			},
			loadUser() {
				var uid = this.$route.query.uid;
				this.$http.get("http://localhost/dy/dynamicuser", {
					params: {
						"uid": uid
					}
				}).then(
					function(result) {
						this.user = result.body;
					},
					function(error) {

					})
			},
			loadComment() {
				var did = this.$route.query.did;
				this.$http.get("http://localhost/comm/comments", {
					params: {
						"did": did
					}
				}).then(
					function(result) {
						this.comms = result.body;
					},
					function(error) {
						alert("失败")
					})
			},
			sub: function(did) {
				var html = ue.getContent();
				if(html != null && html != "") {
					this.$http.post("http://localhost:80/comm/comment", {
						"content": html,
						"did":did
					}).then(
						function() {
							ue.setContent('');
							this.loadComment();
						},
						function() {
							alert("发布失败！");
						}
					)
				} else {
					alert("不能为空")
				}
			},
			selectAuthor: function(aid) { //点击头像，跳转到这个页面，并携带着参数
				this.$router.push({
					path: "/solo_message",
					query: {
						"aid": aid
					}
				})

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
	
	.media {
		border-bottom: 1px solid gainsboro;
	}
	
	.img-circle {
		width: 60px;
		height: 60px;
		/*margin-top: 125px;
		margin-left: 20px;*/
	}
	
	#edi {
		width: 870px;
		height: 170px;
		margin-left: 10px;
		margin-top: 30px;
		box-shadow: 2px 2px 8px 6PX black;
	}
	
	#but {
		position: relative;
		top: 15px;
		left: 655px;
	}
</style>