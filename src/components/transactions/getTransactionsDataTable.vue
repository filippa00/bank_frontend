<template>
  <div>
    <div id="accordion">
      <div class="card">
        <button
          class="btn btn-outline-secondary btn-lg"
          data-toggle="collapse"
          data-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          Search Transactions
        </button>
        <div
          id="collapseOne"
          class="collapse"
          aria-labelledby="headingOne"
          data-parent="#accordion"
        >
          <div class="card-body">
            <div class="container text-center">
              <div class="row">
                <div class="col">
                  <div class="row g-3 align-items-center">
                    <div class="col-auto">
                      <label for="inputAmountBigger" class="col-form-label"
                        >Amount more than:
                      </label>
                    </div>
                    <div class="col-auto">
                      <input
                        type="number"
                        min="0.00"
                        max="1000000.00"
                        step="0.01"
                        id="inputAmountBigger"
                        placeholder="€0.00"
                        class="form-control"
                        v-model="searchTransactions.inputAmountBigger"
                      />
                    </div>
                    <div class="col-auto"></div>
                  </div>
                </div>
                <div class="col">
                  <div class="row g-3 align-items-center">
                    <div class="col-auto">
                      <label for="inputAmountEquals" class="col-form-label"
                        >Amount equal to:</label
                      >
                    </div>
                    <div class="col-auto">
                      <input
                        type="number"
                        min="0.00"
                        max="1000000.00"
                        step="0.01"
                        id="inputAmountEquals"
                        placeholder="€0.00"
                        class="form-control"
                        v-model="searchTransactions.inputAmountEquals"
                      />
                    </div>
                    <div class="col-auto"></div>
                  </div>
                </div>
                <div class="col">
                  <div
                    class="row g-3 align-items-center"
                    style="margin-right: -30px"
                  >
                    <div class="col-auto">
                      <label for="inputSmallerThan" class="col-form-label"
                        >Amount smaller then:</label
                      >
                    </div>
                    <div class="col-auto">
                      <input
                        type="number"
                        min="0.00"
                        max="1000000.00"
                        step="0.01"
                        id="inputAmountSmaller"
                        placeholder="€0.00"
                        class="form-control"
                        v-model="searchTransactions.inputAmountSmaller"
                      />
                    </div>
                    <div class="col-auto"></div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div
                    class="row g-3 align-items-center"
                    style="margin-right: -30px"
                  >
                    <div class="col-auto">
                      <label for="inputIbanFrom" class="col-form-label"
                        >IBAN From:</label
                      >
                    </div>
                    <div class="col-auto">
                      <input
                        type="text"
                        id="inputIbanFrom"
                        maxlength="20"
                        placeholder="NL 99 BANK 0123 4567 89"
                        class="form-control"
                        v-model="searchTransactions.inputIbanFrom"
                      />
                    </div>
                    <div class="col-auto"></div>
                  </div>
                </div>
                <div class="col">
                  <div class="row g-3 align-items-center">
                    <div class="col-auto">
                      <label for="inputIbanTo" class="col-form-label"
                        >IBAN To:</label
                      >
                    </div>
                    <div class="col-auto">
                      <input
                        type="text"
                        id="inputIbanTo"
                        maxlength="20"
                        placeholder="NL 99 BANK 0123 4567 89"
                        class="form-control"
                        v-model="searchTransactions.inputIbanTo"
                      />
                    </div>
                    <div class="col-auto"></div>
                  </div>
                </div>
                <div class="col">
                  <div class="row g-1 align-items-center"></div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="row g-3 align-items-center">
                    <div class="col-auto">
                      <label for="inputDateFrom" class="col-form-label"
                        >Date From:</label
                      >
                    </div>
                    <div class="col-auto">
                      <input
                        type="datetime-local"
                        id="inputDateFrom"
                        class="form-control"
                        v-model="searchTransactions.inputDateFrom"
                      />
                    </div>
                    <div class="col-auto"></div>
                  </div>
                </div>
                <div class="col">
                  <div class="row g-3 align-items-center">
                    <div class="col-auto">
                      <label for="inputDateFrom" class="col-form-label"
                        >Date To:</label
                      >
                    </div>
                    <div class="col-auto">
                      <input
                        type="datetime-local"
                        id="inputDateFrom"
                        class="form-control"
                        v-model="searchTransactions.inputDateTo"
                      />
                    </div>
                    <div class="col-auto"></div>

                    <!-- <span class="text-danger" v-if="v$.username.$error">
                      {{ v$.username.$errors[0].$message }}
                    </span> -->
                  </div>
                </div>
                <div class="col"></div>
              </div>
              <br />
              <div class="d-grid gap-2">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="this.findTransactions()"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card card-footer">
      <table id="transactionsTable" class="table table-hover">
        <thead class="table-secondary">
          <tr>
            <th>execution date</th>
            <th>amount</th>
            <th>Account From</th>
            <th>Account To</th>
          </tr>
        </thead>
        <tbody
          v-for="transaction in transactions"
          v-bind:key="transaction.executionDate"
        >
          <tr v-if="transaction.accountTo == this.iban" class="table-success">
            <td>{{ formatDate(transaction.executionDate)  }}</td>
            <td>{{ transaction.amount }}</td>
            <td>{{ transaction.accountFrom }}</td>
            <td>{{ transaction.accountTo }}</td>
          </tr>
          <tr v-else>
            <td>{{ formatDate(transaction.executionDate)  }}</td>
            <td>{{ transaction.amount }}</td>
            <td>{{ transaction.accountFrom }}</td>
            <td>{{ transaction.accountTo }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "../../axios-auth";
import toastr from "toastr";
import moment from "moment";
export default {
  name: "TransactionsDataTable",
  props: {
    iban: String,
  },
  mounted() {
    this.findTransactions();
  },
  data() {
    return {
      transactions: [],
      searchTransactions: {
        inputDateFrom: null,
        inputDateTo: null,
        inputIbanFrom: "",
        inputIbanTo: "",
        inputAmountBigger: null,
        inputAmountSmaller: null,
        inputAmountEquals: null,
      },
    };
  },
  methods: {
    findTransactions() {
      const params = this.getQueryParams();
      console.log(params);
      axios
        .get(
          "/transaction/" + this.iban,
          { params },
          (axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${localStorage.getItem("token")}`)
        )
        .then((result) => (this.transactions = result.data))
        .catch((error) => {
          toastr.error("Something went wrong" + error);
        });
    },
    getQueryParams() {
      const params = new URLSearchParams();
      if (
        this.searchTransactions.inputDateFrom != null &&
        this.searchTransactions.inputDateFrom != "Invalid date"
      ) {
        params.set(
          "dateFrom",
          moment(String(this.searchTransactions.inputDateFrom)).format(
            "DD/MM/YYYYThh:mm:ss"
          )
        );
      }
      if (
        this.searchTransactions.inputDateTo != null &&
        this.searchTransactions.inputDateTo != "Invalid date"
      ) {
        params.set(
          "dateTo",
          moment(String(this.searchTransactions.inputDateTo)).format(
            "DD/MM/YYYYThh:mm:ss"
          )
        );
      }
      if (this.searchTransactions.inputIbanFrom != "") {
        params.set("IBANFrom", this.searchTransactions.inputIbanFrom);
      }
      if (this.searchTransactions.inputIbanTo != "") {
        params.set("IBANTo", this.searchTransactions.inputIbanTo);
      }
      if (this.searchTransactions.inputAmountBigger > 0) {
        params.set("amountBigger", this.searchTransactions.inputAmountBigger);
      }
      if (this.searchTransactions.inputAmountEquals > 0) {
        params.set("amountEquals", this.searchTransactions.inputAmountEquals);
      }
      if (this.searchTransactions.inputAmountSmaller > 0) {
        params.set("amountSmaller", this.searchTransactions.inputAmountSmaller);
      }
      return params;
    },
    formatDate(date) {
      return moment(String(date)).format("DD-MM-YYYY hh:mm");
    },
  },
};
</script>

<style></style>
