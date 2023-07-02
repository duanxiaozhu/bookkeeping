import { defineComponent } from "vue";
import { ComingSoon } from "../shared/ComingSoon";
export const Notify = defineComponent({
  setup: (props, context) => {
    return () => <>
    <ComingSoon/>
    </>;
  },
});
