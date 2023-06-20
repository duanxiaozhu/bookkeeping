import { defineComponent, onMounted, PropType, ref } from 'vue';
import s from './LineChart.module.scss';
import * as echarts from 'echarts';
export const LineChart = defineComponent({
  setup: (props, context) => {
    const refDiv = ref<HTMLDivElement>()
    onMounted(()=>{
    if(refDiv.value===undefined){return}
    var myChart = echarts.init(refDiv.value);
    const option = {
      grid: [
        { left: 10, top: 0, right: 10, bottom: 30 }
      ],
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        boundaryGap: ["1%", "1%"], // 左右边界间隙
        axisTick: {
          alignWithLabel: true,
        },
        axisPointer: {
          snap: true,
        },
      },
      yAxis: {
        type: 'value',
        show:true,
        splitLine:{
          show:true,
          lineStyle:{
            type:'dashed'
          },
        },
        axisLabel:{
          show:false
        },
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true
        }
      ]
    };
    myChart.setOption(option);
  })
  return () => (<>
    <div class={s.title}>支出趋势</div>
    <div ref={refDiv} class={s.wrapper}></div>
    </>
  )
}
})