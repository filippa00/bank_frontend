<template>
  <div>
    <div class="container rounded bg-white mt-5 mb-5">
      <div class="row">
        <div class="col-md-3 border-right">
          <div class="d-flex flex-column align-items-center text-center p-3 py-5"
          >
            <img class="rounded-circle mt-5" width="150px" /><img
              class="banner"
              src="user.svg"
              width="100px"
            /><span class="font-weight-bold"></span>
          </div>
        </div>
        <div class="col-md-5 border-right">
          <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="text-right">
                Profile Settings for {{ user.username }}
              </h4>
            </div>
            <div class="row mt-2">
              <div class="col-md-6">
                <label class="labels">Firstname: {{ user.firstname }}</label>
              </div>
              Lastname: {{ user.lastname }}
            </div>
            <div class="row mt-3">
              <div class="col-md-12">
                <label class="labels">Transaction Limit</label
                ><label
                  type="text"
                  class="form-control"
                  placeholder="enter transaction limit"
                  >{{ user.transactionLimit }}
                </label>
              </div>
              <br />

              <div class="col-md-12">
                <label class="labels">Day Limit</label
                ><label
                  type="text"
                  class="form-control"
                  placeholder="enter day limit"
                  >{{ user.dayLimit }}</label
                >
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../axios-auth';
import toastr from "toastr";
export default {
name:'profileIndex',
mounted(){
this.DisplayUser();
setTimeout(()=>{
     window.location.href = "/";
      },600000);
},
data(){
    return{
        user:[],
        updateUser:{
            dayLimit : 0,
             password : "",
            transactionLimit: 0,
            username : localStorage.getItem('username'),
        }
    }
},
methods:{
      DisplayUser(){
        axios.get("/user",axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`)
          .then(result => {
            result.data.forEach(user => {
            if(user.username == localStorage.getItem('username')){
                this.user = JSON.parse(JSON.stringify(user))
               console.log(this.user)
            }
        });
         })
         .catch((error) => {
        toastr.error('Something went wrong' + error)
        });
      },
}
}
</script>

<style>

</style>