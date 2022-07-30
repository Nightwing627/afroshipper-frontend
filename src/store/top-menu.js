import Role from "../utils/roles";

const state = () => {
  return {
    menu: [
      {
        icon: "HomeIcon",
        pageName: "dashboard",
        title: "Dashboard",
        authorize: []
      },
      {
        icon: "UsersIcon",
        pageName: "user-role",
        title: "User & Role",
        authorize: ["user_list"],
        subMenu: [
          {
            icon: "UserPlusIcon",
            pageName: "users",
            title: "Users",
            authorize: ["user_list"]
          },
          {
            icon: "UnlockIcon",
            pageName: "permissions",
            title: "Permissions",
            authorize: ["permission_list"]
          },
          {
            icon: "LayersIcon",
            pageName: "roles",
            title: "Roles",
            authorize: ["role_list"]
          }
        ]
      },
      {
        icon: "ShieldIcon",
        pageName: "kyc-upload",
        title: "KYC Verification",
        authorize: ["kyc_upload"]
      },

      {
        icon: "RadioIcon",
        pageName: "referrals",
        title: "Referrals",
        authorize: []
      },
      {
        icon: "FileTextIcon",
        pageName: "invoices",
        title: "Invoice / Shipping",
        authorize: ["invoice_list"]
      },
      {
        icon: "SettingsIcon",
        pageName: "setting",
        title: "Setting",
        authorize: [],
        subMenu: [
          {
            icon: "UserIcon",
            pageName: "profile",
            title: "Profile & Password",
            authorize: []
          },
          {
            icon: "MapIcon",
            pageName: "addresses",
            title: "My Addresses",
            authorize: ["address_list"]
          },
          {
            icon: "MapIcon",
            pageName: "us-address",
            title: "US Shipping Address",
            authorize: ["setting_edit"]
          }
        ]
      }
    ]
  };
};

// getters
const getters = {
  menu: state => state.menu
};

// actions
const actions = {};

// mutations
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
