<template>
  <div>
      <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card border-0 shadow rounded-3 my-5">
          <div class="card-body p-4 p-sm-5">
          
            <h5 class="card-title text-center mb-5 fw-light fs-5">Manage Customers</h5>

            <table id="myTable" class="display">
              <thead>
                  <tr>
                      <th>user number</th>
                      <th>First name</th>
                      <th>Last name</th>
                      <th>username</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody v-for="user in users" v-bind:key="user.id">
                  <tr>
                      <td>{{user.id}}</td>
                      <td>{{user.firstname}}</td>
                      <td>{{user.lastname}}</td>
                      <td>{{user.username}}</td>
                      <td><button class="btn btn-success btn-login text-uppercase fw-bold" type="button" data-toggle="modal" data-target="#exampleModal" @click="OpenAccount(user.id)" >Open an Account</button></td>
                  </tr>
              </tbody>
          </table>
          <!-- <div v-if= users.length >0 
            <create-account></create-account>
          </div> -->
          
          <!-- bind modal to this  -->
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from '../../axios-auth';
import $ from 'jquery';
import toastr from "toastr";
//import createAccount from './createAccount.vue';
export default {
name:'noAccounts',
components:{
// createAccount
},
created(){
    $.noConflict();
      $(document).ready(function () {
    $('#myTable').DataTable();
    });
  },
  data(){
    return{
      users:[]
    }
  },
  mounted() {
  this.DisplayUsers();
  },
  methods:{
      DisplayUsers(){
        axios.get("/user/noAccount",axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`)
         .then(result => this.users = result.data)
         .catch((error) => {
        toastr.error('Something went wrong' + error)
        });
      },
      OpenAccount(id){
        this.$router.push({ path: '/account/'+id })
      }
  }

}

</script>

<style>

</style>