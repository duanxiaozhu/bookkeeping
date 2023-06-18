import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import { Button } from '../shared/Button';
import s from './StartPage.module.scss';
import { FloatButton } from '../shared/FloatButton';
import { Icon } from '../shared/Icon';
import { Center } from '../shared/Center';
import { MainLayout } from '../layouts/MainLayout';
import { OverlayIcon } from '../shared/Overlay';

export const StartPage = defineComponent({
    setup: (props, context) => {

        return () => (
            <MainLayout>{
                {
                title: () => '小段记账',
                icon: () => <OverlayIcon />,
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
                </>
                }
            }</MainLayout>
        )
    }
})