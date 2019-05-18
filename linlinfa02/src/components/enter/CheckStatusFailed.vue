<template>
	<div class="checkstate" ref="homePage">
		<Header :title="msg" :history="history"></Header>
		<van-row>
			<van-col :span="24" class="clock">
				<div>
					<van-icon name="fail"></van-icon>
				</div>
			</van-col>
		</van-row>
		<van-row>
			<van-col :span="24" class="checkMsg1">
				审核未通过 
			</van-col>
		</van-row>
		<van-row>
			<van-col :span="24" class="checkMsg2">
				您提交的入驻申请未通过审核  
			</van-col>
		</van-row>
		<van-row>
			<van-col  :span="24" class="checkMsg2">
				未通过原因：
			</van-col>
		</van-row>
		<van-row>
			<van-col  :span="24"  class="checkMsg2">
				<ul>
					<li>（1）营业执照信息不够全面</li>
					<li>（2）开户银行信息不对</li>
					<li>（3）身份信息不符合</li>
				</ul>
			</van-col>
		</van-row>
		<van-row   class="btn_next">
			<van-col :span="22"  :offset="1">
				<van-button @click="next" type="info" size="large">重新录入</van-button>
			</van-col>
		</van-row>
	</div>
</template>
<script>
	import Header from "../header"
	export default {
		data(){
			return {
				msg:"审核状态",
				history:0
			}
		},
		components:{
			Header,
		},
		mounted(){
			this.member_id = this.$route.params.member_id;
			var height = window.innerHeight;
			var devicePixelRatio = window.devicePixelRatio;
			var isAndroid = window.navigator.appVersion.match(/android/gi);
			var isIPhone = window.navigator.appVersion.match(/iphone/gi);
			    if (isIPhone) {
			        if (devicePixelRatio >= 3) {
						// isIPhone  dpr = 3
			            this.$refs.homePage.style.height = height + "px";
			        } else if (devicePixelRatio >= 2){
						// isIPhone dpr = 2
			            this.$refs.homePage.style.height = height + "px";
			        } else {
						// isIPhone dpr = 1
			            this.$refs.homePage.style.height = height + "px";
			        }
			    } else {
			        //  isAndroid dpr = 1
					this.$refs.homePage.style.height = height + "px";
					
			    }
		},
		methods: {
			next() {
				this.$router.push("/store/"+this.member_id);
			}
		},
	}
</script>

<style scoped lang="stylus">
.checkstate
	width:totalWid
	overflow:hidden
	background:cwhite
	.van-col.clock
		height: 220px;
		margin-top: 100px
	.van-col.clock>div
		height: 220px;
		i
			margin: 0 auto
			display:block
			width: 220px;
			height: 220px;
			text-align:center
			line-height: 3rem
			color:cwhite
			font-size:font100
			background:cred
			border-radius:50%
	.checkMsg1
		font-size:20PX
		color:cblack
		margin-top: 59px;
		font-weight: bold
		text-align:center
	.checkMsg2
		font-size:14PX
		color:cgray9
		margin-top: 18px
		text-align:center
		ul
			width: 420px
			height: auto
			margin:0 auto
			li
				width: 420px
				text-align:left
/.btn_next
	margin-top: 44px
	.van-button.van-button--large
		height: 88px
[data-dpr="1"]
	.van-col.clock
	.van-col.clock>div
		i
			font-size:font100
	.checkMsg1
		font-size:font20
	.checkMsg2
		font-size:font14
[data-dpr="2"]
	.van-col.clock
	.van-col.clock>div
		i
			font-size:font200
	.checkMsg1
		font-size:font40
	.checkMsg2
		font-size:font28
[data-dpr="3"]
	.van-col.clock
	.van-col.clock>div
		i
			font-size:font300
	.checkMsg1
		font-size:font60
	.checkMsg2
		font-size:font42
</style>
