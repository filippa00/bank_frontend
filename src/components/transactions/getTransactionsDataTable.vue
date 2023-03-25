<template>
    <div>
        <body>
            <div class="container">
                <br>
                <h5 class="text-center p-6">Search for a transaction</h5>
                <br>


        <div class="input-group mb-3">
          <select name="querySearch" v-model="transactionKey" id="querySearch" class=" btn btn-outline-secondary dropdown-toggle">
            <!-- <option  class="dropdown-item " v-bind:value="''">Filter</option> -->
          <option  class="dropdown-item" v-bind:value="'dateFrom'">Date From</option>
          <option   class="dropdown-item" v-bind:value="'IBANFrom'" >IBan From</option>
          <option  class="dropdown-item" v-bind:value="'amountEquals'" >Equal to amount</option>
          <option  class="dropdown-item" v-bind:value="'amountBigger'">Higher than amount</option>
            <option  class="dropdown-item"  v-bind:value="'amountSmaller'" >Lower than amount</option>
            <option   class="dropdown-item" v-bind:value="'IBANTo'" >IBan To</option>
        </select>
        <input v-model="inputParameter" type="text" class="form-control" aria-label="Text input with dropdown button">
        </div> 
    <br>
    <h5 text-center p-6>To...</h5>

    <div class="input-group mb-3">
          <select name="querySearch2" v-model="transactionKey2" id="querySearch2" class=" btn btn-outline-secondary dropdown-toggle">
            <!-- <option  class="dropdown-item " v-bind:value="''">Filter</option> -->
          <option  class="dropdown-item" v-bind:value="'dateTo'">Date To</option>
          <option   class="dropdown-item" v-bind:value="'IBANTo'" >IBan To</option>
          <option  class="dropdown-item" v-bind:value="'amountSmaller'">Lower than amount</option>
          
        </select>
        <input v-model="inputParameter2" type="text" class="form-control" aria-label="Text input with dropdown button">
        </div> 
        <button type="button" class="btn btn-primary"  @click="this.findTransactions()">Press me </button>
            <br>
            <table id="transactionsTable" class="table table-hover">
              <thead class="table-secondary">
                  <tr>
                      <th>execution date</th>
                      <th>amount</th>
                      <th>Account From</th>
                      <th>Account To</th>
                  </tr>
              </thead>
              <tbody v-for="transaction in transactions" v-bind:key="transaction.executionDate">
                  <tr>
                      <td>{{transaction.executionDate}}</td>
                      <td>{{transaction.amount}}</td>
                      <td>{{transaction.accountFrom}}</td>
                      <td>{{transaction.accountTo}}</td>
                  </tr>
              </tbody>
          </table>
        </div>
        </body>
    </div>
</template>

<script>

import axios from '../../axios-auth';
import toastr from "toastr";
//import $ from 'jquery';
export default {
name :'TransactionsDataTable',
props:{
    iban: String
},

created(){
//     $.noConflict();
//       $(document).ready(function () {
//     $('#transactionsTable').DataTable();
//     });
   },
  mounted() {
  this.findTransactions();
  //console.log(this.iban)
  },
   data(){
    return{
      transactions:[],
      transactionKey: '',
      transactionKey2: '',
      inputParameter:'',
      inputParameter2:'',
    }
  },
methods: {
      // getTransactions(){
      //   axios.get("/transaction/"+ this.iban,axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`)
      //  .then(result => this.transactions = result.data)
      // .catch((error) => {
      //   toastr.error('Something went wrong' + error)
      //   });
      // },
      findTransactions(){
        const params = new URLSearchParams()
         params.set(this.transactionKey, this.inputParameter)
         params.set(this.transactionKey2,this.inputParameter2)
          axios.get("/transaction/"+ this.iban,{ params }
            ,axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`)
       .then(result => this.transactions = result.data)
         .catch((error) => {
        toastr.error('Something went wrong' + error)
        });
      }
}
}
</script>

<style>

</style>