import { defineComponent, Transition, VNode } from 'vue';
import { RouteLocationNormalizedLoaded, RouterView } from 'vue-router';
import s from './welcome.module.scss'
import logo from '../assets/icons/flower.svg'
export const Welcome = defineComponent({
    setup: (props, context) => {
        return () => (
            <div class={s.wrapper}>
                <header>
                    <h1>花儿记账</h1>
                    <svg>
                        <use xlinkHref='#flower'></use>
                    </svg>
                </header>
                <main class={s.main}>
                    <RouterView name="main">
                        {({ Component: X, route: R }: { Component: VNode, route: RouteLocationNormalizedLoaded }) =>
                            <Transition
                                enterFromClass={s.slide_fade_enter_from}
                                enterActiveClass={s.slide_fade_enter_active}
                                leaveToClass={s.slide_fade_leave_to}
                                leaveActiveClass={s.slide_fade_leave_active}>
                                {X}
                            </Transition>
                        }
                    </RouterView>
                </main>
                <footer>
                    <RouterView name="footer" />
                </footer>
            </div>
        )
    }
})