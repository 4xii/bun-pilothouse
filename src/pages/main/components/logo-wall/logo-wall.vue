<template>
 <div class="flex flex-col">
    <div v-for="(row, index) in logoRows" :key="index" class="flex mr-30px">
      <div v-for="iconClass in row" :key="iconClass" :class="`i-${iconClass} text-3xl m-8px`" />
    </div>
  </div>
</template>

<script setup lang="ts" >
const logoRows = [
  ['logos-vue', 'logos-vitest', 'logos-jest', 'logos-vitejs'],
  ['logos-webpack', 'logos-nestjs', 'logos-ramda', 'logos-egg'],
  ['logos-vueuse', 'logos-lodash', 'logos-zod', 'logos-bun']
]
</script>
