<template>
	<div class="classify" ref="homePage">
		<Header :title="msg" :history="history"></Header>
		<div class="classify_level" ref="page">
			<van-row>
				<van-col :span="7">
					<vue-better-scroll
			            ref="scroll1"
						:startY="parseInt(startY)">
						<ul class="classify_level1_ul" ref="container1">
							<li :class="{active_level1:index== current1}" v-for="(listArr,index) in list" 
							 :key="listArr.gc_id" @touchend="clickLevel1(index,listArr)">
							 <span>
								 {{listArr.gc_name}}
							 </span>
							</li>
							<li><span></span></li>
						</ul>
					</vue-better-scroll>
				</van-col>
				<van-col :span="8">
					<vue-better-scroll
					    ref="scroll2"
						:startY="parseInt(startY)">
						<ul  class="classify_level2_ul" ref="container2">
								<li  :class="{active_level2:index2 == current2}" v-for="(listArr2,index2) in list[current1].children" @touchend="clickLevel2(index2,listArr2)" :key="listArr2.gc_id">
									{{listArr2.gc_name}}
								</li>
								<li></li>
						</ul>
				</vue-better-scroll>
				</van-col>
				<van-col :span="9">
					<vue-better-scroll
					    ref="scroll2"
						:startY="parseInt(startY)">
					<ul  class="classify_level3_ul" ref="container3">
						<li :class="{active_level3:index3 == current3}" v-for="(listArr3,index3) in list[current1].children[current2].children" @touchend="clickLevel3(index3,listArr3)" :key="listArr3.gc_id">{{listArr3.gc_name}}</li>
						<li></li>
					</ul>
				</vue-better-scroll>
				</van-col>
			</van-row>
		</div>
		<van-row class="next_btn" ref="btn">
			<van-col :span="22" :offset="1">
			<van-button type="info" size="large" @click="next">提交</van-button>
			</van-col>
		</van-row>
	</div>
</template>

