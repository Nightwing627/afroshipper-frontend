<template>
  <!-- BEGIN: Mobile Menu -->
  <div class="mobile-menu md:hidden">
    <div class="mobile-menu-bar">
      <a href class="flex mr-auto">
        <img
          alt="Midone Tailwind HTML Admin Template"
          src="@/assets/images/logo.png"
          width="160px"
        />
      </a>
      <BarChart2Icon
        class="w-8 h-8 text-white transform -rotate-90"
        @click="toggleMobileMenu"
      />
    </div>
    <transition @enter="enter" @leave="leave">
      <ul v-if="activeMobileMenu" class="border-t border-theme-24 py-5">
        <!-- BEGIN: First Child -->
        <template v-for="(menu, menuKey) in formattedMenu">
          <li
            v-if="menu == 'devider'"
            :key="menuKey"
            class="menu__devider my-6"
          ></li>
          <li v-else-if="menu.hasPermission" :key="menuKey">
            <a
              href="javascript:;"
              class="menu"
              :class="{
                'menu--active': menu.active,
                'menu--open': menu.activeDropdown
              }"
              @click="linkTo(menu)"
            >
              <div class="menu__icon">
                <component :is="menu.icon" />
              </div>
              <div class="menu__title">
                {{ menu.title }}
                <ChevronDownIcon
                  v-if="$h.isset(menu.subMenu)"
                  class="menu__sub-icon"
                  :class="{ 'transform rotate-180': menu.activeDropdown }"
                />
              </div>
            </a>
            <!-- BEGIN: Second Child -->
            <transition @enter="enter" @leave="leave">
              <ul v-if="$h.isset(menu.subMenu) && menu.activeDropdown">
                <li
                  v-for="(subMenu, subMenuKey) in menu.subMenu"
                  :key="subMenuKey"
                >
                  <a
                    v-if="subMenu.hasPermission"
                    href="javascript:;"
                    class="menu"
                    :class="{ 'menu--active': subMenu.active }"
                    @click="linkTo(subMenu)"
                  >
                    <div class="menu__icon">
                      <ActivityIcon />
                    </div>
                    <div class="menu__title">
                      {{ subMenu.title }}
                      <ChevronDownIcon
                        v-if="$h.isset(subMenu.subMenu)"
                        class="menu__sub-icon"
                        :class="{
                          'transform rotate-180': subMenu.activeDropdown
                        }"
                      />
                    </div>
                  </a>
                  <!-- BEGIN: Third Child -->
                  <transition @enter="enter" @leave="leave">
                    <ul
                      v-if="$h.isset(subMenu.subMenu) && subMenu.activeDropdown"
                    >
                      <li
                        v-for="(lastSubMenu, lastSubMenuKey) in subMenu.subMenu"
                        :key="lastSubMenuKey"
                      >
                        <a
                          v-if="lastSubMenu.hasPermission"
                          href="javascript:;"
                          class="menu"
                          :class="{ 'menu--active': lastSubMenu.active }"
                          @click="linkTo(lastSubMenu)"
                        >
                          <div class="menu__icon">
                            <ZapIcon />
                          </div>
                          <div class="menu__title">
                            {{ lastSubMenu.title }}
                          </div>
                        </a>
                      </li>
                    </ul>
                  </transition>
                  <!-- END: Third Child -->
                </li>
              </ul>
            </transition>
            <!-- END: Second Child -->
          </li>
        </template>
        <!-- END: First Child -->
      </ul>
    </transition>
  </div>
  <!-- END: Mobile Menu -->
</template>

<script>
import Velocity from "velocity-animate";

export default {
  data() {
    return {
      formattedMenu: [],
      activeMobileMenu: false
    };
  },
  computed: {
    mobileMenu() {
      return this.nestedMenu(this.$store.state.topMenu.menu);
    }
  },
  watch: {
    $route() {
      this.formattedMenu = this.$h.assign(this.mobileMenu);
    }
  },
  mounted() {
    this.formattedMenu = this.$h.assign(this.mobileMenu);
  },
  methods: {
    toggleMobileMenu() {
      this.activeMobileMenu = !this.activeMobileMenu;
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
          menu[key].activeDropdown = this.findActiveMenu(item.subMenu);
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
        } else if (this.$h.isset(item.subMenu)) {
          match = this.findActiveMenu(item.subMenu);
        }
      });
      return match;
    },
    linkTo(menu) {
      if (this.$h.isset(menu.subMenu)) {
        menu.activeDropdown = !menu.activeDropdown;
      } else {
        this.activeMobileMenu = false;
        this.$router.push({
          name: menu.pageName
        });
      }
    },
    enter(el, done) {
      Velocity(
        el,
        "slideDown",
        {
          duration: 300
        },
        {
          complete: done
        }
      );
    },
    leave(el, done) {
      Velocity(
        el,
        "slideUp",
        {
          duration: 300
        },
        {
          complete: done
        }
      );
    }
  }
};
</script>
