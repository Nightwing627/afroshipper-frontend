<template>
  <tippy
    :to="to"
    theme="light"
    trigger="click"
    arrow="true"
    arrow-type="round"
    boundary="viewport"
    animate-fill="false"
    animation="shift-away"
    allow-h-t-m-l="true"
  >
    <slot></slot>
  </tippy>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: "span"
    }
  }
};
</script>
