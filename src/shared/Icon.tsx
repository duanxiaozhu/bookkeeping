import { PropType, defineComponent } from 'vue';
import s from './Icon.module.scss';
export type IconName = 'add'| 'chart'|'click'|'cloud'|'pig'|'skip'|'next'|'flower'|'noData'|'menu'

export const Icon = defineComponent({
    props:{
        name:{
            type:String as PropType<IconName>,
            required:true,
        }
    },
    setup: (props, context) => {
        return () => (
            <svg class={s.icon}>
                <use xlinkHref={'#'+props.name}></use>
            </svg>
        )
    }
})