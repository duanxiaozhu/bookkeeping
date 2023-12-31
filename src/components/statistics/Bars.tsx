import { defineComponent, PropType } from "vue";
import s from "./Bars.module.scss";
import { Money } from "../../shared/Money";
import { Center } from "../../shared/Center";
import { Icon } from "../../shared/Icon";
export const Bars = defineComponent({
  props: {
    data: {
      type: Array as PropType<{ tag: Tag; amount: number; percent: number }[]>,
    },
    kind: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper_bg}>
        <div class={s.title}>{props.kind === "expenses" ? "支出占比" : "收入占比"}</div>
        <div class={s.wrapper}>
          {props.data && props.data.length > 0 ? (
            props.data.map(({ tag, amount, percent }) => {
              return (
                <div class={s.topItem}>
                  <div class={s.sign}>{tag.sign}</div>
                  <div class={s.bar_wrapper}>
                    <div class={s.bar_text}>
                      <span>                     
                        {tag.name} - {percent}%
                      </span>
                      <span>
                        ￥<Money value={amount} />
                      </span>
                    </div>
                    <div class={s.bar}>
                      <div
                        class={[s.bar_inner,props.kind === "expenses" ? s.expensesBar : s.incomeBar]}
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
          <Center class={s.noData_wrapper} direction="|">
            <Icon name="noData" class={s.noData} />
            <span>暂无数据</span>
          </Center>
          )}
        </div>
      </div>
    );
  },
});
