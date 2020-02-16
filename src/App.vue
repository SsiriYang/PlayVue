<template>
	<div id="app">
		<!--头部开始-->
		<nav class="navbar navbar-inverse navbar-fixed-top">
			<div class="container-fluid">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
					<a class="navbar-brand" href="/">
						<h1><img src="../static/images/logo.png" alt="" /></h1></a>
				</div>
				<div id="navbar" class="navbar-collapse collapse">
					<!--<div class="top-search">
							
							<input type="text" v-model="searchContent" class="form-control" placeholder="Search...">
							<input type="submit" v-on:click="search" value="">
						
					</div>-->
					<div class="header-top-right">
						<div class="file">
							<a href="/my_upload">上传视频</a>
						</div>
						<div class="signin">
							<a href="#small-dialog3" class="play-icon popup-with-zoom-anim" v-show="registers">注册</a>
							<!-- pop-up-box -->

							<!--//pop-up-box -->

							<div id="small-dialog3" class="mfp-hide" v-show="registerin">
								<h3>创建账号</h3>
								<div class="signup">
									<div>
										<input type="text" class="email" placeholder="昵称" v-model="user.name" required="required" />

										<input type="password" placeholder="密码" v-model="user.password" required="required" pattern=".{6,}" autocomplete="off" />
										<!-- @keyup.native vue element-ui注册当键盘键被松开时的事件，@blur 注册失去焦点事件，@input 注册当用户输入时触发事件，maxlength 限制input框输入的最大长度 -->
										<input type="text" class="email" @keyup.native="Phonerule" @blur="rulePhoneTrue" placeholder="请填写常用手机号" v-model="user.phone" maxlength="11" pattern="^1[34578]\d{9}$" />
										<div style="color: red;" v-show="contactPhoneShow">
											{{contactPhoneText}}
										</div>
										<div style="color: red;" v-show="phoneExitShow">
											{{phoneExitText}}
										</div>
										<div class="note">
											<input type="text" class="email " placeholder="请输入短信验证码" v-model="codes" maxlength="4" pattern=".{4,}" />
											<button v-show="sendCode" class="note-button el-button" @click="getCode" :disabled="isSend">
												<span >点击获取</span>
											</button>
											<button v-show="!sendCode" class="note-button el-button">
												<span >{{times}}s后重试</span>
											</button>
										</div>
										<input type="submit" value="	注 册	" @click="register" />
										<div class="tologin">
											<a href="#small-dialog" class="play-icon popup-with-zoom-anim">已有账号，直接登录></a>
										</div>
									</div>
								</div>
								<div class="clearfix"> </div>
							</div>

							<div id="small-dialog5" class="mfp-hide">
								<h3>Help</h3>
								<div class="help-grid">
									<p>Suspendisse tristique magna ut urna pellentesque, ut egestas velit faucibus. Nullam mattis lectus ullamcorper dui dignissim, sit amet egestas orci ullamcorper.</p>
								</div>
								<div class="help-grids">
									<div class="help-button-bottom">
										<p>
											<a href="#small-dialog4" class="play-icon popup-with-zoom-anim">Feedback</a>
										</p>
									</div>
									<div class="help-button-bottom">
										<p>
											<a href="#small-dialog6" class="play-icon popup-with-zoom-anim">Lorem ipsum dolor sit amet</a>
										</p>
									</div>
									<div class="help-button-bottom">
										<p>
											<a href="#small-dialog6" class="play-icon popup-with-zoom-anim">Nunc vitae rutrum enim</a>
										</p>
									</div>
									<div class="help-button-bottom">
										<p>
											<a href="#small-dialog6" class="play-icon popup-with-zoom-anim">Mauris at volutpat leo</a>
										</p>
									</div>
									<div class="help-button-bottom">
										<p>
											<a href="#small-dialog6" class="play-icon popup-with-zoom-anim">Mauris vehicula rutrum velit</a>
										</p>
									</div>
									<div class="help-button-bottom">
										<p>
											<a href="#small-dialog6" class="play-icon popup-with-zoom-anim">Aliquam eget ante non orci fac</a>
										</p>
									</div>
								</div>
							</div>
							<div id="small-dialog6" class="mfp-hide">
								<div class="video-information-text">
									<h4>Video information & settings</h4>
									<p>Suspendisse tristique magna ut urna pellentesque, ut egestas velit faucibus. Nullam mattis lectus ullamcorper dui dignissim, sit amet egestas orci ullamcorper.</p>
									<ol>
										<li>Nunc vitae rutrum enim. Mauris at volutpat leo. Vivamus dapibus mi ut elit fermentum tincidunt.</li>
										<li>Nunc vitae rutrum enim. Mauris at volutpat leo. Vivamus dapibus mi ut elit fermentum tincidunt.</li>
										<li>Nunc vitae rutrum enim. Mauris at volutpat leo. Vivamus dapibus mi ut elit fermentum tincidunt.</li>
										<li>Nunc vitae rutrum enim. Mauris at volutpat leo. Vivamus dapibus mi ut elit fermentum tincidunt.</li>
										<li>Nunc vitae rutrum enim. Mauris at volutpat leo. Vivamus dapibus mi ut elit fermentum tincidunt.</li>
									</ol>
								</div>
							</div>

						</div>
						<div class="signin">
							<a href="#small-dialog" v-show="loginbutton" class="play-icon popup-with-zoom-anim">登录</a>
							<a @click="logout" v-show="!loginbutton" class="play-icon popup-with-zoom-anim" id="logout">退出登录</a>
							<div id="small-dialog" class="mfp-hide" v-show="loginin">
								<form>
									<h3>Login</h3>
									<div class="signup">
										<input type="text" class="email" v-model="user.phone" placeholder="您的手机号" required="required" pattern=".{11,}" />
										<input type="password" v-model="user.password" placeholder="密码" required="required" pattern=".{6,}" autocomplete="off" />
										<p style="overflow: hidden;">
											<input type="submit" style="float: left;margin-left: 5%;" value="	 登  录	 " v-on:click="login" />
											<a href="#small-dialog3" class="play-icon popup-with-zoom-anim">
												<input type="submit" style="float: right;margin-right: 5%;" value="	注 册	">
											</a>

										</p>
									</div>
								</form>
								<div class="clearfix"> </div>
							</div>
						</div>
						<div class="clearfix"> </div>
					</div>
				</div>
				<div class="clearfix"> </div>
			</div>
		</nav>
		<!--头部结束-->
		<!--左侧开始-->
		<div class="col-sm-3 col-md-2 sidebar">
			<div class="tp-navigation">
				<div class="t-menu">MENU</div>
				<div class="t-img">
					<img src="images/lines.png" alt="" />
				</div>
				<div class="clearfix"> </div>
			</div>
			<div class="drop-navigation drop-navigation">
				<ul class="nav nav-sidebar">
					<li class="active">
						<a href="/" class="home-icon"><span class="glyphicon glyphicon-home" aria-hidden="true"></span>主站</a>
					</li>

					<li>
						<a href="/ueditor" class="sub-icon"><span class="glyphicon glyphicon-home glyphicon-hourglass" aria-hidden="true"></span>动态</a>
					</li>
					<li>
						<a href="#" class="menu1"><span class="glyphicon glyphicon-film" aria-hidden="true"></span>视频分类<span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span></a>
					</li>
					<!--电影分类-->
					<ul class="cl-effect-2" v-for="category in categorys">
						<li @click="select(category.id,category.name)">
							<a class="menu1">{{category.name}}</a>
						</li>

					</ul>

					<!-- script-for-menu -->

					<li>
						<a href="/shop" class="news-icon"><span class="glyphicon glyphicon-shopping-cart glyphicon-envelope" aria-hidden="true"></span>会员购</a>
					</li>
					<li>
						<a href="#" class="menu"><span class="glyphicon glyphicon-film glyphicon-king" aria-hidden="true"></span>个人中心<span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span></a>
					</li>
					<ul class="cl-effect-1">

						<li>
							<a href="/my_collection">我的收藏</a>
						</li>
						<li>
							<a href="/my_ueditor">我的动态</a>
						</li>
						<li>
							<a href="/my_follow">我的关注</a>
						</li>
						<li>
							<a href="/my_video">视频管理</a>
						</li>
						<li>
							<a href="/orderlist">我的订单</a>
						</li>
					</ul>
					<li>
						<a href="#" class="menu2"><span class="glyphicon glyphicon-film glyphicon-comment" aria-hidden="true"></span>消息中心<span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span></a>
					</li>
					<ul class="cl-effect-3">
						<li>
							<a href="/inbox">收件箱<span class="looks">{{nums}}</span></a>
						</li>
						<li>
							<a href="/outbox">发件箱</a>
						</li>
						<li>
							<a href="/notice">系统通知</a>
						</li>

					</ul>
				</ul>
			</div>
		</div>
		<div class="clearfix"> </div>
		<!--左侧结束-->

		<router-view/>
	</div>
