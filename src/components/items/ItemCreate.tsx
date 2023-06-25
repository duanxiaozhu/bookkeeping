import { defineComponent, onMounted, PropType, reactive, ref } from "vue";
import s from "./ItemCreate.module.scss";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import { Tags } from "./Tags";
import { useRouter } from "vue-router";
import { AxiosError } from "axios";
import { Dialog, Notify } from "vant";
import { http } from "../../shared/Http";
import { BackIcon } from '../../shared/BackIcon';
export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const formDate = reactive({
      kind: "支出",
      tags_id: [],
      amount: 0,
      happen_at: new Date().toISOString(),
    });
    const router = useRouter();
    const onError = (error: AxiosError<ResourceError>) => {
      if (error.response?.status === 422) {
        Dialog.alert({
          title: "出错",
          message: Object.values(error.response.data.errors).join("\n"),
        });
      }
      throw error;
    };
    const onSubmit = async () => {
      await http
        .post<Resource<Item>>("/items", formDate, {
          params: { _mock: "itemCreate" },
        })
        .catch(onError);
      Notify({
        type: "success",
        message: "记账成功",
        duration: 1000,
        background: "#53A867",
      });
      router.push("/items");
    };
    return () => (
      <MainLayout class={s.layout}>
        {{
          title: () => "记一笔",
          icon: () => <BackIcon />,
          default: () => (
            <>
              <div class={s.wrapper}>
                <Tabs v-model:selected={formDate.kind} class={s.tabs}>
                  <Tab name="支出" class={s.tags_wrapper}>
                    <Tags
                      kind="expenses"
                      v-model:selected={formDate.tags_id[0]}
                    />
                  </Tab>
                  <Tab name="收入" class={s.tags_wrapper}>
                    <Tags
                      kind="income"
                      v-model:selected={formDate.tags_id[0]}
                    />
                  </Tab>
                </Tabs>
                <div class={s.inputPad_wrapper}>
                  <InputPad
                    v-model:happenAt={formDate.happen_at}
                    v-model:amount={formDate.amount}
                    onSubmit={onSubmit}
                  />
                </div>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