<script>
	import Header from "../header"
	import BScroll from 'better-scroll'
	export default {
		data(){
			return {
				msg:"3/3 店铺分类",
				listLength:9,
				clientHeight:0,
				current1:0,
				current2:0,
				current3:0,
				value1:"",
				value2:"",
				value3:"",
				startY: 0, // 纵轴方向初始化位置
				scrollToX: 0,
				scrollToY: 0,
				scrollToTime: 700,
				history:null,
				list:[
					     {
					  "gc_id":"1",
					  "gc_name":"一二三四",
					  "children":[
					    {
					      "gc_id":"2",
					      "gc_name":"打火机",
								"children":[
								  {
								    "gc_id":"3",
								    "gc_name":"打火机"
								  }
								]
					    },
					    {
					      "gc_id":"5",
					      "gc_name":"XXX",
								"children":[
								  {
								    "gc_id":"6",
								    "gc_name":"打火机"
								  },
								  {
								    "gc_id":"7",
								    "gc_name":"XXX"
								  }
								]
					    }
					  ]
					},
					{
					  "gc_id":"8",
					  "gc_name":"加多宝",
					  "children":[
					    {
					      "gc_id":"9",
					      "gc_name":"吸管"
					    }
					  ]
					},
					{
					  "gc_id":"10",
					  "gc_name":"耳机",
					  "children":[
					    {
					      "gc_id":"11",
					      "gc_name":"吸管2",
								"children":[
								  {
								    "gc_id":"3",
								    "gc_name":"打火机"
								  },
								  {
								    "gc_id":"4",
								    "gc_name":"XXX"
								  }
								]
					    }
					  ]
					}
				],
				member_id:"",
				company_name:"",
				contact_name:"",
				contacts_name:"",
				contacts_phone:"",
				company_address:"",
				company_address_detail:"",
				face_img:"",
				store_img:"",
				logo_img:"",
				business_sphere:"",
				business_licence_number:"",
				ID_card:"",
				business_licence_number_electronic:"",
				store_class_ids:[],
				store_class_names:[],
			}
		},
		components:{
			Header,
		},
		methods:{
			clickLevel1(index,el){
				this.current1 = index;
				this.current2 = 0;
				this.current3 = 0;
				this.value1 = el.gc_name;
				// console.log(this.value1);
			},
			clickLevel2(index,el){
				this.current2 = index;
				this.current3 = 0;
				this.value2 = el.gc_name;
				// console.log(this.value2);
			},
			clickLevel3(index,el){
				this.current3 = index;
				this.value3 = el.gc_name;
				console.log(this.value3);
			},
			scrollTo() {
				this.$refs.scroll1.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime);
				this.$refs.scroll2.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime);
				this.$refs.scroll3.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime);
			},
			next(){
				if(this.value3==""||this.value3==undefined){
					this.$toast("信息上传失败，请检查是否选择");
				}else{
					var formData = new FormData();
					// first step
					formData.append("member_id",this.member_id);
					formData.append("company_name",this.company_name);
					formData.append("contacts_name",this.contacts_name);
					formData.append("contacts_phone",this.contacts_phone);
					formData.append("company_address",this.company_address);
					formData.append("company_address_detail",this.company_address_detail);
					formData.append("face_img",this.face_img);
					formData.append("store_img",this.store_img);
					formData.append("logo_img",this.logo_img);
					formData.append("business_sphere",this.business_sphere);
					// second step
					formData.append("sc_id",this.current3);
					formData.append("business_licence_number",this.business_licence_number);
					formData.append("ID_card",this.ID_card);
					formData.append("business_licence_number_electronic",this.business_licence_number_electronic);
					//add more 
					this.store_class_ids = this.$qs.stringify({"gc_id1":this.current1,"gc_id2":this.current2,"gc_id3":this.current3});
					this.store_class_names = this.$qs.stringify({"gc_names1":this.value1,"gc_names2":this.value2,"gc_names3":this.value3});
					formData.append("store_class_ids",this.store_class_ids);
					formData.append("store_class_names",this.store_class_names);
					this.$axios.post("/v3/store_joinin_step1",formData,{headers:{"Content-Type":"application/x-www-form-urlencoded"}})
					.then((data)=>{
						console.log(data);
						this.$toast("信息上传成功");
						localStorage.clear();
						this.history = 0;
						this.$router.push("/checks/"+this.member_id);
					})
					.catch((err)=>{
						this.$toast("信息上传失败，请检查网络是否连接");
						console.log(err);
					})
				}
			}
		},
		mounted(){
			// first step
			this.member_id = this.$route.params.member_id;;
			this.company_name = localStorage.getItem("company_name");
			this.contacts_name = localStorage.getItem("contacts_name");
			this.contacts_phone = localStorage.getItem("contacts_phone");
			this.company_address = localStorage.getItem("company_address");
			this.company_address_detail = localStorage.getItem("company_address_detail");
			this.face_img = localStorage.getItem("face_img");
			this.store_img = localStorage.getItem("store_img");
			this.logo_img = localStorage.getItem("logo_img");
			this.business_sphere = localStorage.getItem("business_sphere");
			// second step
			this.business_licence_number = localStorage.getItem("business_licence_number");
			this.ID_card = localStorage.getItem("ID_card");
			this.business_licence_number_electronic = localStorage.getItem("business_licence_number_electronic");
			// last step value in this.value3
			var height = window.innerHeight;
			var devicePixelRatio = window.devicePixelRatio;
			var isAndroid = window.navigator.appVersion.match(/android/gi);
			var isIPhone = window.navigator.appVersion.match(/iphone/gi);
			    if (isIPhone) {
			        if (devicePixelRatio >= 3) {
						// isIPhone  dpr = 3
			            this.$refs.homePage.style.height = height + "px";
			            this.$refs.page.style.height = height - 88 + "px";
			            this.$refs.container1.style.height = height - 88 + "px";
			            this.$refs.container2.style.height = height - 88 + "px";
			            this.$refs.container3.style.height = height - 88 + "px";
			        } else if (devicePixelRatio >= 2){
						// isIPhone dpr = 2
			            this.$refs.homePage.style.height = height + "px";
						this.$refs.page.style.height = height - 88 + "px";
			            this.$refs.container1.style.height = height + "px";
			            this.$refs.container2.style.height = height + "px";
			            this.$refs.container3.style.height = height + "px";
			        } else {
						// isIPhone dpr = 1
			            this.$refs.homePage.style.height = height + "px";
						this.$refs.page.style.height = height - 88 + "px";
			            this.$refs.container1.style.height = height - 88 + "px";
			            this.$refs.container2.style.height = height - 88 + "px";
			            this.$refs.container3.style.height = height - 88 + "px";
			        }
			    } else {
			        //  isAndroid dpr = 1
					this.$refs.homePage.style.height = height + "px";
					this.$refs.page.style.height = height - 88 + "px";
					this.$refs.container1.style.height = height + "px";
					this.$refs.container2.style.height = height + "px";
					this.$refs.container3.style.height = height + "px";
			    }
		},
		created(){
			var formData = new FormData();
			formData.append("store_id",1);
			// console.log(formData);
			this.$axios.post("/v3/gc_list",formData,{headers: {"Content-Type":"application/json"}}).then((data)=>{
				console.log(this.list);
				console.log(data);
				// /v3/area_list
				this.list = data.data.data;
			})
			.catch((err)=>{
				console.log(err);
			})
		}
	}
