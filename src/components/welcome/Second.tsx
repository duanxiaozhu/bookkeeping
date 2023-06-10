import s from './welcome.module.scss';
import { FunctionalComponent } from 'vue';

export const Second: FunctionalComponent = () => {
  return <div class={s.card}>
    <svg>
      <use xlinkHref='#clock'></use>
    </svg>
    <div>
      <span class={s.title_blue}>持之</span><span class={s.title_yellow}>以恒</span>
    </div>
    <div class={s.content}>每日提醒，矢志不渝</div>
  </div>
}

  
  
  Second.displayName = 'Second'