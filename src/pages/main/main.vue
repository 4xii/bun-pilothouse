<template>
  <DayNightBackGround />
  <div class="scrollElement">
  </div>

  <div class="flex  items-start justify-between w-full h-full fixed ">
    <div class="mt-20px ml-40px">
      <div class="glassmorphism w-60vw h-60vh  flex items-center justify-between pr-100px">
        <div class="flex  w-500px">
          <div class="mr-30px">
            <div class="i-logos-vue text-3xl" />
          </div>
          <div class="flex mr-30px">
            <div class="i-logos-vitest text-3xl" />
            <div class="i-logos-jest text-3xl" />
          </div>
          <div class="flex mr-30px">
            <div class="i-logos-vitejs text-3xl" />
            <div class="i-logos-webpack text-3xl" />
          </div>
          <div class="flex mr-30px">
            <div class="i-logos-nestjs text-3xl" />
            <div class="i-logos-egg text-3xl" />
          </div>

          <div class="flex mr-30px">
            <div class="i-logos-ramda text-3xl" />
            <div class="i-logos-vueuse text-3xl" />
            <div class="i-logos-lodash text-3xl" />
            <div class="i-logos-zod text-3xl" />
            <div class="i-logos-bun text-3xl" />
          </div>
        </div>
      </div>
    </div>
    <div class="glassmorphism h-100px flex flex-center w-300px mt-20px mr-20px p-10px">
      <DayNightSwitch @click="switchDayNight" :model-value="isDay" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import DayNightSwitch from '@/components/switch/day-night-switch.vue';
import { useDebounceFn } from '@vueuse/core'
//@ts-ignore svg
import DayNightBackGround from './components/day-night-bg/day-night.vue'
import { createBatsAnimation, createBirdAnimation, createCloudsAnimation, createFallingStarAnimation, createScene1Animation, createScene2Animation, createScene3Animation, createSceneTransition, createSunAnimation, createSunIncreaseAnimation, dayNightSwitch } from './gsap';

const isDay = ref(true)

const switchDayNight = useDebounceFn(() => {
  isDay.value = !isDay.value
  // 只有在不是通过按钮触发滚动时才执行滚动逻辑
  dayNightSwitch(isDay.value)
})

// 初始化滚动触发器
function initScrollTriggers() {
  createScene1Animation();
  createBirdAnimation();
  createCloudsAnimation();
  createSunAnimation();
  createScene2Animation();
  createBatsAnimation();
  createSunIncreaseAnimation();
  createSceneTransition();
  createScene3Animation();
  createFallingStarAnimation();
}

// 设置滚动监听
function setupScrollListener() {
  window.addEventListener('scroll', handleScroll);
}

// 处理滚动事件
function handleScroll() {
  if (window.scrollY === 0) {
    isDay.value = true;
  } else if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    isDay.value = false;
  }
}
onMounted(() => {
  initScrollTriggers();
  setupScrollListener();
});


</script>

<style scoped>
/* body::-webkit-scrollbar {
  display: none;
} */


.scrollElement {
  position: absolute;
  height: 6000px;
  width: 100px;
  top: 0;
  z-index: 0;
}
</style>
