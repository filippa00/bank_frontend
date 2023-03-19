<template>
  <div>
    <h3>{{this.iban}}</h3>
    <div class="card text-bg-primary mb-3" style="max-width: 18rem;">
<div class="card-header">Total Income</div>
  <div class="card-body ">
    <p class="card bg-secondary " >{{this.account.balance}}</p>
  </div>
    </div>
    

</div>
<div>
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#depositModal">Deposit </button>
   <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#withdrawModal">Withdraw </button> 
   <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#transactionModal">Transfer </button> 
  <DepositModal :iban ="this.iban"></DepositModal>
  <WithdrawModal :iban ="this.iban"></WithdrawModal>
  <TransactionModal :iban ="this.iban"></TransactionModal>
  <TransactionDataTable
 :iban ="this.iban">
     <!-- <DataTable ></DataTable> -->
 </TransactionDataTable>


  </div>
</template>

<script>
import DepositModal from "../transactions/Modals/depositModal.vue"
import WithdrawModal from "../transactions/Modals/withdrawModal.vue"
import TransactionModal from "../transactions/Modals/transactionModal.vue"
import TransactionDataTable from "../transactions/getTransactionsDataTable.vue"
import axios from '../../axios-auth';
import toastr from "toastr";
//import DataTable from 'datatables.net-dt';

export default {
components: { 
  DepositModal ,
  WithdrawModal,
  TransactionModal,
    TransactionDataTable,
    //  DataTable,
},
mounted(){
this.getUserAccounts();
  console.log(this.iban)
},
props:{
 iban: String
},
  data(){
    return{
         account: Object,
         transactions: [],
  }

},
methods: {
      getUserAccounts(){
        axios.get("/account/employee",axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`)
         .then(result => {
            result.data.forEach(account => {
            if(account.iban == this.iban){
                this.account = JSON.parse(JSON.stringify(account))
               console.log(this.account)
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