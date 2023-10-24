<script setup lang="ts">
import { getVideoUrl } from '@/utils/source'
import minifigure from '@/components/minifigure/minifigure.vue'
import tab from '@/components/tab/tab.vue'
import { reactive, ref } from 'vue';
import { computed } from 'vue';

const btnList = reactive([{
  label: 'face1',
  value: 1
}, {
  label: 'face2',
  value: 2
}])

const value1 = ref<1 | 2>(1)

const faceList = computed<[2 | 3, 3 | 4]>(() => {
  return [value1.value + 1 as 2 | 3, value1.value + 2 as 3 | 4]
})
</script>
<template>
  <!-- video-background    -->
  <div class="z-[-1] absolute w-full h-full">
    <video-background class="z-[-1] right-0 top-0 w-full h-full" :src="getVideoUrl('bg-video')" />
  </div>

  <div class="z-1 w-full flex flex-col justify-start items-start">
    <tab :btnList="btnList" v-model="value1" class="m-20px" />
    <div class="flex">
      <div class="h-500px w-300px glass-card-color ml-20px">
        <minifigure :expression-val="faceList[0]" />
      </div>

      <div class="h-500px w-300px glass-card-color ml-20px">
        <minifigure :expression-val="faceList[1]" />
      </div>
    </div>

  </div>
</template>

<style>
</style>
