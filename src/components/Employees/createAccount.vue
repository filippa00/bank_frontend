<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card border-0 shadow rounded-3 my-5">
            <div class="card-body p-4 p-sm-5">
              <h5 class="card-title text-center mb-5 fw-light fs-5">
                Create a new Account for Customer No.{{ this.id }}
              </h5>
              <form>
                <div class="form-floating mb-3">
                  <input
                    required
                    type="number"
                    min="-10000.00"
                    max="0.0"
                    step="0.01"
                    class="form-control"
                    id="absoluteLimit"
                    placeholder="Absolute Limit e.g €-1500.00"
                    v-model="account.absoluteLimit"
                  />
                  <label for="inputFirstName"
                    >Absolute Limit<span class="text-danger">*</span></label
                  >
                  <span
                    class="text-danger"
                    v-if="v$.account.absoluteLimit.$error"
                  >
                    {{ v$.account.absoluteLimit.$errors[0].$message }}
                  </span>
                </div>

                <div class="form-floating mb-3">
                  <input
                    required
                    type="number"
                    min="0.00"
                    max="10000.00"
                    step="0.01"
                    class="form-control"
                    id="inputBalance"
                    placeholder="€0.00"
                    v-model="account.balance"
                  />
                  <label for="inputBalance"
                    >Balance<span class="text-danger">*</span></label
                  >
                  <span class="text-danger" v-if="v$.account.balance.$error">
                    {{ v$.account.balance.$errors[0].$message }}
                  </span>
                </div>

                <div class="form-floating mb-3">
                  <input
                    required
                    type="number"
                    min="0.00"
                    max="10000.00"
                    step="0.01"
                    class="form-control"
                    id="inputDayLimit"
                    placeholder="€0.00"
                    v-model="account.dayLimit"
                  />
                  <label for="inputDayLimit"
                    >Day Limit<span class="text-danger">*</span></label
                  >
                  <span class="text-danger" v-if="v$.account.dayLimit.$error">
                    {{ v$.account.dayLimit.$errors[0].$message }}
                  </span>
                </div>

                <div class="form-floating mb-3">
                  <input
                    required
                    type="number"
                    min="0.00"
                    max="10000.00"
                    step="0.01"
                    class="form-control"
                    id="transactionLimit"
                    placeholder="€0.00"
                    v-model="account.transactionLimit"
                  />
                  <label for="transactionLimit"
                    >Transaction Limit<span class="text-danger">*</span></label
                  >
                  <span
                    class="text-danger"
                    v-if="v$.account.transactionLimit.$error"
                  >
                    {{ v$.account.transactionLimit.$errors[0].$message }}
                  </span>
                </div>

                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="account.type"
                >
                  <option selected>Account Type</option>
                  <option value="CURRENT">CURRENT</option>
                  <option value="SAVINGS">SAVINGS</option>
                </select>
                <br />
                <div class="d-grid">
                  <button
                    class="btn btn-success btn-login text-uppercase fw-bold"
                    type="button"
                    @click="create()"
                  >
                    Create Account
                  </button>
                </div>
              </form>
              <div
                class="modal fade"
                id="myModal"
                data-bs-target="myModel"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
              >
                <div class="modal-dialog">
                  <div class="v-cell">
                    <div class="modal-content">
                      <AccountInfoModal
                        :accountSummary="this.accountSummary[0]"
                        @closeModal="closeModal"
                      ></AccountInfoModal>

                      <!-- </div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../axios-auth";
import toastr from "toastr";
import AccountInfoModal from "../Employees/accountInfoModal.vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { Modal } from "bootstrap";

export default {
  name: "createAccount",
  components: {
    AccountInfoModal,
  },
  props: {
    id: String,
  },
  data() {
    return {
      v$: useVuelidate(),
      account: {
        absoluteLimit: -100,
        active: true,
        balance: 0,
        currency: "EUR",
        dayLimit: 2000,
        transactionLimit: 300,
        type: "Account Type",
        userid: this.id,
      },
      valid: false,
      modalVisible: false,
      accountSummary: [],
      username: localStorage.getItem("username"),
    };
  },
  watch: {
    modalVisible(newValue) {
      let myModal = new Modal(document.getElementById("myModal"));
      if (newValue == true) {
        myModal.show();
        this.modalVisible = false;
      }
    },
  },
  validations() {
    return {
      account: {
        absoluteLimit: { required },
        active: { required },
        balance: { required },
        dayLimit: { required },
        transactionLimit: { required },
        type: { required },
      },
    };
  },
  methods: {
    create() {
      this.v$.$validate();
      this.formCheck();
      if (!this.v$.$invalid) {
        console.log("no v$invalid");
        console.log(this.valid);
        if (this.valid == true) {
          axios
            .post(
              "/account",
              this.account,
              (axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${localStorage.getItem("token")}`)
            )
            .then(
              (result) => (
                (this.accountSummary[0] = result.data),
                (this.modalVisible = true)
              )
            )
            .catch((error) => {
              toastr.error("Something went wrong" + error);
            });
        }
      } else {
        console.log(this.v$);
        toastr.error("Please fill in all fields");
      }
    },
    closeModal() {
      toastr.options.onHidden = function () {
        this.modalVisible = false;
        window.location.href = "/manage";
      };
      toastr.success("Account successfully created");

      //this.$router.push("/manage");
    },
    formCheck() {
      if (this.account.transactionLimit > this.account.dayLimit) {
        toastr.error("The Day Limit should be more than Transaction Limit");

        this.valid = false;
      } else if (this.account.absoluteLimit > 0) {
        toastr.error("Absolute Limit should be negative");
        this.valid = false;
      } else if (this.account.balance < 0) {
        toastr.error("Starting balance should be positive");
        this.valid = false;
      } else if (this.account.transactionLimit < 0) {
        toastr.error("Transaction Limit should be positive");
        this.valid = false;
      } else if (this.account.dayLimit < 0) {
        toastr.error("Day Limit should be positive");
        this.valid = false;
      } else if (this.account.type == "Account Type") {
        toastr.error("Account must be Current or Savings");
        this.valid = false;
      } else {
        this.valid = true;
      }
    },
  },
};
</script>

<style></style>
