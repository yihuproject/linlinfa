<template>
	<div class="identification">
		<Header :title="msg"></Header>
		<div class="part1">
			<van-row class="store_title">
				<van-col  :span="6" class="store_title_baseinfo">基本信息</van-col>
			</van-row>
			<van-row class="real_name">
				<van-col  :span="8">姓名<i>*</i></van-col>
				<van-col  :span="16">
					<input type="text" placeholder="请输入真实姓名" v-model="realName">
				</van-col>
			</van-row>
			<van-row class="id_number">
				<van-col  :span="8">身份证号<i>*</i></van-col>
				<van-col  :span="16">
					<input type="text" placeholder="请输入身份证号" v-model="IDnumber">
				</van-col>
			</van-row>
			<van-row class="id_photo">
				<van-col :span="24">
					<div  class="id_photo_msg">法定代表人手持身份证照<i>*</i></div>
				</van-col>
			</van-row>
			<van-row class="id_photo_upload">
				<van-col :span="24">
					<van-uploader :after-read="onRead1" :class="{active:isIDPhoto == true}" accept="image/gif,image/jpeg,image/png" :max-size="1048576">
						<van-icon :name="IDPhotoPath" />
						<p :class="{active:isIDPhoto == false}">点击拍摄/上传证件</p>
					</van-uploader>
				</van-col>
			</van-row>
			<van-row  class="id_photo_request">
				<van-col :span="24">请确保图片完整，五官清晰，身份证上文字可辨识</van-col>
			</van-row>
		</div>
		<div class="part2">
			<van-row class="store_title">
				<van-col  :span="6" class="store_title_baseinfo">特许证件</van-col>
			</van-row>
			<van-row class="license">
				<van-col :span="24">
					<div  class="license_photo_msg">营业执照<i>*</i></div>
				</van-col>
			</van-row>
			<van-row class="license_uload">
				<van-col :span="24">
					<van-uploader :after-read="onRead2" accept="image/gif,image/jpeg,image/png" :class="{active:islicensePhoto == true}">
						<van-icon :name="licensePhotoPath"/>
						<p :class="{active:islicensePhoto == false}">点击拍摄/上传证件</p>
					</van-uploader>
				</van-col>
			</van-row>
			<van-row class="license_photo_request">
				<van-col :span="24">
					<p  v-for="require in requireList">{{require}}</p>
				</van-col>
			</van-row>
		</div>
		<van-row   class="store_btn_next">
			<van-col :span="22"  :offset="1">
				<van-button type="info" size="large" @click="next">下一步</van-button>
			</van-col>
		</van-row>
	</div>
</template>

