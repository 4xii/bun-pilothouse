<script setup lang="ts">
import { computed, effectScope, onMounted, ref } from 'vue'
import { until, useElementVisibility } from '@vueuse/core'

const el = ref<HTMLDivElement>()
const state = ref(0)

function reset() {
  state.value = 0
  setTimeout(
    () => {
      state.value = Math.random() > 0.9 ? 2 : 1
      if (state.value === 2) setTimeout(reset, 1000)
    },
    Math.round(Math.random() * 3000) + 400
  )
}

const color = computed(() => {
  return {
    '--vp-c-brand-1':
      state.value === 1
        ? '#66ba1c'
        : state.value === 2
          ? 'rgba(248, 113, 113)'
          : 'rgba(250, 204, 21)',
  } as any
})

const scope = effectScope()

const visibility = scope.run(() => el.value && useElementVisibility(el))

onMounted(async () => {
  await until(visibility).toBe(true)

  scope.stop()
  reset()
})
</script>

<template>
  <div :style="color" class="flex items-center bg-#fff p-8px rounded-4px">
    <div ref="el" class="w-5 h-5 flex-none align-mid mr-4px relative">
      <div
        class="absolute transition duration-300"
        :class="state ? 'flip' : ''"
      >
        <div
          class="i-carbon:circle-dash animate-spin animate-2s text-yellow4"
        />
      </div>
      <div
        class="absolute transition duration-300"
        :class="state === 2 ? '' : 'flip'"
      >
        <div class="i-carbon:close-outline text-red4" />
      </div>
      <div
        class="absolute transition duration-300"
        :class="state === 1 ? '' : 'flip'"
      >
        <div class="text-$vp-c-brand-1 i-carbon:checkmark-outline" />
      </div>
    </div>

    <div class="text-color-#fff text-24px flex flex-center">
      <slot />
    </div>
  </div>
</template>
<style scoped>
div:first-of-type div.flip {
  transform: rotateY(90deg);
}
</style>
