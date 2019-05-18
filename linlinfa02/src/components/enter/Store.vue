<template>
	<div class="store" ref="homePage">
		<Header :title="msg"></Header>
		<div class="part1">
			<van-row class="store_title">
				<van-col  :span="6" class="store_title_baseinfo">基本信息</van-col>
			</van-row>
			<van-row class="store_name">
				<van-col  :span="8">店铺名称<i>*</i></van-col>
				<van-col  :span="16">
					<input type="text" placeholder="请输入店铺名字" v-model="storeName">
				</van-col>
			</van-row>
			<van-row class="contact_name">
				<van-col  :span="8">联系人姓名<i>*</i></van-col>
				<van-col  :span="16">
					<input type="text" placeholder="请输入真实姓名" v-model="contactName">
				</van-col>
			</van-row>
			<van-row class="contact_number">
				<van-col  :span="8">联系人电话<i>*</i></van-col>
				<van-col  :span="16">
					<input max="11" type="number" placeholder="请输入联系人电话" v-model="contactNumber">
				</van-col>
			</van-row>
			<van-row class="store_address">
				<router-link :to="'/choosecity/'+member_id">
					<van-col  :span="9">门店地址<i>*</i></van-col>
					<van-col :span="13" class="tag_location">
						{{tagLocation}}
					</van-col>
					<van-col  :span="2">
						<van-icon name="arrow"></van-icon>
					</van-col>
				</router-link>
			</van-row>
			<van-row class="store_location">
				<router-link :to="'/chooselo/'+member_id">
					<van-col  :span="9">标记店铺位置</van-col>
					<van-col  :span="2" :offset="13">
						<van-icon name="arrow"></van-icon>
					</van-col>
				</router-link>
			</van-row>
			<van-row class="store_detail_address">
				<van-col :span="24">
					<input type="text" :placeholder="placeDetailLocation" v-model="detailLocation">
				</van-col>
			</van-row>
		</div>
		<div class="part2">
			<van-row class="store_title">
				<van-col  :span="6">门店照片</van-col>
			</van-row>
			<van-row  class="store_front">
				<van-col  :span="7">门脸照<i>*</i></van-col>
				<van-col  :span="5" :offset="1">
					<van-uploader :after-read="onRead1" ref="storeFront" accept="image/gif,image/jpeg,image/png">
						<img :src="imgPath1">
					</van-uploader>
				</van-col>
				<van-col  :span="10">
					<p>一张真实美观的门脸照可以 提升店铺形象</p>
					<p @click="showDialog1">查看示例图</p>
				</van-col>
			</van-row>
			<van-row  class="store_inside">
				<van-col  :span="7">店内照<i>*</i></van-col>
				<van-col  :span="5" :offset="1">
					<van-uploader :after-read="onRead2" ref="storeFront" accept="image/gif,image/jpeg,image/png">
						<img :src="imgPath2">
						<!-- <canvas ref="canvas2"></canvas> -->
					</van-uploader>
				</van-col>
				<van-col  :span="10">
					<p>简介干净的店内设施可以让用户放心舒心</p>
					<p @click="showDialog2">查看示例图</p>
				</van-col>
			</van-row>
			<van-row  class="store_logo">
				<van-col  :span="7">店铺LOGO<i>*</i></van-col>
				<van-col  :span="5" :offset="1">
					<van-uploader :after-read="onRead3" ref="storeFront" accept="image/gif,image/jpeg,image/png">
					  <img :src="imgPath3">
					</van-uploader>
				</van-col>
				<van-col  :span="10">
					<p>店铺LOGO(支持jpg、jpeg、png格式,大小不超过1MB)</p>
					<p @click="showDialog3">查看示例图</p>
				</van-col>
			</van-row>
		</div>
			<van-row   class="store_btn_next">
				<van-col :span="22"  :offset="1">
					<van-button @click="next" type="info" size="large">下一步</van-button>
				</van-col>
			</van-row>
	</div>
</template>

