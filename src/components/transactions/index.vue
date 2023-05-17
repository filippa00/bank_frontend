<template>
  <div>
    <body>
      <div class="container">
        <br />
        <h2 class="text-center p-6">ACCOUNTS</h2>
        <br />
        <div v-for="account in accounts" v-bind:key="account.iban">
          <div class="container text-center p-6" id="btn-container">
            <div class="row">
              <div class="col">
                <button
                  type="button"
                  class="btn btn-primary btn-xl"
                  
                  @click="goToAccount(JSON.parse(JSON.stringify(account)))"
                >
                <div class="row">
                  <div class="col">
                    <h6 class="text-left text-muted" >{{account.type}} </h6>
                    <h6 class="text-left" style="margin-top:-5px">{{ account.iban }}</h6>
                  </div>
                  <div class="col">
                      €{{ account.balance }}
                  
                  </div>
                </div>
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
    setTimeout(()=>{
     window.location.href = "/";
      },600000);
  },
  components: {},
  data() {
    return {
      user : localStorage.getItem('username'),
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

<style scoped>

@media screen and (min-width: 500px) {
  button {
    height: 50px;
    width: 500px;
   
  }
}

</style>

