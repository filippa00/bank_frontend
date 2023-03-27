<template>
  <div>
    <body>
      <div class="container">
        <br />
        <h2 class="text-center p-6">ACCOUNTS</h2>
        <br />
        <div v-for="account in accounts" v-bind:key="account.iban">
          <div class="container text-center p-6">
            <div class="row">
              <div class="col">
                <button
                  type="button"
                  class="btn btn-primary"
                  style="height: 50px; width: 500px"
                  @click="goToAccount(JSON.parse(JSON.stringify(account)))"
                >
                  {{ account.iban }} €{{ account.balance }}
                </button>
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
    </body>
  </div>
</template>

<script>
import axios from "../../axios-auth";
import toastr from "toastr";
export default {
  name: "transactionIndex",
  mounted() {
    this.getUserAccounts();
  },
  components: {},
  data() {
    return {
      accounts: [],
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
        .then(
          (result) => (this.accounts = JSON.parse(JSON.stringify(result.data)))
        )
        //
        .catch((error) => {
          toastr.error("Something went wrong" + error);
        });
    },
    goToAccount(account) {
      this.$router.push({ path: "/transactions/" + account.iban });
    },
  },
};
</script>

<style></style>
