import { defineComponent, PropType } from "vue";
export const BackIcon = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => <div></div>;
  },
});
