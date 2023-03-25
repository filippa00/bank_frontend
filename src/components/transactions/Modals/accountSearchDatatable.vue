<template>

   <label>Search for an IBAN</label>
            <div class="row g-2">
            <div class="row g-2">
            <div class="col-md">
              <div class="form-floating">
                <input type="text" 
                class="form-control" 
                id="lastName" 
                placeholder="Last Name"
                v-model="lastname">
                <label for="lastName">Last Name</label>
              </div>
            </div>
            <div class="col-md">
              <div class="form-floating">
                <input type="text" 
                class="form-control" 
                id="firstName" 
                placeholder="First Name"
                 v-model="firstname">
                <label for="firstName">First Name</label>
              </div>
            </div>
             <div class="col-md">
                <div class="input-group">
            <button type="button" class="btn btn-secondary" @click="searchName()">Search</button>

                </div>
              </div>
                <br>
             </div>
             <br>
             <br>
             
              <br>
              <table id="accountSearchTable" class="table table-hover">
              <thead class="table-secondary">
                  <tr>
                      <th>type</th>
                      <th>iban</th>
                  </tr>
              </thead>
              <tbody v-for="iban in this.ibans" v-bind:key="iban.iban">
                  <tr>
                      <td>{{iban.type}}</td>
                      <td>{{iban.iban}}</td>

                  </tr>
              </tbody>
          </table>
</div>
            
  
</template>

<script>
import axios from '../../../axios-auth';
import toastr from "toastr";
export default {
name:'accountSearchDatatable',
data(){
    return{
    lastname:"",
    firstname: "",
    ibans: [],
    }
},
methods:{
    searchName(){
        const params = new URLSearchParams()
         params.set("lastName", this.lastname)
         if(this.firstname != "")
         {
           params.set("firstName",this.firstname)
         }
        axios.get("/account/search", { params },axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`)
         .then(result => (this.ibans = JSON.parse(JSON.stringify(result.data))))
        //  (this.iban = JSON.parse(JSON.stringify(result.data)))
         .catch((error) => {
        toastr.error('Something went wrong' + error)
        });
      
      },
      
}
}
</script>

<style>

</style>