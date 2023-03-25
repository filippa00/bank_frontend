<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="card border-0 shadow rounded-3 my-5">
          <div class="card-body p-4 p-sm-5">
            <table id="usersTable" class="display">
              <thead>
                  <tr>
                      <th>Nr.</th>
                      <th>First name</th>
                      <th>Last name</th>
                      <th>Username</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody v-for="user in users" v-bind:key="user.id">
                  <tr>
                      <td>{{user.id}}</td>
                      <td>{{user.firstname}}</td>
                      <td>{{user.lastname}}</td>
                      <td>{{user.username}}</td>
                      <td><button class="btn btn-success btn-login text-uppercase fw-bold" type="button"  @click="OpenAccount(user.id)" >Open an Account</button>
                      <!-- <button class="btn btn-warning btn-login text-uppercase fw-bold" type="button"  @click="UpdateAccount(user.id)" >Update Account</button> -->
                    </td>
                  </tr>
              </tbody>
          </table>
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
export default {
name: 'allUsers',
components : {
},
created(){
    $.noConflict();
      $(document).ready(function () {
    $('#usersTable').DataTable({
        "columnDefs": [ {
      "targets": [ 4 ],
      "orderable": false
    } ]
    });
    });
  },
  data(){
    return{
      users:[],
      id:0,
      username: "",
    }
  },
  mounted() {
  this.DisplayUsers();
  },
  methods:{
      DisplayUsers(){
        axios.get("/user",axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`)
         .then(result => this.users = result.data)
         .catch((error) => {
        toastr.error('Something went wrong' + error)
        });
      },
      OpenAccount(id){
        this.$router.push({ path: '/account/'+id })
      },
      getUser(id,username){
        this.id = id;
        this.username = username;
      }
  }

}
</script>

<style>

</style>