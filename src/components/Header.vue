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

    <li class="nav-item" v-show="this.isEmployee == 'true' && this.isLoggedIn" >
        <router-link to="/manage" class="nav-link" active-class="active"
            >Manage</router-link
          >
      </li>

      <li class="nav-item" v-show="!this.isLoggedIn">
       <router-link to="/login" class="nav-link" active-class="active"
            >Login</router-link
          >
      </li>
      <li class="nav-item" v-show="!this.isLoggedIn">
        <router-link to="/register" class="nav-link" active-class="active"
            >Register</router-link
          >
      </li>

      <li class="nav-item" v-show="this.isLoggedIn">
       <router-link to="/profile" class="nav-link" active-class="active"
            >Profile</router-link
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
      isLoggedIn : false,
      user:"",
      }
    }, 
    mounted(){
      if(this.user != null){
        this.parseJwt();
        this.isLoggedIn = true
      }
        setTimeout(()=>{
       this.checkToken()
      },600000);

    },
    methods:{
    logout(){
      localStorage.removeItem('token');
      localStorage.removeItem('employee');
      localStorage.removeItem('username')
      location.reload();
    },
     parseJwt () {
        if(this.user != null){
    var base64Url = localStorage.getItem('token').split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

  var userArr = jsonPayload.split(',')
  userArr = userArr[0].split(':');
  this.user = userArr[1].replace(/"/g, "")
  localStorage.setItem('username',this.user)
  }
},
checkToken(){
  this.parseJwt()
  if (this.user == null || this.user == "" && this.isLoggedIn == false){
    this.logout();
  }
}

    }
}
</script>

<style>

</style>