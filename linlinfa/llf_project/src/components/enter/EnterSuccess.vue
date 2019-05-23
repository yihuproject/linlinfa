<template>
	<div class="checkstate" ref="homePage">
		<Header :title="msg"></Header>
		<van-row>
			<van-col :span="24"  class="clock">
				<div></div>
			</van-col>
		</van-row>
		<van-row>
			<van-col :span="24"  class="checkMsg1">
				入驻成功
			</van-col>
		</van-row>
		<van-row>
			<van-col :span="24"  class="checkMsg2">
				您已成功入驻邻邻发
			</van-col>
		</van-row>              
		<van-row>
			<van-col :span="24" class="checkMsg2">
				请前往商家平台进一步完善您的店铺信息
			</van-col>
		</van-row>
		<van-row class="next">
			<van-col :span="22" :offset="1">
				<van-button size="large" type="info">进入店铺</van-button>
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
				
			// window.onload = function(){
			// 	// window.location.href = `http://appName.local.com?action=webPushUserIno&id=${id}`;
			// }
		},
	}
</script>

<style scoped lang="stylus">
.checkstate
	background:cwhite
	overflow:hidden
	.van-col.clock
		height: 200px;
		margin-top: 100px
	.van-col.clock>div
		width: 200px
		height: 200px
		margin: 0 auto
		background:url("http://prh73mph5.bkt.clouddn.com/icon_zt_ytg@2x.png") no-repeat center
		background-size:contain
	.checkMsg1,.checkMsg2
		font-size:14PX
		color:cgray9
		margin-top: 18px
		text-align:center
	.checkMsg1
		color:cblack
		margin-top: 59px;
		font-size:font20
/.next
	margin-top: 80px
		
	
[data-dpr="1"]
	.checkMsg1,.checkMsg2
		font-size:font14
	.checkMsg1
		font-size:font20
[data-dpr="2"]
	.checkMsg1,.checkMsg2
		font-size:font28
	.checkMsg1
		font-size:font40
[data-dpr="3"]
	.checkMsg1,.checkMsg2
		font-size:font42
	.checkMsg1
		font-size:font60
</style>
