<template>
  <div>
    <DarkModeSwitcher />
    <div class="container sm:px-10">
      <div class="block xl:grid grid-cols-2 gap-4">
        <div class="hidden xl:flex flex-col min-h-screen">
          <a href="" class="-intro-x flex items-center pt-5">
            <img
              alt="Midone Tailwind HTML Admin Template"
              style="width: 500px;"
              :src="require(`@/assets/images/logo-ex.png`)"
            />
            <span class="text-white text-lg ml-3">
              Mid<span class="font-medium">One</span>
            </span>
          </a>
          <div class="my-auto">
            <img
              alt="Midone Tailwind HTML Admin Template"
              class="-intro-x w-1/2 -mt-16"
              :src="require(`@/assets/images/illustration.svg`)"
            />
            <div
              class="-intro-x text-white font-medium text-4xl leading-tight mt-10"
            >
              A few more clicks to <br />
              sign up to your account.
            </div>
            <div class="-intro-x mt-5 text-lg text-white dark:text-gray-500">
              Manage all your e-commerce accounts in one place
            </div>
          </div>
        </div>
        <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
          <div
            class="my-auto mx-auto xl:ml-20 bg-white xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
          >
            <h2
              class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left"
            >
              Reset your password.
            </h2>
            <div class="intro-x mt-8">
              <input
                id="email"
                v-model="email"
                type="email"
                class="intro-x login__input input input--lg border border-gray-300 block mt-4"
                placeholder="Email"
              />
              <template v-if="$v.email.$error">
                <div v-if="!$v.email.required" class="text-theme-6 mt-2">
                  Field is required
                </div>
                <div v-if="!$v.email.email" class="text-theme-6 mt-2">
                  Please enter a valid email address.
                </div>
              </template>
              <input
                id="password"
                v-model="password"
                type="password"
                class="intro-x login__input input input--lg border border-gray-300 block mt-4"
                placeholder="Password"
              />
              <template v-if="$v.password.$error">
                <div v-if="!$v.password.required" class="text-theme-6 mt-2">
                  Field is required
                </div>
              </template>
              <input
                id="password_confirmation"
                v-model="password_confirmation"
                type="password"
                class="intro-x login__input input input--lg border border-gray-300 block mt-4"
                placeholder="Password Confirmation"
              />
              <template v-if="$v.password_confirmation.$error">
                <div
                  v-if="!$v.password_confirmation.required"
                  class="text-theme-6 mt-2"
                >
                  Please confirm password
                </div>
              </template>
            </div>

            <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
              <button
                class="button button--lg w-full xl:w-40 text-white border border-gray-300 dark:border-dark-5 bg-theme-1 xl:mr-3 align-top"
                @click="resetPwd"
              >
                Reset Password
              </button>
              <a
                class="button button--lg inline-block w-full xl:w-32 text-gray-700 border border-gray-300 dark:border-dark-5 dark:text-gray-300 mt-3 xl:mt-0 align-top"
                href="/login"
              >
                Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DarkModeSwitcher from "@/components/DarkModeSwitcher";
import Toastify from "toastify-js";
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  components: {
    DarkModeSwitcher
  },
  mixins: [validationMixin],
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    },
    password_confirmation: {
      required
    }
  },
  data() {
    return {
      email: "",
      password: "",
      password_confirmation: ""
    };
  },
  mounted() {
    cash("body")
      .removeClass("app")
      .addClass("login");
  },
  methods: {
    resetPwd: function() {
      let data = {
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      };
      if (this.$route.query.token) data.token = this.$route.query.token;

      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store
          .dispatch("main/resetPwd", data)
          .then(res => {
            Toastify({
              text: "Password reset successful.",
              close: true
            }).showToast();
          })
          .catch(err => {
            const data = err.response.data;
            Toastify({
              text: data.error.message,
              close: true
            }).showToast();
          });
      }
    }
  }
};
</script>
