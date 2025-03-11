<script>
import { useGlobalStore } from '@/store/store.js';
import hljs from 'highlight.js/lib/core';
import CodeEditor from 'simple-code-editor';
import VueFormGenerator from 'vue-form-generator';
import 'vue-form-generator/dist/vfg.css';
export default {
  components: {
    CodeEditor,
    VueFormGenerator
  },
  setup() {
    const store = useGlobalStore();
    return {
      store
    };
  },
  data() {
    return {
      hljs,
      model: {},
      schema: {}
    };
  },
  methods: {}
};
</script>

<template>
  <div class="container">
    <h1>Json</h1>
    <h2>Ok Slap the JSON structure editor here</h2>
    <CodeEditor
      v-model="store.zipfiles['data.json'].data"
      theme="github-dark"
      :line-nums="true"
      :languages="[['JSON', 'json']]"
      width="100%"
      height="600px"
    />
  </div>

  <vue-form-generator :schema="store.zipfiles['schema.json'].data" :model="store.zipfiles['data.json'].data"></vue-form-generator>

</template>

<style></style>
