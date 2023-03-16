<template>
  <div>
    <h3>Transactions</h3>
    <div class="card text-bg-primary mb-3" style="max-width: 18rem;">
<div class="card-header">Total Income</div>
  <div class="card-body ">
    <p class="card bg-secondary " >0.00</p>
  </div>
    </div>
    

</div>
<div>
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#depositModal">Deposit </button>
   <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#withdrawModal">Withdraw </button> 
   <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#transactionModal">Transfer </button> 
  <DepositModal></DepositModal>
  <WithdrawModal></WithdrawModal>
  <TransactionModal></TransactionModal>
  </div>
</template>

<script>
import DepositModal from "../transactions/Modals/depositModal.vue"
import WithdrawModal from "../transactions/Modals/withdrawModal.vue"
import TransactionModal from "../transactions/Modals/transactionModal.vue"
export default {
name:'transactionIndex',
 components: { 
  DepositModal ,
  WithdrawModal,
  TransactionModal
}
}
</script>

<style>

</style>