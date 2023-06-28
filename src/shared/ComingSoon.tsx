import { defineComponent } from "vue";
import s from "./ComingSoon.module.scss";
import { Icon } from "../shared/Icon";
import { Center } from "../shared/Center";
import { MainLayout } from "../layouts/MainLayout";
import { BackIcon } from "./BackIcon";

export const ComingSoon = defineComponent({
  setup: (props, context) => {
    return () => (
      <MainLayout>
        {{
          title: () => "小段记账",
          icon: () => <BackIcon />,
          default: () => (
            <>
              <Center class={s.wrapper} direction="|">ComingSoon
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
