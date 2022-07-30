<template>
  <div>
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Users</h2>
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <button
          class="button text-white bg-theme-1 shadow-md mr-2"
          @click="onClickAdd"
        >
          Add New User
        </button>
      </div>
    </div>
    <!-- BEGIN: HTML Table Data -->
    <div class="overflow-x-auto scrollbar-hidden">
      <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="col-span-12">
          <div class="intro-y box p-5">
            <div
              class="flex flex-col sm:flex-row sm:items-end xl:items-end mb-5"
            >
              <form class="xl:flex ml-auto" @submit.prevent="onFilter">
                <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
                  <label class="mr-4" for="">KYC status: </label>
                  <select v-model="status" class="input border mr-2">
                    <option value="none">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
                  <input
                    v-model="query"
                    type="text"
                    class="input w-full sm:w-40 xxl:w-full mt-2 sm:mt-0 border"
                    placeholder="Search..."
                  />
                </div>
                <div class="mt-2 xl:mt-0">
                  <button
                    type="button"
                    class="button w-full sm:w-16 bg-theme-1 text-white"
                    @click="onFilter"
                  >
                    Go
                  </button>
                  <button
                    type="button"
                    class="button w-full sm:w-16 mt-2 sm:mt-0 sm:ml-1 bg-gray-200 text-gray-600 dark:bg-dark-5 dark:text-gray-300"
                    @click="onResetFilter"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
            <div
              id="tabulator"
              ref="table"
              class="table-report table-report--tabulator w-full"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div id="kyc-modal" class="modal">
      <div class="modal__content">
        <div class="intro-y box">
          <div
            class="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200 dark:border-dark-5"
          >
            <h2 class="font-medium text-base mr-auto">Check KYC Documents</h2>
          </div>
          <div v-if="kyc.id > 0" class="p-5 preview">
            <p class="mb-4 flex justify-between">
              <span class="flex items-center">
                <DollarSignIcon class="mr-2"></DollarSignIcon>
                BVN:
              </span>
              <b class="w-2/3">{{ kyc.bvn }}</b>
            </p>
            <p class="mb-4 flex justify-between">
              <span class="flex items-center">
                <CalendarIcon class="mr-2"></CalendarIcon>
                Birthday:
              </span>
              <b class="w-2/3">{{ kyc.birthday }}</b>
            </p>
            <div class="mb-4 flex justify-between items-start">
              <span class="flex items-center">
                <DownloadCloudIcon class="mr-2"></DownloadCloudIcon>
                Documents:
              </span>

              <div class="w-2/3">
                <p
                  v-for="(doc, index) in kyc.documents"
                  :key="'doc-' + index"
                  class="mb-2"
                >
                  <a
                    :href="base + doc.upload_name"
                    target="_blank"
                    class="text-theme-1 underline"
                  >
                    {{ doc.origin_name }}
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div class="w-full p-5 flex justify-end">
            <button
              class="button btn-sm bg-theme-9 text-white mr-2"
              @click="onApprove(kyc.id)"
            >
              Approve
            </button>
            <button
              class="button btn-sm bg-theme-6 text-white mr-2"
              @click="onReject(kyc.id)"
            >
              Reject
            </button>
            <button
              class="button btn-sm bg-theme-1 text-white"
              @click="closeKycDlg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <div id="user-modal" class="modal">
      <div class="modal__content">
        <div class="intro-y box">
          <div
            class="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200 dark:border-dark-5"
          >
            <h2 class="font-medium text-base mr-auto">
              {{ isNew ? "Add new user" : "Edit user" }}
            </h2>
          </div>
          <div class="p-5 preview">
            <label class="block mb-2">First Name</label>
            <input
              id="first_name"
              v-model="user.first_name"
              type="text"
              class="intro-x login__input input input--lg border border-gray-300 block w-full"
              placeholder="First Name"
              required
              autofocus
            />
            <template v-if="$v.user.first_name.$error">
              <div
                v-if="!$v.user.first_name.required"
                class="text-theme-6 mt-2"
              >
                Field is required
              </div>
            </template>
            <label class="block mb-2 mt-4">Last Name</label>
            <input
              id="last_name"
              v-model="user.last_name"
              type="text"
              class="intro-x login__input input input--lg border border-gray-300 block w-full"
              placeholder="Last Name"
              required
              autofocus
            />
            <template v-if="$v.user.last_name.$error">
              <div v-if="!$v.user.last_name.required" class="text-theme-6 mt-2">
                Field is required
              </div>
            </template>
            <label class="block mb-2 mt-4">Email</label>
            <input
              id="email"
              v-model="user.email"
              type="email"
              class="intro-x login__input input input--lg border border-gray-300 block w-full"
              placeholder="Email"
            />
            <template v-if="$v.user.email.$error">
              <div v-if="!$v.user.email.required" class="text-theme-6 mt-2">
                Field is required
              </div>
              <div v-if="!$v.user.email.email" class="text-theme-6 mt-2">
                Please enter a valid email address.
              </div>
            </template>
            <label class="block mb-2 mt-4">Phone</label>
            <input
              id="phone"
              v-model="user.phone"
              type="phone"
              class="intro-x login__input input input--lg border border-gray-300 block w-full"
              placeholder="Phone"
            />
            <template v-if="$v.user.phone.$error">
              <div v-if="!$v.user.phone.required" class="text-theme-6 mt-2">
                Field is required
              </div>
            </template>
            <label class="mt-4 mb-2 block">Roles</label>
            <Multiselect
              v-model="user.roles"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              deselect-label="Can't remove this value"
              track-by="id"
              label="name"
              :group-select="true"
              placeholder="Select roles"
              :options="$store.state.main.rolesAll"
              :searchable="true"
              :allow-empty="false"
            >
            </Multiselect>

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
              @click="initUser"
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
    <!-- END: HTML Table Data -->
  </div>
