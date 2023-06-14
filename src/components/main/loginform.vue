<template>
  <div>
    <body>
      <div class="container">
        <div class="row">
          <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div class="card border-0 shadow rounded-3 my-5">
              <div class="card-body p-4 p-sm-5">
                <h5 class="card-title text-center mb-5 fw-light fs-5">Login</h5>
                <form>
                  <div class="form-floating mb-3">
                    <input
                    required
                      type="text"
                      maxlength="10"
                      class="form-control"
                      id="inputUsername"
                      placeholder="Username"
                      v-model="username"
                    />
                    <label for="inputUsername"
                      >Username<span class="text-danger">*</span></label
                    >
                    <span class="text-danger" v-if="v$.username.$error">
                      {{ v$.username.$errors[0].$message }}
                    </span>
                  </div>
                  <div class="form-floating mb-3">
                    <input
                    required
                      maxlength="15"
                      type="password"
                      class="form-control"
                      id="inputPassword"
                      placeholder="Password"
                      v-model="password"
                    />
                    <label for="inputPassword"
                      >Password<span class="text-danger">*</span></label
                    >
                    <span class="text-danger" v-if="v$.password.$error">
                      {{ v$.password.$errors[0].$message }}
                    </span>
                  </div>

                  <div class="d-grid">
                    <button
                      class="btn btn-primary btn-login text-uppercase fw-bold"
                      type="button"
                      @click="login()"
                    >
                      Login
                    </button>
                  </div>
                  <hr class="my-4" />
                  <div class="d-grid mb-2"></div>
                  <a> Not you? </a
                  ><h7 class="text-primary" @click="register()"> register</h7>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
import toastr from "toastr";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "loginForm",
  components: {},
  data() {
    return {
      v$: useVuelidate(),
      username: "",
      password: "",
    };
  },
  validations() {
    return {
      username: { required },
      password: { required },
    };
  },
  mounted(){
 setTimeout(()=>{
     window.location.href = "/";
      },900000);
  },
  methods: {
    login() {
      this.v$.$validate();
      if (!this.v$.$invalid) {
        this.$store
          .dispatch("login", {
            username: this.username,
            password: this.password,
          })
          .then(() => {
            toastr.options.onHidden = function () {
              window.location.href = "/";
            };
            toastr.success("Login successful");
          })
          .catch((error) => {
            toastr.error("Something went wrong" + error);
          });
      } else {
        toastr.error("Please fill in all fields");
      }
    },
    register() {
      this.$router.replace("/register");
    },
  },
};
</script>

<style></style>
