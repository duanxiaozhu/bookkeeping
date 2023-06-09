import { defineComponent } from 'vue';
export const Third = defineComponent({
    setup: (props, context) => {
        return () => (
            <div>First</div>
        )
    }
})