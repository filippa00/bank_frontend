<template>
  <div>
    <div class="modal-header">
      <h1 class="modal-title">Summary</h1>
    </div>
    <div class="modal-body">
      <div class="container text-center">
        <div class="row bg-primary">
          <div class="col">
            <h5 class="text-white">Important details</h5>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="Iban" class="col col-form-label">IBAN</label>
          </div>
          <div class="col">
            <label
              type="text"
              readonly
              class="form-control-plaintext mb-3"
              id="Iban"
              >{{ accountSummary.iban }}</label
            >
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col">
            <label for="pin" class="col col-form-label">Pin</label>
          </div>
          <div class="col">
            <label
              type="text"
              readonly
              class="form-control-plaintext"
              id="pin"
              >{{ this.accountSummary.pincode }}</label
            >
          </div>
        </div>
        <br />
        <div class="row bg-primary">
          <div class="col">
            <h5 class="text-white">Overview</h5>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col">
            <label for="userId" class="col col-form-label">Customer no.</label>
          </div>
          <div class="col">
            <label
              type="text"
              readonly
              class="form-control-plaintext"
              id="userId"
              >{{ this.accountSummary.userid }}</label
            >
          </div>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col">
          <label for="type" class="col col-form-label">Type</label>
        </div>
        <div class="col">
          <label
            type="text"
            readonly
            class="form-control-plaintext"
            id="type"
            >{{ this.accountSummary.type }}</label
          >
        </div>
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col">
        <label for="balance" class="col col-form-label">Balance</label>
      </div>
      <div class="col">
        <label
          type="text"
          readonly
          class="form-control-plaintext"
          id="balance"
          >{{ this.accountSummary.balance }}</label
        >
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col">
        <label for="absoluteLimit" class="col col-form-label"
          >Absolute Limit</label
        >
      </div>
      <div class="col">
        <label
          type="text"
          readonly
          class="form-control-plaintext"
          id="absoluteLimit"
          >{{ this.accountSummary.absoluteLimit }}</label
        >
      </div>
    </div>

    <br />
    <div class="row">
      <div class="col">
        <label for="active" class="col col-form-label">Active</label>
      </div>
      <div class="col">
        <label
          type="text"
          readonly
          class="form-control-plaintext"
          id="active"
          >{{ this.accountSummary.active }}</label
        >
      </div>
    </div>
  </div>
  <div class="modal-footer">
    <button
      type="button"
      class="btn btn-default"
      data-dismiss="modal"
      @click="$emit('closeModal')"
    >
      Close
    </button>
  </div>
</template>

<script>
export default {
  name: "accountInfo",
  props: {
    showModal: Boolean,
    accountSummary: {
      required: true,
      type: Object,
      default: () => ({
        iban: "",
        pincode: 0,
        userid: 0,
        type: "",
        balance: 0,
        absoluteLimit: 0,
        active: true,
      }),
    },
  },
};
</script>

<style></style>
