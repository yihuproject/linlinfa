<template>
	<div class="manage_data" ref="homePage">
		<Header :title="msg" :history="history"></Header>
		<div class="manage_data_daily">
			<van-row>
				<van-col :span="24" class="manage_data_daily_title">
					<span class="title">经营日报</span>
					<span class="statistics_time">统计时间：2019-03-08</span>
				</van-col>
			</van-row>
			<div class="manage_data_daily_detail">
				<ul>
					<li class="customer_account">
						<span class="detail_data"><i>208</i>人</span>
						<p>访问顾客</p>
					</li>
					<li class="customer_day_before">
						<span class="detail_data"><i>+28</i>人</span>
						<p>比较前日</p>
					</li>
					<li class="order_customer_account">
						<span class="detail_data"><i>56</i>人</span>
						<p>下单顾客</p>
					</li>
					<li class="order_day_before">
						<span class="detail_data"><i>-10</i>人</span>
						<p>比较前日</p>
					</li>
					<li class="transfer_rate">
						<span class="detail_data"><i>54%</i></span>
						<p>下单转换率</p>
					</li>
					<li class="transfer_rate_day_before">
						<span class="detail_data"><i>-2%</i></span>
						<p>比较前日</p>
					</li>
				</ul>
			</div>
		</div>
		<van-row>
			<van-col :span="24">
				<div class="trading_volume"  ref="line1">
						
				</div>
			</van-col>
		</van-row>
		<van-row>
			<van-col :span="24">
				<div class="trading_order_account" ref="line2">
						
				</div>
			</van-col>
		</van-row>
	</div>
</template>

