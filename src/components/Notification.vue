<template>
<div>
    <button v-on:click="success" class="btn btn-success me-2">Success</button>

    <div class="toast-container" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast" :class="toast.show">
            <div class="toast-header bg-success text-white">

    <strong class="mr-auto">Success</strong>
    <small>11 mins ago</small>
    <button type="button" class="btn-close btn-close-white" @click="hideToast()"></button>
  </div>
  <div class="toast-body">
{{toast.message}}
  </div>
        </div>

    </div>



</div>

</template>

<script>
// import $ from 'jquery'
export default {
name:'noficationToasts',
components: {

  },
  created(){
   this.$emit('myEvent')
  },
  data(){
    return{
        toast:{
            message:'',
            position:'',
            show :''
        }
    }
  },
  methods: {
    success(){
      this.$emit('myEvent')
        console.log("reached");
        this.toast = {
 message:'login was successful',
 position:'top-0 end-0',
 show :'show'
        }
   
       
    },
    hideToast(){
        this.toast.show = '';
    }
  }
}


</script>

<style>

</style>