<script>
	import Header from '../header'
	import bus from '../../assets/js/eventBus.js'
	export default {
		data(){
			return {
				msg:"1/3 店铺信息",
				storeName:"",
				contactName:"",
				contactNumber:"",
				chooseLocation:"",
				tagLocation:"",
				detailLocation:"",
				placeDetailLocation:"详细地址 例：1号楼101室",
				dialogImageUrl: '',
				dialogVisible: false,
				clientHeight:"",
				regExpAll:true,
				file:null,
				imgPath1:"http://prh73mph5.bkt.clouddn.com/icon_bnt_sczzpz@2x.png",
				imgPath2:"http://prh73mph5.bkt.clouddn.com/icon_bnt_sczzpz@2x.png",
				imgPath3:"http://prh73mph5.bkt.clouddn.com/icon_bnt_sczzpz@2x.png",
				member_id:"",
			}
		},
		components:{
			Header,
			
		},
		mounted(){
			this.member_id = this.$route.params.member_id;
			this.$nextTick(function(){
				bus.$on("getChooseCityValue",(msg)=>{
					this.tagLocation = msg;
				});
				bus.$on("getChooseLocationValue",(msg)=>{
					this.detailLocation = msg;
				});
			})
			if(localStorage.getItem("member_id")){
				console.log(localStorage.getItem("member_id"));
				this.member_id = localStorage.getItem("member_id");
				this.storeName = localStorage.getItem("company_name");
				this.contactName = localStorage.getItem("contacts_name");
				this.contactNumber = localStorage.getItem("contacts_phone");
				this.tagLocation = localStorage.getItem("company_address");
				this.detailLocation = localStorage.getItem("company_address_detail");
				this.imgPath1 = localStorage.getItem("face_img");
				this.imgPath3 = localStorage.getItem("store_img");
				this.imgPath3 = localStorage.getItem("logo_img");
			}
			if(localStorage.getItem("company_address_detail")){
				this.detailLocation = localStorage.getItem("company_address_detail");
			}else{
				this.detailLocation = "";
			}
		},
		beforeDestory(){
			bus.$off("getChooseCityValue");
			bus.$off("getChooseLocationValue");
		},
		methods:{
			showDialog1(){
				this.$dialog.alert({
				  title: '门脸照示意图',
				  message: `<img src="http://prh73mph5.bkt.clouddn.com/icon_bnt_dpzp@2x.png"><p>门店照需拍出完整门匾，门框，需在店铺开门营业状态下完成拍摄</p>`,
				  confirmButtonText:"知道了"
				})
			},
			showDialog2(){
				this.$dialog.alert({
				  title: '店内照示意图',
				  message: `<img src="http://prh73mph5.bkt.clouddn.com/icon_bnt_dnzp@2x.png"><p>店内照片需要实际反映内部情况（比如收银台、餐桌椅等）</p>`,
				  confirmButtonText:"知道了"
				})
			},
			showDialog3(){
				this.$dialog.alert({
				  title: 'LOGO示意图',
				  message: `<img src="http://prh73mph5.bkt.clouddn.com/shilitu_bnt_klogo@2x.png"><p>店铺LOGO（支持jpg、jprg、png格式，大小不超过1mb）</p>`,
				  confirmButtonText:"知道了"
				  })
			},
			onRead1(file) {
				// if(file.file.size>=1048576){
				// 	this.$toast("图片大小不能超过2M");
				// 	this.imgPath1 = "http://prh73mph5.bkt.clouddn.com/icon_bnt_sczzpz@2x.png";
				// }else{
					var formData = new FormData();
					formData.append("file",file.file);
					console.log(file);
					this.$axios.post("/v3/image_upload",formData,{headers: {"Content-Type":"multipart/form-data"}})
					.then((data)=>{
					this.imgPath1="http://pqk40fvkr.bkt.clouddn.com/"+data.data.data;
					console.log(data);
					console.log(data.data.data);
					localStorage.setItem("face_img",data.data.data);
					})
					.catch((err)=>{
						console.log(this.imgPath3);
						this.imgPath1="http://prh73mph5.bkt.clouddn.com/icon_bnt_sczzpz@2x.png";
					})
				// }
			},
			onRead2(file) {
				// if(file.file.size>=1048576){
					// this.$toast("图片大小不能超过2M");
					// this.imgPath2 = "http://prh73mph5.bkt.clouddn.com/icon_bnt_sczzpz@2x.png";
						// console.log(reader);
						// console.log(file);
						// var img = new Image();
						// img.src = file.content;
						// console.log(img.src);
						// var dic = img.width / img.height;
						// var canvas2 = this.$refs.canvas2;
						// canvas2.style.width = 120+"px";
						// canvas2.style.height = 120+"px";
						// var ctx = canvas2.getContext("2d");
						// ctx.clearRect(0,0,120,120*dic);
						// ctx.drawImage(img,0,0,120,120*dic);
						// var finalURL = ctx.toDataURL();
						// console.log(finalURL);
				// }else{
					var formData = new FormData();
					formData.append("file",file.file);
					// formData.append("mypic",file.file);
					this.$axios.post("/v3/image_upload",formData,{headers: {"Content-Type":"multipart/form-data"}})					   .then((data)=>{
						this.imgPath2="http://pqk40fvkr.bkt.clouddn.com/"+data.data.data;
						console.log(file);
						localStorage.setItem("store_img",data.data.data);
					})
					.catch((err)=>{
						console.log(this.imgPath3);
						this.imgPath2="http://prh73mph5.bkt.clouddn.com/icon_bnt_sczzpz@2x.png";
					})
				// }
			},
			onRead3(file) {
					var formData = new FormData();
					formData.append("file",file.file);
					this.$axios.post("/v3/image_upload",formData,{headers: {"Content-Type":"multipart/form-data"}})						.then((data)=>{
						this.imgPath3="http://pqk40fvkr.bkt.clouddn.com/"+data.data.data;
						localStorage.setItem("logo_img",data.data.data);
					})
					.catch((err)=>{
						console.log(this.imgPath3);
						this.imgPath3="http://prh73mph5.bkt.clouddn.com/icon_bnt_sczzpz@2x.png";
					})
			},
			next(){
				console.log(this.$route.params);
				let checkStoreName = /^[\u4e00-\u9fa5A-Za-z0-9-_]{1,20}$/;
				let checkcontactName = /^[\u4e00-\u9fa5]{1,5}$/;
				var regexpLocation =  /^([\u4e00-\u9fa5a-zA-Z0-9]{0,50})$/;
				let checkPhone = /\d{11}/;
				if(!checkStoreName.test(this.storeName)||this.storeName==""){
					this.$toast("请检查店铺名字是否输入错误或为空");
				}else{
					if(!checkcontactName.test(this.contactName)||this.contactName==""){
						this.$toast("请检查联系人姓名是否输入错误或为空");
					}else{
						if(!checkPhone.test(this.contactNumber)||this.contactNumber==""){
							this.$toast("请检查联系人电话是否输入错误或为空");
						}else{
							if(!regexpLocation.test(this.tagLocation)||this.tagLocation==""){
								this.$toast("请检查门店地址是否选择");
							}else{
								if(!regexpLocation.test(this.detailLocation)||this.detailLocation==""){
									this.$toast("请检查位置是否标记或输入正确");
								}else{
									if(this.imgPath1=="icon_bnt_sczzpz@2x.png"||this.imgPath2=="icon_bnt_sczzpz@2x.png"||this.imgPath3=="icon_bnt_sczzpz@2x.png"){
										// this.$router.push('/ident/'+this.member_id);
										this.$toast("请检查图片是否上传");
									}else{
										this.$router.push('/ident/'+this.member_id);
										localStorage.setItem("member_id",this.member_id);
										localStorage.setItem("company_name",this.storeName);
										localStorage.setItem("contacts_name",this.contactName);
										localStorage.setItem("contacts_phone",this.contactNumber);
										localStorage.setItem("company_address",this.tagLocation);
										localStorage.setItem("company_address_detail",this.detailLocation);
									}
								}
							}
						}
					}
				}
				//next justice
			}
		}
	}
