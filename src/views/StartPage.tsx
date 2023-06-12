import { defineComponent, ref } from 'vue';
import { Button } from '../shared/Button';
import s from './StartPage.module.scss';
import { FloatButton } from '../shared/FloatButton';
import { Icon } from '../shared/Icon';
import { Center } from '../shared/Center';
import { Navbar } from '../shared/Navbar';
import { Overlay } from '../shared/Overlay';

export const StartPage = defineComponent({
    setup: (props, context) => {
        const refOverlayVisible = ref(false)
        const onClickMenu = () => {
            refOverlayVisible.value = !refOverlayVisible.value
            console.log(refOverlayVisible.value)
        }
        return () => (
            <div>
                <Navbar class={s.menuIcon}>
                    {{ default: () => '小段记账', icon: () => <Icon name='menu' class={s.navIcon}  onClick={onClickMenu} /> }}
                </Navbar>
                <Center class={s.noData_wrapper}>
                    <Icon name="noData" class={s.noData} />
                    <span>暂无数据</span>
                </Center>
                <div class={s.button_wrapper}>
                    <Button class={s.button} >开始记账</Button>
                </div>
                <FloatButton iconName='add' />
                {refOverlayVisible.value &&
                    <Overlay onClose={() => refOverlayVisible.value = false} />
                }
            </div>
        )
    }
})