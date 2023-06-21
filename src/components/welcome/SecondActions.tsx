import s from './welcome.module.scss';
import { RouterLink } from 'vue-router';
import { FunctionalComponent } from 'vue';
import { SkipFeatures } from '../../shared/SkipFeatures';
export const SecondActions: FunctionalComponent = () => {
    return <div class={s.actions}>
        <SkipFeatures class={s.fake} />
        <RouterLink to="/welcome/3" >    <svg>
            <use xlinkHref='#next'></use>
        </svg>
        </RouterLink>
        <SkipFeatures />
    </div>
}

SecondActions.displayName = 'FirstActions'