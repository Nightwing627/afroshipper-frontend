<template>
  <div>
    <DarkModeSwitcher />
    <div class="container sm:px-10">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Register Info -->
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
        <!-- END: Register Info -->
        <!-- BEGIN: Register Form -->
        <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
          <div
            class="my-auto mx-auto xl:ml-20 bg-white xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
          >
            <h2
              class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left"
            >
              Sign Up
            </h2>
            <div
              class="intro-x mt-2 text-gray-500 dark:text-gray-500 xl:hidden text-center"
            >
              A few more clicks to sign in to your account. Manage all your
              e-commerce accounts in one place
            </div>
            <div class="intro-x mt-8">
              <input
                id="first_name"
                v-model="first_name"
                type="text"
                class="intro-x login__input input input--lg border border-gray-300 block"
                placeholder="First Name"
                required
                autofocus
              />
              <template v-if="$v.first_name.$error">
                <div v-if="!$v.first_name.required" class="text-theme-6 mt-2">
                  Field is required
                </div>
              </template>
              <input
                id="last_name"
                v-model="last_name"
                type="text"
                class="intro-x login__input input input--lg border border-gray-300 block mt-4"
                placeholder="Last Name"
                required
                autofocus
              />
              <template v-if="$v.last_name.$error">
                <div v-if="!$v.last_name.required" class="text-theme-6 mt-2">
                  Field is required
                </div>
              </template>
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
                id="phone"
                v-model="phone"
                type="phone"
                class="intro-x login__input input input--lg border border-gray-300 block mt-4"
                placeholder="Phone"
              />
              <template v-if="$v.phone.$error">
                <div v-if="!$v.phone.required" class="text-theme-6 mt-2">
                  Field is required
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
            <div
              class="intro-x flex items-center text-gray-700 dark:text-gray-600 mt-4 text-xs sm:text-sm"
            >
              <input
                id="remember-me"
                v-model="privacy"
                type="checkbox"
                class="input border mr-2"
              />
              <label class="cursor-pointer select-none" for="remember-me"
                >I agree to
              </label>
              <a
                class="text-theme-1 dark:text-theme-10 ml-1"
                href="http://localhost:8000/terms-conditions"
                >Terms and Conditions</a
              >.
            </div>
            <template v-if="!privacy && $v.$dirty">
              <div class="text-theme-6 mt-2">
                You have to agree on our Privacy policy.
              </div>
            </template>
            <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
              <button
                class="button button--lg w-full xl:w-32 text-white border border-gray-300 dark:border-dark-5 bg-theme-1 xl:mr-3 align-top"
                @click="register"
              >
                Register
              </button>
              <a
                class="button button--lg inline-block w-full xl:w-32 text-gray-700 border border-gray-300 dark:border-dark-5 dark:text-gray-300 mt-3 xl:mt-0 align-top"
                href="login"
              >
                Sign in
              </a>
            </div>
          </div>
        </div>
        <!-- END: Register Form -->
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
    first_name: {
      required
    },
    last_name: {
      required
    },
    email: {
      required,
      email
    },
    phone: {
      required
    },
    password: {
      required,
      minLength: minLength(6)
    },
    password_confirmation: {
      required,
      minLength: minLength(6)
    }
  },
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      privacy: false,
      is_admin: null
    };
  },
  mounted() {
    cash("body")
      .removeClass("app")
      .addClass("login");
  },
  methods: {
    register: function() {
      let data = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        phone: this.phone,
        password: this.password,
        password_confirmation: this.password_confirmation
      };
      if (this.$route.query.ref) data.ref = this.$route.query.ref;

      this.$v.$touch();
      if (!this.privacy) return;
      if (!this.$v.$invalid) {
        this.$store
          .dispatch("main/register", data)
          .then(res => {
            Toastify({
              text:
                "Verification link is sent. Please verify your email and login.",
              close: true
            }).showToast();
            // if (!res.data.has_address) this.$router.push({ name: "addresses" });
            // else this.$router.push("/");
            this.$router.push("/login");
          })
          .catch(err => {
            const data = err.response.data;
            Toastify({
              text: data.message || data.errors[0],
              close: true
            }).showToast();
          });
      }
    }
  }
};
</script>
