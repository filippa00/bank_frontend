<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      id="withdrawModal"
      tabindex="-1"
      aria-labelledby="withdrawModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content" v-show="currentIndex == 0">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Withdraw from {{ this.iban }}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body" v-show="currentIndex == 0">
            <form>
              <!-- amount -->
              <br />
              <label
                >Enter an amount to withdraw:<span class="text-danger"
                  >*</span
                ></label
              >
              <div class="input-group">
                <input
                  type="number"
                  min="5.00"
                  max="1000000.00"
                  step="0.01"
                  placeholder="€0.00"
                  class="form-control"
                  aria-label="Dollar amount (with dot and two decimal places)"
                  v-model="withdrawBody.amount"
                />
                <span class="input-group-text">€</span>
                <span class="input-group-text">0.00</span>
              </div>
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
        <!-- / -->
        <div class="modal-content" v-show="currentIndex == 1">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Withdraw from {{ this.iban }}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body" v-show="currentIndex == 1"></div>
          <form>
            <div class="input-wrapper">
              <p style="margin-right: 190px">
                Please enter pin for {{ this.iban }}
              </p>
              <VuePincodeInput
                v-model="withdrawBody.pincode"
                class="input-group"
              />
            </div>
          </form>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="this.currentIndex = 0"
            >
              Back
            </button>
            <button type="button" class="btn btn-primary" @click="withdraw()">
              Withdraw
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
import VuePincodeInput from "vue3-pincode-input";
export default {
  name: "withdrawModal",
  data() {
    return {
      withdrawBody: {
        amount: 5,
        pincode: 0,
      },
      currentIndex: 0,
      showNext: true,
    };
  },
  components: {
    VuePincodeInput,
  },
  props: {
    iban: String,
  },
  watch: {
    withdrawBody: {
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
    withdraw() {
      axios
        .post(
          "/transaction/" + this.iban + "/withdraw",
          this.withdrawBody,
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
        .catch((err) => {
          toastr.options.onHidden = function () {
            window.location.reload();
          };
          //toastr.error('Something went wrong: The wrong pincode was entered')
          toastr.error(err);
        });
    },
  },
};
</script>

<style></style>
