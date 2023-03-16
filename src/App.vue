<template>
<div>
  <mainHeader></mainHeader>
    <router-view />
  <mainFooter></mainFooter>
</div>
 
</template>

<script>
import mainHeader from './components/Header.vue';
import mainFooter from './components/Footer.vue';

export default {
    name:'App',
    components: {
    mainHeader,
    mainFooter,
 
  },
  created(){
    this.$store.dispatch("autoLogin");
    
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
