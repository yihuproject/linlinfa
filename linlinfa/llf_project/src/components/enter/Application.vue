<template>
	<div class="application" ref="homePage">
		<Header :title="msg"></Header>
		<van-row class="pay_info">
			<van-col :span="1" :offset="4">
				<van-icon name="checked"></van-icon>
			</van-col>
			<van-col :span="16"  :offset="2">
				您的审核已通过，请缴费
			</van-col>
		</van-row>
		<van-row class="count">
			<van-col :span="23" :offset="1">
				<div>
					<p>￥1000</p>
					<p>应缴纳总金额(元)</p>
				</div>
			</van-col>
		</van-row>
		<van-row class="count_detail">
			<van-col :span="22" :offset="1">
				普通店铺一年服务费：900 元+经营保证金：100 元
			</van-col>
		</van-row>
		<van-row class="transfer_voucher">
			<van-col :span="22" :offset="1">
				您可通过以下方式缴费：
			</van-col>
		</van-row>
		<van-row class="voucher">
			<van-col :span="10" :offset="1">
				上传转账凭证<i>*</i>
			</van-col>
			<van-col :span="4" :offset="8">
				<van-uploader :after-read="onRead" :class="{active:isShowImg== true}">
				  <van-icon :name="imgPath" />
				</van-uploader>
			</van-col>
		</van-row>
		<van-row class="transfer_info">
			<van-col :span="22" :offset="1">
				<p>1.请转账至官方提供的收款银行账户</p>         
				<p>2.转账后请上传转账凭证，以便我们及时确认收款</p>
			</van-col>
		</van-row>
		<van-row class="btn">
			<van-col :span="22" :offset="1">
				<van-button size="large" type="info" @click="next">提交</van-button>
			</van-col>
		</van-row>		
	</div>
</template>

<script>
	import Header from "../header"
	export default{
		data(){
			return {
				msg:"入驻申请",
				imgPath:"plus",
				isShowImg:false,
				member_id:null,
				paying_amount:1000,
				paying_money_certificate:"",
			}
		},
		components:{
			Header
		},
		methods:{
      toast(){
        this.$toast.loading({
            duration: 0,
            mask: true,
            forbidClick: false,
            message: '上传中...'
            })
      },
      ontpys(img){
            let originWidth = img.width, // 压缩后的宽
            originHeight=img.height,
            maxWidth = 400, maxHeight = 400,
            quality = 0.7, // 压缩质量
            canvas = document.createElement('canvas'),
            drawer = canvas.getContext("2d");
            canvas.width = maxWidth;
            canvas.height = originHeight/originWidth*maxWidth;
            drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
            let base64 = canvas.toDataURL("image/jpeg", quality); // 压缩后的base64图片
            let file = this.dataURLtoFile(base64,Date.parse(Date())+'.jpg');
            console.log(file);//压缩后的file
            return file;
        },
        //base64转file
        dataURLtoFile(dataurl,filename){
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr],filename,{type:mime});
        },
			onRead(file){
      this.toast();
      if(file.file.size>1034333){
        console.log(file);//未压缩的file
        let img = new Image();
        img.src = file.content;
        this.dwimg=file.content;
        let that=this;
        img.onload=function(){
          var successFile = that.ontpys(img);
          console.log(that.ontpys(img));
          var formData = new FormData();
          formData.append("file",successFile);
          that.$axios.post("/v3/image_upload",formData,{headers: {"Content-Type":"multipart/form-data"}})
          .then((data)=>{
           that.isShowImg = true;
           that.paying_money_certificate = data.data.data;
          	that.imgPath=data.data.data;
          	console.log(successFile);
          	localStorage.setItem("face_img",data.data.data);
            that.$toast().clear();
          })
          .catch((err)=>{
          	console.log(that.imgPath);
          	that.imgPath="plus";
          })
        }
      }else{
        console.log(file);//未压缩的file
        var formData = new FormData();
        formData.append("file",file.file);
        this.$axios.post("/v3/image_upload",formData,{headers: {"Content-Type":"multipart/form-data"}})
        .then((data)=>{
         this.isShowImg = true;
         this.paying_money_certificate = data.data.data;
         this.imgPath=data.data.data;
         console.log(file.file);
         localStorage.setItem("face_img",data.data.data);
         this.$toast().clear();
        })
        .catch((err)=>{
        	console.log(this.imgPath);
        	this.imgPath="plus";
        })
      }
		},//upload img
			next(){
				console.log(this.member_id);
				if(this.member_id==null||this.member_id==undefined){
					this.$toast("member_id不正确");
				}else{
					if(this.paying_money_certificate==""||this.paying_money_certificate==undefined){
						this.$toast("图片上传不成功");
					}else{
						if(this.paying_amount==""){
							this.$toast("付款金额不正确");
						}else{
							var formData = new FormData();
							formData.append("member_id",this.member_id);
							formData.append("paying_money_certificate",this.paying_money_certificate);
							formData.append("paying_amount",this.paying_amount);
							console.log(formData);
							let config = {
								headers: {"Content-Type":"application/json"}
							}
							this.$axios.post("/v3/store_joinin_step2",formData,config)
							.then((data)=>{
								console.log(data);
								this.$router.push('/pwait/'+this.member_id);
							})
							.catch((err)=>{
								console.log(err);
							})
						}
					}
				}
			},
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
						this.$refs.homePage.style.height = height  + "px";
					} else {
						// isIPhone dpr = 1
						this.$refs.homePage.style.height = height  + "px";
					}
				} else {
					//  isAndroid dpr = 1
					this.$refs.homePage.style.height = height  + "px";
				}
				console.log(this.$refs.homePage.offsetHeight);
				console.log(this.member_id);
				console.log(height);
		}
}
</script>

