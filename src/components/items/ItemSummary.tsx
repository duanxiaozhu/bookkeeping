import {
  defineComponent,
  PropType,
  reactive,
  watch,
} from "vue";
import { FloatButton } from "../../shared/FloatButton";
import s from "./ItemSummary.module.scss";
import { http } from "../../shared/Http";
import { Center } from "../../shared/Center";
import { Money } from "../../shared/Money";
import { Datetime } from "../../shared/Datetime";
import { RouterLink } from "vue-router";
import { Button } from "../../shared/Button";
import { Icon } from "../../shared/Icon";
import { useAfterMe } from "../../hooks/useAfterMe";
import { useItemStore } from "../../stores/useItemStore";

export const ItemSummary = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: false,
    },
    endDate: {
      type: String as PropType<string>,
      required: false,
    },
  },
  setup: (props, context) => {
    const itemStore = useItemStore(["items", props.startDate, props.endDate]);
    useAfterMe(() => itemStore.fetchItems(props.startDate, props.endDate));
    watch(
      () => [props.startDate, props.endDate],
      () => {
        itemStore.$reset();
        itemStore.fetchItems(props.startDate, props.endDate);
      }
    );
    const itemsBalance = reactive({
      expenses: 0,
      income: 0,
      balance: 0,
    });
    const fetchItemsBalance = async () => {
      if (!props.startDate || !props.endDate) {
        return;
      }
      const response = await http.get(
        "/items/balance",
        {
          happen_after: props.startDate,
          happen_before: props.endDate,
        },
        {
          _mock: "itemIndexBalance",
        }
      );
      Object.assign(itemsBalance, response.data);
    };
    useAfterMe(fetchItemsBalance);
    watch(
      () => [props.startDate, props.endDate],
      () => {
        Object.assign(itemsBalance, {
          expenses: 0,
          income: 0,
          balance: 0,
        });
        fetchItemsBalance();
      }
    );
    return () =>
      !props.startDate || !props.endDate ? (
        <Center class={s.noData_wrapper} direction="|">
          <Icon name="noData" class={s.noData} />
          <span>请先选择时间</span>
        </Center>
      ) : (
        <div class={s.wrapper}>
          {itemStore.items && itemStore.items.length > 0 ? (
            <>
              <ul class={s.total}>
                <li>
                  <span class={s.numberSize}>
                    <Money value={itemsBalance.expenses} />
                  </span>
                  <span>支出</span>
                </li>
                <li>
                  <span class={s.numberSize}>
                    <Money value={itemsBalance.income} />
                  </span>
                  <span>收入</span>
                </li>
                <li>
                  <span class={s.numberSize}>
                    <Money value={itemsBalance.balance} />
                  </span>
                  <span>净收入</span>
                </li>
              </ul>
              <div class={s.bg}></div>
              <ol class={s.list}>
                {itemStore.items.map((item) => (
                  <li>
                    <div class={s.sign}>
                      <span>{item.tags![0].sign}</span>
                    </div>
                    <div class={s.text}>
                      <div class={s.tag}>{item.tags![0].name}</div>
                      <div class={s.time}>
                        <Datetime value={item.happen_at} />
                      </div>
                    </div>
                    <div
                      class={item.kind === "expenses" ? s.amountRed : s.amount}
                    >
                      ￥{item.kind === "expenses" ? "-" : "+"}
                      <Money value={item.amount} />
                    </div>
                  </li>
                ))}
                <div class={s.more}>
                  {itemStore.hasMore ? (
                    <span
                      onClick={() =>
                        itemStore.fetchNextPage(props.startDate, props.endDate)
                      }
                    >
                      点击加载更多
                    </span>
                  ) : (
                    <span>没有更多</span>
                  )}
                </div>
              </ol>
              <RouterLink to="/items/create">
                <FloatButton iconName="add" />
              </RouterLink>
            </>
          ) : (
            <>
              <Center class={s.noData_wrapper} direction="|">
                <Icon name="noData" class={s.noData} />
                <span>暂无数据</span>
              </Center>
              <div class={s.button_wrapper}>
                <RouterLink to="/items/create">
                  <Button class={s.button}>开始记账</Button>
                </RouterLink>
              </div>
            </>
          )}
        </div>
      );
  },
});
