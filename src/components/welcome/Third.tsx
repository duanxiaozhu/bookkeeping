import s from './welcome.module.scss';
import chart from '../../assets/icons/chart.svg';
export const Third = () => {
    return (
      <div class={s.card}>
      <img class={s.icon} src={chart} />
      <div>
      <span class={s.title_blue}>一目</span><span class={s.title_yellow}>了然</span>
    </div>
    <div class={s.content}>重要信息，有效呈现</div>
    </div>
    )
  }
  
  Third.displayName = 'Third'