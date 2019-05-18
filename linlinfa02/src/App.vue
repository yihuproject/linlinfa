<template>
  <div id="app">
    <keep-alive>
			<router-view/>
		</keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
	// created(){
	// 	localStorage.getItem("userMsg") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("userMsg"))));
	// 	
	// 	window.addEventListener("beforeunload",()=>{
 //        localStorage.setItem("userMsg",JSON.stringify(this.$store.state))
 //    })
	// }
}
</script>

<style scoped lang="stylus">
</style>
