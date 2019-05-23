<template>
	<div class="chooselocation" ref="homePage">
		<Header :title="msg"></Header>
		<van-cell-group class="input_lo input_center">
				 <van-field left-icon="search" v-model="keyword" placeholder="请输入您的店铺地址"/>
		</van-cell-group>
		<div class="map_container" ref="map">	
			<baidu-map :ak="ak" :center="center" :zoom="zoom"  @ready="handler"  ref="bdmap" :pinch-to-zoom="true" :dragging="true" @zoomend="syncCenterAndZoom($event)" @touchend="syncCenterAndZoom($event)" @dragend="syncCenterAndZoom($event)">
				<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true">
				</bm-geolocation>
				<bm-marker :position="{lng:center.lng, lat:center.lat}" :icon="{url:icon,size:{width:48,height:48}}">
				</bm-marker>
				<bm-local-search :keyword="keyword"  :auto-viewport="true" :location="location" :nearby="nearby" :panel="false"  style="display: none">
				</bm-local-search>
                <bm-circle :center="nearby.center" :radius="nearby.radius"></bm-circle>
			</baidu-map>
		</div>
		<div class="van-picker">
			<vue-better-scroll class="wrapper" ref="scroll" :startY="parseInt(startY)">
			<van-row class="column" v-for="(column,index) in columns" :key="index">
				<van-col :span="22">
					<div @touchend="chooseClick(index)">
						<p>{{column.name}}</p>
						<p>{{column.addr}}</p>
					</div>
				</van-col>
				<van-col :span="2">
					<van-icon name="success" :class="{active:index== current}"></van-icon>
				</van-col>
			</van-row>
			<van-row class="column">
				<van-col> </van-col>
			</van-row>
			</vue-better-scroll>
		</div>
		<van-button size="large" square type="info" @click="next">确认地址</van-button>
	</div>
</template>

