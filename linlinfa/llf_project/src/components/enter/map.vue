<template>
	<div>
		<Header :title="msg"></Header>
			<div class="data_list" ref="homePage">
				<van-row>
					<van-col :span="6" :offset="1">
						<div class="container_icon" v-show="ProvinceBtnShow" @click="toggleProvince">
							<div>
								<van-icon name="success" v-show="CityBtnShow"></van-icon>
								<p>{{ProvinceValue}}</p>
							</div>
						</div>
					</van-col>
					<van-col :span="6" :offset="1">
						<div class="container_icon" v-show="CityBtnShow" @click="toggleCity">
							<div>
								<van-icon name="success"  v-show="AreaBtnShow"></van-icon>
								<p>{{CityValue}}</p>
							</div>
						</div>
					</van-col>
					<van-col :span="6" :offset="1">
						<div class="container_icon" v-show="AreaBtnShow" @click="toggleArea">
							<div>
								<van-icon name="success" v-show="chooseStatus"></van-icon>
								<p>{{AreaValue}}</p>
							</div>
						</div>
					</van-col>
				</van-row>
				<vue-better-scroll v-show="ProvinceShow"  ref="scroll1" :startY="parseInt(startY1)">
				<ul>
					<li @click="ProvinceClick($event,index)"  v-for="(item1,index) in items" :key="item1.id">{{item1.province}}</li>
					<li></li>
				</ul>
				</vue-better-scroll>
				<vue-better-scroll  v-show="CityShow" ref="scroll2" :startY="parseInt(startY2)">
				<ul>
					<li @click="CitiesClick($event,index)" v-for="(item2,index) in items[provinceIndex].children" :key="item2.id">{{item2.city}}</li>
					<li></li>
				</ul>
				</vue-better-scroll>
                <div  v-show="AreaShow" ref="scroll3" >
                    <ul>
                    	<li @click="AreaClick($event,index)" :key="item3.id" v-for="(item3,index) in items[provinceIndex].children[cityIndex].children">{{item3.area}}</li>
                    	<li></li>
                    </ul>
                </div>
			</div>
	</div>
</template>

