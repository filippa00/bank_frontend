<template>
  <div>
    <div class="container rounded bg-white mt-5 mb-5">
      <div class="row">
        <div class="col-md-3 border-right">
          <div class="d-flex flex-column align-items-center text-center p-3 py-5"
          >
            <img
              class="icon"
              src="user.svg"
             
            />
          </div>
        </div>
        <div class="col-md-5 border-right">
          <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="text-right">
               Current Profile Settings for {{ user.username }}
              </h5>
            </div>
            <div class="row mt-2">
              <div class="col-md-6">
                <label class="labels">Firstname: {{ user.firstname }}</label>
              </div>
              <div class="col-md-6">
              <label class="labels">Lastname: {{ user.lastname }}</label>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-12">
                <label class="labels">Transaction Limit</label
                ><label
                type="text"
                  class="form-control"
                >
                  {{user.transactionLimit}}
                </label>
              </div>
              <br />

              <div class="col-md-12">
                <label class="labels">Day Limit</label
                ><label
                 type="label"
                  class="form-control"
                >
                {{user.dayLimit}}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 border-left">
          <div class="d-flex flex-column align-items-center text-center p-3 py-5"
          >
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="text-right">
               Change profile Settings
              </h5>
            </div>
            <div class="row mt-3">
              <div class="col-md-12">
                <label class="labels">Transaction Limit<span class="text-danger">*</span></label
                ><input
                  required
                  type="number"
                  class="form-control"
                  min="0.00"
                  max="10000.00"
                  step="0.01"
                  v-model="updateUser.transactionLimit"
                  :placeholder = user.transactionLimit
                >
                <span class="text-danger" v-if="v$.updateUser.transactionLimit.$error">
                    {{ v$.updateUser.transactionLimit.$errors[0].$message }}
                  </span>
              </div>
              <br />

              <div class="col-md-12">
                <label class="labels">Day Limit<span class="text-danger">*</span></label
                ><input required
                  type="number"
                  class="form-control"
                  min="0.00"
                  max="10000.00"
                  step="0.01"  
                  v-model="updateUser.dayLimit"
                  :placeholder ="user.dayLimit "
                >
                <span class="text-danger" v-if="v$.updateUser.dayLimit.$error">
                    {{ v$.updateUser.dayLimit.$errors[0].$message }}
                  </span>
              </div>
          
              <div class="col-md-12">
                <label class="labels">Password<span class="text-danger">*</span></label
                ><input
                  type="password"
                  maxlength="20"
                  class="form-control"
                  v-model="updateUser.password"
                  placeholder="old or new password"
                  >
                   <span class="text-danger" v-if="v$.updateUser.password.$error">
                    {{ v$.updateUser.password.$errors[0].$message }}
                  </span>
                  
              </div>
              
              <div class="col-md-12 mt-4">
                <span class="text-danger">* Your password will be changed, all fields must be filled in</span>
              <button
                type="button"
                class="btn btn-primary form-control mt-2"
                @click="Update()"
              >
                Update
              </button>
              </div>
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
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
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
      v$: useVuelidate(),
        user:[],
        updateUser:{
            dayLimit : 0,
            transactionLimit: 0,
            password : "",
            username : localStorage.getItem('username'),
        },
        valid: false,
    }
},
  validations() {
    return {
      updateUser: {
        dayLimit: { required },
        transactionLimit: { required },
        password: { required },
        username: { required },
      },
    };
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
      Update(){
        this.v$.$validate();
      this.formCheck();
      if (!this.v$.$invalid && this.valid == true) {
        axios.put("/user",this.updateUser,axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`)
          .then(function () {
             toastr.options.onHidden = function () {
              localStorage.removeItem('token');
              localStorage.removeItem('employee');
              localStorage.removeItem('username')
              location.reload();
            };
            toastr.success("Successfully updated");
          })
         .catch((error) => {
        toastr.error('Something went wrong' + error)
        });
      }else {
        console.log(this.v$);
        toastr.error("Please fill in all fields");
      }
      },
      formCheck() {
        if (this.updateUser.transactionLimit > this.updateUser.dayLimit) {
        toastr.error("The Day Limit should be more than Transaction Limit");
        this.valid = false;
      }else if (this.updateUser.transactionLimit < 0) {
        toastr.error("Transaction Limit should be positive");
        this.valid = false;
      }else if (this.updateUser.dayLimit < 0) {
        toastr.error("Day Limit should be positive");
        this.valid = false;
        } else {
        this.valid = true;
      }
      },
},
};
</script>

<style scoped>
 img {
    max-height: 100%;
    max-width: 100%;
  }
  .icon{
    height: 170px;
    width: 170px;
  }
/* @media screen and (max-width: 500px) {
  img {
    height: 50px;
    width: 500px;
   
  }
} */

</style>