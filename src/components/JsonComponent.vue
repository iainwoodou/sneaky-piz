<script>
import { useGlobalStore } from '@/store/store.js';
import hljs from 'highlight.js/lib/core';
import CodeEditor from 'simple-code-editor';
export default {
  components: {
    CodeEditor
  },
  setup() {
    const store = useGlobalStore();
    return {
      store
    };
  },
  data() {
    return {
      hljs
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
</template>

<style></style>
