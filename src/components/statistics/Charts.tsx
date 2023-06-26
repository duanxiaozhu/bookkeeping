import {defineComponent,  PropType,  ref } from 'vue';
import s from './Charts.module.scss';
import { FormItem } from '../../shared/Form';
import {Popup,Field,Picker}from 'vant'
import { LineChart } from './LineChart';
import { PieChart } from './PieChart';
import { Bars } from './Bars';

export const Charts = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: false
    },
    endDate: {
      type: String as PropType<string>,
      required: false
    }
  },
  setup: (props, context) => {
    const columns = ['支出', '收入'];
    const result = ref('支出');
    const showPicker = ref(false);
    const onConfirm = (value:string) => {
      result.value = value;
      showPicker.value = false;
    };
    const category=ref('expenses')
 
    return () => (
      <div class={s.wrapper}>
        {/* <FormItem label='类型' type='select' options={[
        { value: 'expenses', text: '支出' },
        { value: 'income', text: '收入' }         
        ]}
        v-model={category.value}
        /> */}
          <div class={s.select}>
          <Field
            class={[s.input,result.value==='收入'?s.green:'']}
            v-model={result.value}
            is-link
            readonly
            label="类型"
            placeholder="选择类型"
            onClick={()=>showPicker.value = true}/>
          <Popup v-model:show={showPicker.value} round position="bottom">
            <Picker
                columns={columns}
                onCancel={()=>showPicker.value = false}
                onConfirm={onConfirm}/>
          </Popup>
          </div>
          <LineChart />
          <PieChart />
          <Bars />
      </div>
    )
  }
})