<template>
  <pre v-highlight>
    <slot></slot>
    <textarea v-model="source" class="fixed w-1 h-1"></textarea>
  </pre>
</template>

<script>
import _ from "lodash";
import hljs from "highlight.js";
import jsBeautify from "js-beautify";

export default {
  directives: {
    highlight: {
      bind(el, binding, vnode) {
        let source = cash(el)
          .find("code")
          .find("textarea")
          .html();

        // Format for beautify
        source = _.replace(source, /&lt;/g, "<");
        source = _.replace(source, /&gt;/g, ">");

        // Beautify code
        source = jsBeautify.html(source);

        // Save for copy code function
        vnode.context.source = source;

        // Format for highlight.js
        source = _.replace(source, /</g, "&lt;");
        source = _.replace(source, />/g, "&gt;");

        cash(el)
          .find("code")
          .html(source);

        hljs.highlightBlock(cash(el).find("code")[0]);
      }
    }
  },
  data() {
    return {
      source: ""
    };
  }
};
</script>

<style scoped>
textarea {
  margin-left: 1000000px;
}
</style>
