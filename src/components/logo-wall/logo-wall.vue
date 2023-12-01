<template>
 <div class="flex flex-col">
    <div v-for="(row, index) in logoRows" :key="index" class="flex mr-30px">
      <div v-for="iconClass in row" :key="iconClass" :class="`${iconClass} text-3xl m-8px`" />
    </div>
  </div>
</template>

<script setup lang="ts" >
const logoRows = [
  ['i-logos-vue', 'i-logos-vitest', 'i-logos-jest', 'i-logos-vitejs'],
  ['i-logos-webpack', 'i-logos-nestjs', 'i-logos-ramda',],
  ['i-logos-vueuse', 'i-logos-lodash', 'i-logos-zod', 'i-logos-bun']
]
</script>