<script>
	import Header from "../../components/header"
	import bus from '../../assets/js/eventBus.js'
	export default{
		data(){
			return {
				msg:"选择城市",
				ProvinceValue:"请选择省…",
				CityValue:"请选择市…",
				AreaValue:"请选择区…",
				locationValue:"",
				clientHeight:"",
				ProvinceShow:true,
				CityShow:false,
				AreaShow:false,
				ProvinceBtnShow:true,
				CityBtnShow:false,
				AreaBtnShow:false,
				provinceIndex:0,
				cityIndex:0,
				areaIndex:0,
				chooseStatus:false,
				startY1: 0, // 纵轴方向初始化位置
				scrollToX1: 0,
				scrollToY1: 0,
				scrollToTime1: 700,
                startY2: 0, // 纵轴方向初始化位置
                scrollToX2: 0,
                scrollToY2: 0,
                scrollToTime2: 700,
                startY3: 0, // 纵轴方向初始化位置
                scrollToX3: 0,
                scrollToY3: 0,
                scrollToTime3: 700,
				member_id:"",
				items:[]
			}
		},
		components:{
			Header,
		},
		methods:{
				toggleProvince(){
					this.ProvinceShow = true;
					this.CityShow = false;
					this.AreaShow = false;
				},
				toggleCity(){
					this.ProvinceShow = false;
					this.CityShow = true;
					this.AreaShow = false;
				},
				toggleArea(){
					this.ProvinceShow = false;
					this.CityShow = false;
					this.AreaShow = true;
				},
				ProvinceClick(e,index){
					this.ProvinceValue = e.currentTarget.innerText;
					if(this.ProvinceValue){
						this.ProvinceShow = false;
						this.ProvinceBtnShow = true;
						this.CityBtnShow = true;
						this.CityShow = true;
						this.provinceIndex = index;
						// console.log(this.provinceIndex);
						this.chooseStatus = false;
					}
				},
				CitiesClick(e,index){
					this.CityValue = e.currentTarget.innerText;
					if(this.CityValue){
						this.AreaShow = true;
						this.AreaBtnShow = true;
						this.CityShow = false;
						this.cityIndex = index;
						// console.log(this.cityIndex);
					}
					
				},
				AreaClick(e,index){
					this.AreaValue = e.currentTarget.innerText;
					if(this.AreaValue){
						this.CityShow = false;
						this.areaIndex = index;
						this.chooseStatus = true;
						// console.log(this.cityIndex);
						this.locationValue = this.ProvinceValue+this.CityValue+this.AreaValue;
					}
					if(this.locationValue==""){
						this.$toast("信息有误，请点击重新选择");
					}else{
						bus.$emit("getChooseCityValue",this.locationValue);
						this.$router.push("/store/"+this.member_id);
						console.log(this.locationValue);
						console.log(this.member_id);
						localStorage.setItem("company_address",this.locationValue);
					}
				},
				scrollTo1() {
							this.$refs.scroll1.scrollTo1(this.scrollToX1, this.scrollToY1, this.scrollToTime1);
				},
                scrollTo2() {
                			this.$refs.scroll2.scrollTo2(this.scrollToX2, this.scrollToY2, this.scrollToTime2);
                },
                scrollTo3() {
                			this.$refs.scroll3.scrollTo3(this.scrollToX3, this.scrollToY3, this.scrollToTime3);
                }
		},
		mounted(){
			console.log("a");
			console.log(this.$refs.homePage);
			var height = window.innerHeight;
			var devicePixelRatio = window.devicePixelRatio;
			var isAndroid = window.navigator.appVersion.match(/android/gi);
			var isIPhone = window.navigator.appVersion.match(/iphone/gi);
			    if (isIPhone) {
			        if (devicePixelRatio >= 3) {
						// isIPhone  dpr = 3
			            this.$refs.homePage.style.height = height - 50 + "px";
			        } else if (devicePixelRatio >= 2){
						// isIPhone dpr = 2
			            this.$refs.homePage.style.height = height -40 + "px";
			        } else {
						// isIPhone dpr = 1
			            this.$refs.homePage.style.height = height - 45 + "px";
			        }
			    } else {
			        //  isAndroid dpr = 1
					this.$refs.homePage.style.height = height - 45 + "px";
			    }

		},
		created(){
			this.member_id = this.$route.params.member_id;
			// form data request
			var formData = new FormData();
			formData.append("store_id",this.member_id);
			console.log(formData);
			let config = {
				headers: {"Content-Type":"application/json"}
			}
			this.$axios.post("/v3/area_list",formData,config).then((data)=>{
			console.log(this.items);
			console.log(data);
			this.items = data.data.data;
			})
			
		}
	}
</script>

<style scoped lang="stylus">
	div.data_list
		width: totalWid
		background:cwhite
		overflow:hidden
		ul
			background:cwhite
			li
				width: totalWid
				height: 88px
				margin-left: 30px
				line-height: 88px
				border-bottom:1PX solid cgraye5
				color:cblack
				font-size:17PX
				box-sizing:border-box
				font-weight:normal
			li:first-child
				border-top:1PX solid cgraye5 
			li:last-child
				border:none
		.van-row
			background:cwhite
			height: 88px
			.van-col
				height: 88px
				div.container_icon
					width: auto
					height: 88px
				div.container_icon>div
					width: auto
					height: 60px
					margin:14px 0
					border:1PX solid cblue
					box-sizing:border-box
					color:cblue
					font-size:14PX
					display:flex
					flex-flow:row nowrap
					align-items:center
					justify-content:flex-start
					i
						display:inline-block
						width: 20px
						height: 55px
						line-height: 60px
						margin-left: 22px
						text-align:left
					p
						display:inline-block
						width: 122px
						height: 60px
						line-height: 60px
						ellipsis()
						margin-left: 22px
	[data-dpr="2"] div.data_list
		ul
			li
				font-size:font34
		.van-row
			.van-col
				div
					font-size:font28
		/div.next_btn
			& .van-button--large
				font-size:font34
	[data-dpr="3"] div.data_list
		ul
			li
				font-size:font51
		.van-row
			.van-col
				div
					font-size:font42
</style>