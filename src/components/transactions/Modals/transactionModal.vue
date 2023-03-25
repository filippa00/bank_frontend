<template>
  <div>
<!-- Modal -->
<div class="modal fade" id="transactionModal" tabindex="-1" aria-labelledby="transactionModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Tranfer from {{this.iban}}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
                 <!-- amount -->
            <br/>
             <label>Enter an amount to transfer:</label>
            <div class="input-group">
            <input type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)"
            v-model="transferBody.amount">
            <span class="input-group-text">$</span>
            <span class="input-group-text">0.00</span>
            </div>
            <br/>
        
            <accountSearchDatatableVue></accountSearchDatatableVue>
             <br>
             <label>To IBAN</label>
            <div class="input-group">
            <input type="text" 
            placeholder="NL 99 BANK 0123 4567 89"
            class="form-control" 
            v-model="transferBody.accountTo">
             </div>

             <label>Add description</label>
            <div class="input-group">
            <input type="text" 
            placeholder="please enter your description here"
            class="form-control" 
            v-model="transferBody.description">
             </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="transfer()">Make Payment</button>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import axios from '../../../axios-auth';
import toastr from "toastr";
import accountSearchDatatableVue from "./accountSearchDatatable.vue"
export default {
name:'transactionModal',
components:{
accountSearchDatatableVue
},
props:{
    iban: String
},
// mounted(){
// this.accountFrom = this.iban;
// },
data(){
  return{
    transferBody:{
        accountFrom: this.iban,
        accountTo: "",
        amount: 0,
        description: "",
    },
    
  }
},
methods: {
      transfer(){
        axios.post("/transaction",this.transferBody,axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`)
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