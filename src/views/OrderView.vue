<template>
    <OrderVue />
</template>

<script>
import { defineComponent } from 'vue';
import OrderVue from '@/components/Order.vue';

    export default defineComponent({
        name: 'OrderView',
        components: {
            OrderVue
        }
    })
</script>
