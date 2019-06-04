<template>
	<div>
		<Header :title="msg"></Header>
			<div class="data_list">
				<van-row>
					<van-col :span="6" :offset="1">
						<div class="container_icon">
							<div>
								<van-icon name="success"></van-icon>
								<p>{{ProvinceValue}}</p>
							</div>
						</div>
					</van-col>
					<van-col  v-if="ProvinceValue!='请选择省…'" :span="6" :offset="1">
						<div class="container_icon">
							<div>
								<van-icon name="success" ></van-icon>
								<p>{{CityValue}}</p>
							</div>
						</div>
					</van-col>
					<van-col  v-if="CityValue!='请选择市…'" :span="6" :offset="1">
						<div class="container_icon">
							<div>
								<van-icon name="success" ></van-icon>
								<p>{{AreaValue}}</p>
							</div>
						</div>
					</van-col>
				</van-row>
				<vue-better-scroll  v-if="ProvinceValue=='请选择省…'"  ref="scroll1" :startY="parseInt(startY1)">
				<ul>
					<li @click="ProvinceClick($event,index)"  v-for="(item1,index) in items" :key="item1.id">{{item1.province}}</li>
					<li></li>
				</ul>
				</vue-better-scroll>
				<vue-better-scroll    v-if="CityValue=='请选择市…'" ref="scroll2" :startY="parseInt(startY2)">
				<ul>
					<li @click="CitiesClick($event,index)" v-if="ProvinceValue" v-for="(item2,index) in items[provinceIndex].children" :key="item2.id">{{item2.city}}</li>
					<li></li>
				</ul>
				</vue-better-scroll>
				<vue-better-scroll  v-if="CityValue!='请选择市…'" ref="scroll3" :startY="parseInt(startY3)">
				<ul>
					<li @click="AreaClick($event,index)" v-if="CityValue" :key="item3.id" v-for="(item3,index) in items[provinceIndex].children[cityIndex].children">{{item3.area}}</li>
					<li></li>
				</ul>
				</vue-better-scroll>
			</div>
	</div>
</template>

<script>
	import Header from "../../components/header"
	import bus from '../../assets/js/eventBus.js'
  import vueBetterScroll from 'vue2-better-scroll'
	export default{
		data(){
			return {
				msg:"选择城市",
				ProvinceValue:"请选择省…",
				CityValue:"请选择市…",
				AreaValue:"请选择区…",
				locationValue:"",
				clientHeight:"",
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
				items:[
					{
						"id":1,
						"province":"四川省1",
						"children":[
							{
								
								"id":2,
								"city":"成都市2",
							"children":[
								{
									"id":21,
									area:"金堂县3"
								}
							],
							},
							{
								"id":3,	
								"city":"乐山市5",
							"children":[
								{
									"id":211,
									area:"金堂县4"
								}
							],
							},
							{
								"id":4,	
								"city":"宜宾市",
							"children":[
								{
									"id":241,
									area:"金堂县"
								}
							],
							}
						]
					}
				]
			}
		},
		components:{
			Header,
      vueBetterScroll
		},
		methods:{
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
		height: 94vh
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
