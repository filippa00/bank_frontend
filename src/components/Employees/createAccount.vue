<template>
<div>
 <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card border-0 shadow rounded-3 my-5">
          <div class="card-body p-4 p-sm-5">
            <h5 class="card-title text-center mb-5 fw-light fs-5">Create a new Account for Customer No. {{this.id}}</h5>
            <form>
              <strong>Basic information</strong>

              <div class="form-floating mb-3">
                <input required
                type="number" 
                min="-10000.00" 
                max="0.01"
                step="0.01" 
                class="form-control" 
                id="absoluteLimit" 
                placeholder="Absolute Limit e.g €-1500.00"
                v-model="account.absoluteLimit"
                >
                <label for="inputFirstName">Absolute Limit</label>
              </div>
              
              <input type="checkbox" class="btn-check" id="btn-check" autocomplete="off" v-bind:v-model="account.active">
              <label class="btn btn-primary btn-block" for="btn-check">Active</label>   

              <!-- active check not binding -->

              <div class="form-floating mb-3">
                <input required
                type="number" 
                min="0.00" 
                max="10000.00" 
                step="0.01" 
                class="form-control" 
                id="inputBalance" 
                placeholder="€0.00"
                v-model="account.balance"
                >
                <label for="inputBalance">Balance</label>
              </div>

              <div class="form-floating mb-3">
                <input required
                type="number" 
                min="0.00" 
                max="10000.00" 
                step="0.01" 
                class="form-control" 
                id="inputDayLimit" 
                placeholder="€0.00"
                v-model="account.dayLimit"
                >
                <label for="inputDayLimit">Day Limit</label>
              </div>

              <div class="form-floating mb-3">
                <input required
                type="number" 
                min="0.00" 
                max="10000.00" 
                step="0.01" 
                class="form-control" 
                id="transactionLimit" 
                placeholder="€0.00"
                v-model="account.transactionLimit"
               >
                <label for="transactionLimit">Transaction Limit</label>
              </div>

              <select class="form-select" aria-label="Default select example" v-model="account.type">
              <option selected>Account Type</option>
              <option value="CURRENT">CURRENT</option>
              <option value="SAVINGS">SAVINGS</option>
            </select>
              <br>
              <div class="d-grid">
                <button class="btn btn-success btn-login text-uppercase fw-bold" type="button" @click="create()">Create Account</button>
              </div>
              
            </form>
           <div v-if="this.modalActive == 'show in'">
          <AccountInfoModal :modalActive ="modalActive" :accountSummary="this.accountSummary[0]" @closeModal="closeModal"></AccountInfoModal>
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
 import AccountInfoModal from "../Employees/accountInfoModal.vue";
export default {
name:"createAccount",
components:{
    AccountInfoModal
},
 props:{
        id: String,
    },
 data() {
        return {
        account: {
            absoluteLimit: 0,
            active: false,
            balance: 0,
            currency: "EUR",
            dayLimit: 0,
            transactionLimit: 0,
            type: "", 
            userid: this.id,
        },
        modalActive: '',
        accountSummary: []
    };
  },
   methods: {
    create(){
      
      axios.post("/account",this.account,axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`)
       .then(result =>(this.accountSummary[0] = result.data, this.modalActive = 'show in'))
      .catch((error) => {
      toastr.error('Something went wrong' + error)
      })

    },
    closeModal(){
      this.modalActive = '';
      this.$router.push('/manage')
    }
   }
}
</script>

<style>

</style>