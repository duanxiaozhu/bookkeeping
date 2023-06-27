import { defineComponent, onMounted, PropType, ref, watch } from "vue";
import s from "./LineChart.module.scss";
import * as echarts from "echarts";
import { Time } from "../../shared/time";
import { getMoney } from "../../shared/Money";

const option = {
  tooltip: {
    show: true,
    trigger: "axis",
    formatter: ([item]: any) => {
      const [x, y] = item.data;
      return `${new Time(new Date(x)).format("YYYY年MM月DD日")} ￥${getMoney(
        y
      )}`;
    },
  },
  grid: [{ left: 10, top: 4, right: 10, bottom: 30 }],
  xAxis: {
    type: "category",
    axisLabel: {
      formatter: (value: string) => new Time(new Date(value)).format("MM-DD"),
    },
    boundaryGap: ["1%", "1%"], // 左右边界间隙
    axisTick: {
      alignWithLabel: true,
    },
    axisPointer: {
      snap: true,
    },
  },
  yAxis: {
    type: "value",
    show: true,
    splitLine: {
      show: true,
      lineStyle: {
        type: "dashed",
      },
    },
    axisLabel: {
      show: false,
    },
  },
};
export const LineChart = defineComponent({
  props: {
    data: {
      type: Array as PropType<[string, number][]>,
      required: true,
    },
    kind: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const refDiv = ref<HTMLDivElement>();
    const refDiv1 = ref<HTMLDivElement>();
    let chart: echarts.ECharts | undefined = undefined;

    onMounted(() => {
      if (refDiv.value === undefined) {
        return;
      }
      chart = echarts.init(refDiv.value);

      chart.setOption({
        ...option,
        series: [
          {
            data: props.data,
            type: "line",
            smooth: true,
            itemStyle: { color: "#ff585d" },
            areaStyle: {
              color: {
                /**
                 * 线性渐变
                 * 前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比
                 * 如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
                 */
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#ff585d", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#ffffff", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
        ],
      });
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
    watch(
      () => props.kind,
      () => {
        if (props.kind === "expenses") {
          chart?.setOption({
            series: [
              {
                itemStyle: { color: "#ff4f52" },
                areaStyle: {
                  color: {
                    colorStops: [
                      {
                        offset: 0,
                        color: "#ff4f52", // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#ffffff", // 100% 处的颜色
                      },
                    ],
                  },
                },
              },
            ],
          });
        } else {
          chart?.setOption({
            series: [
              {
                itemStyle: { color: "#00d09c" },
                areaStyle: {
                  color: {
                    colorStops: [
                      {
                        offset: 0,
                        color: "#53A867", // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#ffffff", // 100% 处的颜色
                      },
                    ],
                  },
                },
              },
            ],
          });
        }
      }
    );
    return () => (
      <div class={s.wrapper_bg}>
        <div class={s.title}>
          {props.kind === "expenses" ? "支出趋势" : "收入趋势"}
        </div>
        <div ref={refDiv1} class={s.lineChartWrapper}>
          <div
            ref={refDiv}
            class={
              props.data.length > 7 || props.data.length === 0
                ? s.wrapper
                : s.lineChartWeek
            }
          ></div>
        </div>
      </div>
    );
  },
});
