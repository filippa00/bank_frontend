<template>
<div>
<!-- Modal -->
<div class="modal fade" id="depositModal" tabindex="-1" aria-labelledby="depositModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Deposit into {{this.iban}}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
            
                 <!-- amount -->
            <br/>
             <label>Enter a deposit amount:</label>
            <div class="input-group">
            <input type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)">
            <span class="input-group-text">$</span>
            <span class="input-group-text">0.00</span>
            </div>
            <br>
             <label>Please enter pin for {{this.iban}}</label>
            <div class="input-group">
            <input type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)">

            </div>
           
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="deposit()">Deposit </button> 
        <!-- make sure ony 4 digits can be typed pincode-->
 
      </div>
    </div>
  </div>
</div>
</div>
  
</template>

<script>
import axios from '../../../axios-auth';
import toastr from "toastr";

export default {
name:'depositModal',
components:{
 
},
data(){
  return{
    depositBody:{
        amount: 0,
        executionDate: new Date().getDate(),
        pincode: 0,
    }
  }
},
props:{
    iban: String
},
methods: {
      deposit(){
        axios.get("/transaction/" + this.iban + "/deposit",this.depositBody,axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`)
         .then(result => (this.accounts = JSON.parse(JSON.stringify(result.data))))
         .catch((error) => {
        toastr.error('Something went wrong' + error)
        });
      
      },
}
}
</script>

<style>

</style>