import { defineComponent } from 'vue';
import { Button } from '../shared/Button';
import s from './StartPage.module.scss';
import { FloatButton } from '../shared/FloatButton';
import { Icon } from '../shared/Icon';
import { Center } from '../shared/Center';

export const StartPage = defineComponent({
    setup: (props, context) => {
        const onClick = () => {

        }
        return () => (
            <div>
                <nav>menu</nav>
                <Center class={s.noData_wrapper}>
                    <Icon name="noData" class={s.noData} />
                    <span>暂无数据</span>
                </Center>
                <div class={s.button_wrapper}>
                    <Button class={s.button} onClick={onClick}>测试</Button>
                </div>
                <FloatButton iconName='add' />
            </div>
        )
    }
})