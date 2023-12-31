import { defineComponent } from 'vue';
import { TimeTabsLayout } from '../layouts/TimeTabsLayout ';
import {Charts} from '../components/statistics/Charts'
export const StatisticsPage = defineComponent({
  setup: (props, context) => {
    return () => (
      <TimeTabsLayout rerenderOnSwitchTab={true} component={Charts} title={'统计图表'} />
    )
  }
})
export default StatisticsPage