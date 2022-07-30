<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 xxl:col-span-9 grid grid-cols-12 gap-6">
      <!-- BEGIN: User info -->
      <div v-if="can('invoice_pay')" class="col-span-12 mt-8">
        <div class="intro-y box p-5">
          <div class="grid grid-cols-12 gap-6 py-5">
            <div
              class="col-span-12 xxl:col-span-6 flex items-center justify-center"
            >
              <img
                alt="Afroshipper"
                style="width: 300px"
                :src="require(`@/assets/images/logo-dashboard.png`)"
              />
              <div class="ml-5">
                <div class="font-medium text-lg">
                  {{ $store.state.main.user.first_name }}
                  {{ $store.state.main.user.last_name }}
                </div>
                <div class="text-gray-600">
                  #
                  {{
                    $store.state.main.user.uid
                      ? $store.state.main.user.uid
                      : "None"
                  }}
                </div>
              </div>
            </div>
            <div
              class="col-span-12 xxl:col-span-3 flex flex-col mt-6 lg:mt-0 items-center lg:items-start justify-center text-gray-600 dark:text-gray-300 px-5 border-l border-r border-gray-200 dark:border-dark-5 border-t lg:border-t-0 pt-5 lg:pt-0"
            >
              <div class="truncate sm:whitespace-normal flex items-center">
                <MailIcon class="w-4 h-4 mr-2" />
                {{ $store.state.main.user.email }}
              </div>
              <div class="truncate sm:whitespace-normal flex items-center mt-3">
                <PhoneCallIcon class="w-4 h-4 mr-2" />
                {{ $store.state.main.user.phone }}
              </div>
            </div>
            <div
              class="col-span-12 xxl:col-span-3 flex flex-col mt-6 lg:mt-0 items-center lg:items-start justify-center text-gray-600 dark:text-gray-300 px-5 border-l border-r border-gray-200 dark:border-dark-5 border-t lg:border-t-0 pt-5 lg:pt-0"
            >
              <div
                v-if="$store.state.main.user.address"
                class="truncate sm:whitespace-normal flex items-center"
              >
                <MapPinIcon class="w-4 h-4 mr-2" />
                {{
                  $store.state.main.user.address.address +
                    " " +
                    $store.state.main.user.address.city +
                    " " +
                    $store.state.main.user.address.state
                }}
              </div>
              <div
                v-else
                class="truncate sm:whitespace-normal flex items-center"
              >
                <a
                  href="/addresses"
                  class="button inline-block mr-1 mb-2 bg-theme-1 text-white"
                  >Add delivery address</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END: User info -->
      <!-- BEGIN: General Report -->
      <div v-if="generalReport" class="col-span-12 mt-8">
        <div class="intro-y flex items-center h-10">
          <h2 class="text-lg font-medium truncate mr-5">
            General Report
          </h2>
        </div>
        <div class="grid grid-cols-12 gap-6 mt-5">
          <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
            <div class="report-box zoom-in">
              <div class="box p-5">
                <div class="flex">
                  <ShoppingCartIcon class="report-box__icon text-theme-10" />
                </div>
                <div class="text-3xl font-bold leading-8 mt-6">
                  {{ generalReport.n_shippings }}
                </div>
                <div class="text-base text-gray-600 mt-1">
                  Pending Shipping Invoices
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
            <div class="report-box zoom-in">
              <div class="box p-5">
                <div class="flex">
                  <CreditCardIcon class="report-box__icon text-theme-11" />
                </div>
                <div class="text-3xl font-bold leading-8 mt-6">
                  {{ generalReport.n_dispatches }}
                </div>
                <div class="text-base text-gray-600 mt-1">
                  Pending Dispatch Invoices
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
            <div class="report-box zoom-in">
              <div class="box p-5">
                <div class="flex">
                  <MonitorIcon class="report-box__icon text-theme-12" />
                </div>
                <div class="text-3xl font-bold leading-8 mt-6">
                  {{ generalReport.n_invoices_30days }}
                </div>
                <div class="text-base text-gray-600 mt-1">
                  Generated in 30 days
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="
              can('invoice_create_shipping') || can('invoice_create_dispatch')
            "
            class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y"
          >
            <div class="report-box zoom-in">
              <div class="box p-5">
                <div class="flex">
                  <UserIcon class="report-box__icon text-theme-9" />
                </div>
                <div class="text-3xl font-bold leading-8 mt-6">
                  {{ generalReport.n_users }}
                </div>
                <div class="text-base text-gray-600 mt-1">
                  Users
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END: General Report -->
      <!-- BEGIN: Sales Report -->
      <div
        v-if="can('invoice_create_shipping') || can('invoice_create_dispatch')"
        class="col-span-12 lg:col-span-9 mt-8"
      >
        <div class="intro-y block sm:flex items-center h-10">
          <h2 class="text-lg font-medium truncate mr-5">
            Sales Report
          </h2>
          <div
            class="sm:ml-auto mt-3 sm:mt-0 relative text-gray-700 dark:text-gray-300"
          >
            <CalendarIcon
              class="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0"
            />
            <LitePicker
              v-model="salesReportFilter"
              :options="{
                autoApply: false,
                singleMode: false,
                numberOfColumns: 2,
                numberOfMonths: 2,
                showWeekNumbers: true,
                dropdowns: {
                  minYear: 2021,
                  maxYear: null,
                  months: true,
                  years: true
                }
              }"
              class="input w-full sm:w-56 box pl-10"
            />
          </div>
        </div>
        <div class="intro-y box p-5 mt-12 sm:mt-5">
          <div class="flex flex-col xl:flex-row xl:items-center justify-end">
            <div>
              <div class="text-gray-600 dark:text-gray-600">
                Total
              </div>
              <div
                class="text-theme-20 dark:text-gray-300 text-lg xl:text-xl font-bold"
              >
                ₦
                {{ salesTotal }}
              </div>
            </div>
          </div>
          <div class="report-chart">
            <ReportLineChart
              :height="273"
              class="mt-6"
              :chart-data="salesReport"
            />
          </div>
        </div>
      </div>
      <!-- END: Sales Report -->
      <!-- BEGIN: Shipping/Dispatch Report -->
      <div
        v-if="can('invoice_create_shipping') || can('invoice_create_dispatch')"
        class="col-span-12 sm:col-span-6 lg:col-span-3 mt-8"
      >
        <div class="intro-y flex items-center h-10">
          <h2 class="text-lg font-medium truncate mr-5">
            Shipping/Dispatch/Purchase
          </h2>
        </div>
        <div class="intro-y box p-5 mt-5">
          <ReportDonutChart
            :height="210"
            class="mt-3"
            :chart-data="statReport"
          />
          <div class="mt-8">
            <div class="flex items-center">
              <div class="w-2 h-2 bg-theme-11 rounded-full mr-3"></div>
              <span class="truncate">Shipping invoice</span>
              <div
                class="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"
              ></div>
              <span class="font-medium xl:ml-auto">{{
                statReport.shipping
              }}</span>
            </div>
            <div class="flex items-center mt-4">
              <div class="w-2 h-2 bg-theme-1 rounded-full mr-3"></div>
              <span class="truncate">Dispatch invoice</span>
              <div
                class="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"
              ></div>
              <span class="font-medium xl:ml-auto">{{
                statReport.dispatch
              }}</span>
            </div>
            <div class="flex items-center mt-4">
              <div class="w-2 h-2 bg-theme-12 rounded-full mr-3"></div>
              <span class="truncate">Purchase invoice</span>
              <div
                class="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"
              ></div>
              <span class="font-medium xl:ml-auto">{{
                statReport.purchase
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Shipping/Dispatch Report -->

      <div v-if="can('invoice_pay')" class="col-span-12 h-full mt-5">
        <div class="intro-y p-5 box h-full">
          <p class="text-center mb-5 px-5">
            <b>Use this when checking out at your favorite online store.</b>
          </p>
          <div class="grid grid-cols-12 gap-3">
            <div class="col-span-4 saddress-item">
              <p class="desc">Attn</p>
              <p class="value text-theme-9">
                {{ $store.state.main.user.uid }}
              </p>
            </div>
            <div class="col-span-4 saddress-item">
              <p class="desc">First Name</p>
              <p class="value">{{ $store.state.main.user.first_name }}</p>
            </div>
            <div class="col-span-4 saddress-item">
              <p class="desc">Last Name</p>
              <p class="value">{{ $store.state.main.user.last_name }}</p>
            </div>
            <template v-if="$store.state.main.user.address == null">
              <div class="col-span-5 saddress-item">
                <p class="desc">Address</p>
                <p class="value">{{ $store.state.main.usAddress.address }}</p>
              </div>
              <div class="col-span-5 saddress-item">
                <p class="desc">Address 2</p>
                <p class="value">{{ $store.state.main.usAddress.address2 }}</p>
              </div>
              <div class="col-span-2 saddress-item">
                <p class="desc">Phone Number</p>
                <p class="value">{{ $store.state.main.usAddress.phone }}</p>
              </div>
              <div class="col-span-3 saddress-item">
                <p class="desc">City</p>
                <p class="value">{{ $store.state.main.usAddress.city }}</p>
              </div>
              <div class="col-span-3 saddress-item">
                <p class="desc">State</p>
                <p class="value">{{ $store.state.main.usAddress.state }}</p>
              </div>
              <div class="col-span-3 saddress-item">
                <p class="desc">Zip Code</p>
                <p class="value">{{ $store.state.main.usAddress.zipcode }}</p>
              </div>
            </template>
            <template v-else>
              <div class="col-span-5 saddress-item">
                <p class="desc">Address</p>
                <p class="value">
                  {{ $store.state.main.user.address.address }}
                </p>
              </div>
              <div
                class="col-span-3 saddress-item"
                v-for="email in JSON.parse(
                  $store.state.main.user.address.emails
                )"
                :key="email.id"
              >
                <p class="desc">Email {{ email.id }}</p>
                <p class="value">{{ email }}</p>
              </div>
              <div
                class="col-span-2 saddress-item"
                v-for="phone in JSON.parse(
                  $store.state.main.user.address.phones
                )"
                :key="phone.id"
              >
                <p class="desc">Phone{{ phone.id }} Number</p>
                <p class="value">{{ phone }}</p>
              </div>
              <div class="col-span-3 saddress-item">
                <p class="desc">City</p>
                <p class="value">{{ $store.state.main.user.address.city }}</p>
              </div>
              <div class="col-span-3 saddress-item">
                <p class="desc">State</p>
                <p class="value">{{ $store.state.main.user.address.state }}</p>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div
      class="col-span-12 xxl:col-span-3 xxl:border-l border-theme-5 -mb-10 pb-10"
    >
      <div class="xxl:pl-6 grid grid-cols-12 gap-6">
        <!-- BEGIN: Transactions -->
        <div
          class="col-span-12 md:col-span-6 xl:col-span-4 xxl:col-span-12 mt-3 xxl:mt-8"
        >
          <div class="intro-x flex items-center h-10">
            <h2 class="text-lg font-medium truncate mr-5">
              Transactions
            </h2>
          </div>
          <div class="mt-5">
            <template
              v-for="(invoice, index) in invoicesPending"
              >
              <div
                :key="'iv-' + index"
                v-if="invoice.user != null && invoice.user != undefined"
                class="intro-x"
                @click="onClickInvoice(invoice)"
              >
                <div class="box px-5 py-3 mb-3 flex items-center zoom-in">
                  <div class="ml-4 mr-auto">
                    <div class="font-medium">#{{ invoice.user.uid }}</div>
                    <div class="text-gray-600 text-xs capitalize">
                      {{ invoice.type }}
                    </div>
                  </div>
                  <div class="text-theme-9">
                    ₦
                    {{
                      (
                        invoice.cost +
                        invoice.insurance +
                        invoice.service_fee
                      ).toLocaleString()
                    }}
                  </div>
                </div>
              </div>
            </template>
            <div v-if="invoicesPending.length <= 0">
              No pending invoices.
            </div>
          </div>
        </div>
        <!-- END: Transactions -->
      </div>
    </div>
    <div id="view-modal" class="modal">
      <div
        v-if="invToView"
        class="modal__content modal__content--xl p-10 text-center"
      >
        <div class="intro-y box overflow-hidden">
          <div
            class="border-b border-gray-200 dark:border-dark-5 text-center sm:text-left"
          >
            <div class="p-5">
              <div
                class="flex justify-between text-theme-1 dark:text-theme-10 font-semibold text-3xl"
              >
                <div>
                  INVOICE
                  <small class="uppercase text-theme-10">{{
                    invToView.type
                  }}</small>
                </div>

                <paystack
                  v-if="can('invoice_pay') && !invToView.paid"
                  :amount="
                    (invToView.cost +
                      invToView.insurance +
                      invToView.service_fee) *
                      100
                  "
                  :email="invToView.user.email"
                  :paystackkey="paystack.publicKey"
                  :reference="paystack.reference"
                  :callback="callbackPaystack"
                  :close="closePaystack"
                  :embed="false"
                >
                  <button
                    class="button rounded-full text-white bg-theme-1 text-sm px-5 inline-flex items-center"
                  >
                    <SmileIcon class="mr-2"></SmileIcon>
                    PAY NOW
                  </button>
                </paystack>
              </div>
              <div class="mt-2">
                Shipping status:
                <span class="uppercase text-theme-10">{{
                  invToView.status +
                    " at " +
                    invToView[invToView.status + "_at"]
                }}</span>
              </div>
              <div class="mt-1">
                Payment status:
                <span class="uppercase text-theme-10">{{
                  invToView.paid ? "PAID" : "UNPAID"
                }}</span>
              </div>
              <div class="mt-4">
                Receipt
                <span class="font-medium">#{{ pad(invToView.id, 5) }}</span>
              </div>
              <div class="mt-1">
                {{ invToView.created_at }}
              </div>
            </div>
            <div class="flex flex-col lg:flex-row px-5">
              <div class="">
                <div class="text-base text-gray-600">
                  Client Details
                </div>
                <div
                  class="text-lg font-medium text-theme-1 dark:text-theme-10 mt-2"
                >
                  {{ invToView.user.first_name }}
                  {{ invToView.user.last_name }}
                </div>
                <div class="mt-1">
                  {{ invToView.user.email }}
                </div>
                <div v-if="invToView.address" class="mt-1">
                  {{
                    invToView.address.address +
                      " " +
                      invToView.address.city +
                      " " +
                      invToView.address.state
                  }}
                </div>
                <div
                  v-if="invToView.address && invToView.address.emails"
                  class="mt-1"
                >
                  Alternative emails:
                  <span
                    v-for="(email, index) in invToView.address.emails"
                    :key="'em-' + index"
                    class="mr-3"
                    >{{ email }}</span
                  >
                </div>
                <div
                  v-if="invToView.address && invToView.address.phones"
                  class="mt-1"
                >
                  Alternative phones:
                  <span
                    v-for="(phone, index) in invToView.address.phones"
                    :key="'ph-' + index"
                    class="mr-3"
                    >{{ phone }}</span
                  >
                </div>
              </div>
              <div class="lg:text-right mt-10 lg:mt-0 lg:ml-auto">
                <div class="text-base text-gray-600">
                  Payment to
                </div>
                <div
                  class="text-lg font-medium text-theme-1 dark:text-theme-10 mt-2"
                >
                  AfroShipper
                </div>
                <div class="mt-1">
                  paylike@afroshipper.com
                </div>
              </div>
            </div>
            <div class="flex flex-col lg:flex-row p-5">
              <div>
                <div class="text-base text-gray-600">
                  Other details
                </div>
                <div class="mt-2">
                  Box:
                  <span v-if="invToView.width && invToView.height">{{
                    invToView.width + " x " + invToView.height + " m"
                  }}</span
                  >&nbsp;/&nbsp;
                  <span>{{
                    invToView.weight + " " + invToView.weight_unit
                  }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="p-5">
            <div class="overflow-x-auto">
              <table class="table">
                <thead>
                  <tr>
                    <th
                      class="border-b-2 dark:border-dark-5 whitespace-no-wrap"
                    >
                      DESCRIPTION
                    </th>
                    <th
                      class="border-b-2 dark:border-dark-5 text-right whitespace-no-wrap"
                    >
                      PRICE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-left border-b dark:border-dark-5 w-32">
                      Cost
                    </td>
                    <td
                      class="text-right border-b dark:border-dark-5 w-32 font-medium"
                    >
                      ₦
                      {{ invToView.cost.toLocaleString() }}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left border-b dark:border-dark-5 w-32">
                      Insurance
                    </td>
                    <td
                      class="text-right border-b dark:border-dark-5 w-32 font-medium"
                    >
                      ₦
                      {{ invToView.insurance.toLocaleString() }}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left border-b dark:border-dark-5 w-32">
                      Service Fee
                    </td>
                    <td
                      class="text-right border-b dark:border-dark-5 w-32 font-medium"
                    >
                      ₦
                      {{ invToView.service_fee.toLocaleString() }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="p-5 flex flex-col-reverse sm:flex-row">
            <div class="text-center sm:text-left mt-10 sm:mt-0"></div>
            <div class="text-center sm:text-right sm:ml-auto">
              <div class="text-base text-gray-600">
                Total Amount
              </div>
              <div
                class="text-xl text-theme-1 dark:text-theme-10 font-medium mt-2"
              >
                ₦
                {{
                  (
                    invToView.cost +
                    invToView.insurance +
                    invToView.service_fee
                  ).toLocaleString()
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReportLineChart from "@/components/ReportLineChart";
import ReportDonutChart from "@/components/ReportDonutChart";
import moment from "moment";
import paystack from "vue-paystack";

export default {
  components: {
    ReportLineChart,
    paystack,
    ReportDonutChart
  },
  data() {
    return {
      salesReportFilter: "",
      generalReport: {},
      salesReport: {},
      salesTotal: 0,
      statReport: {
        shipping: 0,
        dispatch: 0
      },
      invoicesPending: [],
      invToView: null,

      paystack: {
        publicKey: "pk_test_4aa93d79fd1d7389627869fff9fdf41550aa821e",
        reference: ""
      }
    };
  },
  watch: {
    salesReportFilter() {
      const dateArray = this.salesReportFilter.split(" - ");
      let filter = {
        start: moment(dateArray[0]).format("YYYY-MM-DD"),
        end: moment(dateArray[1]).format("YYYY-MM-DD")
      };
      this.getSalesReport(filter);
    }
  },
  mounted() {
    this.init();
    setInterval(this.refresfReference, 1000);
  },
  methods: {
    init() {
      this.getGeneralReport();
      this.getStatReport();
      this.getInvoicesPending();
    },
    refresfReference() {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      this.paystack.reference = text;
    },
    can(permission) {
      return (
        this.$store.state.main.permissions.findIndex(p => p == permission) >= 0
      );
    },
    onChangeFilter(e) {
      // console.log(this.salesReportFilter);
    },
    getGeneralReport() {
      this.$store.dispatch("main/generalReport").then(res => {
        if (res.success) {
          this.generalReport = res;
        }
      });
    },
    pad(num, size) {
      var s = "000000000" + num;
      return s.substr(s.length - size);
    },
    getStatReport() {
      this.$store.dispatch("main/statReport").then(res => {
        if (res.success) {
          this.statReport = res.data;
        }
      });
    },
    getInvoicesPending() {
      this.$store.dispatch("main/invoicesPending").then(res => {
        console.log(res);
        if (res.success) {
          this.invoicesPending = res.invoices;
        }
      });
    },
    getSalesReport(filter) {
      this.$store.dispatch("main/salesReport", filter).then(res => {
        if (res.success) {
          let salesReport = {
            labels: [],
            values: []
          };
          let total = 0;
          res.data.forEach(sale => {
            salesReport.labels.push(sale.paid_at);
            salesReport.values.push(
              sale.cost + sale.insurance + sale.service_fee
            );
            total += sale.cost + sale.insurance;
          });
          this.salesReport = salesReport;
          this.salesTotal = total.toLocaleString();
        }
      });
    },
    onClickInvoice(invoice) {
      let inv = Object.assign({}, invoice);
      if (inv.address && !Array.isArray(inv.address.emails)) {
        inv.address.emails = JSON.parse(inv.address.emails);
        inv.address.phones = JSON.parse(inv.address.phones);
      }
      this.invToView = inv;
      this.showModal("view-modal");
    },
    showModal(id) {
      cash("#" + id).modal("show");
    },
    closeModal(id) {
      cash("#" + id).modal("hide");
    },

    callbackPaystack: function(response) {
      // console.log(response);
      if (response.status == "success")
        this.$store
          .dispatch("main/pay", {
            response: response,
            id: this.invToView.id
          })
          .then(res => {
            this.closeModal("view-modal");
            this.init();
          });
    },
    closePaystack() {}
  }
};
</script>

<style scoped>
.report-chart:before,
.report-chart:after {
  display: none;
}
</style>
