import { defineComponent } from 'vue';
import { Button } from '../shared/Button';
import s from './StartPage.module.scss';
import { FloatButton } from '../shared/FloatButton';
import { Icon } from '../shared/Icon';
import { Center } from '../shared/Center';
import { Navbar } from '../shared/Navbar';

export const StartPage = defineComponent({
    setup: (props, context) => {
        const onClick = () => {

        }
        return () => (
            <div>
                <Navbar class={s.menuIcon}>
                    {{ default: ()=>'小段记账', icon:()=> <Icon name='menu' class={s.navIcon} /> }}
                </Navbar>
                <Center class={s.noData_wrapper}>
                    <Icon name="noData" class={s.noData} />
                    <span>暂无数据</span>
                </Center>
                <div class={s.button_wrapper}>
                    <Button class={s.button} onClick={onClick}>开始记账</Button>
                </div>
                <FloatButton iconName='add' />
            </div>
        )
    }
})