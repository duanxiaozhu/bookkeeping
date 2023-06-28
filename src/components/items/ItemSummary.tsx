import {
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
  watch,
  watchEffect,
} from "vue";
import { FloatButton } from "../../shared/FloatButton";
import s from "./ItemSummary.module.scss";
import { http } from "../../shared/Http";
import { Center } from "../../shared/Center";
import { Icon } from "vant";
import { Money } from "../../shared/Money";
import { Datetime } from "../../shared/Datetime";
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
    const items = ref<Item[]>([]);
    const hasMore = ref(false);
    const page = ref(0);
    const fetchItems = async () => {
      if (!props.startDate || !props.endDate) {
        return;
      }
      const response = await http.get<Resources<Item>>(
        "/items",
        {
          happen_after: props.startDate,
          happen_before: props.endDate,
          page: page.value + 1,
        },
        {
          _mock: "itemIndex",
        }
      );
      const { resources, pager } = response.data;
      items.value?.push(...resources);
      hasMore.value =
        (pager.page - 1) * pager.per_page + resources.length < pager.count;
      page.value += 1;
    };
    onMounted(fetchItems);
    watch(
      () => [props.startDate, props.endDate],
      () => {
        items.value = [];
        hasMore.value = false;
        page.value = 0;
        fetchItems();
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
          page: page.value + 1,
        },
        {
          _mock: "itemIndexBalance",
          _autoLoading: true,
        }
      );
      Object.assign(itemsBalance, response.data);
    };
    onMounted(fetchItemsBalance);
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
    return () => (
      <div class={s.wrapper}>
        {items.value ? (
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
              {items.value.map((item) => (
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
                  <div class={s.amount}>
                    ￥<Money value={item.amount} />
                  </div>
                </li>
              ))}
              <div class={s.more}>
                {hasMore.value ? (
                  <span onClick={fetchItems}>点击加载更多</span>
                ) : (
                  <span>没有更多</span>
                )}
              </div>
            </ol>
          </>
        ) : (
          <Center class={s.noData_wrapper} direction="|">
            <Icon name="noData" class={s.noData} />
            <span>暂无数据</span>
          </Center>
        )}

        <FloatButton iconName="add" />
      </div>
    );
  },
});
