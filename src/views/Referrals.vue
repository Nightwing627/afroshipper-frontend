<template>
  <div>
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Referrals</h2>
    </div>

    <div>
      <h3
        class="box mt-5 p-5 text-lg text-center shadow-lg bg-theme-21 text-white"
      >
        Share your referral code with your friends & get rewarded when they ship
        with Afroshipper
      </h3>
      <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="col-span-12 md:col-span-6">
          <div class="intro-y box p-5">
            <p>Your Referral Code</p>
            <div class="grid grid-cols-12 gap-6 mt-5">
              <div class="col-span-12 md:col-span-6 relative">
                <input
                  id="affiliate_id"
                  v-model="affiliate_id"
                  class="intro-x input input--md border border-gray-300 w-full h-full"
                  readonly
                />
                <button
                  class="button px-2 bg-theme-1 text-white inline-flex absolute right-0 top-0 z-50 h-full"
                  @click="onClickCopy"
                >
                  <span class="w-5 h-5 flex items-center justify-center mr-2">
                    <CopyIcon class="w-4 h-4" />
                  </span>
                  Copy
                </button>
              </div>
              <div class="col-span-12 md:col-span-6 relative">
                <form @submit.prevent="onClickSend">
                  <input
                    v-model="sent_to"
                    type="email"
                    class="intro-x input input--md border border-gray-300 w-full h-full"
                    placeholder="email"
                    required
                  />
                  <button
                    class="button px-2 bg-theme-1 text-white inline-flex absolute right-0 top-0 z-50 h-full"
                  >
                    <span class="w-5 h-5 flex mr-2 items-center justify-center">
                      <SendIcon class="w-4 h-4" />
                    </span>
                    Send
                  </button>
                </form>
              </div>
            </div>
            <div class="grid grid-cols-12 gap-6 mt-10 text-center">
              <div class="col-span-12 md:col-span-4 relative">
                <p>Amount Per Referrals</p>
                <p class="text-2xl font-bold">
                  ₦ {{ eReferral.toLocaleString() }}
                </p>
              </div>
              <div class="col-span-12 md:col-span-4 relative">
                <p>Total Referrals</p>
                <p class="text-2xl font-bold">
                  ₦ {{ nReferred.toLocaleString() }}
                </p>
              </div>
              <div class="col-span-12 md:col-span-4 relative">
                <p>Amount Earned</p>
                <p class="text-2xl font-bold">
                  ₦ {{ earned.toLocaleString() }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-12 md:col-span-6">
          <div class="intro-y box p-5 h-full">
            <p>Referred Users</p>
            <div class="w-100 mt-5">
              <table class="table table--sm">
                <thead>
                  <tr>
                    <th class="border-b-2 dark:border-dark-5">
                      #
                    </th>
                    <th class="border-b-2 dark:border-dark-5">
                      Email
                    </th>
                    <th class="border-b-2 dark:border-dark-5">
                      Sent at
                    </th>
                    <th class="border-b-2 dark:border-dark-5">
                      Status
                    </th>
                    <th class="border-b-2 dark:border-dark-5"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(referral, index) in referrals"
                    :key="'ref-' + index"
                  >
                    <td class="border-b dark:border-dark-5">{{ index + 1 }}</td>
                    <td class="border-b dark:border-dark-5">
                      {{ referral.sent_to }}
                    </td>
                    <td class="border-b dark:border-dark-5">
                      {{ referral.created_at }}
                    </td>
                    <td class="border-b dark:border-dark-5">
                      {{ referral.referred_by != 0 ? "Referred" : "Pending" }}
                    </td>
                    <td class="border-b dark:border-dark-5">
                      <button
                        v-if="referral.referred_by == 0"
                        class="button inline-flex text-theme-1"
                        @click="onClickResend(referral.id)"
                      >
                        <span class="w-5 h-5 flex items-center justify-center">
                          <SendIcon class="w-4 h-4" />
                        </span>
                      </button>
                      <button
                        v-if="referral.referred_by == 0"
                        class="button inline-flex text-theme-6"
                        @click="onClickDelete(referral.id)"
                      >
                        <span class="w-6 h-6 flex items-center justify-center">
                          <TrashIcon class="w-4 h-4" />
                        </span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toastify from "toastify-js";
import moment from "moment";
export default {
  data() {
    return {
      referrals: [],
      sent_to: "",
      affiliate_id: this.$store.state.main.user.affiliate_id,
      eReferral: 1000
    };
  },
  computed: {
    earned() {
      return this.nReferred * this.eReferral;
    },
    nReferred() {
      return (
        this.referrals &&
        this.referrals.filter(ref => ref.referred_by != 0).length
      );
    }
  },
  mounted() {
    this.loadReferrals();
  },
  methods: {
    loadReferrals() {
      this.$store.dispatch("main/referrals").then(res => {
        this.referrals = res.referrals.map(ref => {
          ref.created_at = moment(ref.created_at).format("YYYY-MM-DD");
          return ref;
        });
      });
    },
    onClickCopy(e) {
      const el = document.querySelector("#affiliate_id");
      el.select();
      document.execCommand("copy");
      Toastify({
        text: "Affiliate ID copied to clipboard.",
        backgroundColor: "#0e2c88",
        gravity: "bottom",
        position: "center",
        close: true
      }).showToast();
    },
    onClickSend() {
      if (this.sent_to) {
        this.$store.dispatch("main/createReferral", this.sent_to).then(res => {
          Toastify({
            text: "Referral sent.",
            backgroundColor: "#0e2c88",
            gravity: "bottom",
            position: "center",
            close: true
          }).showToast();
          this.sent_to = "";
          this.loadReferrals();
        });
      }
    },
    onClickResend(id) {
      this.$store.dispatch("main/resendReferral", id).then(res => {
        Toastify({
          text: "Referral sent again.",
          backgroundColor: "#0e2c88",
          gravity: "bottom",
          position: "center",
          close: true
        }).showToast();
      });
    },
    onClickDelete(id) {
      this.$store.dispatch("main/deleteReferral", id).then(res => {
        Toastify({
          text: "Referral removed.",
          backgroundColor: "#0e2c88",
          gravity: "bottom",
          position: "center",
          close: true
        }).showToast();
        this.loadReferrals();
      });
    }
  }
};
</script>
