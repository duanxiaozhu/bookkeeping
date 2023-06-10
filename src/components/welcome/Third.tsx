import s from './welcome.module.scss';
export const Third = () => {
    return (
      <div class={s.card}>
      <svg>
        <use xlinkHref='#chart'></use>
      </svg>
      <div>
      <span class={s.title_blue}>一目</span><span class={s.title_yellow}>了然</span>
    </div>
    <div class={s.content}>重要信息，有效呈现</div>
    </div>
    )
  }
  
  Third.displayName = 'Third'