</script>
<style scoped lang="stylus">
div#app
	div.store
		background:cf5
		height: 1535px
		overflow:hidden
		div.part1
			height: 625px
			.store_title
				height: titleHeight
				line-height: titleHeight
				padding-left: titlePadding
				padding-right: 2PX
				font-size:font14
				color:cgray80
				background:cf5
			.store_name,.contact_name,.contact_number
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
						color:cgray3
			.store_address
				height: 88px
				line-height: 88px
				color:cblack
				background:cwhite
				font-size:17PX
				border-bottom:normalBorder
				a
					display:inline-block
					width: 100%
					height: 88px
					& .van-col--9
						padding-left: titlePadding
						height: 88px
						line-height: 88px
						color:cblack
						font-size:17PX
						i
							color:cred
							font-size:17PX
					& .van-col--2
						padding-right: titlePadding
						height: 88px
						i
							display:inline-block
							height: 88px
							line-height: 88px
							color:cgray9
							font-size:17PX
					& .tag_location
						width: 405px
						height: 88px
						ellipsis()
						color:cgray9
			.store_location
				height: 88px
				line-height: 88px
				background:cwhite
				font-size:17PX
				border-bottom:normalBorder
				a
					display:inline-block
					width: 100%
					height: 88px
					& .van-col--9
						padding-left: titlePadding
						height: 88px
						line-height: 88px
						color:cgray9
						font-size:17PX
					& .van-col--2
						padding-right: titlePadding
						height: 88px
						i
							display:inline-block
							height: 88px
							line-height: 88px
							color:cgray9
							font-size:17PX
			.store_detail_address
				height: 88px
				line-height: 88px
				background:cwhite
				font-size:17PX
				border-bottom:normalBorder
				& .van-col--24
					padding-left: titlePadding
					height: 88px
					line-height: 88px
					color:cgray9
					font-size:17PX
					& input
						width: 100%
						ellipsis()
						color:cgray3
		div.part2
			margin-bottom: 59px
			background:cwhite
			height: 631px
			.store_title
				height: titleHeight
				line-height: titleHeight
				padding-left: titlePadding
				padding-right: 2PX
				font-size:titleFont
				color:cgray80
				background:cf5
			.store_front,
			.store_inside
				height: 180px
				border-bottom:normalBorder
				& .van-col
					height: 170px
				.van-col--7
					padding-left: titlePadding
					font-size:labelFont
					color:cblack
					line-height: 170px
					i
						color:cred
				.van-col--5
					.van-uploader
						width: 120px
						height: 120px
						margin:(170px/2)-(120px/2)  0
						text-align:center
						uploadBorder()
						overflow:hidden
						img
							height: 120px
							width: auto
				.van-col--10
					p:first-child
						font-size:12PX
						color:cgray9
						margin-top: 29px
					p:last-child
						font-size:12PX
						color:cblue
						margin-top: 20px
			.store_logo
				height: 180px
				border-bottom:normalBorder
				& .van-col
					height: 170px
				.van-col--7
					padding-left: titlePadding
					font-size:labelFont
					color:cblack
					line-height: 170px
					i
						color:cred
				.van-col--5
					.van-uploader
						width: 120px
						height: 120px
						margin:(170px/2)-(120px/2)  0
						text-align:center
						uploadBorder()
						overflow:hidden
						img
							height: 120px
							width: auto
				.van-col--10
					p:first-child
						font-size:12PX
						color:cgray9
						margin-top: 20px
					p:last-child
						font-size:12PX
						color:cblue
						margin-top: 10px
			/.store_front,
			.store_inside,	
				border-bottom:informationBorder
				box-sizing:border-box
		.store_btn_next
			margin-bottom: 44px
			.van-button.van-button--large
				height: 88px
				& .van-button__text
					font-size:font17
