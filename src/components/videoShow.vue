<template>
	<div>
		<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
			<div class="col-md-8">
				<!--视频开始-->
				<div>
					<div class="Dplayer_box">
						<h5>{{video.title}}</h5>
						<div class="player_av">
							<div ref="dplayer" id="dplayer"></div>
						</div>
					</div>
				</div>
				<!--视频结束-->
				<!--按钮开始-->
				<div id="buttons">
					<button type="button" v-if="goodFlag==false" class="btn btn-default buttons" @click="thumbsup">
						<span class="glyphicon glyphicon-thumbs-up">点赞{{good}}</span>
					</button>
					<button type="button" v-if="goodFlag==true" class="btn btn-info buttons" @click="thumbsup">
						<span class="glyphicon glyphicon-thumbs-up">点赞{{good}}</span>
					</button>
					<button type="button" v-if="badFlag==false" class="btn btn-default buttons" @click="thumbsdown">
						<span class="glyphicon glyphicon-thumbs-down">踩一下{{bad}}</span>
					</button>
					<button type="button" v-if="badFlag==true" class="btn btn-danger buttons" @click="thumbsdown">
						<span class="glyphicon glyphicon-thumbs-down">踩一下{{bad}}</span>
					</button>
					<button type="button" class="btn btn-default buttons" @click="insertcollection">
						<span v-if="this.collection=='收藏'" class="glyphicon glyphicon-star-empty">{{collection}}</span>	
						<span v-if="this.collection=='已收藏'" class="glyphicon glyphicon-star">{{collection}}</span>		
					</button>
					<a type="button" class="btn btn-default buttons" :href="'http://localhost/downloadVideo?fileName='+this.video.videourl">
						<span class="glyphicon glyphicon-circle-arrow-down">下载</span>
					</a>
					<button style="padding: 0px;border:0px" type="button" class="btn btn-default buttons"><share :config="config"></share></button>

				</div>
				<!--按钮结束-->
				<!--详情开始-->
				<div id="videoDetail">
					<div id="detail">
						<p class="details">视频平均分：</p>
						<div class="details" id="avgmark"></div>
						<p>视频详情：{{video.vediodetail}}</p>
						<div>
							<p class="details">请您为该视频打分：</p>
							<div class="details" id="mark"></div>
						</div>
					</div>

				</div>
				<!--详情结束-->
				<!--评论开始-->
				<div class="all-comments">
					<div class="all-comments-info">
						<a>所有评论 (*)</a>
						<div class="box">
							<form>
								<textarea placeholder="请输入您的评论" v-model="content" required=" "></textarea>
								<input type="button" style="display: block;margin: 0px 0px 0px 250px;" class="btn btn-default" @click="sendComment" value="SEND" />
							</form>
						</div>
						<div class="all-comments-buttons">
							<ul>
								<li>
									<a @click="getNewComment" class="top newest">最新评论</a>
								</li>
								<li>
									<a @click="getMyComment" class="top my-comment">我的评论</a>
								</li>
							</ul>
						</div>
					</div>
					<div class="media-grids">

						<div class="media" v-for="userComment in userComments">
							<h5>{{userComment.name}}</h5>
							<div class="media-left">
								<a><img :src="userComment.photourl" />
								</a>
							</div>
							<div class="media-body">
								<p>{{userComment.content}}</p>
							</div>
						</div>
					</div>
				</div>
				<!--评论结束-->
			</div>

			<!--右侧开始-->
			<div class="col-md-4 single-right">
				<h3>关于作者</h3>
				<div id="author">
					<div id="author-left">
						<a style="cursor: pointer;" @click="selectAuthor(author.id)"><img :src="author.photourl" /></a>
					</div>
					<div id="author-right">
						<h4 style="line-height: 1.5em;">{{author.name}}</h4>
						<p style="line-height: 2.3em;" class="signature">{{author.signature}}</p>
						<button class="btn btn-default" @click="insertfollow">
						<span class="glyphicon glyphicon-plus"></span>{{follow}}
					</button>
						<button style="margin-left: 20px;" class="btn btn-default" @click="privateLetter(author.id)"> 
						<span class="glyphicon glyphicon-envelope"></span>私信
					</button>

					</div>
				</div>
				<h3>向你推荐</h3>
				<div class="single-grid-right">
					<div v-for="recommendVideo in recommendVideos" class="single-right-grids">
						<div class="col-md-4 single-right-grid-left">
							<p style="cursor: pointer;" class="author-video" @click="toVideo(recommendVideo.vid)"><img :src="recommendVideo.photourl" /></p>
						</div>
						<div class="col-md-8 single-right-grid-right">
							<a style="cursor: pointer;" @click="toVideo(recommendVideo.vid)" class="title"> {{recommendVideo.title}}</a>
							<p class="author">
								<a style="cursor: pointer;"  class="author">{{recommendVideo.name}}</a>
							</p>
							<p class="views">{{recommendVideo.showcount}}观看</p>
						</div>
						<div class="clearfix"> </div>
					</div>
				</div>
			</div>
			<!--右侧结束-->
		</div>

	</div>