</template>

<script>
import feather from "feather-icons";
import Tabulator from "tabulator-tables";
import Toastify from "toastify-js";
import Multiselect from "vue-multiselect";
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  components: {
    Multiselect
  },
  mixins: [validationMixin],
  validations: {
    user: {
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
      }
    }
  },
  data() {
    return {
      base: "",
      table: null,
      query: "",
      status: "none",
      isNew: true,
      user: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        roles: []
      },
      kyc: {}
    };
  },
  mounted() {
    this.base = location.protocol + "//" + location.hostname + "/uploads/";

    this.$store.dispatch("main/rolesAll");

    this.table = new Tabulator(this.$refs.table, {
      ajaxURL: this.$http.defaults.baseURL + "/users",
      ajaxFiltering: true,
      ajaxSorting: true,
      pagination: "remote",
      paginationSize: 10,
      paginationSizeSelector: [10, 20, 30, 40],
      layout: "fitColumns",
      responsiveLayout: "collapse",
      placeholder: "No matching records found",
      ajaxRequestFunc: this.queryRealm,
      columns: [
        // For HTML table
        {
          title: "#",
          width: 70,
          responsive: 0,
          field: "uid",
          hozAlign: "left",
          headerSort: false,
          formatter: "rownum"
        },
        {
          title: "NAME",
          field: "first_name",
          hozAlign: "left",
          formatter(cell) {
            let user = cell.getData();
            return user.first_name + " " + user.last_name;
          }
        },
        {
          title: "UUID",
          field: "uid",
          width: 135,
          hozAlign: "left",
          formatter(cell) {
            let user = cell.getData();
            return user.uid ? user.uid : "#";
          }
        },
        {
          title: "EMAIL",
          responsive: 1,
          field: "email",
          hozAlign: "left"
        },
        {
          title: "PHONE",
          width: 135,
          responsive: 0,
          field: "phone",
          hozAlign: "left"
        },
        {
          title: "KYC Status",
          width: 135,
          field: "kyc_verified_at",
          hozAlign: "left",
          vertAlign: "middle",
          formatter(cell) {
            const status = cell.getData().status;
            let itemClass = "text-theme-1";
            switch (status) {
              case "approved":
                itemClass = "text-theme-9";
                break;
              case "rejected":
                itemClass = "text-theme-6";
                break;
            }
            return `<div class="flex status-toggle items-center lg:justify-center ${itemClass}">
              <i data-feather="check-square" class="w-4 h-4 mr-2"></i> ${status}</div>`;
          },
          cellClick: this.onClickVerify
        },
        {
          title: "ROLES",
          minWidth: 200,
          field: "roles",
          hozAlign: "left",
          headerSort: false,
          formatter(cell) {
            let roles = cell.getData().roles;
            let html = "";
            roles.forEach(r => {
              html +=
                '<div class="px-2 py-1 rounded text-xs bg-theme-1 text-white cursor-pointer font-small mr-1 inline-block">' +
                r.name +
                "</div>";
            });
            return html;
          }
        },
        {
          title: "",
          width: 100,
          field: "edit",
          hozAlign: "left",
          headerSort: false,
          cellClick: this.onClickEdit,
          formatter() {
            return `
              <a class="flex items-center mr-3">
                <i data-feather="check-square" class="w-4 h-4 mr-1"></i> Edit
              </a>`;
          }
        },
        {
          title: "",
          width: 100,
          field: "delete",
          hozAlign: "left",
          headerSort: false,
          cellClick: this.onClickDelete,
          formatter() {
            return `
              <a class="flex items-center text-theme-6">
                <i data-feather="trash-2" class="w-4 h-4 mr-1"></i> Delete
              </a>`;
          }
        }
      ],
      renderComplete() {
        feather.replace({
          "stroke-width": 1.5
        });
      }
    });

    // Redraw table onresize
    window.addEventListener("resize", () => {
      this.table.redraw();
      feather.replace({
        "stroke-width": 1.5
      });
    });
  },
  methods: {
    // Filter function
    onFilter() {
      this.table.setFilter("name", "like", this.query);
    },

    // On reset filter
    onResetFilter() {
      this.query = "";
      this.status = "none";
      this.onFilter();
    },
    queryRealm(url, config, params) {
      if (this.status != "none") params["status"] = this.status;
      //return promise
      return this.$store.dispatch("main/users", params);
    },
    onClickEdit(e, cell) {
      let user = cell.getData();
      this.user = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        roles: user.roles
      };
      this.isNew = false;
      cash("#user-modal").modal("show");
    },
    onClickAdd() {
      this.initUser();
      cash("#user-modal").modal("show");
    },
    closeModal() {
      cash("#user-modal").modal("hide");
    },
    initUser() {
      this.user = {
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        roles: []
      };
      this.isNew = true;
    },
    openKycDlg() {
      cash("#kyc-modal").modal("show");
    },
    closeKycDlg() {
      cash("#kyc-modal").modal("hide");
    },
    onClickSave() {
      let action = this.isNew ? "main/createUser" : "main/updateUser";
      let msg = this.isNew ? "User created." : "User updated.";

      let user = {
        id: this.user.id,
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        phone: this.user.phone,
        roles: this.user.roles.map(r => r.id)
      };
      this.$v.$touch();
      if (this.$v.$invalid) return;

      this.$store
        .dispatch(action, user)
        .then(res => {
          Toastify({
            text: msg,
            backgroundColor: "#0e2c88",
            gravity: "bottom",
            position: "center",
            close: true
          }).showToast();
          this.table.replaceData();
          this.initUser();
          cash("#user-modal").modal("hide");
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
    onClickDelete(e, cell) {
      let user = cell.getData();

      this.$store.dispatch("main/deleteUser", user.id).then(res => {
        this.table.replaceData();
        Toastify({
          text: "User removed.",
          backgroundColor: "#0e2c88",
          gravity: "bottom",
          position: "center",
          close: true
        }).showToast();
      });
    },
    onClickVerify(e, cell) {
      let user = cell.getData();

      this.$store
        .dispatch("main/kycUser", user.id)
        .then(res => {
          if (res) {
            this.openKycDlg();
            this.kyc = res;
          }
        })
        .catch(err => {});
    },
    onReject(id) {
      this.$store.dispatch("main/kycReject", id).then(res => {
        if (res.success) {
          this.table.replaceData();
          Toastify({
            text: "Kyc verification rejected.",
            backgroundColor: "#0e2c88",
            gravity: "bottom",
            position: "center",
            close: true
          }).showToast();
          this.closeKycDlg();
        }
      });
    },
    onApprove(id) {
      this.$store.dispatch("main/kycApprove", id).then(res => {
        if (res.success) {
          this.table.replaceData();
          Toastify({
            text: "Kyc verification approved.",
            backgroundColor: "#0e2c88",
            gravity: "bottom",
            position: "center",
            close: true
          }).showToast();
          this.closeKycDlg();
        }
      });
    }
  }
};
</script>
