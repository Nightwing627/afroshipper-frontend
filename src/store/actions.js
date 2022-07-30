import axios from "axios";
import * as types from "./mutation-types";

// actions
const actions = {
  setDarkMode({ commit }, darkMode) {
    commit(types.SET_DARK_MODE, { darkMode });
  },

  // auth
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit(types.AUTH_REQUEST);
      axios({ url: "/login", data: user, method: "POST" })
        .then(res => {
          const token = res.data.token;
          const user = res.data.user;
          const roles = res.data.roles;
          const permissions = res.data.permissions;
          const usAddress = JSON.parse(res.data.us_address.value);

          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("roles", JSON.stringify(roles));
          localStorage.setItem("permissions", JSON.stringify(permissions));
          localStorage.setItem("usAddress", JSON.stringify(usAddress));
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          commit(types.AUTH_SUCCESS, { token, user, roles, permissions });
          resolve(res);
        })
        .catch(err => {
          commit(types.AUTH_ERROR);
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  register({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit(types.AUTH_REQUEST);
      axios({
        url: "/register",
        data: user,
        method: "POST"
      })
        .then(res => {
          const token = res.data.token;
          const user = res.data.user;
          const roles = res.data.roles;
          const permissions = res.data.permissions;
          const usAddress = JSON.parse(res.data.us_address.value);

          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("roles", JSON.stringify(roles));
          localStorage.setItem("permissions", JSON.stringify(permissions));
          localStorage.setItem("usAddress", JSON.stringify(usAddress));
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          commit(types.AUTH_SUCCESS, { token, user, roles, permissions });
          resolve(res);
        })
        .catch(err => {
          commit(types.AUTH_ERROR, err);
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/logout",
        method: "POST"
      })
        .then(res => {
          if (res.data.success) {
            commit(types.LOGOUT);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("roles");
            localStorage.removeItem("permissions");
            delete axios.defaults.headers.common["Authorization"];
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  updateProfile({ commit }, profile) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/updateprofile",
        method: "POST",
        data: profile
      })
        .then(res => {
          const user = res.data.user;
          localStorage.setItem("user", JSON.stringify(user));
          commit(types.AUTH_SUCCESS, { undefined, user });
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  changePwd({ commit }, password) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/changepwd",
        method: "POST",
        data: password
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // permission
  permissionsAll({ commit }) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/permissions/all",
        method: "GET"
      })
        .then(res => {
          commit(types.PERMISSIONS, res.data.data);
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  permissions({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/permissions",
        method: "GET",
        params: params
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  createPermission({ commit }, permission) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/permissions",
        method: "POST",
        data: permission
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  updatePermission({ commit }, permission) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/permissions/" + permission.id,
        method: "PUT",
        data: permission
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  deletePermission({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/permissions/" + id,
        method: "DELETE"
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // role
  rolesAll({ commit }) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/roles/all",
        method: "GET"
      })
        .then(res => {
          commit(types.ROLES, res.data.data);
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  roles({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/roles",
        method: "GET",
        params: params
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  createRole({ commit }, role) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/roles",
        method: "POST",
        data: role
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  updateRole({ commit }, role) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/roles/" + role.id,
        method: "PUT",
        data: role
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  deleteRole({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/roles/" + id,
        method: "DELETE"
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // user
  searchUsers({ commit }, uid) {
    if (!uid) return;
    return new Promise((resolve, reject) => {
      axios({
        url: "/users/search/" + uid,
        method: "GET"
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  users({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/users",
        method: "GET",
        params: params
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  createUser({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/users",
        method: "POST",
        data: user
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  updateUser({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/users/" + user.id,
        method: "PUT",
        data: user
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  deleteUser({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/users/" + id,
        method: "DELETE"
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  verifyUser({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/users/" + id + "/verify",
        method: "GET"
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // address
  addresses({ commit }) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/addresses",
        method: "GET"
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  createAddress({ commit }, address) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/addresses",
        method: "POST",
        data: address
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  updateAddress({ commit }, address) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/addresses/" + address.id,
        method: "PUT",
        data: address
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  deleteAddress({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/addresses/" + id,
        method: "DELETE"
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  setAsPrimary({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/addresses/" + id + "/primary",
        method: "GET"
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // kyc
  kycMe({ commit }) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/kyc/user/me",
        method: "GET"
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  kycUser({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/kyc/user/" + id,
        method: "GET"
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  updateBvn({ commit }, kyc) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/kyc/bvn",
        method: "POST",
        data: kyc
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  deleteDoc({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/kyc/doc/" + id,
        method: "DELETE"
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  kycReject({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/kyc/" + id + "/reject",
        method: "GET"
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  kycApprove({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/kyc/" + id + "/approve",
        method: "GET"
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // invoices
  invoices({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/invoices",
        method: "GET",
        params: params
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  createInvoice({ commit }, invoice) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/invoices",
        method: "POST",
        data: invoice
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  updateInvoice({ commit }, invoice) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/invoices/" + invoice.id,
        method: "PUT",
        data: invoice
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  deleteInvoice({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/invoices/" + id,
        method: "DELETE"
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  pay({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/invoices/" + data.id + "/pay",
        method: "POST",
        data: data.response
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // referrals
  referrals({ commit }) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/referrals",
        method: "GET"
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  createReferral({ commit }, sent_to) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/referrals",
        method: "POST",
        data: { sent_to: sent_to }
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  deleteReferral({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/referrals/" + id,
        method: "DELETE"
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  resendReferral({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/referrals/resend/" + id,
        method: "GET"
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // Dashboard
  generalReport({ commit }) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/generalreport",
        method: "GET"
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  salesReport({ commit }, filter) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/salesreport",
        method: "GET",
        params: filter
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  statReport({ commit }) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/statreport",
        method: "GET"
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  invoicesPending({ commit }) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/invoicespending",
        method: "GET"
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // US address setting
  changeUSAddress({ commit }, address) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/settings/us_address",
        method: "POST",
        data: { value: JSON.stringify(address) }
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // Password reset
  sendPwdEmail({ commit }, email) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/password/email?email=" + email,
        method: "POST"
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  resetPwd({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios({
        url:
          "/password/reset?email=" +
          data.email +
          "&token=" +
          data.token +
          "&password=" +
          data.password +
          "&password_confirmation=" +
          data.password_confirmation,
        method: "POST"
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default actions;
