<template>
	<div>
		<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
			<message_top></message_top>
			<div class="page-header">
				<h1>
					My Video Management <small>我的视频管理</small>
				</h1>
			</div>
			<div class="recommended">
				<div class="row" style="margin-right: 0px;">
					<div v-for="video in videos" class="col-md-4">
						<div class="thumbnail">
							<a style="cursor: pointer;" @click="toVideo(video.id)"><img alt="300x200" :src="video.photourl" /></a>
							<div class="resent-grid-info recommended-grid-info">
								<div class="caption">
									<h5><a style="cursor: pointer;width: 215px;margin-left: 40px;font-size: 18px;" @click="toVideo(video.id)" class="title">{{video.title}}</a></h5>
									<p class="video-my">
										{{video.vediodetail}}
									</p>
									<p class="del-p">
										<button class="btn btn-primary" @click="deleterVideo(video.id)">删除</button>
										<a style="color: #9E9E9E;margin-left: 80px;">上传时间：{{video.createtime}}</a>
									</p>
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
	import message_top from '@/components/message_top'
	export default {
		name: 'my_video',
		data() {
			return {
				videos: []
			}
		},
		components: {
			message_top //组件私有注册
		},
		created() {
			this.loadVideo();
		},
		methods: {
			loadVideo: function() {
				this.$http.get("http://localhost/Video/selectVideosByUid").then(

					function(result) {
						this.videos = result.body;
					},
					function(error) {

					})
			},
			deleterVideo: function(id) {
				var flag = confirm("是否删除该视频？");
				if(flag) {
					this.$http.get("http://localhost/Video/deleterVideoByid", {
						params: {
							"id": id
						}
					}).then(
						function(result) {
							this.videos = result.body;
						},
						function(error) {

						})
				}

			},
			toVideo(vid) {
				this.$router.push({
					path: '/videoShow',
					query: {
						vid: vid
					}
				});
				this.$router.go(0);
			}
		}

	}
</script>

<style scoped>
	.page-header {
		margin-left: 30px;
		margin-top: 20px;
	}
	
	.my_video {
		margin-left: 50px;
	}
	
	.title {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-box-pack: center;
		-webkit-box-align: center;
		-webkit-line-clamp: 1;
		overflow: hidden;
		letter-spacing: 1.3px;
	}
	
	.video-my {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-box-pack: center;
		-webkit-box-align: center;
		-webkit-line-clamp: 2;
		overflow: hidden;
		letter-spacing: 1.3px;
	}
	
	.del-p {
		margin-top: 10px;
	}
</style>