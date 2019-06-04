<template>
	<div class="chooselocation">
		<Header :title="msgs"></Header>
<!-- 		<van-cell-group class="input_lo input_center">
				 <van-field left-icon="search" v-model="keyword" placeholder="请输入您的店铺地址" @input="syncCenterAndZoom($event)"/>
		</van-cell-group> -->
		<div class="map_container">	
    <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
     <el-amap ref="map" class="map" vid="amapDemo"  :amap-manager="amapManager" :center="center" :zoom="zoom"  :events="events">
       <el-amap-marker  :position="marker" v-for="marker in markers"></el-amap-marker>
      </el-amap>
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
  import VueAMap from 'vue-amap'
	import Header from "../header"
	import bus from '../../assets/js/eventBus.js'
	export default{
		data(){
			return {
        amapManager:"",
				msgs:"选择位置",
				ak:"2KrGibP5ES5RSW38Rq3O0w01u5vUncXQ",
				center: [121.59996, 31.197646],//当前经纬度
        markers: [
                  [121.59996, 31.197646],
                  [121.40018, 31.197622],
                  [121.69991, 31.207649]
                ],
				zoom: 12,//地图显示大小
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
				columns:[],
				icon:"http://prh73mph5.bkt.clouddn.com/icon_lc_xhao@2x.png",
				member_id:"",
        events:{
          init:(o)=>{
            console.log(o);
            this.amapManager = new VueAMap.AMapManager();
            console.log(o.getCenter());
            // console.log(typeof(o.getCurrentPosition));
            console.log(this.$refs.map.$$getInstance());
            new AMap.Marker({
            position: [123.59996, 22.177646]
          }).setMap(this.amapManager.getMap());
          o.getCity(result=>{
            console.log(result);
          })
            // o.getCurrentPosition((status, result) => {
              // console.log(status,result);
                  // if (result && result.position) {
                  //   self.lng = result.position.lng;
                  //   self.lat = result.position.lat;
                  //   self.center = [self.lng, self.lat];
                  //   self.loaded = true;
                  //   self.$nextTick();
                  // }
            // }
          },
          'moveend':()=>{
            alert("moveend");
          },
          'zoomchange':()=>{
            alert("zoomchange");
          },
          'click':()=>{
            // alert("clicked");
          }
          
        },
        searchOption: {
            city: '上海',
            citylimit: true
          },
			}
		},
		components:{
			Header,
      VueAMap
		},
		methods:{
			chooseClick(index){
				this.current = index;
				this.confirmedAddress = this.columns[this.current].addr;
			},
			scrollTo() {
				this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime)
			},
			next(){
        console.log(this.center);
				if(this.confirmedAddress==""||this.confirmedAddress==undefined){//默认选择第一个
					this.confirmedAddress = this.columns[0].addr;
					this.$router.push("/store/"+this.member_id);
					localStorage.setItem("company_address_detail",this.confirmedAddress);
				}else{
					bus.$emit("getChooseLocationValue",this.confirmedAddress);
					this.$router.push("/store/"+this.member_id);
					localStorage.setItem("company_address_detail",this.confirmedAddress);
					localStorage.setItem("longitude",this.center.lng);
					localStorage.setItem("latitude",this.center.lat);
				}
			},
      onSearchResult(pois) {
        console.log(pois);
          // let latSum = 0;
          // let lngSum = 0;
          // if (pois.length > 0) {
          //   pois.forEach(poi => {
          //     let {lng, lat} = poi;
          //     lngSum += lng;
          //     latSum += lat;
          //     this.markers.push([poi.lng, poi.lat]);
          //   });
          //   let center = {
          //     lng: lngSum / pois.length,
          //     lat: latSum / pois.length
          //   };
          //   this.mapCenter = [center.lng, center.lat];
          // }
        }
		},
		mounted(){
			this.member_id = this.$route.params.member_id;
      VueAMap.initAMapApiLoader({
        key: 'f41fddd3346f7ec6d561ad285f5aa624',
        plugin: [
          'AMap.Autocomplete',
           'AMap.PlaceSearch', 
           'AMap.Scale', 
           'AMap.OverView',
            'AMap.ToolBar', 
            'AMap.MapType',
             'AMap.PolyEditor',
              'AMap.CircleEditor',
              ],
        v: '1.4.4',
        uiVersion: '1.0.11' // 版本号
      });
		}
	}
</script>

<style scoped lang="stylus">
	div.chooselocation
		width:totalWid
		overflow:hidden
		height: 94.5vh
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
			height: 50vh
			.map
				height: 100%
		.van-picker
			position:absolute
			z-index:100
			bottom: 0
			left: 0;
			width: totalWid + 16px
			height: 44.5vh
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