</template>

<script>
	export default {
		name: 'App',
		data() {
			return {
				user: {
					phone: '',
					password: '',
					name: ''
				},
				categorys: [],
				sendCode: true,
				times: 0,
				contactPhoneShow: false,
				contactPhoneText: '',
				phoneExitShow: true,
				phoneExitText: '',
				isSend: true,
				loginbutton: true,
				codes: '',
				pe: 0,
				loginin: true,
				registers: true,
				registerin: true,
				nums: 0,
				searchContent:''
			}

		},
		created: function() {
			this.loadecate();
			this.Refresh();
			this.inboxnolook();
		},
		methods: {
			inboxnolook: function() {
				this.$http.get("http://localhost/message/inboxnolook").then(
					function(result) {
						this.nums = result.data;
					},
					function(error) {}
				)
			},
			Refresh: function() { //是否登录
				this.$http.get("http://localhost/user/Refresh").then(

					function(result) {
						this.Refresh = result.data;
						if(this.Refresh == 1) {
							this.registers = false
							this.loginbutton = false

						} else {
							this.loginbutton = true
							this.loginin = true;
							this.registers = true;
							this.registerin = true;
						}
					},
					function(error) {
						alert("刷新失败")
					}
				)
			},
			//退出登录
			logout: function() {
				this.$router.push({
						path: "/"
					}),
					this.$http.get("http://localhost/user/logout").then(
						function(result) {
							this.loginbutton = true;
							this.loginin = true;
							this.registers = true;
							this.registerin = true;
						},
						function(error) {
							alert("退出登录失败，请重试.")
						}
					)
			},
			//注册
			register: function() {
				/*var _this = this;*/
				this.$http.post("http://localhost/user/register", { //传参
					"name": this.user.name,
					"password": this.user.password,
					"phone": this.user.phone,
					"codes": this.codes
				}).then(
					function(result) {
						this.registers = false;
						this.registerin = false
					},
					function(error) {
						alert("注册失败，请重试.")
					}
				)
			},
			//手机号规则
			Phonerule() {
				this.user.phone = this.user.phone.replace(/^1[34578]\d{9}$/, '')
			},
			rulePhoneTrue() {
				var reg = new RegExp(/^1[34578]\d{9}$/)
				if(!this.user.phone) {
					this.contactPhoneShow = true
					this.contactPhoneText = '手机号不能为空'
					this.isSend = true
				} else if(!reg.test(this.user.phone)) {
					this.contactPhoneShow = true
					this.contactPhoneText = '请输入正确的手机号'
					this.isSend = true
				} else {
					this.contactPhoneShow = false
					this.isSend = false
				}
			},
			//发送code
			getCode: function() {
				this.$http.post("http://localhost/user/sendCode", { //传参
					"phone": this.user.phone
				}).then(
					function(result) {
						console.log("发送成功");
						console.log(this.user.phone);

						this.pe = result.data;
						if(this.pe >= 1) {
							this.phoneExitShow = true;
							this.phoneExitText = '该手机号已注册,请前去登录界面'
							this.isSend = true
						} else {
							this.isSend = false
						}
						console.log(this.pe);
					},
					function(error) {
						console.log("发送失败");
					}
				)
				this.sendCode = false;
				//倒计时60s
				this.times = 60;
				var timetimer = setInterval(() => {
					this.times--;
					if(this.times <= 0) {
						this.sendCode = true;
						clearInterval(timetimer);
					}
				}, 1000);
			},
			//查找类别
			loadecate: function() {
				this.$http.get("http://localhost:80/cate/cates").then(
					function(result) {
						this.categorys = result.body;
					},
					function(error) {
						alert("加载数据失败");
					}
				)
			},
			select: function(cid, cname) {
				this.$router.push({
					path: "/videoDisplay",
					query: {
						cid: cid,
						cname: cname
					}
				})
			},
			//登录
			login: function() {
				console.log(this.user.phone);
				console.log(this.user.password);

				this.$http.post("http://localhost/user/login", { //传参
					"phone": this.user.phone,
					"password": this.user.password
				}).then(
					function(result) {
						this.registers = false;
						this.loginbutton = false;
						this.loginin = false;

					},
					function(error) {
						alert("登录失败，请重新登录.")
					}
				)
			},
			search: function() {
				this.$http.get("http://localhost/user/login", { //传参
					"searchContent": this.searchContent
				}).then(
					function(result) {
						this.searchContent = '';
					},
					function(error) {
						alert("查询失败.")
					}
				)
			}
			
		}
	}
</script>
<style>
	.looks {
		display: inline-block;
		font-size: 12px;
		transform: scale(.85);
		color: #fff;
		margin-left: 2px;
		font-weight: 500;
		background-color: #ffafc9;
		border-radius: 4px;
		line-height: 13px;
		max-width: 30px;
		padding: 1px 3px;
		font-family: sans-serif, sans-serifsans-serif, Calibri, Arial, Helvetica;
	}
	
	#logout {
		cursor: pointer;
	}
</style>