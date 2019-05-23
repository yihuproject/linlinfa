<template>
	<div class="payment_waiting" ref="homePage">
		<Header :title="msg" :history="history"></Header>
		<van-row>
			<van-col :span="24"  class="clock">
				<div>
					<van-icon name="clock"></van-icon>
				</div>
			</van-col>
		</van-row>
		<van-row>
			<van-col :span="24"  class="checkMsg1">
				您已成功提交缴费，请等待管理员缴费审核
			</van-col>
		</van-row>
		<van-row>
			<van-col :span="24" class="checkMsg2">
				我们将以短信的方式通知您审核结果~
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
				history:0,
			}
		},
		components:{
			Header,
		},
		mounted(){
			var height = window.innerHeight;
			var devicePixelRatio = window.devicePixelRatio;
			var isAndroid = window.navigator.appVersion.match(/android/gi);
			var isIPhone = window.navigator.appVersion.match(/iphone/gi);
			    if (isIPhone) {
			        if (devicePixelRatio >= 3) {
						// isIPhone  dpr = 3
			            this.$refs.homePage.style.height =height + "px";
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
	}
</script>

<style scoped lang="stylus">
.payment_waiting
	background:cwhite
	overflow:hidden
	.van-col.clock
		height: 200px;
		margin-top: 100px
	.van-col.clock>div
		height: 200px;
		i
			margin:0 auto
			display:block
			width: 200px;
			height: 200px;
			text-align:center
			line-height: 200px
			color:headerBack
			font-size:100PX
	.checkMsg1,.checkMsg2
		font-size:14PX
		color:cgray9
		margin-top: 18px
		text-align:center
	.checkMsg1
		margin-top: 59px;
	
	
	
[data-dpr="1"]
	.van-col.clock
	.van-col.clock>div
		i
			font-size:font100
	.checkMsg1,.checkMsg2
		font-size:font14
[data-dpr="2"]
	.van-col.clock
	.van-col.clock>div
		i
			font-size:font200
	.checkMsg1,.checkMsg2
		font-size:font28
[data-dpr="3"]
	.van-col.clock
	.van-col.clock>div
		i
			font-size:font300
	.checkMsg1,.checkMsg2
		font-size:font42
</style>
