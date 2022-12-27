<template>
  
  <HomePage />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import HomePage from '@/components/Home.vue'

export default defineComponent({
  name: 'HomeView',

  components: {
    
    HomePage
  },
});
</script>
