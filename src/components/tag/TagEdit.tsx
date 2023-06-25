import s from './Tag.module.scss'
import { defineComponent, reactive } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Rules, validate } from '../../shared/validate';
import { Icon } from '../../shared/Icon';
import { Button } from '../../shared/Button';
import { TagForm } from './TagForm';
import { BackIcon } from '../../shared/BackIcon';
export const TagEdit = defineComponent({
    setup: (props, context) => {
        const formData=reactive({
            name:'',
            sign:'',
        })
        const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({})
        const onSubmit = (e: Event) => {
          const rules: Rules<typeof formData> = [
            { key: 'name', type: 'required', message: '必填' },
            { key: 'name', type: 'pattern', regex: /^.{1,4}$/, message: '只能填 1 到 4 个字符' },
            { key: 'sign', type: 'required', message: '选择一个表情' },
          ]
          Object.assign(errors, {
            name: undefined,
            sign: undefined
          })
          Object.assign(errors, validate(formData, rules))
          e.preventDefault()
        }
        return () => (
            <MainLayout>{{
                title:()=>'编辑标签',
                icon: () => <BackIcon/>,
                default:()=><>
                    <TagForm/>
                    <div class={s.actions}>
                    <Button level='danger' class={s.removeTags} onClick={()=>{}}>删除标签</Button>
                    <Button level='danger' class={s.removeTagsAndItems} onClick={()=>{}}>删除标签和记账</Button>
                    </div>
                
                </>
            }}</MainLayout>

        )
    }

})