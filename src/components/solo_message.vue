<template>
	<div>
		<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
			<solo_top></solo_top>
			<div class="page-header">
				<h1>
					Her/His Video <small>TA的视频</small>
				</h1>
			</div>
			<!--视频-->
			<div class="recommended recom">
				<div class="recommended-grids img-big">
					<div v-for="video in videos" class="col-md-2 resent-grid recommended-grid show-video-grid img-coll">
						<div class="resent-grid-img recommended-grid-img">
							<a style="cursor: pointer;" @click="toVideo(video.id)" ><img :src="video.photourl" style="width: 200px;height: 150px;" alt="" /></a>
						</div>
						<div style="width: 200px;height: 115px;" class="resent-grid-info recommended-grid-info">
							<div class="caption">
								<h5 style="margin-top: -5px;"><a @click="toVideo(video.id)" style="margin-top: 3px;cursor: pointer;" class="title">{{video.title}}</a></h5>
								<p class="solo-p">
									{{video.vediodetail}}
								</p>
								<p>	
									<a  style="display: block;margin-left: 7px;margin-top:10px;color: #9E9E9E;">上传时间：{{video.createtime}}</a>
								</p>
							</div>
						</div>
					</div>
					<div class="clearfix"> </div>
				</div>
			</div>

			<!--收藏-->
			<div class="page-header">
				<h1>
					Her/His Collection <small>TA的收藏</small>
				</h1>
			</div>
			<div class="recommended">
				<div class="recommended-grids img-big">
					<div v-for="AuthorCollection in AuthorCollections" class="col-md-2 resent-grid recommended-grid show-video-grid img-coll">
						<div class="resent-grid-img recommended-grid-img">
							<a style="cursor: pointer;" @click="toVideo(AuthorCollection.vid)"><img :src="AuthorCollection.vphoto" style="width: 200px;height: 150px;" alt="" /></a>
						</div>
						<div style="width: 200px;height: 130px;" class="resent-grid-info recommended-grid-info">
							<div class="p-title">
								<h5><a style="cursor: pointer;" @click="toVideo(AuthorCollection.vid)" class="title">{{AuthorCollection.title}}</a></h5>
								<p class="solo-p">
										{{AuthorCollection.vediodetail}}
									</p>
							</div>
							<div class="div-user">	
								<div class="img-user col-md-1 column">
									<a href=""><img alt="140x140" :src="AuthorCollection.photourl" class="img-circle" /></a>
								</div>
								<p class="author">
									<a href="#" class="author">{{AuthorCollection.name}}</a>
								</p>
								<p class="views" style="margin-left: 50px; width: 100px;">{{AuthorCollection.signature}}</p>
							</div>
						</div>
					</div>
						

					<div class="clearfix"> </div>
				</div>
			</div>

			<!--动态-->
			<div class="page-header">
				<h1>
					Her/His Tidings <small>TA的动态</small>
				</h1>
			</div>
			<div class="recommended">
				<div v-for="AuthorDynamic in AuthorDynamics" class="col-sm-7" style="width: 880px; margin-left:25px;margin-top: 20px;">
				<div class="panel panel-info">
					<div class="panel-heading">
						<div class="col-md-1 column">
							<a href=""><img style="width: 40px;height: 40px;margin-top: -8px;margin-left: -17px;" alt="140x140" :src="author.photourl" class="img-circle" /></a>
						</div>
						<b style="font-size:medium;margin-left: -14px;">{{author.name}} </b>

					</div>
					<div  class="panel-body ">
						
						<a><span style="font-size: 12px;margin-left: 723px; color: #31708F;cursor:pointer;" @click="tody_Detail(AuthorDynamic.id,author.id)" >查看详情</span></a>
						<p class="p-ueditor" style="line-height: 20px; font-size: 12px;text-indent:2em;"><div v-html="AuthorDynamic.content"></div></p>
						<p class="time-p" >{{AuthorDynamic.createtime}}</p>
					</div>
				</div>
				
			</div>		
			</div>

		</div>

	</div>
</template>

<script>
	import solo_top from '@/components/solo_top'
	export default {
		name: 'solo_message',
		data() {
			return{
				author:{
					name:'',
					photourl:""
				},
				videos:[],
				AuthorCollections:[],
				AuthorDynamics:[]
			}
		},
		components: {
			solo_top //组件私有注册
		},
		created(){
			this.loadAuthorVideo();
			this.loadAuthorCollection();
			this.loadAuthorUeditor();
			this.loadAuthor();
		},
		methods:{
			loadAuthorVideo(){
				var aid=this.$route.query.aid;
				this.$http.get("http://localhost/Personal/selectAuthorVideo",{
					params:{
						"aid":aid
					}
				}).then(
					function(result){
						this.videos=result.body;
				},function(error){
					
				})
			},
			loadAuthorCollection(){
				var aid=this.$route.query.aid;
				this.$http.get("http://localhost/Personal/selectAuthorCollection",{
					params:{
						"aid":aid
					}
				}).then(
					function(result){
						this.AuthorCollections=result.body;
				},function(error){
					
				})
			},
			/*得到该作者*/
			loadAuthor(){
				var aid=this.$route.query.aid;
				this.$http.get("http://localhost/Personal/getAuthor",{
					params:{
						"aid":aid
					}
				}).then(
					function(result){
						this.author=result.body;
				},function(error){
					
				})
			},
			/*得到他的动态*/
			loadAuthorUeditor(){
				var aid=this.$route.query.aid;
				this.$http.get("http://localhost/Personal/selectAuthorDynamic",{
					params:{
						"aid":aid
					}
				}).then(
					function(result){
						this.AuthorDynamics=result.body;
				},function(error){
					alert("失败")
				})
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
			tody_Detail: function(did, uid) {
				this.$router.push({
					path: '/He_ueditor_detail',
					query: {
						did: did,
						uid: uid,
						aid: uid
					}
				});
				this.$router.go(0);
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
		width: 30px;
		height: 30px;
		margin-top: 6px;
		margin-left: -3px;
	}
	
	.page-header {
		margin-left: 30px;
		margin-top: 20px;
		
	}
	 .solo-p{
		display: -webkit-box;
	    -webkit-box-orient: vertical;
	    -webkit-box-pack: center;
	    -webkit-box-align: center;
	    -webkit-line-clamp:2;
	    overflow: hidden;
	    width: 170px;
	    margin-top: -5px;
	     letter-spacing:1.6px;
	 

	}

	.views,.title{
		display: -webkit-box;
	    -webkit-box-orient: vertical;
	    -webkit-box-pack: center;
	    -webkit-box-align: center;
	    -webkit-line-clamp:1;
	    overflow: hidden;
	   height: 20px;
	  
	    letter-spacing:1.4px
	   
	}
	.div-user{
		margin-top: 20px;
		width: 200px;
		height: 80px;
	}
	.p-title{
		width: 180px;
		height: 50px;
	}
	
	.panel-body p{
		letter-spacing:1.6px
	}
	.p-ueditor{
		display: -webkit-box;
	    -webkit-box-orient: vertical;
	   -webkit-box-pack: center;
	    -webkit-box-align: center;
	    -webkit-line-clamp:2;
	    overflow: hidden;
	    margin-top: 10px;
	    letter-spacing:1.4px
	    
	}
	.time-p{
		font-size: 12px;
		margin-left: 720px;
		margin-top: 10px;
		line-height: 20px;
		color: #9E9E9E;
	}
</style>