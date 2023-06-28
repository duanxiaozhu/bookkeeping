import { PropType, defineComponent } from 'vue';
import s from './Icon.module.scss';
export type IconName = 'add'| 'chart'|'clock'|'cloud'|'pig'|'skip'|'next'|'flower'|'noData'|'menu'|'Export'|'notify'|'left'|'date'|'OK'|'delete'|'ComingSoon'

export const Icon = defineComponent({
    props:{
        name:{
            type:String as PropType<IconName>,
            required:true,
        },
        onClick: {
            type: Function as PropType<(e: MouseEvent) => void>
          }
    },
    setup: (props, context) => {
        return () => (
            <svg class={s.icon}  onClick={props.onClick}>
                <use xlinkHref={'#'+props.name}></use>
            </svg>
        )
    }
})