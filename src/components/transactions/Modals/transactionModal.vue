<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      id="transactionModal"
      tabindex="-1"
      aria-labelledby="transactionModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content" v-show="currentIndex == 0">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Tranfer from {{ this.iban }}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <!-- amount -->
              <br />
              <label
                >Enter an amount to transfer:<span class="text-danger"
                  >*</span
                ></label
              >
              <div class="input-group">
                <input
                  type="number"
                  min="0.00"
                  max="1000000.00"
                  step="0.01"
                  placeholder="€0.00"
                  class="form-control"
                  aria-label="Dollar amount (with dot and two decimal places)"
                  v-model="transferBody.amount"
                />
                <span class="input-group-text">€</span>
                <span class="input-group-text">0.00</span>
              </div>
              <br />
            </form>
          </div>
          <div class="modal-footer">
            <div v-if="showNext">
              <button
                type="button"
                class="btn btn-primary"
                @click="this.currentIndex = 1"
              >
                Next
              </button>
            </div>
            <div v-else>
              <button
                type="button"
                class="btn btn-primary disabled"
                @click="this.currentIndex = 1"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <!-- // -->
        <div class="modal-content" v-show="currentIndex == 1">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Tranfer from {{ this.iban }}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <accountSearchDatatableVue></accountSearchDatatableVue>
              <br />
              <label>To IBAN<span class="text-danger">*</span></label>
              <div class="input-group">
                <input
                  type="text"
                  placeholder="NL 99 BANK 0123 4567 89"
                  class="form-control"
                  v-model="transferBody.accountTo"
                />
              </div>
              <br />
              <label>Add description</label>
              <div class="input-group">
                <input
                  type="text"
                  placeholder="please enter your description here"
                  class="form-control"
                  v-model="transferBody.description"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="this.currentIndex = 0"
            >
              Back
            </button>
            <button type="button" class="btn btn-primary" @click="transfer()">
              Make Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../../axios-auth";
import toastr from "toastr";
import accountSearchDatatableVue from "./accountSearchDatatable.vue";
export default {
  name: "transactionModal",
  components: {
    accountSearchDatatableVue,
  },
  props: {
    iban: String,
  },
  // mounted(){
  // this.accountFrom = this.iban;
  // },
  data() {
    return {
      transferBody: {
        accountFrom: this.iban,
        accountTo: "",
        amount: 0,
        description: "",
      },
      currentIndex: 0,
      showNext: false,
    };
  },
  watch: {
    transferBody: {
      handler(newValue) {
        if (newValue.amount > 0) {
          this.showNext = true;
        } else {
          this.showNext = false;
        }
      },
      deep: true,
    },
  },
  methods: {
    transfer() {
      axios
        .post(
          "/transaction",
          this.transferBody,
          (axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${localStorage.getItem("token")}`)
        )
        .then((result) => {
          this.accounts = JSON.parse(JSON.stringify(result.data));
          toastr.options.onHidden = function () {
            window.location.reload();
          };
          toastr.success("Transaction was a succeeded");
        })
        .catch(() => {
          toastr.options.onHidden = function () {
            window.location.reload();
          };
          toastr.error("Something went wrong: Transaction failed");
        });
    },
  },
};
</script>

<style></style>
