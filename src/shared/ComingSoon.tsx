import { defineComponent } from "vue";
import s from "./ComingSoon.module.scss";
import { Icon } from "../shared/Icon";
import { Center } from "../shared/Center";
import { MainLayout } from "../layouts/MainLayout";
import { useRoute } from "vue-router";
import { OverlayIcon } from "./Overlay";

export const ComingSoon = defineComponent({
  setup: (props, context) => {
    const route = useRoute();
    const  name= route.path;
    return () => (
      <MainLayout>
        {{
          title: () => name==='/export'?'导出数据':"记账提醒",
          icon: () => <OverlayIcon />,
          default: () => (
            <>
              <Center class={s.wrapper} direction="|">
                <Icon name="ComingSoon" class={s.coming} />
              </Center>
              <p class={s.text}>敬请期待</p>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
