<template>
  <ul
    class="features-list ~ col gap2 auto"
  >
  <TestItem>4xi - NodeJS Full Stack Developer</TestItem>
    <TestItem>Skills: Vue Ecosystem, Frontend Engineering, TypeScript</TestItem>
    <TestItem>Project: AI Enterprise Application System Development</TestItem>
    <TestItem>Interests: Open Source, Tech Innovation, Knowledge Sharing</TestItem>
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
