<template>
  <component
    :is="tag"
    ref="tooltip"
    v-tippy="{
      arrow: true,
      arrowType: 'round',
      boundary: 'viewport',
      placement: 'left',
      animateFill: false,
      animation: 'shift-away'
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
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.toggleTooltip();
      this.initTooltipEvent();
    });
  },
  methods: {
    toggleTooltip() {
      if (this.$refs.tooltip !== undefined) {
        if (cash(window).width() <= 1260) {
          this.$refs.tooltip._tippy.enable();
        } else {
          this.$refs.tooltip._tippy.disable();
        }
      }
    },
    initTooltipEvent() {
      let self = this;
      window.addEventListener("resize", () => {
        self.toggleTooltip();
      });
    }
  }
};
</script>
