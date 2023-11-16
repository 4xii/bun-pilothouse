<template>
  <DayNightSvg />
  <div class="scrollElement">
  </div>

  <div class="flex flex-col items-center w-full h-full fixed">
    <div class="w-full flex items-start">
      <!-- <TypingEffectText1 class="w-700px"/> -->
    </div>
    <div class="glassmorphism w-1000px h-100px mt-20px flex items-center justify-center">
      <!-- <div>
      <VueLogo class="scale-50"/>
    </div> -->
      <div class="w-300px h-80px flex">
        <DayNightSwitch @click="switchDayNight" :model-value="isDay" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import DayNightSwitch from '@/components/switch/day-night-switch.vue';
import { useDebounceFn } from '@vueuse/core'
//@ts-ignore svg
import DayNightSvg from './components/day-night-bg/day-night.vue'
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