[data-dpr="2"] div#app
	div.store
			div.part1
				.store_title
					font-size:font28
				.store_name,.contact_name,.contact_number
					font-size:34PX
					& .van-col--8
						font-size:34PX
						i
							font-size:34PX
					& .van-col--16
						font-size:34PX
				.store_address
					font-size:34PX
					& .van-col--9
						font-size:34PX
						i
							font-size:34PX
					& .van-col--2
						i
							font-size:34PX
				.store_location
					font-size:34PX
					& .van-col--9
						font-size:34PX
					& .van-col--2
						i
							font-size:34PX
				.store_detail_address
					font-size:34PX
					& .van-col--24
						font-size:34PX
			div.part2
				.store_title
					font-size:font28
				.store_front,
				.store_inside
					& .van-col
					.van-col--7
						font-size:font32
					.van-col--5
						.van-uploader
							i
								font-size:font50
					.van-col--10
						p
							font-size:font24
				.store_logo
					& .van-col
					.van-col--7
						font-size:font32
					.van-col--5
						.van-uploader
							i
								font-size:font50
					.van-col--10
						p
							font-size:font24
			.store_btn_next
				.van-button.van-button--large
					& .van-button__text
						font-size:font34
[data-dpr="3"] div#app
	div.store
			div.part1
				.store_title
				.store_name,.contact_name,.contact_number
					font-size:51PX
					& .van-col--8
						font-size:51PX
						i
							font-size:51PX
					& .van-col--16
						font-size:51PX
				.store_address
					font-size:34PX
					& .van-col--9
						font-size:51PX
						i
							font-size:51PX
					& .van-col--2
						i
							font-size:51PX
				.store_location
					font-size:51PX
					& .van-col--9
						font-size:51PX
					& .van-col--2
						i
							font-size:51PX
				.store_detail_address
					font-size:51PX
					& .van-col--24
						font-size:51PX
			div.part2
				.store_title
					font-size:font42
				.store_front,
				.store_inside
					& .van-col
					.van-col--7
						font-size:font48
					.van-col--5
						.van-uploader
							i
								font-size:font75
					.van-col--10
						p
							font-size:font36
				.store_logo
					& .van-col
					.van-col--7
						font-size:font48
					.van-col--5
						.van-uploader
							i
								font-size:font75
					.van-col--10
						p
							font-size:font36
			.store_btn_next
				.van-button.van-button--large
					& .van-button__text
						font-size:font51
</style>