<template>
	<div class="header">
		<van-icon :name="icon" @click="returnPage"/>
		<span>{{title}}</span>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				icon:""
			}
		},
		props:["title","history"],
		methods:{
			returnPage(){
				if(this.history == 0){
				}else{
					this.$router.go(-1);
				}
			}
		},
		mounted(){
			if(this.history == 0){
				this.icon = "";
			}else{
				this.icon = "arrow-left";
			}
		}
	}
</script>

<style scoped lang="stylus">
	div.header
		width: totalWid;
		height: headerHei;
		background:headerBack
		font-size:font18
		flex()
		justify-content:space-between
		font-weight: normal;
		i
			color:cwhite
			line-height:headerHei
			margin-left: 15px;
			font-weight: bold
		span
			display:block
			line-height:headerHei
			color:cwhite
			margin-right:halfScreenWid - (headerSpanW/2)
			width:headerSpanW
			text-align:center
	[data-dpr="1"] div.header
		font-size:font18
	[data-dpr="2"] div.header
		font-size:font36
	[data-dpr="3"] div.header
		font-size:font54
</style>