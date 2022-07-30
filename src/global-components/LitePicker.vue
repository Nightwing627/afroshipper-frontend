<template>
  <input v-picker="{ value }" type="text" :value="value" />
</template>

<script>
import dayjs from "dayjs";
import Litepicker from "litepicker";

export default {
  directives: {
    picker: {
      inserted(el, binding, vnode) {
        vnode.context.setValue(el, binding, vnode);
        vnode.context.init(el, binding, vnode);
      },
      update(el, binding, vnode) {
        if (binding.oldValue.value != binding.value.value) {
          vnode.context.reInit(el, binding, vnode);
        }
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
      type: String,
      default: ""
    }
  },
  data() {
    return {
      litePicker: ""
    };
  },
  methods: {
    getDateFormat(context) {
      return context.options.format !== undefined
        ? context.options.format
        : "D MMM, YYYY";
    },
    setValue(el, binding, vnode) {
      let format = vnode.context.getDateFormat(vnode.context);
      if (!vnode.context.value.length) {
        let date = dayjs().format(format);
        date +=
          !vnode.context.options.singleMode &&
          vnode.context.options.singleMode !== undefined
            ? " - " +
              dayjs()
                .add(1, "month")
                .format(format)
            : "";
        vnode.context.$emit("input", date);
      }
    },
    init(el, binding, vnode) {
      let format = vnode.context.getDateFormat(vnode.context);
      vnode.context.litePicker = new Litepicker({
        element: el,
        ...vnode.context.options,
        format: format,
        onSelect(startDate, endDate) {
          let date = dayjs(startDate).format(format);
          date +=
            endDate !== undefined ? " - " + dayjs(endDate).format(format) : "";
          vnode.context.$emit("input", date);
        }
      });
    },
    reInit(el, binding, vnode) {
      vnode.context.litePicker.destroy();
      vnode.context.init(el, binding, vnode);
    }
  }
};
</script>
