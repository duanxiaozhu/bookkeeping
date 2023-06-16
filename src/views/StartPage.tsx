import { defineComponent, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { Button } from '../shared/Button';
import s from './StartPage.module.scss';
import { FloatButton } from '../shared/FloatButton';
import { Icon } from '../shared/Icon';
import { Center } from '../shared/Center';
import { Navbar } from '../shared/Navbar';
import { Overlay } from '../shared/Overlay';
import { MainLayout } from '../layouts/MainLayout';

export const StartPage = defineComponent({
    setup: (props, context) => {
        const refOverlayVisible = ref(false)
        const onClickMenu = () => {
            refOverlayVisible.value = !refOverlayVisible.value
        }
        return () => (
            <MainLayout>{
                {
                title: () => '小段记账',
                icon: () => <Icon name='menu' class={s.navIcon} onClick={onClickMenu} /> ,
                default:()=><>
                <Center class={s.noData_wrapper} direction='|'>
                    <Icon name="noData" class={s.noData} />
                    <span>暂无数据</span>
                </Center>
                <div class={s.button_wrapper}>
                    <RouterLink to="/items/create">
                        <Button class={s.button}>开始记账</Button>
                    </RouterLink>
                </div>
                <RouterLink to="/items/create">
                    <FloatButton iconName='add' />
                </RouterLink>
                {refOverlayVisible.value &&
                    <Overlay onClose={() => refOverlayVisible.value = false} />
                }
                </>
                }
            }</MainLayout>
        )
    }
})