<script>
	import Header from "../header"
	export default {
		data(){
			return {
				msg:"2/3 资质认证",
				realName:"",
				IDnumber:"",
				requireList:[
				"1.照片方向正确，不能颠倒 ",
				"2.照片上的字清晰可见，边框完整，能看见国徽",
				"3.如果是复印件，必须加盖印章",
				"4.没有营业执照，可到工商局办理后申请",
				],
				licensePhotoPath:"plus",
				IDPhotoPath:"plus",
				islicensePhoto:false,
				isIDPhoto:false,
				member_id:null,
			}
		},
		components:{
			Header,
		},
		methods:{
			onRead1(file){
				this.file = file;
				console.log(this.file.file);
				console.log(this.file.file.name);
				console.log(file.file.name);
				// if(file.file.size>=1048576){
				// 	this.$toast('图片大小不能超过2M');
				// 	this.IDPhotoPath="plus";
				// }else{
					var formData = new FormData();
					formData.append("file",file.file);
					this.$axios.post("/v3/image_upload",formData,{headers: {"Content-Type":"multipart/form-data"}})
					.then((data)=>{
					this.IDPhotoPath="http://pqk40fvkr.bkt.clouddn.com/"+data.data.data;
					this.isIDPhoto = true;
					localStorage.setItem("ID_card",data.data.data);
					})
				// }
				
			},
			onRead2(file){
				this.file = file;
				console.log(this.file.file);
				console.log(this.file.file.name);
				console.log(file.file.name);
				// if(file.file.size>=1048576){
				// 	this.$toast('图片大小不能超过2M');
				// 	this.licensePhotoPath="plus";
				// }else{
					var formData = new FormData();
					formData.append("file",file.file);
					this.$axios.post("/v3/image_upload",formData,{headers: {"Content-Type":"multipart/form-data"}})
					.then((data)=>{
					this.licensePhotoPath="http://pqk40fvkr.bkt.clouddn.com/"+data.data.data;
					// this.imgPath1="http://pqk40fvkr.bkt.clouddn.com/"+data.data.data;
					this.islicensePhoto = true;
					localStorage.setItem("business_licence_number_electronic",data.data.data);
					})
				// }
				
			},
			next(){
				var regExpRealName = /^[\u4e00-\u9fa5]{1,5}$/;
				var regExpIDnumber = /^[0-9A-Za-z]{18}$/;
				if(!regExpRealName.test(this.realName)||this.realName==""){
					this.$toast("姓名不能为空,不能超过5个字符");
				}else{
					if(!regExpIDnumber.test(this.IDnumber)||this.IDnumber==""){
						this.$toast("身份证号不能为空,且为18个字符");
					}else{
						if(this.licensePhotoPath=="plus"||this.IDPhotoPath=="plus"){
							this.$toast("请检查图片是否上传");
							localStorage.setItem("business_sphere",this.realName);
							localStorage.setItem("business_licence_number",this.IDnumber);
						}else{
							this.$router.push("/classify/"+this.member_id);
							localStorage.setItem("business_sphere",this.realName);
							localStorage.setItem("business_sphere",this.realName);
							localStorage.setItem("business_licence_number",this.IDnumber);
							}
						}
					}
				}
			},
			created(){
				this.member_id = this.$route.params.member_id;
				console.log(this.member_id);
			}
	}
</script>
<style scoped lang="stylus">
div.identification
	background:cf5
	div.part1
		background:cwhite
		.store_title
			height: titleHeight
			line-height: titleHeight
			padding-left: titlePadding
			padding-right: 2PX
			font-size:titleFont
			color:cgray80
			background:cf5
		.real_name,.id_number
			height: 88px
			line-height: 88px
			color:cblack
			background:cwhite
			font-size:17PX
			border-bottom:normalBorder
			& .van-col--8
				padding-left: titlePadding
				height: 88px
				line-height: 88px
				color:cblack
				font-size:17PX
				i
					color:cred
					font-size:17PX
			& .van-col--16
				padding-right: titlePadding
				height: 88px
				line-height: 88px
				color:cgray3
				font-size:17PX
				input
					width: 100%
					text-align:right
		.id_photo
			padding-left: 15px
			.id_photo_msg
				font-size:17PX
				color:cblack
				height: 80px
				line-height: 80px
				i
					color:cred
		.id_photo_upload
			height: 360px
			margin: 0 15px
			.van-col
				height: 360px
				width: 690px
				uploadBorder()
				.van-uploader
					height: 172px
					width: 690px
					margin:(360px/2) - (94px/2) 0
					display:flex
					flex-flow:column wrap
					align-items:center
					i
						display:inline-block
						width: 96px
						text-align:center
						height: 96px
						line-height: 96px
						background:cblue
						color:cwhite
						border-radius:50%
						font-size:20PX
					p
						color:cblue
						font-size:14PX
						max-width: 100%
						text-align:center
						line-height: 30px
						margin-top: 30px
				.van-uploader.active
					height: 360px
					width: 690px
					margin: 0
					i
						height: 352px
						width: 682px
						background:none
						margin: 4px
						overflow:hidden
						border-radius:0
						img
							height: 340px
							width: 670px
							border-radius:8px
							margin: 3px
							padding: 0
					p
						display:none
		.id_photo_request
			height: 76px
			line-height: 76px
			font-size:12PX
			color:cgray9
			padding-left: 15px;
	div.part2
		margin-bottom: 60px
		background:cwhite
		.store_title
			height: titleHeight
			line-height: titleHeight
			padding-left: titlePadding
			padding-right: 2PX
			font-size:titleFont
			color:cgray80
			background:cf5
		.license
			padding-left: 15px
			.license_photo_msg
				font-size:17PX
				color:cblack
				height: 80px
				line-height: 80px
				i
					color:cred
		.license_uload
			height: 360px
			margin: 0 15px
			.van-col
				height: 360px
				width: 690px
				uploadBorder()
				.van-uploader
					height: 172px
					width: 690px
					margin:(360px/2) - (94px/2) 0
					display:flex
					flex-flow:column wrap
					align-items:center
					i
						display:inline-block
						width: 96px
						text-align:center
						height: 96px
						line-height: 96px
						background:cblue
						color:cwhite
						border-radius:50%
						font-size:20PX
					p
						color:cblue
						font-size:14PX
						max-width: 100%
						text-align:center
						line-height: 30px
						margin-top: 30px
				.van-uploader.active
					height: 360px
					width: 690px
					margin: 0
					i
						height: 352px
						width: 682px
						background:none
						margin: 4px
						overflow:hidden
						border-radius:0
						img
							height: 340px
							width: 670px
							border-radius:8px
							margin: 3px
							padding: 0
					p
						display:none
		.license_photo_request
			min-height: 76px
			line-height: 40px
			font-size:12PX
			color:cgray9
			margin-top: 22px
			padding-bottom: 30px
			padding-left: 15px
		/.store_btn_next
			margin-bottom: 44px
			
