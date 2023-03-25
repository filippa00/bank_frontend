<template>
  <div>
    <body>
<div class="container text-center">
  <br>
<h3 class="card-title text-center">Manage Customers</h3>
    <hr>
      <ul class="nav nav-tabs nav-justified">
  <li class="nav-item">
    <a class="nav-link " @click="clicked(0)">No Accounts </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" @click="clicked(1)">All Users</a>
  </li>
</ul>
<div v-show="currentIndex == 0">
  <no-account>
 <DataTable ></DataTable>
      </no-account>
  </div>
  <div v-show="currentIndex == 1">
      <all-users>
 <DataTable ></DataTable>
      </all-users>
  </div>
</div>
</body>

  </div>
  
</template>

<script>
import DataTable from 'datatables.net-dt';
import noAccount from  '../Employees/noAccount.vue'
import allUsers from './allUsers.vue';
export default {
     name:'manageCustomers',
    components: {
    DataTable,
    noAccount,
    allUsers,
  },
  data(){
    return{
    currentIndex : 0,
    }
  },
  methods:{
    clicked(number){
        if (!this.currentIndex == number){
          this.currentIndex = number
        }
        return;
    }
  }
  

}
</script>

<style>
 
</style>
