import { defineComponent, onMounted, PropType, ref } from 'vue';
import s from './ItemCreate.module.scss';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon';
import { Tab, Tabs } from '../../shared/Tabs';
import { InputPad } from './InputPad';
import { http } from '../../shared/Http';
import { useTags } from '../../shared/useTags';
import { Tags } from './Tags';
export const ItemCreate = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup: (props, context) => {
        const refKind = ref('支出')
        return () => (
            <MainLayout class={s.layout}>{{
                title: () => '记一笔',
                icon: () => <Icon name='left' class={s.navIcon} />,
                default:()=><>
                <div class={s.wrapper}>
        <Tabs v-model:selected={refKind.value} 
        selected={refKind.value}
        onUpdate:selected={()=>{console.log(1)}}
        class={s.tabs}>
            <Tab name="支出" class={s.tags_wrapper}>
            <Tags kind="expenses"/>
            </Tab>
            <Tab name="收入" class={s.tags_wrapper}>
            <Tags kind="income"/>
            </Tab>
        </Tabs>
        <div class={s.inputPad_wrapper}>
        <InputPad/>
        </div>
        </div>
        </>
            }}</MainLayout>
        )
    }
})