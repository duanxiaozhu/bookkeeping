import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import s from './SkipFeatures.module.scss';
export const SkipFeatures = defineComponent({
  setup: (props, context) => {
    const onClick = () => {
      localStorage.setItem('skipFeatures', 'yes')
    }
    return () => (
      <span onClick={onClick} class={s.skip}>
        <RouterLink to="/items"><svg>
            <use xlinkHref='#skip'></use>
        </svg></RouterLink>
      </span>
    )
  }
})