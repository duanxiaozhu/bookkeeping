import s from './welcome.module.scss';
import { RouterLink } from 'vue-router';
import { SkipFeatures } from '../../shared/SkipFeatures';
const onClick=()=>{
  localStorage.setItem('skipFeatures', 'yes')
}
export const ForthActions = () => (
  <div class={s.actions}>
    <SkipFeatures class={s.fake} />
    <RouterLink to="/items" >
      <svg onClick={onClick}>
        <use xlinkHref='#next'></use>
      </svg>
    </RouterLink>
    <SkipFeatures class={s.fake} />
  </div>
)

ForthActions.displayName = 'ForthActions'