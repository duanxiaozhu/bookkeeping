import s from './welcome.module.scss';
import { RouterLink } from 'vue-router';
import { FunctionalComponent } from 'vue';
import { SkipFeatures } from '../../shared/SkipFeatures';
export const FirstActions: FunctionalComponent = () => {
    return <div class={s.actions}>
        <SkipFeatures class={s.fake} />
        <RouterLink to="/welcome/2" >    <svg>
            <use xlinkHref='#next'></use>
        </svg>
        </RouterLink>
        <SkipFeatures />
    </div>
}

FirstActions.displayName = 'FirstActions'