<style scoped lang="stylus">
.application
	background:cwhite
	overflow:hidden
	.pay_info
		font-family:font
		color:cblack
		height: 110px
		background:cf5
		.van-icon
			color:cgreen
			font-size:30PX
			height: 110px
			line-height: 110px
		.van-col--16
			height: 110px
			line-height: 120px
			font-size:17PX
	.count
		width: 690px
		height: 222px
		background:cwhite
		.van-col
			width: 690px
			height: 160px
			background:cblue
			margin-top: 30px
			border-radius:8px
			div
				width: 690px
				height: 160px
			p:first-child
				font-size:26PX
				text-align:center
				color:cwhite
				margin-top: 14px
			p:last-child
				height: 30px
				font-size:14PX
				text-align:center
				color:cwhite
				margin-top:15px
				line-height: 30px
	.count_detail
		.van-col
			font-size:14PX
			color:cgray6
			text-align:left
	.transfer_voucher
		color:cblack
		font-size:16PX
		margin-top: 60px
		margin-bottom: 21px
	.voucher
		border-top:informationBorder
		border-bottom:informationBorder
		height: 176px
		.van-col--10
			height: 176px
			line-height: 176px
			font-size:17PX
			i
				color:cred
		.van-col--4
			height: 176px
			.van-uploader
				width: 116px
				height: 116px
				margin:(170px/2)-(120px/2)  0
				text-align:center
				border:normalBorder
				i
					line-height: 120px
					font-size:25PX
					color:#F0F0F0
			.van-uploader.active
				width: 116px
				height: 116px
				margin:(170px/2)-(120px/2) 
				i
					width: 116px
					height: 116px
					img
						width: 110px
						height: 110px
						margin: 4px
	.transfer_info
		margin-top: 29px
		font-size:13PX
		color:cgray9
		p:last-child
			margin-top: 10px
	.btn
		margin-top: 58px
		
[data-dpr="1"]
	& .pay_info
			.van-icon
				font-size:font30
			.van-col--16
				font-size:font17
		& .count
			.van-col
				div
				p:first-child
					font-size:font26
				p:last-child
					font-size:font14
		& .count_detail
			.van-col
				font-size:font14
		& .transfer_voucher
			font-size:font16
		& .voucher
			.van-col--10
				font-size:font17
			.van-col--4
				.van-uploader
					i
						font-size:font25
		& .transfer_info
			font-size:font13	
[data-dpr="2"]
	& .pay_info
		.van-icon
			font-size:font60
		.van-col--16
			font-size:font34
	& .count
		.van-col
			div
			p:first-child
				font-size:font52
			p:last-child
				font-size:font28
	& .count_detail
		.van-col
			font-size:font28
	& .transfer_voucher
		font-size:font32
	& .voucher
		.van-col--10
			font-size:font34
		.van-col--4
			.van-uploader
				i
					font-size:font50
	.transfer_info
		font-size:font26
/[data-dpr="3"]
	& .pay_info
		.van-icon
			font-size:font90
		.van-col--16
			font-size:font51
	& .count
		.van-col
			div
			p:first-child
				font-size:font78
			p:last-child
				font-size:font42
	& .count_detail
		.van-col
			font-size:font42
	& .transfer_voucher
		font-size:font48
	& .voucher
		.van-col--10
			font-size:font51
		.van-col--4
			.van-uploader
				i
					font-size:font75
	& .transfer_info
		font-size:font39	
</style>
