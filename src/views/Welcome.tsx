import { defineComponent } from 'vue';
import { RouterView } from 'vue-router'
import s from './welcome.module.scss'
import logo from '../assets/icons/flower.svg'
export const Welcome = defineComponent({
    setup: (props, context) => {
        return () => (
        <div class={s.wrapper}>
            <header>
                <img src={logo}/>
                <h1>花儿记账</h1>
            </header>
            <main><RouterView /></main>
        </div>
        )
    }
})