<script>
	import Header from "../header"
	import bus from '../../assets/js/eventBus.js'
	import BaiduMap from "vue-baidu-map/components/map/Map.vue"
	import BmMarker from 'vue-baidu-map/components/overlays/Marker'
	import BmCircle from 'vue-baidu-map/components/overlays/Circle'
	import BmGeolocation from 'vue-baidu-map/components/controls/Geolocation.vue'
	import BmLocalSearch from "vue-baidu-map/components/search/LocalSearch.vue"
	import AutoComplete from "vue-baidu-map/components/others/AutoComplete.vue"
	
	export default{
		data(){
			return {
				msg:"选择位置",
				ak:"efhNFs0eQd5NA9cLUnNeIt4XwK6xvBVW",
				center: "",//当前经纬度
                 nearby: {
                    center: {
                      lng: 116.404, 
                      lat: 39.915
                    },
                    radius: 1000
                  },
                searchPois:null,
				zoom: 16,//地图显示大小
				location: "",//location
                content:"",
				keyword: "",//搜索关键词
				address:"",//地图中的选中地址
				current:0,//选中的index
				confirmedAddress:"",
				show: false,
				startY: 0, // 纵轴方向初始化位置
				scrollToX: 0,
				scrollToY: 0,
				scrollToTime: 700,
				locationList:[],//用来过度赋值的数据
				geolocation:null,
				columns:[],
				icon:"http://prh73mph5.bkt.clouddn.com/icon_lc_xhao@2x.png",
				member_id:"",
			}
		},
		components:{
			Header,
			BaiduMap,
			BmGeolocation,
			BmMarker,
			BmLocalSearch,
			AutoComplete,
            BmCircle
		},
		methods:{
			syncCenterAndZoom (e) {
				this.center = e.target.getCenter();
				this.zoom = e.target.getZoom();
                console.log(e.target.getCenter());
				this.$jsonp("http://api.map.baidu.com/geocoder/v2/?ak=efhNFs0eQd5NA9cLUnNeIt4XwK6xvBVW&location="+ e.target.getCenter().lat +","+e.target.getCenter().lng +"&output=json&pois=1")
				.then((data)=>{
					this.locationList = data.result.pois;
					this.columns = this.locationList;
				})
			},
			handler ({BMap, map}) {
				if( localStorage.getItem("company_address") == null|| localStorage.getItem("company_address")== ""){
					let  _this = this;  
					_this.geolocation = new BMap.Geolocation();
					_this.geolocation.getCurrentPosition(function(r){
						// if request success ,load value
						if(this.getStatus() == BMAP_STATUS_SUCCESS){
							_this.center = r.point;
							_this.nearby.center = r.point;
                            console.log(_this.nearby);
						 // request baidu-map value around longtitude and latitude22.55371,113.88311
							_this.$jsonp("http://api.map.baidu.com/geocoder/v2/?ak=efhNFs0eQd5NA9cLUnNeIt4XwK6xvBVW&location="+ r.point.lat +","+r.point.lng +"&output=json&pois=1")
							.then((data)=>{
								_this.locationList = data;
								// set position value in column and load value into DOM
								_this.columns = _this.locationList.result.pois;
                                _this.position = _this.columns[0].name;
							})
						}else {
							this.$toast("加载失败，请重新进入页面");
							}        
						},{enableHighAccuracy: true});   
				}else{
                    this.center = localStorage.getItem("company_address");
                }
			},
			chooseClick(index){
				this.current = index;
				this.confirmedAddress = this.columns[this.current].addr;
			},
			scrollTo() {
				this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime)
			},
			next(){
				if(this.confirmedAddress==""||this.confirmedAddress==undefined){
					this.confirmedAddress = this.columns[0].addr;
					this.$router.push("/store/"+this.member_id);
					localStorage.setItem("company_address_detail",this.confirmedAddress);
				}else{
					bus.$emit("getChooseLocationValue",this.confirmedAddress);
					this.$router.push("/store/"+this.member_id);
					localStorage.setItem("company_address_detail",this.confirmedAddress);
				}
				
			}
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
			            this.$refs.homePage.style.height =height + "px";
			            this.$refs.map.style.height =height*0.6 + 15 + "px";
			        } else if (devicePixelRatio >= 2){
						// isIPhone dpr = 2
			            this.$refs.homePage.style.height = height + "px";
						this.$refs.map.style.height =height*0.5 + 15 + "px";
			        } else {
						// isIPhone dpr = 1
			            this.$refs.homePage.style.height = height + "px";
						this.$refs.map.style.height =height*0.5+ "px";
			        }
			    } else {
			        //  isAndroid dpr = 1
					this.$refs.homePage.style.height = height + "px";
					this.$refs.map.style.height =height*0.5+ "px";
			    }
		}
	}
</script>

<style scoped lang="stylus">
	div.chooselocation
		width:totalWid
		overflow:hidden
		.input_lo
			position:absolute
			z-index:100
			top: 122px
			left: 30px
			width: totalWid - 60px
			height: 80px
			line-height: 80px
			color:cgray3
		.map_container
			width: totalWid
		.map_container>div
			height: 100%
		.van-picker
			position:absolute
			z-index:100
			bottom: 0
			left: 0;
			width: totalWid + 16px
			height: 598px
			background:cwhite
			overflow:hidden
			.van-row
				border-bottom:normalBordere5
				margin-left: 15px
				box-sizing:border-box
				height: 130px
				.van-col
					height: 130px
					div
						p
							height:65px
							text-align:left
						p:first-child
							font-size:17PX
							color:cblack
						p:last-child
							font-size:15PX
							color:cgray9
							ellipsis()
							width:totalWid - 80px
							height: 40px
				.van-icon
					line-height: 130px
					display:none
					font-size:17PX
					color:cblue
				.van-icon.active
					display:block
			.van-row:last-child
				border:none
		.van-button
			position:absolute
			z-index:102
			bottom: 0
			left: 0
			height: 88px;
	[data-dpr="2"] div.chooselocation
		.van-row
			.van-col
				div
					p:first-child
						font-size:font34
						color:cblack
					p:last-child
						font-size:font30
						color:cgray9
			.van-icon
				font-size:font34
	[data-dpr="3"] div.chooselocation
		.van-row
			.van-col
				div
					p:first-child
						font-size:font51
						color:cblack
					p:last-child
						font-size:font45
						color:cgray9
			.van-icon
				font-size:font51
</style>