<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
    <a class="navbar-brand" href="#"
    >CG</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <ul class="nav nav-pills nav-fill">
        <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active"
                  >Home</router-link
                >
            </li>

            <li class="nav-item" v-show="this.isLoggedIn">
            <router-link to="/transactions" class="nav-link" active-class="active"
                  >Transactions</router-link
                >
            </li>

         <!-- <li class="nav-item dropdown" >
    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">transactions</a>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#">Separated link</a></li>
      </ul>
  </li>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">account</a>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#">Separated link</a></li>
      </ul>
  </li> -->

    <li class="nav-item" v-show="this.isEmployee == 'true' && this.isLoggedIn" >
        <router-link to="/manage" class="nav-link" active-class="active"
            >manage</router-link
          >
      </li>


   
      <!-- <li class="nav-item">
        <router-link to="/register" class="nav-link" active-class="active"
            >Register</router-link
          >
      </li> -->
     

      <li class="nav-item" v-show="!this.isLoggedIn">
       <router-link to="/login" class="nav-link" active-class="active"
            >Login</router-link
          >
      </li>

      <li class="nav-item" v-show="this.isLoggedIn">
       <a @click="logout()" class="nav-link" active-class="active">Logout</a>
      </li>
     
  </ul>
    
  </div>
</nav>

</template>

<script>
export default {
    name:'mainHeader',
    data(){
      return {
      isEmployee : localStorage.getItem('employee'),
      isLoggedIn : localStorage.getItem('token')
      }
    }, 
    methods:{
    logout(){
      localStorage.removeItem('token');
      localStorage.removeItem('employee');
      localStorage.removeItem('username')
      location.reload();
    }
    }
}
</script>

<style>

</style>