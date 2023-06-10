import s from './welcome.module.scss';
import { RouterLink } from 'vue-router';
import { FunctionalComponent } from 'vue';
export const FirstActions: FunctionalComponent = () => {
    return <div class={s.actions}>
        <RouterLink class={s.fake} to="/start" ><svg>
            <use xlinkHref='#skip'></use>
        </svg></RouterLink>
        <RouterLink to="/welcome/2" >    <svg>
            <use xlinkHref='#next'></use>
        </svg></RouterLink>
        <RouterLink to="/start" ><svg>
            <use xlinkHref='#skip'></use>
        </svg></RouterLink>
    </div>
}

FirstActions.displayName = 'FirstActions'