<template>
  <div>
<!-- Modal -->
<div class="modal fade" id="withdrawModal" tabindex="-1" aria-labelledby="withdrawModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Withdraw from {{this.iban}}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
                 <!-- amount -->
            <br/>
             <label>Enter an amount to withdraw:</label>
            <div class="input-group">
            <input type="text"
             class="form-control" 
            aria-label="Dollar amount (with dot and two decimal places)"
            v-model="withdrawBody.amount">
            <span class="input-group-text">$</span>
            <span class="input-group-text">0.00</span>
            </div>

            <br>
             <label>Please enter pin for {{this.iban}}</label>
            <div class="input-group">
            <input type="password" name="pin" maxlength="4"
            v-model="withdrawBody.pincode">
            </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="withdraw()">Withdraw</button>
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
name:'withdrawModal',
data(){
  return{
    withdrawBody:{
        amount: 0,
        pincode: 0,
    }
  }
},
props:{
    iban: String
},
methods: {
      withdraw(){
        axios.post("/transaction/" + this.iban + "/withdraw",this.withdrawBody,axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`)
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