</template>

<script>
	//Vue.http.options.withCredentials = true;//解决cookie丢失
	export default {
		name: 'videoShow',
		data() {
			return {
				vid: 1, //视频id
				good: 0, //点赞数量
				bad: 0, //点踩数量
				goodFlag:false,//判断点赞点踩
				badFlag:false,//判断点赞点踩
				rateValue: 3, //平均分
				markValue: 0, //用户打分
				collection: '收藏',
				follow: '关注',
				content: '', //评论内容
				url: '',
				pic: '',
				msg: '',
				userComments: [],
				author: {},
				video: {},
				recommendVideos: [],
				config: {
					sites: ['qq', 'weibo', 'wechat', 'douban'], // 启用的站点
					disabled: ['google', 'facebook', 'twitter'] // 禁用的站点
				}
			}
		},
		methods: {
			loadVideo: function() {
				var url = this.url;
				//alert(url);
				var danmakuId = md5(url);
				const dp = new DPlayer({
					container: this.$refs.dplayer,
					//自动播放
					autoplay: false,
					// 主题色
					theme: '#FADFA3',
					// 视频循环播放
					loop: false,
					lang: 'zh-cn',
					// 开启截图，如果开启，视频和视频封面需要开启跨域
					screenshot: false,
					// 开启热键
					hotkey: true,
					// 预加载，可选值: 'none', 'metadata', 'auto'
					preload: 'auto',
					// 在左上角展示一个 logo，你可以通过 CSS 调整它的大小和位置
					//logo: 'logo.png',
					// 默认音量，请注意播放器会记忆用户设置，用户手动设置音量后默认音量即失效
					volume: 0.7,
					// 互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
					mutex: true,
					video: {
						//视频地址
						url: url,
						//视频封面
						pic: this.pic,
						// 缩略图
						//thumbnails: 'demo.jpg',
						//播放器类型
						type: 'auto'
					},
					//显示弹幕
					danmaku: {
						// 弹幕池id，必须唯一
						id: danmakuId,
						// 彈幕接口
						api: 'http://apidp.purvavideha.cn/',
						// 弹幕后端验证 token
						//token: 'tokendemo',
						// 弹幕最大数量
						//maximum: 1000,
						// 额外外挂弹幕
						//addition: ['https://api.prprpr.me/dplayer/v3/bilibili?aid=4157142'],
						// 弹幕用户名
						user: 'moff',
						// 弹幕距离播放器底部的距离，防止遮挡字幕，取值形如: '10px' '10%'
						bottom: '15%',
						// 海量弹幕模式，即使重叠也展示全部弹幕，请注意播放器会记忆用户设置，用户手动设置后即失效
						unlimited: true
					},
					// 自定义进度条提示点
					highlight: [{
							time: 60,
							text: '这是1分钟'
						},
						{
							time: 120,
							text: '这是 2 分钟'
						},
						{
							time: 180,
							text: '这是 3分钟'
						}
					]
				});
			},
			//弹出框
			alerdat_back: function(text) {
				$(".alert_back").html(text).show();
				setTimeout(function() {
					$(".alert_back").fadeOut();
				}, 1200)
			},
			//秒转分秒
			formatTime(seconds) {
				return [
						//            parseInt(seconds / 60 / 60),
						parseInt(seconds / 60 % 60),
						parseInt(seconds % 60)
					]
					.join(":")
					.replace(/\b(\d)\b/g, "0$1");
			},
			//发送评论
			sendComment() {
				this.$http.get("http://localhost/sendcomment", {
					params: {
						vid: this.vid,
						content: this.content
					}
				}).then(
					function(result) {
						this.msg = result.bodyText;
						alert(this.msg);
						this.content = '';
						this.getAllComments();
					},
					function(res) {
						console.log('评论失败！请重试');
					}
				);
			},
			getAllComments() {
				this.$http.get("http://localhost/allcomment", {
					params: {
						vid: this.vid
					}
				}).then(
					function(result) {
						this.userComments = result.body;
					},
					function(res) {
						alert('加载失败！请重新刷新页面');
					}
				);
			},
			getNewComment() {
				this.$http.get("http://localhost/getNewComment", {
					params: {
						vid: this.vid
					}
				}).then(
					function(result) {
						this.userComments = result.body;
					},
					function(error) {
						console.log(error);
					});
			},
			getMyComment() {
				this.$http.get("http://localhost/getMyComment", {
					params: {
						vid: this.vid
					}
				}).then(
					function(result) {
						this.userComments = result.body;
					},
					function(error) {
						console.log(error);
					});
			},
			loadResource() {
				this.vid=this.$route.query.vid;
				this.$http.post("http://localhost/loadVideo", {
					id: this.vid
				}).then(
					function(result) {
						this.video = result.body;
						this.url = result.body.videourl;
						this.pic = result.body.photourl;
						this.loadVideo();
						this.loadAuthor();
						this.loadGood();
						this.loadBad();
						this.loadMyGood();
						this.loadMyBad();
						this.recommend();
						this.loadFollowAndCollection();
					},
					function(error) {
						console.log(error);
					});
			},
			loadAuthor() {
				this.$http.post("http://localhost/loadAuthor", {
					id: this.video.userid
				}).then(
					function(result) {
						this.author = result.body;
					},
					function(error) {
						console.log(error);
					});
			},
			loadFollowAndCollection() {
				this.$http.post("http://localhost/loadFollowAndCollection", {
					vid: this.vid
				}).then(
					function(result) {
						if(result.bodyText == '加载关注收藏成功') {
							this.follow = '已关注';
							this.collection = '已收藏';
						} else if(result.bodyText == '加载关注成功') {
							this.follow = '已关注';
						} else if(result.bodyText == '加载收藏成功') {
							this.collection = '已收藏';
						} else {}
					},
					function(error) {
						console.log(error);
					});
			},
			insertfollow() {
				if(this.follow == '已关注') {
					this.$http.delete("http://localhost/follow", {
						params: {
							toUid: this.video.userid
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
							toUid: this.video.userid
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
			insertcollection() {
				if(this.collection == '已收藏') {
					this.$http.delete("http://localhost/collection", {
						params: {
							vid: this.video.id
						}
					}).then(
						function(result) {
							alert(result.bodyText);
							this.collection = '收藏';
						},
						function(error) {
							console.log(error);
						});
				} else {
					this.$http.post("http://localhost/collection", {
						vid: this.video.id
					}).then(
						function(result) {
							alert(result.bodyText);
							this.collection = '已收藏';
						},
						function(error) {
							console.log(error);
						});
				}
			},
			recommend() {
				this.$http.post("http://localhost/recommend", {
					cid: this.video.categoryid
				}).then(
					function(result) {
						this.recommendVideos = result.body;
					},
					function(error) {
						console.log(error);
					});
			},
			thumbsup() {
				this.$http.post("http://localhost/thumbsup", {
					vid: this.video.id
				}).then(
					function(result) {
						this.good = result.body;
						this.loadGood();
						this.loadBad();
						this.loadMyGood();
						this.loadMyBad();
					},
					function(error) {
						console.log(error);
					});
			},
			thumbsdown() {
				this.$http.post("http://localhost/thumbsdown", {
					vid: this.video.id
				}).then(
					function(result) {
						this.bad = result.body;
						this.loadGood();
						this.loadBad();
						this.loadMyGood();
						this.loadMyBad();
					},
					function(error) {
						console.log(error);
					});
			},
			loadGood() {
				this.$http.post("http://localhost/loadGood", {
					vid: this.video.id
				}).then(
					function(result) {
						this.good = result.body;
					},
					function(error) {
						console.log(error);
					});
			},
			loadBad() {
				this.$http.post("http://localhost/loadBad", {
					vid: this.video.id
				}).then(
					function(result) {
						this.bad = result.body;
					},
					function(error) {
						console.log(error);
					});
			},
			loadRate() {
				this.$http.get("http://localhost/loadRate", {
					params: {
						vid: this.vid
					}
				}).then(
					function(result) {
						if(result.body != null || result.body != '') {
							this.rateValue = result.body;
						}else{
							this.rateValue =0;
						}
					},
					function(error) {
						
						this.rateValue =0;
					});
				this.$http.get("http://localhost/loadMark",{
					params:{
						vid:this.vid
					}
				}).then(
					function(result) {
						if(result.body != null || result.body != '') {
							this.markValue = result.body;
						}else{
							this.markValue =0;
						}
						this.loadMark();
					},
					function(error) {
						this.markValue =0;
						this.loadMark();
					});
			},
			loadMark() {
				var _this =this;
				//获取平均分
				layui.use('rate', function() {
					var rate = layui.rate;
					//渲染
					var ins1 = rate.render({
						elem: '#avgmark', //绑定元素
						value: _this.rateValue,
						half: true,
						readonly: true,
						text: true,
						setText: function(value) {
							this.span.text(value + "分");
						}
					});
				});
				//获取评分
				layui.use('rate', function() {
					var rate = layui.rate;
					//渲染
					var ins1 = rate.render({
						elem: '#mark', //绑定元素
						value: _this.markValue,
						half: true,
						text: true,
						setText: function(value) {
							this.span.text(value + "分");
						},
						choose: function(value) {
							_this.$http.get("http://localhost/makeMark", {
								params: {
									vcode: value,
									vid:_this.vid
								}
							}).then(
								function(result) {
									if(result.bodyText=='打分成功！'){
										_this.markValue=value;
									}else{
										alert(result.bodyText);
									}
									_this.loadRate();
								},
								function(error) {
									
								});
						}
					});
				});
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
			toVideo(vid){
				this.$router.push({
	  				path:'/videoShow',
	  				query:{
	  					vid:vid
	  				}
	  			});
	  			 this.$router.go(0);   
			},
			selectAuthor:function(aid){//点击头像，跳转到这个页面，并携带着参数
				this.$router.push({
					path:"/solo_message",
					query:{
						"aid":aid
					}
				})
			},
			loadMyGood(){
				this.$http.post("http://localhost/loadMyGood", {
					vid: this.video.id
				}).then(
					function(result) {
						if(result.bodyText=='存在'){
							this.goodFlag=true;
						}else{
							this.goodFlag=false;
						}
						
					},
					function(error) {
						this.goodFlag=false;//说明没有登录
					});
			},
			loadMyBad(){
				this.$http.post("http://localhost/loadMyBad", {
					vid: this.video.id
				}).then(
					function(result) {
						if(result.bodyText=='存在'){
							this.badFlag=true;
						}else{
							this.badFlag=false;
						}
					},
					function(error) {
						this.badFlag=false;
					});
			}
		},
		created() {
			this.loadResource();
			this.getAllComments();
			this.loadRate();
		},
		mounted() {

		}
	}
</script>

<style scoped>
	.Dplayer_box {
		overflow: hidden;
		width: 680px;
		height: 456px;
		/*margin: 50px 50px 20px 50px;*/
		display: block;
		border-top: 1px solid #e5e9ef;
		border-bottom: 1px solid #e5e9ef;
		background-color: #f6f9fa
	}
	
	#buttons {
		margin: 10px 10px;
	}
	
	.buttons {
		margin-left: 45px;
	}
	
	#dplayer {
		background-size: 100% 100%;
		margin-top: 30px
	}
	
	.player_av {
		width: 680px;
		height: 100%;
		float: left;
		background: #000
	}
	
	#author,
	#author-right {
		overflow: hidden;
	}
	
	#author-left a {
		width: 65px;
		height: 65px;
		display: inline-block;
		border-radius: 50%;
		-webkit-border-radius: 50%;
	}
	
	#author-left a img {
		width: 65px;
		height: 65px;
		display: inline-block;
		border-radius: 50%;
		-webkit-border-radius: 50%;
	}
	
	#author-left {
		float: left;
		margin: 10px;
	}
	
	#author-right {
		float: left;
		margin: 10px;
	}
	
	.author-video img {
		width: 106px;
		height: 80px;
	}
	
	.details {
		display: inline-block;
	}
	.signature{
		width: 210px;
		display: -webkit-box;
	    -webkit-box-orient: vertical;
	    -webkit-box-pack: center;
	    -webkit-box-align: center;
	    -webkit-line-clamp:1;
	    overflow: hidden;

	}
</style>