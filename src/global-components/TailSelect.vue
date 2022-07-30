<template>
  <select ref="select" v-select class="select">
    <slot></slot>
  </select>
</template>

<script>
import tail from "tail.select";

export default {
  directives: {
    select: {
      inserted(el, binding, vnode) {
        vnode.context.setValue(el, binding, vnode);
        vnode.context.init(el, binding, vnode);
      },
      update(el, binding, vnode) {
        vnode.context.setValue(el, binding, vnode);
        vnode.context.reInit(el, binding, vnode);
      }
    }
  },
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    },
    value: {
      type: [Number, String, Array],
      default: ""
    }
  },
  methods: {
    setValue(el, binding, vnode) {
      if (vnode.context.value.length) {
        cash(vnode.context.$refs["select"]).val(vnode.context.value);
      }
    },
    init(el, binding, vnode) {
      tail(vnode.context.$refs["select"], vnode.context.options).on(
        "change",
        function(item) {
          vnode.context.$emit("input", item.key);
        }
      );
    },
    reInit(el, binding, vnode) {
      tail(vnode.context.$refs["select"], vnode.context.options).reload();
    }
  }
};
</script>
