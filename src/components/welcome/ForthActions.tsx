import s from './welcome.module.scss';
import { RouterLink } from 'vue-router';
export const ForthActions = () => (
  <div class={s.actions}>
    <RouterLink class={s.fake} to="/start" ><svg>
            <use xlinkHref='#skip'></use>
        </svg></RouterLink>
    <RouterLink to="/start" ><svg>
            <use xlinkHref='#next'></use>
        </svg></RouterLink>
    <RouterLink class={s.fake} to="/start" ><svg>
            <use xlinkHref='#skip'></use>
        </svg></RouterLink>
  </div>
)

ForthActions.displayName = 'ForthActions'