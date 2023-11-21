<template>
  <ul
    class="features-list ~ col gap2 auto"
  >
    <TestItem><span>NodeJS Full Stack Developer</span></TestItem>
    <TestItem><span>Skills: Vue Ecosystem, Frontend Engineering, TypeScript</span></TestItem>
    <TestItem><span>Project: AI Enterprise Application System Development</span></TestItem>
    <TestItem><span>Interests: Open Source, Tech Innovation, Knowledge Sharing</span></TestItem>
  </ul>
</template>
<script setup lang="ts">
import TestItem from './test-item.vue'
</script>
<style>
.features-list li {
  list-style: none;
  display: flex;
  gap: 0.4rem;
  margin: 0;
}

.features-list {
  padding: 0;
}
</style>
