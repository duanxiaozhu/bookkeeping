import { defineComponent, PropType } from 'vue';
import { FloatButton } from '../../shared/FloatButton';
import s from './ItemSummary.module.scss';
export const ItemSummary = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: true
    },
    endDate: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <ul class={s.total}>
          <li><span class={s.numberSize}>128</span><span>支出</span></li>
          <li><span class={s.numberSize}>99</span><span>收入</span></li>
          <li><span class={s.numberSize}>39</span><span>净收入</span></li>
        </ul>
        <div class={s.bg}></div>
        <ol class={s.list}>
          <li>
            <div class={s.sign}>
              <span>🤔</span>
            </div>
            <div class={s.text}>
              <div class={s.tag}>
                旅行
              </div>
              <div class={s.time}>
                2000-01-01 12:39
              </div>
            </div>
            <div class={s.amount}>￥1234</div>
          </li>
          <li>
            <div class={s.sign}>
              <span>🤔</span>
            </div>
            <div class={s.text}>
              <div class={s.tag}>
                旅行
              </div>
              <div class={s.time}>
                2000-01-01 12:39
              </div>
            </div>
            <div class={s.amount}>￥1234</div>
          </li>
          <li>
            <div class={s.sign}>
              <span>🤔</span>
            </div>
            <div class={s.text}>
              <div class={s.tag}>
                旅行
              </div>
              <div class={s.time}>
                2000-01-01 12:39
              </div>
            </div>
            <div class={s.amount}>￥1234</div>
          </li>
          <li>
            <div class={s.sign}>
              <span>🤔</span>
            </div>
            <div class={s.text}>
              <div class={s.tag}>
                旅行
              </div>
              <div class={s.time}>
                2000-01-01 12:39
              </div>
            </div>
            <div class={s.amount}>￥1234</div>
          </li>
          <li>
            <div class={s.sign}>
              <span>🤔</span>
            </div>
            <div class={s.text}>
              <div class={s.tag}>
                旅行
              </div>
              <div class={s.time}>
                2000-01-01 12:39
              </div>
            </div>
            <div class={s.amount}>￥1234</div>
          </li>
          <li>
            <div class={s.sign}>
              <span>🤔</span>
            </div>
            <div class={s.text}>
              <div class={s.tag}>
                旅行
              </div>
              <div class={s.time}>
                2000-01-01 12:39
              </div>
            </div>
            <div class={s.amount}>￥1234</div>
          </li>
          <li>
            <div class={s.sign}>
              <span>🤔</span>
            </div>
            <div class={s.text}>
              <div class={s.tag}>
                旅行
              </div>
              <div class={s.time}>
                2000-01-01 12:39
              </div>
            </div>
            <div class={s.amount}>￥1234</div>
          </li>
          <li>
            <div class={s.sign}>
              <span>🤔</span>
            </div>
            <div class={s.text}>
              <div class={s.tag}>
                旅行
              </div>
              <div class={s.time}>
                2000-01-01 12:39
              </div>
            </div>
            <div class={s.amount}>￥1234</div>
          </li>
          <li>
            <div class={s.sign}>
              <span>🤔</span>
            </div>
            <div class={s.text}>
              <div class={s.tag}>
                旅行
              </div>
              <div class={s.time}>
                2000-01-01 12:39
              </div>
            </div>
            <div class={s.amount}>￥1234</div>
          </li>
          <li>
            <div class={s.sign}>
              <span>🤔</span>
            </div>
            <div class={s.text}>
              <div class={s.tag}>
                旅行
              </div>
              <div class={s.time}>
                2000-01-01 12:39
              </div>
            </div>
            <div class={s.amount}>￥1234</div>
          </li>
          <li>
            <div class={s.sign}>
              <span>🤔</span>
            </div>
            <div class={s.text}>
              <div class={s.tag}>
                旅行
              </div>
              <div class={s.time}>
                2000-01-01 12:39
              </div>
            </div>
            <div class={s.amount}>￥1234</div>
          </li>

          <div class={s.more}>向下滑动加载更多</div>
        </ol>

        <FloatButton iconName='add' />
      </div>
      
    )
  }
})