<script>
	import Header from "./header"
	let echarts = require('echarts')
	export default{
		data(){
			return {
				msg:"经营数据",
				member_id:"",
				history:0,
				option1:{
					title: {
					text: '七日成交金额',
					textStyle:{
						color:"#000",
						fontStyle:"normal"
					},
					top:10
					
					},
					tooltip: {
						trigger:"axis",
						axisPointer:{
							type:"shadow"
						}
					},
					legend: {
						data:['销量']
					},
					xAxis: {
						data: ["03-01","03-02","03-03","03-04","03-05","03-06","03-07"],
						boundaryGap: false,//不自动排列
						//控制x轴字体样式
						axisLabel:{
							show:true,
							textStyle:{
								color:"#333"
							}
						},
						//网格线
						splitLine:{
							show:false
						},
						axisLine:{
							show:false,
							lineStyle:{
								color:"#fff",
								width:1
							}
						}	
					},
					yAxis: {
						axisLabel:{
							show: true,
								textStyle: {
									color: '#999'
					        }
						},
						axisLine:{
							show:false,
					        lineStyle:{
					            color:'#999',
					              width:1,
					        }
					    },
						axisTick:{
							show:false
						}
					},
					series: [{
						name:"",
						data: [820, 4932, 901, 934, 1290, 1330, 1320],
						type: 'line',
						color: ["#1C98F6"],
						areaStyle: {normal: {}},
						itemStyle:{
							normal:{
								color:new echarts.graphic.LinearGradient(
								0,0,0,1,
								[
									{offset:0,color:"rgba(28,152,246,1)"},
									{offset:0.1,color:"rgba(28,152,246,0.1)"}
								]),
								lineStyle:{
									color:"#1C98F6"
								}
							}
						}
					}]
				},
				option2:{
					title: {
					text: '七日成交订单量',
					textStyle:{
						color:"#000",
						fontStyle:"normal"
					},
					top:10
					},
					
					tooltip: {
						trigger:"axis",
						axisPointer:{
							type:"shadow"
						}
					},
					legend: {
						data:['销量']
					},
					xAxis: {
						data: ["03-01","03-02","03-03","03-04","03-05","03-06","03-07"],
						boundaryGap: false,//不自动排列
						//控制x轴字体样式
						axisLabel:{
							show:true,
							textStyle:{
								color:"#333",
							}
						},
						//网格线
						splitLine:{
							show:false,
							lineStyle:{
								color:["red"]
							}
						},
						axisLine:{
							show:false,
							lineStyle:{
								color:"#fff",
								width:1
							}
						}
						
					},
					yAxis: {
						axisLabel:{
							show: true,
								textStyle: {
									color: '#999'
                            }
						},
						axisLine:{
							show:false,
                            lineStyle:{
                                color:'#999',
                                width:1,//这里是坐标轴的宽度
								type: 'solid',
                            }
                        },
						// 去除坐标轴上的刻度线
						axisTick:{
							show:false
						}
					},
					series: [{
						name:"",
						data: [820, 932, 901, 934, 1290, 1330, 1320],
						type: 'line',
						color: ["#0AC782"],
						areaStyle: {normal: {}},
						itemStyle:{
							normal:{
								color:new echarts.graphic.LinearGradient(
								0,0,0,1,
								[
									{offset:0,color:"rgba(10,199,130,1)"},
									{offset:0.1,color:"rgba(10,199,130,0.1)"}
								]),
								lineStyle:{
									color:"#0AC782"
								}
							}
						}
					}]
				},
			}
		},
		components:{
			Header
		},
		mounted(){
			this.member_id = this.$route.params.member_id;
			this.init();
		},
		methods: {
			init() {
				var mycharts1 = echarts.init(this.$refs.line1);
				var mycharts2 = echarts.init(this.$refs.line2);
				mycharts1.setOption(this.option1);
				mycharts2.setOption(this.option2);
				console.log(this.option1.xAxis,this.option1.series);
				this.$axios.post("/v3/get_echarts",this.$qs.stringify({store_id:this.member_id}))
				.then((data)=>{
					this.option1.xAxis.data = data.data.xday;
					this.option1.series.data = data.data.ydata;
					console.log(this.option1.xAxis,this.option1.series);
				})
				.catch((err)=>{
					console.log(err);
				})
				console.log(this.option2.xAxis,this.option2.series);
				this.$axios.post("/v3/get_echarts",this.$qs.stringify({store_id:this.member_id}))
				.then((data)=>{
					this.option2.xAxis.data = data.data.xday;
					this.option2.series.data = data.data.ydata;
					console.log(this.option2.xAxis,this.option2.series);
				})
				.catch((err)=>{
					console.log(err);
				})
				
				
				
			}
		},
	}
</script>

<style scoped lang="stylus">
	.manage_data
		width:totalWid
		height:1500px
		overflow:hidden
		.manage_data_daily
			width:totalWid
			height:482px
			background:cwhite
			.manage_data_daily_title
				flex()
				flex-flow:row no-wrap
				align-items:center
				justify-content:space-between
				border-bottom:normalBorder
				margin-left: 30px
				span
					display:inline-block
					height: 88px
					text-align:left
					line-height: 88px
					font-size:15PX
				span:first-child
					width:220px
					text-align:left
					color:cblack
				span:last-child
					width:420px
					padding-right: 50px
					text-align:right
					color:cgray9
		.manage_data_daily_detail
			width:totalWid
			height: 390px
			ul
				width:totalWid
				height: 390px
				flex()
				flex-flow:row wrap
				align-items:center
				justify-content:space-between
				li
					width:270px
					height: 130px
					padding-left: 30px;
					span
						display:inline-block
						width: 350px
						height: 80px
						line-height:80px
						font-size:12PX
						i
							font-size:18PX
					p
						line-height:40px
						font-size:12PX
						color:cgray3
				li:nth-child(odd)
					color:cblue
				li:nth-child(2)
					color:cgreen
				li:nth-child(4),li:nth-child(6)
					color:corange
		.trading_volume,.trading_order_account
			width:totalWid - 30px
			height:449px
			background:cwhite
			margin-top: 30px
			border-top:normalBorder
			padding-left: 30px
				
		
		
		
		
		
</style>
