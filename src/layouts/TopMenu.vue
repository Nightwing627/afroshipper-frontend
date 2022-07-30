<template>
  <div>
    <DarkModeSwitcher />
    <MobileMenu />
    <!-- BEGIN: Top Bar -->
    <div
      class="border-b border-theme-24 -mt-10 md:-mt-5 -mx-3 sm:-mx-8 px-3 sm:px-8 pt-3 md:pt-0 mb-10"
    >
      <div class="top-bar-boxed flex items-center">
        <!-- BEGIN: Logo -->
        <router-link
          :to="{ name: 'dashboard' }"
          tag="a"
          class="-intro-x hidden md:flex"
        >
          <img
            class="logo"
            alt="Midone Tailwind HTML Admin Template"
            src="@/assets/images/logo.png"
          />
        </router-link>
        <!-- END: Logo -->
        <!-- BEGIN: Breadcrumb -->
        <div class="-intro-x breadcrumb breadcrumb--light mr-auto">
          <div
            v-for="(crumb, index) in breadcrumbList"
            :key="index"
            class="flex items-center"
          >
            <ChevronRightIcon v-if="index != 0" class="breadcrumb__icon" />
            <a
              :href="crumb.link"
              :class="
                index == breadcrumbList.length - 1 ? 'breadcrumb--active' : ''
              "
              >{{ crumb.name }}</a
            >
          </div>
        </div>
        <!-- END: Breadcrumb -->
        <!-- BEGIN: Account Menu -->
        <div class="intro-x dropdown h-8 relative">
          <div
            class="dropdown-toggle h-8 overflow-hidden shadow-lg image-fit zoom-in scale-110 account-label"
          >
            <span>
              {{ firstName }}
            </span>
          </div>
          <div class="dropdown-box w-56">
            <div
              class="dropdown-box__content box bg-theme-38 dark:bg-dark-6 text-white"
            >
              <div class="p-4 border-b border-theme-40 dark:border-dark-3">
                <div class="font-medium">
                  {{ name }}
                </div>
                <div class="text-xs text-theme-41 dark:text-gray-600">
                  {{ uid }}
                </div>
              </div>
              <div class="p-2">
                <a
                  href="/profile"
                  class="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md"
                >
                  <UserIcon class="w-4 h-4 mr-2" /> Profile
                </a>
                <a
                  href="/profile"
                  class="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md"
                >
                  <LockIcon class="w-4 h-4 mr-2" /> Change Password
                </a>
              </div>
              <div class="p-2 border-t border-theme-40 dark:border-dark-3">
                <a
                  class="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md"
                  @click="logout"
                >
                  <ToggleRightIcon class="w-4 h-4 mr-2" />
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Account Menu -->
      </div>
    </div>
    <!-- END: Top Bar -->
    <!-- BEGIN: Top Menu -->
    <nav class="top-nav">
      <ul>
        <!-- BEGIN: First Child -->
        <template v-for="(menu, menuKey) in formattedMenu">
          <li v-if="menu.hasPermission" :key="menuKey">
            <a
              href="javascript:;"
              class="top-menu"
              :class="{
                'top-menu--active': menu.active
              }"
              @click="linkTo(menu)"
            >
              <div class="top-menu__icon">
                <component :is="menu.icon" />
              </div>
              <div class="top-menu__title">
                {{ menu.title }}
                <ChevronDownIcon
                  v-if="$h.isset(menu.subMenu)"
                  class="top-menu__sub-icon"
                />
              </div>
            </a>
            <!-- BEGIN: Second Child -->
            <ul v-if="$h.isset(menu.subMenu)">
              <li
                v-for="(subMenu, subMenuKey) in menu.subMenu"
                :key="subMenuKey"
              >
                <a
                  v-if="subMenu.hasPermission"
                  href="javascript:;"
                  class="top-menu"
                  @click="linkTo(subMenu)"
                >
                  <div class="top-menu__icon">
                    <component :is="subMenu.icon" />
                  </div>
                  <div class="top-menu__title">
                    {{ subMenu.title }}
                    <ChevronDownIcon
                      v-if="$h.isset(subMenu.subMenu)"
                      class="top-menu__sub-icon"
                    />
                  </div>
                </a>
                <!-- BEGIN: Third Child -->
                <ul v-if="$h.isset(subMenu.subMenu)">
                  <li
                    v-for="(lastSubMenu, lastSubMenuKey) in subMenu.subMenu"
                    :key="lastSubMenuKey"
                  >
                    <a
                      v-if="lastSubMenu.hasPermission"
                      href="javascript:;"
                      class="top-menu"
                      @click="linkTo(lastSubMenu)"
                    >
                      <div class="top-menu__icon">
                        <component :is="'zap-icon'" />
                      </div>
                      <div class="top-menu__title">
                        {{ lastSubMenu.title }}
                      </div>
                    </a>
                  </li>
                </ul>
                <!-- END: Third Child -->
              </li>
            </ul>
            <!-- END: Second Child -->
          </li>
        </template>
        <!-- END: First Child -->
      </ul>
    </nav>
    <!-- END: Top Menu -->
    <!-- BEGIN: Content -->
    <div class="content">
      <router-view />
    </div>
    <!-- END: Content -->
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import MobileMenu from "@/components/MobileMenu";
import DarkModeSwitcher from "@/components/DarkModeSwitcher";

