import s from './welcome.module.scss';
import pig from '../../assets/icons/pig.svg'
import { FunctionalComponent } from 'vue';
export const First: FunctionalComponent = () => {
  return <div class={s.card}>
    <img src={pig}/>
    <div>
      <span class={s.title_blue}>简洁</span><span class={s.title_yellow}>实用</span>
    </div>
    <div class={s.content}>即会挣钱，也懂省钱</div>
  </div>
}

First.displayName = 'First'