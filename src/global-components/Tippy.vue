<template>
  <component
    :is="tag"
    v-tippy="{
      arrow: true,
      arrowType: 'round',
      boundary: 'viewport',
      animateFill: false,
      animation: 'shift-away',
      ...options
    }"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: "span"
    },
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
