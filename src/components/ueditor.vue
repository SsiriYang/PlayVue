<template>
	<div id="main_u">
		<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
			<div class="form-group">
				<div>

					<div class="col-sm-7">
						<!--<textarea class=" form-control" rows="15"></textarea>-->
						<div id="edi">

							<script id="editor" type="text/plain" style=" width:880px;height:120px;">

							</script>
						</div>

					</div>

				</div>
				<div class="form-group" id="but">
					<div class="col-sm-offset-2 col-sm-10">
						<button type="button" class="btn btn-default" v-on:click="sub">发布</button>
					</div>
				</div>

			</div>
			<!--动态展示-->

			<div class="col-sm-7" style="width: 880px; margin-left:120px;margin-top: 40px;">
				<div v-for="dynamic in dynamics">
					<div class="panel panel-info">
						<div class="panel-heading">
							<div class="col-md-1 column">
								<a href=""  @click="selectAuthor(dynamic.uid)"><img style="width: 40px;height: 40px;margin-top: -8px;margin-left: -17px;" alt="140x140"  :src="dynamic.photourl" class="img-circle" /></a>
							</div>
							<b style="font-size:medium;margin-left: -14px;">昵称:<a style="cursor: pointer;" @click="selectAuthor(dynamic.uid)">{{dynamic.name}}</a></b>
						</div>
						<a style="cursor: pointer;" @click="tody_Detail(dynamic.id,dynamic.id_u)">
							<div class="panel-body">

								<div v-html="dynamic.content"></div>

							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
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
	//ue.getContent();
	export default {
		name: 'ueditor',
		data() {
			return {
				ue: {
					content: '',
				},
				dynamics: []

			}
		},
		//				beforeRouteUpdate(to, from, next) {
		//					this.loaddynamic();
		//				},
		mounted() {
			this.loaddynamic();
		},
		methods: {
			sub: function() {
				var html = ue.getContent();
				if(html != null && html != "") {
					this.$http.post("http://localhost:80/dy/dynamic", {
						"content": html
					}).then(
						function() {
							ue.setContent('');
							alert("发布成功！");
						},
						function() {
							alert("发布失败！");
						}
					)
				} else {
					alert("不能为空")
				}
			},
			loaddynamic: function() {
				this.$http.get("http://localhost:80/dy/dynamic").then(
					function(result) {
						this.dynamics = result.body;
						console.log(this.dynamics);
					},
					function(error) {
						alert("动态获取失败！");
					}
				)

			},
			tody_Detail: function(did, uid) {
				this.$router.push({
					path: '/He_ueditor_detail',
					query: {
						did: did,
						uid: uid,
						aid:uid
					}
				});
				this.$router.go(0);
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
	#main_u {
		background: aliceblue;
	}
	
	#edi {
		width: 880px;
		height: 170px;
		margin-left: 120px;
		margin-top: 30px;
		box-shadow: 2px 2px 8px 6PX black;
	}
	
	#but {
		margin-left: 1000px;
		position: absolute;
		top: 250px;
	}
</style>