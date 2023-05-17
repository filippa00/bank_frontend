<template>
  <div>
    <div class="container">
      <div class="row align-items-center">
        <div class="col align-items-center">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col">
                  <h3 class="text-left">{{this.account.type}}</h3>
                  <h5 class="text-left text-muted">{{ this.iban }} </h5>
                </div>
                <div class="col">
                  <br />
                  <label
                    type="text"
                    class="form-control"
                    placeholder="account balance"
                    >€{{ this.account.balance }}
                  </label>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="container text-center">
                <div class="row">
                  <div class="col">
                    <div class="d-grid gap-2">
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#depositModal"
                      >
                        Deposit
                      </button>
                    </div>
                  </div>
                  <div class="col">
                    <div class="d-grid gap-2">
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#withdrawModal"
                      >
                        Withdraw
                      </button>
                    </div>
                  </div>
                </div>
                <br />
                <div class="d-grid gap-2">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#transactionModal"
                  >
                    Transfer
                  </button>
                </div>
              </div>
              <DepositModal :iban="this.iban"></DepositModal>
              <WithdrawModal :iban="this.iban"></WithdrawModal>
              <TransactionModal :iban="this.iban"></TransactionModal>
            </div>

          </div>
        </div>
        
            <TransactionDataTable :iban="this.iban"> </TransactionDataTable>
      </div>
    </div>
  </div>
  <div></div>
</template>

<script>
import DepositModal from "../transactions/Modals/depositModal.vue";
import WithdrawModal from "../transactions/Modals/withdrawModal.vue";
import TransactionModal from "../transactions/Modals/transactionModal.vue";
import TransactionDataTable from "../transactions/getTransactionsDataTable.vue";
import axios from "../../axios-auth";
import toastr from "toastr";
//import DataTable from 'datatables.net-dt';

export default {
  components: {
    DepositModal,
    WithdrawModal,
    TransactionModal,
    TransactionDataTable,
    //  DataTable,
  },
  mounted() {
    this.getUserAccounts();
      setTimeout(()=>{
     window.location.href = "/";
      },600000);
  },
  props: {
    iban: String,
  },
  data() {
    return {
      account: Object,
      transactions: [],
      user: localStorage.getItem("username"),
    };
  },
  methods: {
    getUserAccounts() {
      axios
        .get(
          "/account/employee",
          (axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${localStorage.getItem("token")}`)
        )
        .then((result) => {
          result.data.forEach((account) => {
            if (account.iban == this.iban) {
              this.account = JSON.parse(JSON.stringify(account));
              console.log(this.account);
            }
          });
        })
        .catch((error) => {
          toastr.error("Something went wrong" + error);
        });
    },
  },
};
</script>

<style></style>
