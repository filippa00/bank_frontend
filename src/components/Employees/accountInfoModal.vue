<template>
  <div>

    <div class="modal fade" :class="this.modalActive" data-bs-target="myModel">
  <div class="modal-dialog">
    <div class="v-cell">
      <div class="modal-content">
        <div class="modal-header">
  
         <h1 class="modal-title">Summary</h1>
        </div>
        <div class="modal-body">
           
          <form>
           <h5>Important details</h5>
            <div class="form-group row">
                <label for="Iban" class="col-sm-2 col-form-label ">IBAN</label>
                <div class="col-sm-10">
                <label type="text" readonly class="form-control-plaintext mb-3" id="Iban" >{{accountSummary.iban}}</label>
                </div>
            </div>

            <div class="form-group row">
                <label for="pin" class="col-sm-2 col-form-label">Pin</label>
                <div class="col-sm-10">
                <label type="text" readonly class="form-control-plaintext" id="pin">{{this.accountSummary.pincode}}</label>
                </div>
            </div>

                <h5>Overview</h5>
                <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Customer no.</label>
                <div class="col-sm-10">
                <label type="text" readonly class="form-control-plaintext" id="staticEmail">{{this.accountSummary.userid}}</label>
                </div>
            </div>
            <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Type</label>
                <div class="col-sm-10">
                <label type="text" readonly class="form-control-plaintext" id="staticEmail" >{{this.accountSummary.type}}</label>
                </div>
            </div>
            <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Balance</label>
                <div class="col-sm-10">
                <label type="text" readonly class="form-control-plaintext" id="staticEmail">{{this.accountSummary.balance}}</label>
                </div>
            </div>

            <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Absolute Limit</label>
                <div class="col-sm-10">
                <label type="text" readonly class="form-control-plaintext" id="staticEmail">{{this.accountSummary.absoluteLimit}}</label>
                </div>
            </div>

            <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Active</label>
                <div class="col-sm-10">
                <label type="text" readonly class="form-control-plaintext" id="staticEmail">{{this.accountSummary.active}}</label>
                </div>
            </div>
           
            </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal" @click="$emit('closeModal')">Close</button>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

</template>

<script>
//import $ from 'jquery';
//import bootstrap from 'bootstrap';
//import { Modal } from 'bootstrap'
export default {
  name:"accountInfo",
  props:{
    modalActive:{
      required: true,
      type: String,
      default: '',
    } ,
    accountSummary:Object,
  },


  
  
  

}
</script>

<style>

</style>