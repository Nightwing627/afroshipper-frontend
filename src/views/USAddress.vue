<template>
  <div>
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
      <h2 class="text-lg font-medium">
        Change US Shipping Address here.
      </h2>
    </div>

    <div>
      <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="col-span-12 md:col-span-4 box">
          <div class="intro-y w-full p-5">
            <div>
              <label>Address</label>
              <input
                v-model="address.address"
                type="text"
                class="input w-full border mt-2"
              />
              <template v-if="$v.address.address.$error">
                <div
                  v-if="!$v.address.address.required"
                  class="text-theme-6 mt-2"
                >
                  Field is required
                </div>
              </template>
            </div>
            <div class="mt-3">
              <label>Address 2</label>
              <input
                v-model="address.address2"
                type="text"
                class="input w-full border mt-2"
              />
            </div>
            <div class="mt-3">
              <label>Mobile Phone</label>
              <input
                v-model="address.phone"
                type="text"
                class="input w-full border mt-2"
              />
              <template v-if="$v.address.phone.$error">
                <div
                  v-if="!$v.address.phone.required"
                  class="text-theme-6 mt-2"
                >
                  Field is required
                </div>
              </template>
            </div>
            <div class="mt-3">
              <label>City</label>
              <input
                v-model="address.city"
                type="text"
                class="input w-full border mt-2"
              />
              <template v-if="$v.address.city.$error">
                <div v-if="!$v.address.city.required" class="text-theme-6 mt-2">
                  Field is required
                </div>
              </template>
            </div>
            <div class="mt-3">
              <label>State</label>
              <input
                v-model="address.state"
                type="text"
                class="input w-full border mt-2"
              />
              <template v-if="$v.address.state.$error">
                <div
                  v-if="!$v.address.state.required"
                  class="text-theme-6 mt-2"
                >
                  Field is required
                </div>
              </template>
            </div>
            <div class="mt-3">
              <label>Zip Code</label>
              <input
                v-model="address.zipcode"
                type="text"
                class="input w-full border mt-2"
              />
              <template v-if="$v.address.zipcode.$error">
                <div
                  v-if="!$v.address.zipcode.required"
                  class="text-theme-6 mt-2"
                >
                  Field is required
                </div>
              </template>
            </div>
            <button
              class="button w-full mt-3 bg-theme-1 text-white"
              @click.prevent="save"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toastify from "toastify-js";
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations: {
    address: {
      address: {
        required
      },
      phone: {
        required
      },
      city: {
        required
      },
      state: {
        required
      },
      zipcode: {
        required
      }
    }
  },
  data() {
    return {
      address: {
        address: "",
        address2: "",
        phone: "",
        city: "",
        state: "",
        zipcode: ""
      }
    };
  },
  mounted() {
    this.address = this.$store.state.main.usAddress || {
      address: "1430 Katy Flewellen Rd",
      address2: "Unit 5034",
      phone: "+1 832 974 1951",
      city: "Katy",
      state: "Texas (TX)",
      zipcode: "77494"
    };
  },
  methods: {
    save(e) {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.dispatch("main/changeUSAddress", this.address).then(res => {
          Toastify({
            text: "US shipping address changed.",
            backgroundColor: "#0e2c88",
            gravity: "bottom",
            position: "center",
            close: true
          }).showToast();
          localStorage.setItem("usAddress", res.value);
        });
      }
    }
  }
};
</script>
