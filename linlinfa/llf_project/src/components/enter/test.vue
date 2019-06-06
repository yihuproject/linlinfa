<template>
	<div class="chooselocation">
		<Header :title="msgs"></Header>
		<van-cell-group class="input_lo input_center">
				 <van-field left-icon="search" v-model="keyword" placeholder="请输入您的店铺地址"/>
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
  import AMapJS from "amap-js"
	export default{
		data(){
			return {
				msgs:"选择位置",
				ak:"08f75ded02d665398f83a1542ce4643f",
				center: [121.59996, 31.197646],//当前经纬度
        marker:[121.59996, 31.197646],
        keyword:"",
				zoom: 16,//地图显示大小
				address:"",//地图中的选中地址
				current:0,//选中的index
				confirmedAddress:"",
				startY: 0, // 纵轴方向初始化位置
				scrollToX: 0,
				scrollToY: 0,
				scrollToTime: 700,
				columns:[],
				member_id:"",
        aMapJSAPILoader: null,
        aMapUILoader: null,
        geolocation:null,
        address:""
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
        // this.map && this.map.destroy();
			},
      markerPoi(){
        var marker = new AMap.Marker({
          position:this.marker
        })
        this.map.add(marker);
      },
      serachInfo(str){
        var that = this;
        AMap.plugin(['AMap.PlaceSearch'],function(){
          var placeSearch = new AMap.PlaceSearch();
          placeSearch.search(str,function(status,data){
            // console.log(data.poiList);
            if(data.poiList.count!=0){
              console.log("存在");
              var poi = [data.poiList.pois[0].location.lng,data.poiList.pois[0].location.lat];
              that.center = poi;
              that.marker = poi;
              that.columns = data.poiList.pois;
              that.map.setCenter(that.center);
              that.map.setZoom(that.zoom);
            }else{
              return
            }
            // that.map.clearMap();
            // that.markerPoi();
          })
        })
      },
      geolo(){
        this.geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 5000,          //超过10秒后停止定位，默认：5s
          buttonPosition:'RB',    //定位按钮的停靠位置
          buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true,   //定位成功后 是否自动调整地图视野到定位点
          useNative:true,
          extensions:"all"
        })
        this.map.addControl(this.geolocation);
      }
		},
    watch: {
      keyword(newValue, oldValue) {
        var that = this;
        console.log(newValue);
        if(newValue<oldValue){
          return
        }else{
          if(this.address){
            var a = this.address.indexOf("市");
            var b = this.address.indexOf("省");
            var getCity = this.address.slice(b+1,a);
            AMap.plugin(['AMap.CitySearch'],function(){
              var citysearch = new AMap.CitySearch();
               citysearch.getLocalCity(function(status, result) {
                AMap.plugin(['AMap.Autocomplete'],function(){
                  var autoComplete = new AMap.Autocomplete({city:getCity});
                  autoComplete.search(newValue,function(status,result){
                    if(result.tips[0].id==""){
                      return
                    }else{
                      that.columns = result.tips;
                      var poi = [result.tips[0].location.lng,result.tips[0].location.lat];
                      that.center = poi;
                      that.marker = poi;
                      that.columns = result;
                      that.map.setCenter(that.center);
                      that.map.setZoom(that.zoom);
                    }
                  })
                })
               })
            })
          }else{
            AMap.plugin(['AMap.CitySearch'],function(){
              var citysearch = new AMap.CitySearch();
               citysearch.getLocalCity(function(status, result) {
                AMap.plugin(['AMap.Autocomplete'],function(){
                  var autoComplete = new AMap.Autocomplete({city:result.city});
                  autoComplete.search(newValue,function(status,result){
                    console.log(result);
                    that.columns = result.tips;
                    that.map.setCenter(result.tips[0].location);
                  })
                })
               })
            })

          }
        }
      }
    },
    mounted(){
      var that = this;
      this.aMapJSAPILoader = new AMapJS.AMapJSAPILoader({
        v: "1.4.12",
        key: "08f75ded02d665398f83a1542ce4643f"
      });//引入AMap
      this.aMapUILoader = new AMapJS.AMapUILoader({
        v: "1.0" // UI组件库版本号
      });//引入AMapUI
      console.log("a");
      if(!this.aMapJSAPILoader){
        location.reload(true);
        console.log(this.aMapJSAPILoader);
      }
      console.log(this.aMapJSAPILoader);
      console.log("b");
      that.aMapJSAPILoader.load().then(AMap=>{
        console.log(AMap);
        that.aMapUILoader.load().then(initAMapUI=>{
          console.log(initAMapUI);
          that.AMap = AMap;
          that.AMapUI = initAMapUI();
          console.log(that.aMapJSAPILoader);
          that.AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
            console.log(that.aMapJSAPILoader);
            that.map = new AMap.Map(that.$refs.container,{
              resizeEnable: true, //是否监控地图容器尺寸变化
              center:that.center,
              zoom:that.zoom
            })//实例化地图
            
            
            var positionPicker = new PositionPicker({
              mode: 'dragMap',
              map: that.map
            });
            positionPicker.on('success', function(positionResult) {
              that.columns = positionResult.regeocode.pois;
              // console.log(positionResult.regeocode.pois);
            });
            positionPicker.start();
            console.log(AMap.event);
            console.log(positionPicker);

            that.map.clearMap();
            that.markerPoi();
            // console.log(that.map);
            //
            that.address = "";//四川省成都市金堂县
            // this.address = localStorage.getItem("company_address");
            
            if(that.address){//如果存在数据，则使用数据定位周边和编码
              that.map.on("complete",function(){
              that.serachInfo(that.address);
              })
              that.map.plugin(['AMap.Geolocation'],function(){
                that.geolo();
              })
            }else{//否则进入页面自动定位
              that.map.on("complete",function(){
                that.map.plugin(['AMap.Geolocation'],function(){
                  that.geolo();
                  that.geolocation.getCurrentPosition(function(status,result){//初始精确自动定位
                    console.log(status,result);
                    var poi = [result.position.lng,result.position.lat];
                    that.center = poi;
                    that.marker = poi;
                    that.columns = result.pois;
                    that.map.clearMap();
                    that.markerPoi();
                    that.map.setCenter(that.center);
                    that.map.setZoom(that.zoom);
                  })
                })
              })
            }//判断进入页面是否传值
            
        })//添加PositionPicker监听


        })
        .catch(err=>{
          console.log(err);
        })
      })
      .catch(err=>{
          console.log(err);
      })
      .finally(function() {
        console.log("s");
          if(!this.AMap){
            location.reload(true);
          }
          console.log("");
      });


// this.aMapJSAPILoader.load()
//   .then(function(AMap) {
//     // 请求成功
//     console.log("s");
//   })
//   .catch(function(e) {
//     console.log("d");
//     // 请求失败
//   })
//   .finally(function() {
//     console.log("a");
//     // 总是执行
//   });


    }//mounted
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