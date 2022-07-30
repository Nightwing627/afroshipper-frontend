<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Profile & Password</h2>
    </div>
    <div class="grid grid-cols-12 gap-6">
      <!-- BEGIN: Profile Menu -->
      <div class="col-span-12 lg:col-span-6 flex lg:block flex-col-reverse">
        <div class="intro-y box mt-5">
          <!-- BEGIN: Change profile -->
          <div class="intro-y box lg:mt-5">
            <div
              class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5"
            >
              <h2 class="font-medium text-base mr-auto">Change Profile</h2>
            </div>
            <div class="p-5">
              <div>
                <label>First name</label>
                <input
                  type="text"
                  v-model="profile.first_name"
                  class="input w-full border mt-2"
                  placeholder="Input text"
                />
                <template v-if="$v.profile.first_name.$error">
                  <div
                    v-if="!$v.profile.first_name.required"
                    class="text-theme-6 mt-2"
                  >
                    Field is required
                  </div>
                </template>
              </div>
              <div class="mt-3">
                <label>Last name</label>
                <input
                  type="text"
                  v-model="profile.last_name"
                  class="input w-full border mt-2"
                  placeholder="Input text"
                />
                <template v-if="$v.profile.last_name.$error">
                  <div
                    v-if="!$v.profile.last_name.required"
                    class="text-theme-6 mt-2"
                  >
                    Field is required
                  </div>
                </template>
              </div>
               <div class="mt-3">
                <label>Phone</label>
                <input
                  type="text"
                  v-model="profile.phone"
                  class="input w-full border mt-2"
                  placeholder="Input text"
                />
                <template v-if="$v.profile.phone.$error">
                  <div
                    v-if="!$v.profile.phone.required"
                    class="text-theme-6 mt-2"
                  >
                    Field is required
                  </div>
                </template>
              </div>
              <div class="mt-3">
                <label>Email</label>
                <input
                  type="email"
                  v-model="profile.email"
                  class="input w-full border mt-2"
                  placeholder="Input text"
                />
                <template v-if="$v.profile.email.$error">
                  <div
                    v-if="!$v.profile.email.required"
                    class="text-theme-6 mt-2"
                  >
                    Field is required
                  </div>
                  <div v-if="!$v.profile.email.email" class="text-theme-6 mt-2">
                    Please enter a valid email address.
                  </div>
                </template>
              </div>
              <button
                type="button"
                class="button bg-theme-1 text-white mt-4"
                @click="onChangeProfile"
              >
                Update Profile
              </button>
            </div>
          </div>
          <!-- END: Change Password -->
        </div>
      </div>
      <!-- END: Profile Menu -->
      <div class="col-span-12 lg:col-span-6">
        <!-- BEGIN: Change Password -->
        <div class="intro-y box lg:mt-5">
          <div
            class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5"
          >
            <h2 class="font-medium text-base mr-auto">Change Password</h2>
          </div>
          <div class="p-5">
            <div>
              <label>Old Password</label>
              <input
                type="password"
                v-model="password.old_pwd"
                class="input w-full border mt-2"
                placeholder="Input text"
              />
              <template v-if="$v.password.old_pwd.$error">
                <div
                  v-if="!$v.password.old_pwd.required"
                  class="text-theme-6 mt-2"
                >
                  Field is required
                </div>
              </template>
            </div>
            <div class="mt-3">
              <label>New Password</label>
              <input
                type="password"
                v-model="password.new_pwd"
                class="input w-full border mt-2"
                placeholder="Input text"
              />
              <template v-if="$v.password.new_pwd.$error">
                <div
                  v-if="!$v.password.new_pwd.required"
                  class="text-theme-6 mt-2"
                >
                  Field is required
                </div>
              </template>
            </div>
            <div class="mt-3">
              <label>Confirm New Password</label>
              <input
                type="password"
                v-model="password.pwd_confirm"
                class="input w-full border mt-2"
                placeholder="Input text"
              />
              <template v-if="$v.password.pwd_confirm.$error">
                <div
                  v-if="!$v.password.pwd_confirm.required"
                  class="text-theme-6 mt-2"
                >
                  Field is required
                </div>
                <div
                  v-else-if="!$v.password.pwd_confirm.sameAsPassword"
                  class="text-theme-6 mt-2"
                >
                  Please confirm new password
                </div>
              </template>
            </div>
            <button
              type="button"
              class="button bg-theme-1 text-white mt-4"
              @click="onChangePwd"
            >
              Change Password
            </button>
          </div>
        </div>
        <!-- END: Change Password -->
      </div>
    </div>
  </div>
</template>

<script>
import Toastify from "toastify-js";
import { validationMixin } from "vuelidate";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations: {
    profile: {
      first_name: {
        required
      },
      last_name: {
        required
      },
      phone: {
        required
      },
      email: {
        required,
        email
      }
    },
    password: {
      old_pwd: {
        required,
        minLength: minLength(6)
      },
      new_pwd: {
        required,
        minLength: minLength(6)
      },
      pwd_confirm: {
        required,
        minLength: minLength(6),
        sameAsPassword: sameAs("new_pwd")
      }
    }
  },
  data() {
    return {
      profile: {
        first_name: this.$store.state.main.user.first_name,
        last_name: this.$store.state.main.user.last_name,
        phone: this.$store.state.main.user.phone,
        email: this.$store.state.main.user.email
      },
      password: {
        old_pwd: "",
        new_pwd: "",
        pwd_confirm: ""
      }
    };
  },
  mounted() {},
  methods: {
    onChangeProfile() {
      this.$v.profile.$touch();
      if (this.$v.profile.$invalid) return;

      this.$store
        .dispatch("main/updateProfile", this.profile)
        .then(res => {
          Toastify({
            text: "Profile updated.",
            backgroundColor: "#0e2c88",
            gravity: "bottom",
            position: "center",
            close: true
          }).showToast();
        })
        .catch(err => {
          let msg = err.response.data.message || err.response.data.errors[0];
          Toastify({
            text: msg,
            backgroundColor: "#D32929",
            gravity: "bottom",
            position: "center",
            close: true
          }).showToast();
        });
    },
    onChangePwd() {
      this.$v.password.$touch();
      if (this.$v.password.$invalid) return;

      this.$store
        .dispatch("main/changePwd", this.password)
        .then(res => {
          Toastify({
            text: "Password changed.",
            backgroundColor: "#0e2c88",
            gravity: "bottom",
            position: "center",
            close: true
          }).showToast();
        })
        .catch(err => {
          let msg = err.response.data.message || err.response.data.errors[0];
          Toastify({
            text: msg,
            backgroundColor: "#D32929",
            gravity: "bottom",
            position: "center",
            close: true
          }).showToast();
        });
    }
  }
};
</script>
