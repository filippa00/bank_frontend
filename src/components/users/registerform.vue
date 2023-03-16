<template>
<div>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card border-0 shadow rounded-3 my-5">
          <div class="card-body p-4 p-sm-5">
            <h5 class="card-title text-center mb-5 fw-light fs-5">Register a new Customer</h5>
            <form>
              <strong>Basic information</strong>

              <div class="form-floating mb-3">
                <input required
                type="text" 
                maxlength="20"
                class="form-control" 
                id="inputFirstName" 
                placeholder="First name"
                v-model="customer.firstname">
                <label for="inputFirstName">First Name</label>
              </div>

              <div class="form-floating mb-3">
                <input required
                type="text"
                maxlength="20"
                class="form-control" 
                id="inputLastName" 
                placeholder="LastName"
                v-model="customer.lastname">
                <label for="inputLastName">Last Name</label>
              </div>

              <div class="form-floating mb-3">
                <input required
                type="email" 
                 maxlength="30"
                class="form-control" 
                id="inputEmail" 
                placeholder="name@example.com"
                v-model="customer.email">
                <label for="inputEmail">Email address</label>
              </div>

              <div class="form-floating mb-3">
                <input required
                type="text" 
                maxlength="50"
                class="form-control" 
                id="addressEmail" 
                placeholder="Address: Nr | Street | Postcode"
                v-model="customer.address">
                <label for="addressEmail">Address: Nr | Street | Postcode</label>
              </div>

              <div class="form-floating mb-3">
                <input required
                type="phone" 
                maxlength="15"
                class="form-control" 
                id="inputPhone" 
                placeholder="phone"
                v-model="customer.phone">
                <label for="inputPhone">Phone</label>
              </div>
              <strong>Basic information</strong>
              <div class="form-floating mb-3">
                <input required
                type="text" 
                maxlength="20"
                class="form-control" 
                id="inputUsername" 
                placeholder="username"
                v-model="customer.username">
                <label for="inputUsername">Username</label>
              </div>

              <div class="form-floating mb-3">
                <input required
                type="password" 
                maxlength="50"
                class="form-control" 
                id="inputPassword" 
                placeholder="Password"
                v-model="customer.password">
                <label for="inputPassword">Password</label>
              </div>

              <div class="d-grid">
                <button class="btn btn-primary btn-login text-uppercase fw-bold" type="button" @click="Register()">Register
                  Customer</button>
              </div>

              <!-- <div class="d-grid">
                <button class="btn btn-primary btn-login text-uppercase fw-bold" type="button" @click="testing()">testing</button>
              </div> -->
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  


</div>
  
</template>

<script>
import axios from '../../axios-auth';
import toastr from "toastr"
export default {
name:'registerForm',
data(){
  return{
    customer: {
      firstname:"",
      lastname:"",
      email:"",
      address:"",
      phone:"",
      password:"",
      username:"",
    }
    
  };
},
methods: {
  Register(){
     axios.post("/user/", this.customer, axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`)
    
      .then(function(){ 
        toastr.success('Successfully resgistered new user')

      })
      .catch((error) => {
toastr.error('Something went wrong' + error)
      })

  },

}
    
}
</script>

<style>

</style>