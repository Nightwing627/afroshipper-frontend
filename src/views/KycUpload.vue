<template>
  <div>
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">KYC Verification</h2>
    </div>
    <!-- BEGIN: Address Data -->
    <div class="mt-5">
      <div class="intro-y box p-6">
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-6 lg:col-span-4 h-full">
            <div class="p-4">
              <p
                v-if="kyc.status == 'approved'"
                class="text-lg flex items-center text-theme-9"
              >
                <CheckCircleIcon class="mr-2"></CheckCircleIcon>
                You are KYC Verified.
              </p>
              <p
                v-else-if="kyc.status == 'rejected'"
                class="text-lg flex items-center text-theme-6"
              >
                <XCircleIcon class="mr-2"></XCircleIcon>
                You are KYC rejected.
              </p>
              <p v-else class="text-lg">
                To complete your KYC process, we need to verify your identity.
              </p>
              <div
                class="flex items-center text-gray-700 dark:text-gray-500 mt-5 text-xl"
              >
                <input
                  id="kyc_bvn"
                  v-model="kycMode"
                  type="radio"
                  class="input border border-gray-700 mr-3"
                  value="kyc_bvn"
                  name="kyc_mode"
                />
                <label class="cursor-pointer select-none" for="kyc_bvn"
                  >Bank Verification Number</label
                >
              </div>
              <div
                class="flex items-center text-gray-700 dark:text-gray-500 mt-5 text-lg"
              >
                <input
                  id="kyc_doc"
                  v-model="kycMode"
                  type="radio"
                  class="input border border-gray-700 mr-3"
                  value="kyc_doc"
                  name="kyc_mode"
                />
                <label class="cursor-pointer select-none" for="kyc_doc"
                  >Upload KYC Document</label
                >
              </div>
            </div>
          </div>
          <div class="col-span-12 md:col-span-6 lg:col-span-8 h-full">
            <div class="border p-5">
              <div v-show="kycMode == 'kyc_bvn'" class="w-full">
                <h3 class="mb-5 w-full font-bold text-lg">
                  Bank Verification Number
                </h3>
                <p class="text-md">
                  Afroshipper can't access your bank account information and
                  transactions with your BVN.
                </p>

                <label class="block text-lg mb-2 mt-5"
                  >Bank verification number (11-digits)</label
                >
                <input
                  id="bvn"
                  v-model="kyc.bvn"
                  type="text"
                  class="intro-x login__input input input--md border border-gray-300 block w-full text-lg"
                  placeholder="Enter BVN"
                  autofocus
                />
                <template v-if="$v.kyc.bvn.$error">
                  <div v-if="!$v.kyc.bvn.required" class="text-theme-6 mt-2">
                    Field is required
                  </div>
                </template>

                <label class="block text-lg mb-2 mt-5 font-italic"
                  >What is your date of birth?</label
                >
                <div class="relative w-full">
                  <LitePicker
                    v-model="kyc.birthday"
                    :options="{
                      autoApply: false,
                      showWeekNumbers: true,
                      dropdowns: {
                        minYear: 1990,
                        maxYear: null,
                        months: true,
                        years: true
                      },
                      format: 'MM/DD/YYYY'
                    }"
                    class="input pr-12 border w-full text-lg"
                  />
                  <div
                    class="absolute rounded-r top-0 right-0 w-10 h-full flex items-center justify-center bg-gray-100 border dark:bg-dark-1 dark:border-dark-4"
                  >
                    <CalendarIcon class="w-5 h-5" />
                  </div>
                </div>
                <template v-if="$v.kyc.birthday.$error">
                  <div
                    v-if="!$v.kyc.birthday.required"
                    class="text-theme-6 mt-2"
                  >
                    Field is required
                  </div>
                </template>

                <button
                  class="button text-white bg-theme-1 shadow-md mt-5 px-10"
                  @click="onSaveBVN"
                >
                  Submit
                </button>
              </div>
              <div v-show="kycMode == 'kyc_doc'" class="w-full">
                <h3 class="mb-5 w-full font-bold text-lg">
                  Upload KYC Document
                </h3>

                <VueDropzone
                  id="dropzone"
                  ref="dropzone"
                  :use-custom-slot="true"
                  :options="{
                    url: $http.defaults.baseURL + '/kyc/doc',
                    maxFilesize: 10,
                    maxFiles: 5,
                    headers: {
                      Authorization: 'Bearer ' + $store.state.main.token
                    },
                    addRemoveLinks: true,
                    destroyDropzone: true
                  }"
                  class="dropzone border-gray-500 border-dashed italic"
                  @vdropzone-removed-file="removeFile"
                >
                  <div class="text-2xl font-medium font-cursive">
                    Drop files here or click to upload.
                  </div>
                </VueDropzone>
                <p class="mt-3">Max file size: 10MB, Max file count: 5</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END: Address Data -->
  </div>
</template>

<script>
import feather from "feather-icons";
import Toastify from "toastify-js";
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";
import vue2Dropzone from "vue2-dropzone";

export default {
  components: {
    VueDropzone: vue2Dropzone
  },
  mixins: [validationMixin],
  validations: {
    kyc: {
      bvn: {
        required
      },
      birthday: {
        required
      }
    }
  },
  data() {
    return {
      kyc: {
        user_id: 0,
        bvn: "",
        birthday: "",
        status: ""
      },
      kycMode: "kyc_bvn",
      is_destroying: false
    };
  },
  mounted() {
    this.loadKyc();
  },
  beforeDestroy() {
    this.is_destroying = true;
  },
  destroyed() {
    this.is_destroying = false;
  },
  methods: {
    loadKyc() {
      this.$store
        .dispatch("main/kycMe")
        .then(res => {
          if (res && res.id > 0) {
            this.kyc = res;
            if (res.documents) {
              res.documents.forEach(doc => {
                let url =
                  location.protocol +
                  "//" +
                  location.hostname +
                  "/uploads/" +
                  doc.upload_name;
                let file = {
                  name: doc.origin_name,
                  type: doc.mime_type,
                  size: doc.size,
                  id: doc.id
                };
                this.$refs.dropzone.manuallyAddFile(file, url);
              });
            }
          }
        })
        .catch(err => {});
    },
    onSaveBVN() {
      this.$v.$touch();
      if (this.$v.$invalid) return;

      this.$store
        .dispatch("main/updateBvn", this.kyc)
        .then(res => {
          Toastify({
            text: "BVN updated.",
            backgroundColor: "#0e2c88",
            gravity: "bottom",
            position: "center",
            close: true
          }).showToast();
        })
        .catch(err => {});
    },
    removeFile(file) {
      if (this.is_destroying) return;
      let id = 0;
      if (file.id) id = file.id;
      else {
        let res = JSON.parse(file.xhr.response);
        id = res.document.id;
      }

      if (id > 0) {
        this.$store.dispatch("main/deleteDoc", id);
      }
    }
  }
};
</script>
