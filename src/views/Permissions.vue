<template>
  <div>
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Permissions</h2>
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <button
          class="button text-white bg-theme-1 shadow-md mr-2"
          @click="initPermission"
        >
          Add New Permission
        </button>
      </div>
    </div>
    <!-- BEGIN: HTML Table Data -->
    <div class="overflow-x-auto scrollbar-hidden">
      <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="col-span-12 lg:col-span-6 ">
          <div class="intro-y box p-5">
            <div
              class="flex flex-col sm:flex-row sm:items-end xl:items-end mb-5"
            >
              <form class="xl:flex ml-auto" @submit.prevent="onFilter">
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
        <div class="col-span-12 lg:col-span-6">
          <div class="intro-y box">
            <div
              class="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200 dark:border-dark-5"
            >
              <h2 class="font-medium text-base mr-auto">
                {{ isNew ? "Add new permission" : "Edit permission" }}
              </h2>
            </div>
            <div class="p-5 preview">
              <label>Permission Name</label>
              <input
                v-model="permission.name"
                type="text"
                class="input w-full border mt-2"
                placeholder="user_create"
              />

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
                @click="initPermission"
              >
                Reset
              </button>
            </div>
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

export default {
  data() {
    return {
      table: null,
      query: "",
      isNew: true,
      permission: {
        id: 0,
        name: ""
      }
    };
  },
  mounted() {
    this.table = new Tabulator(this.$refs.table, {
      ajaxURL: this.$http.defaults.baseURL + "/permissions",
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
          minWidth: 50,
          responsive: 0,
          field: "id",
          hozAlign: "left",
          headerSort: false,
          formatter: "rownum"
        },
        {
          title: "PERMISSION",
          minWidth: 200,
          field: "name",
          hozAlign: "left"
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
              <a class="flex items-center mr-3" onclick="this.onEdit">
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
      this.onFilter();
    },
    queryRealm(url, config, params) {
      //return promise
      return this.$store.dispatch("main/permissions", params);
    },
    onClickEdit(e, cell) {
      let p = cell.getData();
      this.permission = {
        id: p.id,
        name: p.name
      };
      this.isNew = false;
    },
    initPermission() {
      this.permission = {
        id: 0,
        name: ""
      };
      this.isNew = true;
    },
    onClickSave() {
      let action = this.isNew
        ? "main/createPermission"
        : "main/updatePermission";
      let msg = this.isNew ? "Permission created." : "Permission updated.";
      this.$store
        .dispatch(action, this.permission)
        .then(res => {
          Toastify({
            text: msg,
            backgroundColor: "#0e2c88",
            gravity: "bottom",
            position: "center",
            close: true
          }).showToast();
          this.table.replaceData();
          this.initPermission();
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
      let permission = cell.getData();

      this.$store.dispatch("main/deletePermission", permission.id).then(res => {
        this.table.replaceData();
        Toastify({
          text: "Permission removed.",
          backgroundColor: "#0e2c88",
          gravity: "bottom",
          position: "center",
          close: true
        }).showToast();
      });
    }
  }
};
</script>
