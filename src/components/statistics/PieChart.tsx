import { defineComponent, onMounted, PropType, ref, watch } from "vue";
import s from "./PieChart.module.scss";
import * as echarts from "echarts";
import { getMoney } from "../../shared/Money";
const defaultOption = {
  tooltip: {
    trigger: "item",
    formatter: (item: { name: string; value: number; percent: number }) => {
      const { name, value, percent } = item;
      return `${name}：￥${getMoney(value)}`;
    },
  },
  legend: {
    top: "0%",
    left: "center",
  },
  grid: [{ left: 0, top: 0, right: 0, bottom: 0 }],

};
export const PieChart = defineComponent({
  props: {
    data: {
      type: Array as PropType<{ name: string; value: number }[]>,
    },
    kind: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const refDiv2 = ref<HTMLDivElement>();
    let chart: echarts.ECharts | undefined = undefined;
    onMounted(() => {
      if (refDiv2.value === undefined) {
        return;
      }
      // 基于准备好的dom，初始化echarts实例
      chart = echarts.init(refDiv2.value);

      chart.setOption({...defaultOption,
        series: [
          {
            data:props.data,
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "20",
                fontWeight: "bold",
              },
            },
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
          },
        ],});
    });
    watch(
      () => props.data,
      () => {
        chart?.setOption({
          series: [
            {
              data: props.data,
            },
          ],
        });
      }
    );
    return () => (
      <>
        <div class={s.wrapper_bg}>
          <div class={s.title}>
            {props.kind === "expenses" ? "支出构成" : "收入构成"}
          </div>
          <div ref={refDiv2} class={s.wrapper}></div>
        </div>
      </>
    );
  },
});
