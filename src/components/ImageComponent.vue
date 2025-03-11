<script>
import { useGlobalStore } from '@/store/store.js';
export default {
  setup() {
    const store = useGlobalStore();
    return {
      store
    };
  },
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>

<template>
  <div class="container">
    <h1>Images</h1>
 
  </div>
</template>

<style>

</style>