[data-dpr="1"] div.identification
	div.part1
		.store_title
			font-size:font14
		.real_name,.id_number
			font-size:font17
			& .van-col--8
				font-size:font17
				i
					font-size:font17
			& .van-col--16
				font-size:font17
		.id_photo
			padding-left: 15px
			.id_photo_msg
				font-size:font17
		.id_photo_upload
			.van-col
				.van-uploader
					i
						font-size:font20
					p
						font-size:font14
		.id_photo_request
			font-size:font12
	div.part2
		.store_title
			font-size:font14
		.license
			padding-left: 15px
			.license_photo_msg
				font-size:font17
		.license_uload
			.van-col
				.van-uploader
					i
						font-size:font20
					p
						font-size:font14
		.license_photo_request
			font-size:font12
[data-dpr="2"] div.identification
	div.part1
		.store_title
			font-size:font28
		.real_name,.id_number
			font-size:font34
			& .van-col--8
				font-size:font34
				i
					font-size:font34
			& .van-col--16
				font-size:font34
		.id_photo
			padding-left: 15px
			.id_photo_msg
				font-size:font34
		.id_photo_upload
			.van-col
				.van-uploader
					i
						font-size:font40
					p
						font-size:font28
		.id_photo_request
			font-size:font24
	div.part2
		.store_title
			font-size:font28
		.license
			padding-left: 15px
			.license_photo_msg
				font-size:font34
		.license_uload
			.van-col
				.van-uploader
					i
						font-size:font40
					p
						font-size:font28
		.license_photo_request
			font-size:font24
[data-dpr="3"] div.identification
	div.part1
		.store_title
			font-size:font42
		.real_name,.id_number
			font-size:font51
			& .van-col--8
				font-size:font51
				i
					font-size:font51
			& .van-col--16
				font-size:font51
		.id_photo
			.id_photo_msg
				font-size:font51
		.id_photo_upload
			.van-col
				.van-uploader
					i
						font-size:font60
					p
						font-size:font42
		.id_photo_request
			font-size:font36
	div.part2
		.store_title
			font-size:font42
		.license
			.license_photo_msg
				font-size:font51
		.license_uload
			.van-col
				.van-uploader
					i
						font-size:font60
					p
						font-size:font42
		.license_photo_request
			font-size:font36
</style>