</script>

<style scoped lang="stylus">
	div.classify
		width: totalWid
		overflow:hidden
		background:cwhite
		div.classify_level
			width: totalWid
			position:relative
			.van-row
				height: 100%
				.van-col
					height: 100%
					font-size:17PX
					ul.classify_level1_ul
						width: 200px
						display:inline-block
						background:cf5
						li
							width: 200px
							height: 96px
							span
								width: 167px
								display:inline-block
								margin:30px 0
								padding-left: 30px
								text-align:left
					ul.classify_level2_ul
						width: 229px
						display:inline-block
						border-right:2px solid #e5e5e5
						li
							width: 199px
							height: 36px
							display:inline-block
							padding-left: 30px
							text-align:left
							margin:30px 0
					ul.classify_level3_ul
						width: 289px
						display:inline-block
						li
							width: 259px
							height: 36px
							display:inline-block
							padding-left: 30px
							text-align:left
							margin:30px 0
						/li.active_level1
							background:cwhite
							span
								width: 170px
								display:inline-block
								margin:30px 0
								padding-left: 30px
								border-left:classifyBorder
								text-align:left
								color:cblue
						/li.active_level2
							color:cblue
						/li.active_level3
							color:cblue
		/div.next_btn
			position:absolute
			bottom:0
			width:totalWid
			z-index:102
	[data-dpr="1"] div.classify
		div.classify_level
			.van-row
				.van-col
					font-size:font16
					ul.classify_level1_ul
						li
							font-size:font16
					ul.classify_level2_ul
						li
							font-size:font16
					ul.classify_level3_ul
						li
							font-size:font16
	[data-dpr="2"] div.classify
		div.classify_level
			.van-row
				.van-col
					font-size:font34
					ul.classify_level1_ul
						li
							font-size:font34
					ul.classify_level2_ul
						li
							font-size:font34
					ul.classify_level3_ul
						li
							font-size:font34
	[data-dpr="3"] div.classify
	div.classify_level
		.van-row
			.van-col
				font-size:font50
				ul.classify_level1_ul
					li
						font-size:font50
				ul.classify_level2_ul
					li
						font-size:font50
				ul.classify_level3_ul
					li
						font-size:font50
</style>