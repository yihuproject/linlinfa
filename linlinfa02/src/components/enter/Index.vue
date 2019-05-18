<template>
	<div class="enter" ref="homePage">
		<Header :title="msg" history="0"></Header>
		<div class="banner">
			<van-button type="info" size="normal" @click="next">我要入驻</van-button>
		</div>
		 <div class="process">
			<p>入驻流程</p>
			<ul>
				 <li><img src="http://prh73mph5.bkt.clouddn.com/icon_lc_tijiao@2x.png" alt=""><i>提交申请</i></li>
				<li><img src="http://prh73mph5.bkt.clouddn.com/icon_lc_shenhe@2x.png" alt=""><i>入驻审核</i></li>
				<li><img src="http://prh73mph5.bkt.clouddn.com/icon_lc_jf@2x.png" alt=""><i>签署缴费</i></li>
				<li><img src="http://prh73mph5.bkt.clouddn.com/icon_lc_kd@2x.png" alt=""><i>入驻经营</i></li>
			</ul>
		</div>
		<div class="information">
			<div class="informationReady">
				<p>入驻前请准备好以下资料</p>
				<p>建议您在证件齐全的时候完成入驻</p>
			</div>
			<div class="informationDisplay"  v-for="tmp in processStep">
				<span>{{tmp.step}}</span>
				<div class="text">
					<p>{{tmp.stepTitle}}</p>
					<p>{{tmp.stepContent}}</p>
				</div>
				<div class="img">
					<img :src="tmp.stepImg">
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import Header from '../../components/header'
	export default {
		data(){
			return {
				msg:"商家入驻",
				member_id:"",
				processStep:[
					{
						"step":1,
						"stepTitle":"店铺照片",
						"stepContent":"需要拍出完整门匾，门框（ 建议正对门店2米处拍摄）",
						"stepImg":"http://prh73mph5.bkt.clouddn.com/shilitu_bnt_menlianz@2x.png"
					},
					{
						"step":2,
						"stepTitle":"店铺内部环境",
						"stepContent":"需要实际反映内部环境（收 银台，餐桌椅等）",
						"stepImg":"http://prh73mph5.bkt.clouddn.com/shilitu_bnt_dianneiz@2x.png"
					},
					{
						"step":3,
						"stepTitle":"店铺LOGO",
						"stepContent":"需要上传与店铺匹配的LOGO，大小不超过1MB",
						"stepImg":"http://prh73mph5.bkt.clouddn.com/icon_bnt_llf@2x.png"
					},
					{
						"step":4,
						"stepTitle":"店铺手持身份证照",
						"stepContent":"需要清晰展示人物五官及身 份证个人信息",
						"stepImg":"http://prh73mph5.bkt.clouddn.com/icon_bnt_scsfz@2x.png"
					},
					{
						"step":5,
						"stepTitle":"营业执照",
						"stepContent":"需要文字清晰可见，边框完 整，露出国徽",
						"stepImg":"http://prh73mph5.bkt.clouddn.com/icon_bnt_yyzz@2x.png"
					}
				],
				clientHeight:null,
				clientWidth:null,
			}
		},
		components:{
			Header,
		},
		mounted(){
			this.member_id = this.$route.params.member_id;
			this.clientHeight = window.screen.height;
			this.clientWidth = window.screen.width;
			console.log(this.clientHeight);
			console.log(this.clientWidth);
		},
		methods: {
			next() {
				this.$router.push("/store/"+this.member_id);
				console.log(this.$router);
				console.log(this.$route.params);
			}
		},
	}
</script>

<style scoped lang="stylus">
	div.enter
		width: totalWid
		height:2233px
		font-family:font
		overflow:hidden
		div.banner
			width: totalWid
			height: 320px
			background:url(http://prh73mph5.bkt.clouddn.com/banner@2x.png) no-repeat center
			background-size:cover
			button
				margin-left: halfScreenWid -  enterButtonWid
				margin-top: enterButtonMarginT
				line-height: 80px
				height: 80px
				border-radius:8px
				font-size:18PX
				padding:0 50px
				background:linear-gradient(to top,#1C98F6 50%,#27B1F8 100%)
		div.process
			width: totalWid
			height: 305px
			background:progressBack
			padding-top: enterProcessPadding
			p
				text-align: center
				color:cblack
				font-size:iFont
				margin-bottom: enterProcessPMarginBottom
				height: enterProcessPHeight
				line-height: enterProcessPHeight
			ul
				flex()
				flex-flow:row nowrap
				justify-content:space-around
				width: totalWid
				height: enterProcessUlHeight
				align-items:center
				li
					width: enterProcessUlLiWid
					height: enterProcessUlLiHei
					list-style:none
					img
						width: enterProcessUlLiWid
						height: enterProcessUlLiImgHei
					i
						display:block
						width: enterProcessUlLiWid
						text-align:center
						font-size:font12
		div.information
			height: 1520px
			width: totalWid;
			background:cwhite
			div.informationReady::before
				content:""
				display:table
			div.informationReady
				width: totalWids
				text-align:center
				height: 160px
				p:first-child
					font-size:informationFontb
					color:cblack
					margin-top: 40px;
				p:nth-child(2)
					font-size:font	
					color:cgray9
					font-family:informationFontFamily
					margin-top: 25px;
			div.informationDisplay
				width: totalWid;
				height: 210px;
				flex()
				flex-flow:row nowrap
				justify-content:flex-start
				align-items:center
				padding:29px
				border-bottom:normalBorder
				span
					width: 15px
					padding:8px 8px;
					height: 17px;
					line-height: 17px;
					background:url(http://prh73mph5.bkt.clouddn.com/icon_lc_xhao@2x.png) no-repeat center;
					background-size:cover;
					align-self:flex-start
					margin-top: 18px;
					color:cwhite
					font-size:12PX
				div.text
					width: 373px;
					height: 180px;
					margin-left: 20px;
					p:first-child
						font-size:17PX
						color:cblack
					p:nth-child(2)
						margin-top: 27px;
						font-size:14PX
				div.img
					width: 250px;
					height: 180px;
					margin-left: 20px;
					img
						width: 250px;
						height: 180px;
		div.information::before
			content:""
			display:table
	[data-dpr="1"] div.enter
		div.banner
			button
				font-size:font18
		div.process
			p
				font-size:font17
			ul
				li
					i
						font-size:font12
		div.information
			div.informationReady
				p:first-child
					font-size:font20
				p:nth-child(2)
					font-size:font14
			div.informationDisplay
				span
					font-size:font12
				div.text
					p:first-child
						font-size:font17
					p:nth-child(2)
						font-size:font14
	[data-dpr="2"] div.enter
		div.banner
			button
				font-size:font32
		div.process
			p
				font-size:font34
			ul
				li
					i
						font-size:font24
		div.information
			div.informationReady
				p:first-child
					font-size:font40
				p:nth-child(2)
					font-size:font28
			div.informationDisplay
				span
					font-size:font24
				div.text
					p:first-child
						font-size:font34
					p:nth-child(2)
						font-size:font28
	[data-dpr="3"] div.enter
		div.banner
			button
				font-size:font54
		div.process
			p
				font-size:font51
			ul
				li
					i
						font-size:font36
		div.information
			div.informationReady
				p:first-child
					font-size:font60
				p:nth-child(2)
					font-size:font42
			div.informationDisplay
				span
					font-size:font36
				div.text
					p:first-child
						font-size:font51
					p:nth-child(2)
						font-size:font42
</style>
