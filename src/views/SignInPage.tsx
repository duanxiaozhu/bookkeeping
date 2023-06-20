import { defineComponent, PropType, reactive, ref } from 'vue';
import { MainLayout } from '../layouts/MainLayout';
import { Icon } from '../shared/Icon';
import s from './SignInPage.module.scss';
import { Form, FormItem } from '../shared/Form';
import { validate } from '../shared/validate';
import { Button } from '../shared/Button';
import axios from 'axios';

export const SignInPage = defineComponent({
    setup: (props, context) => {
        const formData = reactive({
            email: 'zhuolin1014@163.com',
            code: ''
        })
        const errors = reactive({
            email: [],
            code: []
        })
        const refValidationCode=ref<any>()
        const onSubmit = (e: Event) => {
            e.preventDefault()
            Object.assign(errors, {
                email: [], code: []
            })
            Object.assign(errors, validate(formData, [
                { key: 'email', type: 'required', message: '必填' },
                { key: 'email', type: 'pattern', regex: /.+@.+/, message: '必须是邮箱地址' },
                { key: 'code', type: 'required', message: '必填' },
            ]))
        }
        const onClickSendValidationCode = async () => {
            const response = await axios.post('/api/v1/validation_codes', { email: formData.email })
            .catch(()=>{
              //失败
            })
          // 成功
          refValidationCode.value.startCount()
        }
        return () => (
            <MainLayout>{
            {
                title: () => '登录',
                icon: () => <Icon name='left' />,
                default: () => (
                    <div class={s.wrapper}>
                        <div class={s.logo}>
                            <Icon name='flower' class={s.icon} />
                            <h1 class={s.appName}>小段记账</h1>
                        </div>
                        <Form onSubmit={onSubmit}>
                            <FormItem label='邮箱地址' type="text" 
                            placeholder='请输入邮箱，然后点击发送验证码' 
                            v-model={formData.email} 
                            error={errors.email?.[0]} />
                            <FormItem label="验证码" 
                            ref={refValidationCode}
                            type="validationCode"
                            placeholder='请输入六位数字'
                            countFrom={10}
                            onClick={onClickSendValidationCode}
                            v-model={formData.code} error={errors.code?.[0]} />
                            <FormItem style={{ paddingTop: '60px' }}>
                                <Button type={'submit'} class={s.button}>登录</Button>
                            </FormItem>
                        </Form>
                    </div>
                    )
            }
            }</MainLayout>
        )
    }
})