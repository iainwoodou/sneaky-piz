<script>
import { useGlobalStore } from '@/store/store.js';
import  fileManager from '@/mixins/fileManager.js';
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
  Files in the .IMD file
  <input type="file" accept=".imd" @change="handleFileChooser" />
  <pre>{{ store.zipfiles }}</pre>
  <button @click="exportIMDFile">Export .imd</button>
   
    <InstallPopup />
</template>

<style></style>
