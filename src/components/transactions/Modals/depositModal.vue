<template>
<div>
<!-- Modal -->
<div class="modal fade" id="depositModal" tabindex="-1" aria-labelledby="depositModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content" v-show="currentIndex == 0" >
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Deposit into {{this.iban}}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" v-show="currentIndex == 0">
        <form>
                 <!-- amount -->
             <br/>
          <label>Enter a deposit amount:</label>
            <div class="input-group">
            <input type="number" 
  
                        min="0.00"
                        max="1000000.00"
                        step="0.1"
                        placeholder="€0.00"
            class="form-control" 
            aria-label="Dollar amount (with dot and two decimal places)"
            v-model="depositBody.amount">
            <span class="input-group-text">€</span>
            <span class="input-group-text">0.00</span>
            </div>
           
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="this.currentIndex = 1">next </button> 
        <!-- make sure ony 4 digits can be typed pincode-->
 
      </div>
    </div>
    
     <div class="modal-content" v-show="currentIndex == 1 " 
     > 
     <div v-if="loading" >
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else>
       <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Deposit into {{this.iban}}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" v-show="currentIndex == 1">
        <form>
                 <!-- amount -->
                  <label>Please enter pin for {{this.iban}}</label>
            <div class="input-group">
            <input type="password" name="pin" maxlength="4"
            v-model="depositBody.pincode">

            </div>
             
        </form>
      </div>
      <div class="modal-footer" v-show="currentIndex == 1">
         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="deposit(), this.currentIndex = 0">Deposit </button> 
        <!-- make sure ony 4 digits can be typed pincode-->
 
      </div>
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
        pincode: 0,
    },
    currentIndex : 0,
    loading: false,
    showNext:false,
  }
},
props:{
    iban: String
},
watch:{
  // depositBody.amount(newValue){
  //   if(newValue != null && newValue > 0 ){
  //     console.log(newValue)
  //   }
  // }
},
methods: {
      deposit(){
        if(this.loading == true){return}
        this.loading = true

        axios.post("/transaction/" + this.iban + "/deposit",this.depositBody,axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`)
         .then(result => (this.accounts = JSON.parse(JSON.stringify(result.data)),this.loading = false))
         .catch((error) => {
        toastr.error('Something went wrong' + error)
        });
      
      },
}
}
</script>

<style>

</style>