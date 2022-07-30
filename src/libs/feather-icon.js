import Vue from "vue";
import * as featherIcons from "vue-feather-icons";

for (const [icon] of Object.entries(featherIcons)) {
  Vue.component(icon, featherIcons[icon]);
}