export default {
  components: {
    DarkModeSwitcher,
    MobileMenu,
    TopBar
  },
  data() {
    return {
      formattedMenu: [],
      searchDropdown: false,
      breadcrumbList: []
    };
  },
  computed: {
    topMenu() {
      return this.nestedMenu(this.$store.state.topMenu.menu);
    },
    name() {
      return (
        this.$store.state.main.user.first_name +
        " " +
        this.$store.state.main.user.last_name
      );
    },
    firstName() {
      return this.$store.state.main.user.first_name;
    },
    uid() {
      return this.$store.state.main.user.uid;
    }
  },
  watch: {
    $route() {
      this.formattedMenu = this.$h.assign(this.topMenu);
      this.breadcrumbList = this.$route.meta.breadcrumb;
    }
  },
  mounted() {
    cash("body")
      .removeClass("login")
      .addClass("app");
    this.formattedMenu = this.$h.assign(this.topMenu);
    this.breadcrumbList = this.$route.meta.breadcrumb;
  },
  updated() {},
  methods: {
    logout: function() {
      this.$store.dispatch("main/logout").then(() => {
        this.$router.push("/login");
      });
    },
    showSearchDropdown() {
      this.searchDropdown = true;
    },
    hideSearchDropdown() {
      this.searchDropdown = false;
    },
    nestedMenu(menu) {
      let $this = this;
      menu.forEach((item, key) => {
        if (typeof item !== "string") {
          menu[key].active =
            (item.pageName == this.$route.name ||
              (this.$h.isset(item.subMenu) &&
                this.findActiveMenu(item.subMenu))) &&
            !item.ignore;
          menu[key].hasPermission =
            item.authorize.length <= 0 ||
            item.authorize.filter(function(p) {
              return $this.$store.state.main.permissions.indexOf(p) !== -1;
            }).length > 0;
        }

        if (this.$h.isset(item.subMenu)) {
          menu[key] = {
            ...item,
            ...this.nestedMenu(item.subMenu)
          };
        }
      });

      return menu;
    },
    findActiveMenu(subMenu) {
      let match = false;
      subMenu.forEach(item => {
        if (item.pageName == this.$route.name && !item.ignore) {
          match = true;
        } else if (!match && this.$h.isset(item.subMenu)) {
          match = this.findActiveMenu(item.subMenu);
        }
      });
      return match;
    },
    linkTo(menu) {
      if (!this.$h.isset(menu.subMenu)) {
        this.$router.push({
          name: menu.pageName
        });
      }
    }
  }
};
</script>

<style>
.account-label {
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  background: #f1f5f8 !important;
  padding: 5px 10px;
  border-radius: 3px !important;
}
.account-label span {
  font-size: 14px;
  font-weight: 500;
  color: #13245a !important;
}
</style>
