import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  ref,
  watch,
} from "vue";
import s from "./Charts.module.scss";
import { Popup, Field, Picker } from "vant";
import { LineChart } from "./LineChart";
import { PieChart } from "./PieChart";
import { Bars } from "./Bars";
import { http } from "../../shared/Http";
import { Time } from "../../shared/time";

const DAY = 24 * 3600 * 1000;

type Data1Item = { happen_at: string; amount: number };
type Data1 = Data1Item[];
type Data2Item = { tag_id: number; tag: Tag; amount: number };
type Data2 = Data2Item[];
export const Charts = defineComponent({
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
    const columns = ["支出", "收入"];
    const result = ref("支出");
    const kind = ref("expenses");
    const showPicker = ref(false);
    const onConfirm = (value: string) => {
      result.value = value;
      showPicker.value = false;
      value === "支出" ? (kind.value = "expenses") : (kind.value = "income");
    };
    const data1 = ref<Data1>([]);
    const betterData1 = computed<[string, number][]>(() => {
      if (!props.startDate || !props.endDate) {
        return [];
      }
      const diff =
        new Date(props.endDate).getTime() - new Date(props.startDate).getTime();
      const n = diff / DAY + 1;
      return Array.from({ length: n }).map((_, i) => {
        const time = new Time(props.startDate + "T00:00:00.000+0800")
          .add(i, "day")
          .getTimestamp();
        const item = data1.value[0];
        const amount =
          item && new Date(item.happen_at).getTime() === time
            ? data1.value.shift()!.amount
            : 0;
        return [new Date(time).toISOString(), amount];
      });
    });
    const fetchData1 = async () => {
      const response = await http.get<{ groups: Data1; summary: number }>(
        "/items/summary",
        {
          happen_after: props.startDate,
          happen_before: props.endDate,
          kind: kind.value,
          group_by: "happen_at",
          _mock: "itemSummary",
        }
      );
      data1.value = response.data.groups;
    };

    // 设置饼图
    const data2 = ref<Data2>([]);
    const betterData2 = computed<{ name: string; value: number }[]>(() =>
      data2.value.map((item) => ({
        name: item.tag.name,
        value: item.amount,
      }))
    );
    const fetchData2 = async () => {
      const response = await http.get<{ groups: Data2; summary: number }>(
        "/items/summary",
        {
          happen_after: props.startDate,
          happen_before: props.endDate,
          kind: kind.value,
          group_by: "tag_id",
          _mock: "itemSummary",
        }
      );
      data2.value = response.data.groups;
    };
    onMounted(fetchData2);
    watch(() => kind.value, fetchData2);

    onMounted(fetchData1);
    watch(() => kind.value, fetchData1);

    // 设置条形图
    const betterData3 = computed<
      { tag: Tag; amount: number; percent: number }[]
    >(() => {
      const total = data2.value.reduce((sum, item) => sum + item.amount, 0);
      return data2.value.map((item) => ({
        ...item,
        percent: Math.round((item.amount / total) * 100 * 100) / 100,
      }));
    });
    return () => (
      <div class={s.wrapper}>
        <div class={s.select}>
          <Field
            class={[s.input, result.value === "收入" ? s.green : ""]}
            v-model={result.value}
            is-link
            readonly
            label="类型"
            placeholder="选择类型"
            onClick={() => (showPicker.value = true)}
          />
          <Popup v-model:show={showPicker.value} round position="bottom">
            <Picker
              columns={columns}
              onCancel={() => (showPicker.value = false)}
              onConfirm={onConfirm}
            />
          </Popup>
        </div>
        <LineChart data={betterData1.value} kind={kind.value} />
        <PieChart data={betterData2.value} kind={kind.value}/>
        <Bars data={betterData3.value}kind={kind.value}/>
      </div>
    );
  },
});
