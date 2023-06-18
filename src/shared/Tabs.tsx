import { defineComponent, onMounted, onUpdated, PropType, ref } from 'vue';
import s from './Tabs.module.scss';
export const Tabs = defineComponent({
  props: {
    classPrefix: {
      type: String
    },
    selected: {
      type: String as PropType<string>,
      required: false,
    },
    onUpdateSelected: {
      type: Function as PropType<(name: string) => void>,
      required: false,
    }
  },
  setup: (props, context) => {
        // 设置导航条
        const container = ref<HTMLDivElement>();
        const selectedItem = ref<HTMLDivElement>();
        const indicator = ref<HTMLDivElement>();
        const toggleNav = () => {
          // 动态设置导航条宽度
          const { width } = selectedItem.value!.getBoundingClientRect();
          indicator.value!.style.width = width + "px";
    
          // 动态设置导航条位置
          const { left: left1 } = container.value!.getBoundingClientRect();
          const { left: left2 } = selectedItem.value!.getBoundingClientRect();
          const left = left2 - left1;
          indicator.value!.style.left = left + "px";
        };
        onMounted(toggleNav);
        onUpdated(toggleNav);
    return () => {
      const tabs = context.slots.default?.()
      console.log(tabs)
      if (!tabs) return () => null
      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].type !== Tab) {
          throw new Error('<Tabs> only accepts <Tab> as children')
        }
      }
      const cp = props.classPrefix
      return <div class={[s.tabs, cp + '_tabs']}>
        <ol class={[s.tabs_nav, cp + '_tabs_nav']} ref={container}>
          {tabs.map(item =>
            <li 
            class={[item.props?.name === props.selected ? [s.selected, cp + '_selected'] : '',
            cp + '_tabs_nav_item']}
            onClick={() => context.emit('update:selected', item.props?.name)}
            ref={item.props?.name === props.selected ? selectedItem : ""}
            >
              {item.props?.name}
            </li>)}
            <div class={s.indicator} ref={indicator}></div>
        </ol>
        <div class={s.tabsList}>
        {tabs.find(item => item.props?.name === props.selected)}
        </div>
      </div>

    }
  }
})

export const Tab = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div>{context.slots.default?.()}</div>
    )
  }
})