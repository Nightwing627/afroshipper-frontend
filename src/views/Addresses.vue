<template>
  <div>
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">AfroShipper US Address</h2>
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <button
          class="button text-white bg-theme-1 shadow-md mr-2"
          @click="onClickAdd"
        >
          Add New Address
        </button>
      </div>
    </div>
    <!-- BEGIN: Address Data -->
    <div>
      <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="col-span-12 md:col-span-3 h-full">
          <div class="intro-y p-5 box h-full">
            <p class="text-center mb-5 px-5">
              <b>Use this when checking out at your favorite online store.</b>
            </p>
            <div class="grid grid-cols-12 gap-3">
              <div class="col-span-6 saddress-item">
                <p class="desc">Attn</p>
                <p class="value text-theme-9">
                  {{ $store.state.main.user.uid }}
                </p>
              </div>
              <div class="col-span-6"></div>
              <div class="col-span-6 saddress-item">
                <p class="desc">First Name</p>
                <p class="value">{{ $store.state.main.user.first_name }}</p>
              </div>
              <div class="col-span-6 saddress-item">
                <p class="desc">Last Name</p>
                <p class="value">{{ $store.state.main.user.last_name }}</p>
              </div>
              <div class="col-span-12 saddress-item">
                <p class="desc">Address</p>
                <p class="value">{{ $store.state.main.usAddress.address }}</p>
              </div>
              <div class="col-span-12 saddress-item">
                <p class="desc">Address 2</p>
                <p class="value">{{ $store.state.main.usAddress.address2 }}</p>
              </div>
              <div class="col-span-7 saddress-item">
                <p class="desc">Phone Number</p>
                <p class="value">{{ $store.state.main.usAddress.phone }}</p>
              </div>
              <div class="col-span-5 saddress-item">
                <p class="desc">City</p>
                <p class="value">{{ $store.state.main.usAddress.city }}</p>
              </div>
              <div class="col-span-6 saddress-item">
                <p class="desc">State</p>
                <p class="value">{{ $store.state.main.usAddress.state }}</p>
              </div>
              <div class="col-span-6 saddress-item">
                <p class="desc">Zip Code</p>
                <p class="value">{{ $store.state.main.usAddress.zipcode }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-12 md:col-span-9 h-full">
          <div class="intro-y p-5 box h-full">
            <h1
              v-if="addresses.length <= 0"
              class="text-center block text-lg mt-5"
            >
              Please create your addresses.
            </h1>
            <div class="grid grid-cols-12 gap-6">
              <div
                v-for="(a, index) in addresses"
                :key="'a-' + index"
                class="col-span-12 md:col-span-6 lg:col-span-4 h-full shadow-xl"
              >
                <div
                  class="intro-y box"
                  :class="a.is_primary ? 'bg-theme-1 text-white' : ''"
                >
                  <div
                    class="flex flex-col sm:flex-row items-center p-5 border-b border-gray-400 dark:border-dark-5"
                  >
                    <h2 class="font-medium text-base mr-auto flex items-center">
                      <MapPinIcon class="w-6 h-6 mr-2"></MapPinIcon>
                      {{ a.address }}
                      <a
                        v-if="a.is_primary"
                        class="flex items-center ml-3 inline-block"
                      >
                        <CheckCircleIcon class="w-6 h-6"></CheckCircleIcon>
                      </a>
                    </h2>
                    <div class="dropdown ml-auto sm:ml-0">
                      <a
                        class="dropdown-toggle text-white-700 dark:text-gray-300"
                      >
                        <span class="w-5 h-5 flex items-center justify-center">
                          <MenuIcon class="w-5 h-5"></MenuIcon>
                        </span>
                      </a>
                      <div class="dropdown-box w-40 shadow-lg">
                        <div
                          class="dropdown-box__content box dark:bg-dark-1 p-2"
                        >
                          <a
                            v-if="!a.is_primary"
                            class="flex items-center text-theme-1 block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                            @click="setAsPrimary(a.id)"
                          >
                            <CheckCircleIcon
                              class="w-6 h-6 mr-2"
                            ></CheckCircleIcon>
                            Set As Primary
                          </a>
                          <a
                            class="flex items-center text-theme-7 block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                            @click="onClickEdit(a)"
                          >
                            <EditIcon class="w-6 h-6 mr-2"></EditIcon> Edit
                          </a>
                          <a
                            class="flex items-center text-theme-6 block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                            @click="onClickDelete(a.id)"
                          >
                            <Trash2Icon class="w-6 h-6 mr-2"></Trash2Icon>
                            Remove
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="p-5 preview">
                    <p class="mt-3 flex justify-between">
                      City: <b class="w-2/3">{{ a.city }}</b>
                    </p>
                    <p class="mt-3 flex justify-between">
                      State: <b class="w-2/3">{{ a.state }}</b>
                    </p>
                    <p class="mt-3 flex justify-between">
                      Email:
                      <b v-if="a.emails.length > 0" class="w-2/3">
                        {{ a.emails[0] }}
                      </b>
                    </p>
                    <p class="mt-3 flex justify-between">
                      Phone:
                      <b v-if="a.phones.length > 0" class="w-2/3">
                        {{ a.phones[0] }}
                      </b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END: Address Data -->
    <div id="address-modal" class="modal">
      <div class="modal__content">
        <div class="intro-y box">
          <div
            class="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200 dark:border-dark-5"
          >
            <h2 class="font-medium text-base mr-auto">
              {{ isNew ? "Add new address" : "Edit address" }}
            </h2>
          </div>
          <div class="p-5 preview">
            <label class="block mb-2">Delivery Address</label>
            <input
              id="address"
              v-model="address.address"
              type="text"
              class="intro-x login__input input input--md border border-gray-300 block w-full"
              placeholder="Address"
              autofocus
            />
            <template v-if="$v.address.address.$error">
              <div
                v-if="!$v.address.address.required"
                class="text-theme-6 mt-2"
              >
                Field is required
              </div>
            </template>
            <!-- <label class="block mb-2 mt-4">Street Name</label>
            <input
              id="street_name"
              v-model="address.street_name"
              type="text"
              class="intro-x login__input input input--md border border-gray-300 block w-full"
              placeholder="Street Name"
            />
            <template v-if="$v.address.street_name.$error">
              <div
                v-if="!$v.address.street_name.required"
                class="text-theme-6 mt-2"
              >
                Field is required
              </div>
            </template>
            <label class="block mb-2 mt-4">Street</label>
            <input
              id="street"
              v-model="address.street"
              type="text"
              class="intro-x login__input input input--md border border-gray-300 block w-full"
              placeholder="Street Name"
            />
            <template v-if="$v.address.street.$error">
              <div v-if="!$v.address.street.required" class="text-theme-6 mt-2">
                Field is required
              </div>
            </template> -->
            <label class="block mb-2 mt-4">City</label>
            <input
              id="city"
              v-model="address.city"
              type="text"
              class="intro-x login__input input input--md border border-gray-300 block w-full"
              placeholder="City"
            />
            <template v-if="$v.address.city.$error">
              <div v-if="!$v.address.city.required" class="text-theme-6 mt-2">
                Field is required
              </div>
            </template>
            <label class="block mb-2 mt-4">State</label>
            <input
              id="state"
              v-model="address.state"
              type="text"
              class="intro-x login__input input input--md border border-gray-300 block w-full"
              placeholder="State"
            />
            <template v-if="$v.address.state.$error">
              <div v-if="!$v.address.state.required" class="text-theme-6 mt-2">
                Field is required
              </div>
            </template>

            <label
              class="block mb-2 mt-4 flex align-items-center justify-between"
            >
              <span class="mr-auto">Emails</span>
              <button
                class="button px-2 bg-theme-1 text-white right-0 top-0 h-full z-50 w-50"
                @click="addEmail"
              >
                <span class="w-5 h-5 flex items-center justify-center">
                  <PlusIcon class="w-4 h-4" />
                </span>
              </button>
            </label>
            <div
              v-for="(v, index) in $v.address.emails.$each.$iter"
              :key="'email-' + index"
              class="email relative mb-2"
            >
              <input
                v-model="v.$model"
                type="text"
                class="intro-x login__input input input--md border border-gray-300 block w-full"
              />
              <button
                class="button px-2 bg-theme-6 text-white absolute right-0 top-0 z-50 h-full"
                @click="removeEmail(index)"
              >
                <span class="w-5 h-5 flex items-center justify-center">
                  <XIcon class="w-4 h-4" />
                </span>
              </button>
              <template v-if="v.$error">
                <div v-if="!v.required" class="text-theme-6 mt-2">
                  Field is required
                </div>
                <div v-if="!v.email" class="text-theme-6 mt-2">
                  Please enter a valid email address.
                </div>
              </template>
            </div>

            <label
              class="block mb-2 mt-4 flex align-items-center justify-between"
            >
              <span class="mr-auto">Phones</span>
              <button
                class="button px-2 bg-theme-1 text-white right-0 top-0 h-full z-50 w-50"
                @click="addPhone"
              >
                <span class="w-5 h-5 flex items-center justify-center">
                  <PlusIcon class="w-4 h-4" />
                </span>
              </button>
            </label>
            <div
              v-for="(v, index) in $v.address.phones.$each.$iter"
              :key="'phone-' + index"
              class="phone relative mb-2"
            >
              <input
                v-model="v.$model"
                type="text"
                class="intro-x login__input input input--md border border-gray-300 block w-full"
              />
              <button
                class="button px-2 bg-theme-6 text-white absolute right-0 top-0 z-50 h-full"
                @click="removePhone(index)"
              >
                <span class="w-5 h-5 flex items-center justify-center">
                  <XIcon class="w-4 h-4" />
                </span>
              </button>
              <template v-if="v.$error">
                <div v-if="!v.required" class="text-theme-6 mt-2">
                  Field is required
                </div>
              </template>
            </div>

            <button
              type="button"
              class="button bg-theme-1 text-white mt-5 w-24"
              @click="onClickSave"
            >
              Save
            </button>
            <button
              type="button"
              class="button bg-gray-200 text-white mt-5 ml-5 w-24 text-gray-600"
              @click="initAddress"
            >
              Reset
            </button>
            <button
              type="button"
              class="button bg-gray-200 bg-theme-6 text-white mt-5 ml-5 w-24"
              @click="closeModal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import feather from "feather-icons";
import Tabulator from "tabulator-tables";
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
      // street_name: {
      //   required
      // },
      // street: {
      //   required
      // },
      city: {
        required
      },
      state: {
        required
      },
      emails: {
        $each: {
          // required,
          // email
        }
      },
      phones: {
        $each: {
          // required
        }
      }
    }
  },
  data() {
    return {
      isNew: true,
      address: {
        user_id: 0,
        is_primary: false,
        address: "",
        // street_name: "",
        // street: "",
        city: "",
        state: "",
        phones: [""],
        emails: [""]
      },
      addresses: []
    };
  },
  mounted() {
    this.loadAddresses();
  },
  methods: {
    loadAddresses() {
      this.$store.dispatch("main/addresses").then(res => {
        let addresses = res.data;

        if (addresses.length > 0)
          this.addresses = addresses.map(a => {
            a.phones = JSON.parse(a.phones);
            a.emails = JSON.parse(a.emails);
            return a;
          });
      });
    },
    addEmail() {
      this.address.emails.push("");
    },
    removeEmail(id) {
      this.address.emails.splice(id, 1);
    },
    addPhone() {
      this.address.phones.push("");
    },
    removePhone(id) {
      this.address.phones.splice(id, 1);
    },
    initAddress() {
      this.address = {
        user_id: 0,
        is_primary: false,
        address: "",
        // street_name: "",
        // street: "",
        city: "",
        state: "",
        phones: [""],
        emails: [""]
      };
    },
    setAsPrimary(id) {
      this.$store.dispatch("main/setAsPrimary", id).then(res => {
        this.loadAddresses();
        Toastify({
          text: "Primary address changed.",
          backgroundColor: "#0e2c88",
          gravity: "bottom",
          position: "center",
          close: true
        }).showToast();
      });
    },
    onClickEdit(address) {
      this.address = address;
      this.isNew = false;
      this.showModal();
    },
    onClickAdd() {
      this.initAddress();
      this.showModal();
    },
    showModal() {
      cash("#address-modal").modal("show");
    },
    closeModal() {
      cash("#address-modal").modal("hide");
    },
    onClickSave() {
      let action = this.isNew ? "main/createAddress" : "main/updateAddress";
      let msg = this.isNew ? "Address created." : "Address updated.";
      this.$v.$touch();
      if (this.$v.$invalid) return;

      let address = Object.assign({}, this.address);
      address.emails = JSON.stringify(address.emails);
      address.phones = JSON.stringify(address.phones);
      this.$store
        .dispatch(action, address)
        .then(res => {
          Toastify({
            text: msg,
            backgroundColor: "#0e2c88",
            gravity: "bottom",
            position: "center",
            close: true
          }).showToast();
          this.initAddress();
          this.closeModal();
          this.loadAddresses();
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
    onClickDelete(id) {
      this.$store
        .dispatch("main/deleteAddress", id)
        .then(res => {
          Toastify({
            text: "Address removed.",
            backgroundColor: "#0e2c88",
            gravity: "bottom",
            position: "center",
            close: true
          }).showToast();
          this.loadAddresses();
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

<style>
.saddress-item {
  background: #f4f6f8 !important;
  padding: 8px;
}
.saddress-item .desc {
  font-size: 10px;
  line-height: 10px;
  margin-bottom: 5px;
  width: 100%;
  color: rgb(41 49 69);
}
.saddress-item .value {
  width: 100%;
  font-size: 18px;
  line-height: 18px;
  color: black;
}
</style>
