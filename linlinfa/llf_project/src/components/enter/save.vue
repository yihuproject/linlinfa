<template>
	<div class="chooselocation">
		<Header :title="msgs"></Header>
		<van-cell-group class="input_lo input_center">
				 <van-field left-icon="search" v-model="keyword" placeholder="请输入您的店铺地址" @input="syncCenterAndZoom($event)"/>
		</van-cell-group>
		<div class="map_container" ref="container"></div><!-- 地图容器 -->
		<div class="van-picker">
			<vue-better-scroll class="wrapper" ref="scroll" :startY="parseInt(startY)">
			<van-row class="column" v-for="(column,index) in columns" :key="index">
				<van-col :span="22">
					<div @touchend="chooseClick(index)">
						<p>{{column.name}}</p>
						<p>{{column.address}}</p>
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
  import {loadMP} from "../../assets/js/AMapUI.js"
	export default{
		data(){
			return {
				msgs:"选择位置",
				ak:"08f75ded02d665398f83a1542ce4643f",
				center: [121.59996, 31.197646],//当前经纬度
        marker:[121.59996, 31.197646],
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
				columns:[],
				member_id:"",
			}
		},
		components:{
			Header
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
        this.map && this.map.destroy();
			},
      markerPoi(){
        var marker = new AMap.Marker({
          position:this.marker
        })
        this.map.add(marker);
      },
      operation(){
        this.center = this.map.getCenter();
        this.marker = this.map.getCenter();
        this.zoom = this.map.getZoom();
        this.map.clearMap();
        this.markerPoi();
        var that = this;
        AMap.plugin(['AMap.Geocoder'],function(){
          var geocoder = new AMap.Geocoder();
          console.log(geocoder);
          geocoder.getAddress(that.center,function(status,result){
            that.serachInfo(result.regeocode.formattedAddress);
            that.center = that.map.getCenter();
          })

        })
      },
      serachInfo(str){
        var that = this;
        AMap.plugin(['AMap.PlaceSearch'],function(){
          var placeSearch = new AMap.PlaceSearch();
          placeSearch.search(str,function(status,data){
            console.log(data);
            var poi = [data.poiList.pois[0].location.lng,data.poiList.pois[0].location.lat];
            that.center = poi;
            that.marker = poi;
            that.columns = data.poiList.pois;
            console.log(that.center);
            that.map.setCenter(that.center);
            that.map.setZoom(that.zoom);
            that.map.clearMap();
            that.markerPoi();
          })
        })
      },
      geolo(){
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 5000,          //超过10秒后停止定位，默认：5s
          buttonPosition:'RB',    //定位按钮的停靠位置
          buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true,   //定位成功后 是否自动调整地图视野到定位点
          useNative:true,
          extensions:"all"
        })
        this.map.addControl(geolocation);
      }
		},
    created(){
          loadMP().then((AMap)=>{
            initAMapUI();
          })

    }
		// mounted(){
		// 	this.member_id = this.$route.params.member_id;//member_id
  //     let that = this;//vue的this指针
  //     loadMP().then((result)=>{
  //       console.log(result);
  //       window.AMap = result[0];
  //       window.AMapUI = result[1];
  //       console.log("地图加载成功");
  //       // console.log(initAMapUI);
  //       console.log(AMapUI);
  //       // ()
  //       // that.amapui = new AMapUI();
  //       
  //       AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
  //         var positionPicker = new PositionPicker({
  //           mode: 'dragMap',
  //           map: that.map
  //         });
  //         
  //         
  //         AMap.event.addDomListener("dragMap", 'change', function(e){
  //           alert("a");
  //           console.log(e);
  //            positionPicker.start();
  //           // positionPicker.setMode(e.target.value);
  //         })
  //         
  //       })
  //       
  //       
  //       
  //       
  //       that.map = new AMap.Map(that.$refs.container,{
  //         resizeEnable: true, //是否监控地图容器尺寸变化
  //         center:that.center,
  //         zoom:that.zoom
  //       })
  //       that.map.clearMap();
  //       that.markerPoi();
  //       console.log(that.map);
  //       //
  //         var address = "";
  //         // var address = localStorage.getItem("company_address");
  //         if(address){//如果存在数据，则使用数据定位周边和编码
  //           that.map.on("complete",function(){
  //           that.serachInfo(address);
  //           })
  //           that.map.plugin(['AMap.Geolocation'],function(){
  //             that.geolo();
  //           })
  //         }else{//否则进入页面自动定位
  //           that.map.on("complete",function(){
  //             that.map.plugin(['AMap.Geolocation'],function(){
  //               that.geolo();
  //               geolocation.getCurrentPosition(function(status,result){//初始精确自动定位
  //                 console.log(status,result);
  //                 var poi = [result.position.lng,result.position.lat];
  //                 that.center = poi;
  //                 that.marker = poi;
  //                 that.columns = result.pois;
  //                 that.map.clearMap();
  //                 that.markerPoi();
  //                 that.map.setCenter(that.center);
  //                 that.map.setZoom(that.zoom);
  //               })
  //             })
  //           })
  //         }
  //       // AMap.event.addDomListener(dragMarkerMode, 'change', onModeChange);
  //         // positionPicker.setMode(e.target.value)
  //         // positionPicker.start(map.getBounds().getSouthWest())
  //       //事件注册和注销   on off
  //       //拖拽事件   dragstart dragging dragend
  //       //that.map.on("complete",that.loadMapInfo)//when the map completed
  //       // that.map.on("moveend",that.operation);//when the map moved(movestart,mapmove,moveend)
  //       // that.map.on("zoomend",that.operation);//when the map zoomend   (zoomstart,zoomcange,zoomend)
  //       // that.map.setCenter([lng.lat]);//set the map center's lng and lat
  //       // that.map.setZoomAndCenter(zoom,[lng,lat]);//set the map's zoom level and center
  //     },e=>{
  //       that.$toast("地图加载失败");
  //     })
		// }//mounted
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