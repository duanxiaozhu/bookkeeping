import s from './welcome.module.scss';
import cloud from '../../assets/icons/cloud.svg';
export const Forth = () => (
    <div class={s.card}>
    <img class={s.icon} src={cloud} />
    <div>
      <span class={s.title_blue}>有备</span><span class={s.title_yellow}>无患</span>
    </div>
    <div class={s.content}>数据上云，安全储存</div>
  </div>
)

Forth.displayName = 'Forth'