<template>
  
  <div class="container-fluid">
<div v-if="username != null" class="card-header">
  <h2>
 Welcome {{username}}
  </h2>
  <div class="container text-center">
  <div class="row justify-content-md-center">
    <div class="col text-primary" >
    <img
              class="banner b"
              src="transaction.svg"
              width="20px"
              height="20px"
            
            />
     <a href="/transactions">Transactions</a>
    </div>
     
    <div class="col text-primary">
   

      <img
              class="banner b"
              src="user.svg"
              width="15px"
              height="15px"
            
            />
   <a href="/profile">Profile</a>
        
    </div>
  </div>
</div>
  </div>
      <img class="banner" src="website-banner.png">
      <div class="card">
  <div class="card-header">
    Featured
  </div>
  <div class="card-body">
    <h5 class="card-title">Want more insights into your finances?</h5>
    <p class="card-text">Find out more in your Transactions click on the link below.</p>
    <a href="/transactions" class="btn btn-primary">Transactions</a>
  </div>
</div>

  </div>

</template>

<script>


export default {
    name:'mainIndex',
    data(){
      return{
        username: localStorage.getItem("username")
      }
  },
}
</script>


<style>

</style>