import Role from "../utils/roles";

// getters
const getters = {
  darkMode: state => state.darkMode,

  // auth
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,

  // role
  isAdmin: state => state.roles.includes(Role.Admin),
  isManager: state =>
    !state.roles.includes(Role.Admin) && state.roles.includes(Role.Manager),
  isUser: state =>
    !state.roles.includes(Role.Admin) &&
    !state.roles.includes(Role.Manager) &&
    state.roles.includes(Role.User)
};

export default getters;
