<template>
  <div>
    <DarkModeSwitcher />
    <div class="container">
      <!-- BEGIN: Error Page -->
      <div
        class="error-page flex flex-col lg:flex-row items-center justify-center h-screen text-center lg:text-left"
      >
        <div class="-intro-x lg:mr-20">
          <img
            alt="Midone Tailwind HTML Admin Template"
            class="h-48 lg:h-auto"
            :src="require(`@/assets/images/error-illustration.svg`)"
          />
        </div>
        <div class="text-dark dark:text-white mt-10 lg:mt-0 pl-20">
          <div class="intro-x text-6xl font-medium">404</div>
          <div class="intro-x text-xl lg:text-3xl font-medium">
            Oops. This page has gone missing.
          </div>
          <div class="intro-x text-lg mt-3">
            You may have mistyped the address or the page may have moved.
          </div>
          <button
            class="intro-x button button--lg border border-black dark:border-white dark:text-white mt-10"
          >
            Back to Home
          </button>
        </div>
      </div>
      <!-- END: Error Page -->
    </div>
  </div>
</template>

<script>
import DarkModeSwitcher from "@/components/DarkModeSwitcher";

export default {
  components: {
    DarkModeSwitcher
  },
  mounted() {
    cash("body")
      .removeClass("app")
      .addClass("login");
  }
};
</script>
