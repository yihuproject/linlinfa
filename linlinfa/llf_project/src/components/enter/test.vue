<template>
   <div class="map_container" ref="map">	
   	<baidu-map :ak="ak" :center="center" :zoom="zoom"  @ready="handler"  ref="bdmap" :pinch-to-zoom="true" :dragging="true">
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
   	</baidu-map>
   </div>
</template>

<script>
	import BaiduMap from "vue-baidu-map/components/map/Map.vue"
	// import BmMarker from 'vue-baidu-map/components/overlays/Marker'
	// import BmCircle from 'vue-baidu-map/components/overlays/Circle'
	import BmGeolocation from 'vue-baidu-map/components/controls/Geolocation.vue'
	// import BmLocalSearch from "vue-baidu-map/components/search/LocalSearch.vue"
	// import AutoComplete from "vue-baidu-map/components/others/AutoComplete.vue"
export default {
  data () {
    return {
      center: {
        lng: 116.404, 
        lat: 39.915
      },
      zoom: 16,
      ak:"2KrGibP5ES5RSW38Rq3O0w01u5vUncXQ"
    }
  },
  components: {
    BaiduMap,
    BmGeolocation,
    // BmMarker,
    // BmLocalSearch,
    // AutoComplete,
    // BmCircle
  },
  methods: {
    handler ({BMap, map}) {
      let  _this = this;  
      _this.geolocation = new BMap.Geolocation();
      _this.geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
          _this.center = r.point;
          console.log(r.point);
          const pointBak = new BMap.Point(r.point.lng, r.point.lat);
          const convertor = new BMap.Convertor();
          convertor.translate([pointBak], 1, 5,function(resPoint) {
            console.log(resPoint);
          })
          var geo = new BMap.Geocoder();
          geo.getLocation(new BMap.Point(r.point.lng,r.point.lat),function(rs){
            console.log(rs);
            
            
          })


        }
      })


    
      
      
      
    }
  }
}
</script>

<style>
.map_container {
  width: 10rem;
  height: 1200px;
}
.map_container>div {
  width: 100%;
  height: 1200px;
}
</style>