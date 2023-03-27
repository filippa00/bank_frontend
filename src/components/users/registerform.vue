<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card border-0 shadow rounded-3 my-5">
            <div class="card-body p-4 p-sm-5">
              <h5 class="card-title text-center mb-5 fw-light fs-5">
                Register a new Customer
              </h5>

              <form>
                <strong>Basic information</strong>

                <div class="form-floating mb-3">
                  <input
                    required
                    type="text"
                    maxlength="10"
                    class="form-control"
                    id="inputFirstName"
                    placeholder="First name"
                    v-model="customer.firstname"
                  />
                  <label for="inputFirstName"
                    >First Name<span class="text-danger">*</span></label
                  >
                  <span class="text-danger" v-if="v$.customer.firstname.$error">
                    {{ v$.customer.firstname.$errors[0].$message }}
                  </span>
                </div>

                <div class="form-floating mb-3">
                  <input
                    required
                    type="text"
                    maxlength="15"
                    class="form-control"
                    id="inputLastName"
                    placeholder="LastName"
                    v-model="customer.lastname"
                  />
                  <label for="inputLastName"
                    >Last Name<span class="text-danger">*</span></label
                  >
                  <span class="text-danger" v-if="v$.customer.lastname.$error">
                    {{ v$.customer.lastname.$errors[0].$message }}
                  </span>
                </div>

                <div class="form-floating mb-3">
                  <input
                    required
                    type="email"
                    maxlength="30"
                    class="form-control"
                    id="inputEmail"
                    placeholder="name@example.com"
                    v-model="customer.email"
                  />
                  <label for="inputEmail"
                    >Email address<span class="text-danger">*</span></label
                  >
                  <span class="text-danger" v-if="v$.customer.email.$error">
                    {{ v$.customer.email.$errors[0].$message }}
                  </span>
                </div>

                <div class="form-floating mb-3">
                  <input
                    required
                    type="text"
                    maxlength="50"
                    class="form-control"
                    id="addressEmail"
                    placeholder="Address: Nr | Street | Postcode"
                    v-model="customer.address"
                  />
                  <label for="addressEmail"
                    >Address: Nr | Street | Postcode<span class="text-danger"
                      >*</span
                    ></label
                  >
                  <span class="text-danger" v-if="v$.customer.address.$error">
                    {{ v$.customer.address.$errors[0].$message }}
                  </span>
                </div>

                <div class="form-floating mb-3">
                  <input
                    required
                    type="tel"
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    maxlength="15"
                    class="form-control"
                    id="inputPhone"
                    placeholder="phone"
                    v-model="customer.phone"
                  />
                  <label for="inputPhone"
                    >Phone<span class="text-danger">*</span></label
                  >
                  <span class="text-danger" v-if="v$.customer.phone.$error">
                    {{ v$.customer.phone.$errors[0].$message }}
                  </span>
                </div>
                <strong>Basic information</strong>
                <div class="form-floating mb-3">
                  <input
                    required
                    type="text"
                    maxlength="20"
                    class="form-control"
                    id="inputUsername"
                    placeholder="username"
                    v-model="customer.username"
                  />
                  <label for="inputUsername"
                    >Username<span class="text-danger">*</span></label
                  >
                  <span class="text-danger" v-if="v$.customer.username.$error">
                    {{ v$.customer.username.$errors[0].$message }}
                  </span>
                </div>

                <div class="form-floating mb-3">
                  <input
                    required
                    type="password"
                    maxlength="20"
                    class="form-control"
                    id="inputPassword"
                    placeholder="Password"
                    v-model="customer.password"
                  />
                  <label for="inputPassword"
                    >Password<span class="text-danger">*</span></label
                  >
                  <span class="text-danger" v-if="v$.customer.password.$error">
                    {{ v$.customer.password.$errors[0].$message }}
                  </span>
                </div>

                <div class="d-grid">
                  <button
                    class="btn btn-primary btn-login text-uppercase fw-bold"
                    type="button"
                    @click="Register()"
                  >
                    Register Customer
                  </button>
                </div>
              </form>
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
import { useVuelidate } from "@vuelidate/core";
import { required, email, alpha, numeric } from "@vuelidate/validators";
export default {
  name: "registerForm",
  data() {
    return {
      v$: useVuelidate(),
      customer: {
        firstname: "",
        lastname: "",
        email: "",
        address: "",
        phone: "",
        password: "",
        username: "",
      },
    };
  },
  validations() {
    return {
      customer: {
        firstname: { required, alpha },
        lastname: { required, alpha },
        email: { required, email },
        address: { required },
        phone: { required, numeric },
        password: { required },
        username: { required },
      },
    };
  },
  methods: {
    Register() {
      this.v$.$validate();
      if (!this.v$.$invalid) {
        axios
          .post(
            "/user/",
            this.customer,
            (axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${localStorage.getItem("token")}`)
          )

          .then(function () {
            toastr.success("Successfully resgistered new user");
          })
          .catch(() => {
            toastr.error("Something went wrong, the username already exists");
          });
      } else {
        toastr.error("Please fill in all fields");
      }
    },
  },
};
</script>

<style></style>
