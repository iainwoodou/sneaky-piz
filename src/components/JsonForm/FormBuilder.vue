<script>
import { useGlobalStore } from '@/store/store.js';
export default {
  components: {
  },
  props: {
    schema: {
      type: Object,
      required: true
    },
    model: {
      type: Object,
      required: true
    }
  },
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
  methods: {}
};
</script>

<template>
 <pre>{{ schema }}</pre>
</template>

<style></style>
