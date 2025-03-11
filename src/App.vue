<script>
import { useGlobalStore } from '@/store/store.js';
import { fileManager } from '@/mixins/fileManager.js';
import InstallPopup from '@/InstallPopup.vue';
export default {
  components: {InstallPopup},
  mixins: [fileManager],
  setup() {
    const store = useGlobalStore()
    return {
      store
    }
  },
  data() {
    return {}
  },

  methods: {},
}
</script>

<template>
  HEllo
  <InstallPopup />
</template>

<style></style>
